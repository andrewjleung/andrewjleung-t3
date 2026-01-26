import { z } from "zod";
import { env } from "~/env";
import { handle200 } from "../utils";

const SpotifyAccessTokenResponse = z.object({
	access_token: z.string(),
	token_type: z.string(),
	scope: z.string(),
	expires_in: z.number(),
});

export type SpotifyAccessTokenResponse = z.infer<
	typeof SpotifyAccessTokenResponse
>;

export const SPOTIFY_CLIENT_CREDENTIALS = Buffer.from(
	`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
).toString("base64");

export async function getSpotifyAccessToken(): Promise<
	SpotifyAccessTokenResponse["access_token"] | undefined
> {
	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			Authorization: `Basic ${SPOTIFY_CLIENT_CREDENTIALS}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: env.SPOTIFY_REFRESH_TOKEN,
		}).toString(),
	});

	if (response.status === 200) {
		return handle200(response, SpotifyAccessTokenResponse).then(
			(res) => res?.access_token,
		);
	}
}
