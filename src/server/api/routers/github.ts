import { kv } from "@vercel/kv";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const LAST_COMMIT_KEY = "commit";

export const handle200 = <T>(
	response: Response,
	schema: z.ZodSchema<T>,
): Promise<T | undefined> =>
	response
		.json()
		.then((res) => schema.parse(res))
		.catch((err) => {
			console.error(err);
			return undefined;
		});

const GitHubPushEventPayload = z.object({
	commits: z.optional(
		z.array(
			z.object({
				sha: z.string(),
				message: z.string(),
				url: z.string(),
			}),
		),
	),
});

export type GitHubPushEventPayload = z.infer<typeof GitHubPushEventPayload>;

const GitHubEvent = z.object({
	type: z.string(),
	repo: z.object({
		name: z.string(),
	}),
	payload: GitHubPushEventPayload,
	created_at: z.string().datetime(),
});

export type GitHubEvent = z.infer<typeof GitHubEvent>;

const Commit = z.object({
	href: z.string(),
	repo: z.string(),
	sha: z.string(),
	message: z.string(),
	createdAt: z.string(),
});

type Commit = z.infer<typeof Commit>;

async function getCachedCommit(): Promise<Commit | undefined> {
	const cachedCommit = await kv.hgetall(LAST_COMMIT_KEY);

	if (cachedCommit === null) {
		return undefined;
	}

	return Commit.parse(cachedCommit);
}

export async function getGitHubEvents(): Promise<GitHubEvent[] | undefined> {
	const response = await fetch(
		"https://api.github.com/users/andrewjleung/events",
		{
			method: "GET",
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${env.GITHUB_PAT}`,
				"X-GitHub-Api-Version": "2022-11-28",
			},
		},
	);

	if (response.status === 200) {
		return handle200(response, z.array(GitHubEvent));
	}
}

export function getLastCommitFromEvents(
	events: GitHubEvent[],
): Commit | undefined {
	const pushEvents = events.filter((event) => event.type === "PushEvent");

	if (pushEvents.length < 1) {
		return;
	}

	const mostRecentPushEvent = pushEvents.find(Boolean)!;
	const mostRecentCommit = mostRecentPushEvent.payload?.commits
		?.reverse()
		.find(Boolean);

	if (mostRecentCommit === undefined) {
		return;
	}

	// Convert the API URL to a web URL.
	const url = new URL(mostRecentCommit.url);
	url.hostname = url.hostname.replace("api.", "");
	url.pathname = url.pathname
		.replace("/repos", "")
		.replace("/commits", "/commit");

	return {
		href: url.toString(),
		repo: mostRecentPushEvent.repo.name,
		sha: mostRecentCommit.sha,
		message: mostRecentCommit.message,
		createdAt: mostRecentPushEvent.created_at,
	};
}

export const githubRouter = createTRPCRouter({
	getLastCommit: publicProcedure.query(async () => {
		const events = await getGitHubEvents();
		const lastCommit = getLastCommitFromEvents(events ?? []);
		const cachedCommit = await getCachedCommit();

		if (lastCommit === undefined && cachedCommit !== undefined) {
			return cachedCommit;
		}

		if (lastCommit !== undefined) {
			await kv.hset(LAST_COMMIT_KEY, lastCommit);
		}

		return lastCommit;
	}),
});
