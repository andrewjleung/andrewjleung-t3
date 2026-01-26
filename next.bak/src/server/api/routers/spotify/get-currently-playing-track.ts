import { z } from "zod";
import { handle200 } from "../utils";
import { SpotifyPlayableItem } from "./types";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

const SpotifyGetCurrentlyPlayingTrackResponse = z.object({
	is_playing: z.boolean(),
	item: z.nullable(SpotifyPlayableItem),
	currently_playing_type: z.enum(["track", "episode", "ad", "unknown"]),
	timestamp: z.number(),
});

type SpotifyGetCurrentlyPlayingTrackResponse = z.infer<
	typeof SpotifyGetCurrentlyPlayingTrackResponse
>;

export async function getCurrentlyPlayingTrack(
	accessToken: string,
): Promise<SpotifyGetCurrentlyPlayingTrackResponse | undefined> {
	const response = await fetch(
		`${SPOTIFY_API_BASE_URL}/me/player/currently-playing`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	if (response.status === 200) {
		return handle200(response, SpotifyGetCurrentlyPlayingTrackResponse);
	}

	// TODO: For this and all other endpoint wrappers, report other error codes.
}
