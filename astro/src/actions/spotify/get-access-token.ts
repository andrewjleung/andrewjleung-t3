import { z } from "zod";
import { getSecret } from "astro:env/server";
import { handle200 } from "../utils";

const client_id = getSecret("SPOTIFY_CLIENT_ID");
const client_secret = getSecret("SPOTIFY_CLIENT_SECRET");
const refresh_token = getSecret("SPOTIFY_REFRESH_TOKEN");

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
  `${client_id}:${client_secret}`,
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
      refresh_token: refresh_token ?? "",
    }).toString(),
  });

  if (response.status === 200) {
    return handle200(response, SpotifyAccessTokenResponse).then(
      (res) => res?.access_token,
    );
  }
}
