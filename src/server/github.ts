import { z } from "zod";
import { env } from "../env/server.mjs";
import { handle200 } from "./utils";

const GitHubPushEventPayload = z.object({
  commits: z.optional(
    z.array(
      z.object({
        sha: z.string(),
        message: z.string(),
        url: z.string(),
      })
    )
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
    }
  );

  if (response.status === 200) {
    return handle200(response, z.array(GitHubEvent));
  }
}

export function getLastCommitFromEvents(events: GitHubEvent[]):
  | {
      href: string;
      repo: string;
      sha: string;
      message: string;
      createdAt: GitHubEvent["created_at"];
    }
  | undefined {
  const pushEvents = events.filter((event) => event.type === "PushEvent");

  if (pushEvents.length < 1) {
    return;
  }

  const mostRecentPushEvent = pushEvents.find(Boolean) as GitHubEvent;
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
