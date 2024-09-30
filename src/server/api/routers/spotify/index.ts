import { kv } from "@vercel/kv";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getSpotifyAccessToken } from "./get-access-token";
import { getCurrentlyPlayingTrack } from "./get-currently-playing-track";
import { getRecentlyPlayedTrack } from "./get-recently-played-track";
import { SpotifyPlayableItem } from "./types";

const CURRENT_TRACK_KEY = "track";

const getCurrentTrackResponseSchema = z.discriminatedUnion("status", [
	z.object({
		status: z.literal("success"),
		isCurrentlyPlaying: z.boolean(),
		track: SpotifyPlayableItem,
	}),
	z.object({
		status: z.literal("failure"),
	}),
]);

export type GetCurrentTrackResponse = z.infer<
	typeof getCurrentTrackResponseSchema
>;

const CachedTrack = z.object({
	track: SpotifyPlayableItem,
	timestamp: z.coerce.number(),
});

type CachedTrack = z.infer<typeof CachedTrack>;

async function getCachedTrack(): Promise<CachedTrack | undefined> {
	const cachedTrack = await kv.hgetall(CURRENT_TRACK_KEY);

	if (cachedTrack === null) {
		return undefined;
	}

	return CachedTrack.parse(cachedTrack);
}

export const spotifyRouter = createTRPCRouter({
	getCurrentTrack: publicProcedure.query(
		async (): Promise<GetCurrentTrackResponse> => {
			const accessToken = await getSpotifyAccessToken();

			if (accessToken === undefined) {
				return {
					status: "failure",
				};
			}

			const currentlyPlayingTrack = await getCurrentlyPlayingTrack(accessToken);

			if (currentlyPlayingTrack?.item) {
				await kv.hset(CURRENT_TRACK_KEY, {
					track: currentlyPlayingTrack.item,
					timestamp: currentlyPlayingTrack.timestamp,
				});

				return {
					status: "success",
					isCurrentlyPlaying: currentlyPlayingTrack.is_playing,
					track: currentlyPlayingTrack.item,
				};
			}

			const recentlyPlayedTrack = await getRecentlyPlayedTrack(accessToken);
			const cachedTrack = await getCachedTrack();

			if (recentlyPlayedTrack) {
				const recentlyPlayedTrackTimestamp = new Date(
					recentlyPlayedTrack.played_at,
				).getTime();

				if (
					!cachedTrack ||
					recentlyPlayedTrackTimestamp > cachedTrack.timestamp
				) {
					await kv.hset(CURRENT_TRACK_KEY, {
						track: recentlyPlayedTrack.track,
						timestamp: recentlyPlayedTrackTimestamp,
					});

					return {
						status: "success",
						isCurrentlyPlaying: false,
						track: recentlyPlayedTrack.track,
					};
				}
			}

			if (cachedTrack !== undefined) {
				return {
					status: "success",
					isCurrentlyPlaying: false,
					track: cachedTrack.track,
				};
			}

			return {
				status: "failure",
			};
		},
	),
});
