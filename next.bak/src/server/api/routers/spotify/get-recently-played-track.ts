import { z } from "zod";
import { handle200 } from "../utils";
import { SpotifyPlayableItem } from "./types";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

const SpotifyRecentlyPlayedTrack = z.object({
	track: SpotifyPlayableItem,
	played_at: z.string().datetime(),
});

type SpotifyRecentlyPlayedTrack = z.infer<typeof SpotifyRecentlyPlayedTrack>;

const SpotifyGetRecentlyPlayedTrackResponse = z.object({
	items: z.array(SpotifyRecentlyPlayedTrack),
});

type SpotifyGetRecentlyPlayedTrackResponse = z.infer<
	typeof SpotifyGetRecentlyPlayedTrackResponse
>;

export async function getRecentlyPlayedTrack(
	accessToken: string,
): Promise<SpotifyRecentlyPlayedTrack | undefined> {
	const response = await fetch(
		`${SPOTIFY_API_BASE_URL}/me/player/recently-played?limit=1`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	if (response.status !== 200) {
		return;
	}

	const maybeParsedResponse = await handle200(
		response,
		SpotifyGetRecentlyPlayedTrackResponse,
	);

	if (maybeParsedResponse === undefined) {
		return;
	}

	const { items } = maybeParsedResponse;

	if (items.length < 1) {
		return;
	}

	return items[0];
}
