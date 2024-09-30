import { kv } from "@vercel/kv";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getSpotifyAccessToken } from "./get-access-token";
import { getCurrentlyPlayingTrack } from "./get-currently-playing-track";
import { getRecentlyPlayedTrack } from "./get-recently-played-track";
import { SpotifyPlayableItem } from "./types";

export const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
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

async function getCachedTrackOrFailure(): Promise<GetCurrentTrackResponse> {
	const cachedTrack = await kv.hgetall(CURRENT_TRACK_KEY);

	if (cachedTrack !== null) {
		return {
			status: "success",
			isCurrentlyPlaying: false,
			track: SpotifyPlayableItem.parse(cachedTrack),
		};
	}

	return {
		status: "failure",
	};
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
				await kv.hset(CURRENT_TRACK_KEY, currentlyPlayingTrack.item);

				return {
					status: "success",
					isCurrentlyPlaying: currentlyPlayingTrack.is_playing,
					track: currentlyPlayingTrack.item,
				};
			}

			const recentlyPlayedTrack = await getRecentlyPlayedTrack(accessToken);

			if (recentlyPlayedTrack) {
				await kv.hset(CURRENT_TRACK_KEY, recentlyPlayedTrack.track);

				return {
					status: "success",
					isCurrentlyPlaying: false,
					track: recentlyPlayedTrack.track,
				};
			}

			return getCachedTrackOrFailure();
		},
	),
});
