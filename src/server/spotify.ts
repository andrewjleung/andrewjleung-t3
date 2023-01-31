import { env } from "../env/server.mjs";
import { z } from "zod";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

const SpotifyAccessTokenResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),
  scope: z.string(),
  expires_in: z.number(),
});

type SpotifyAccessTokenResponse = z.infer<typeof SpotifyAccessTokenResponse>;

const SpotifyTopItemsResponse = z.object({
  items: z.array(
    z.object({
      album: z.object({
        album_type: z.string(),
        artists: z.array(
          z.object({
            name: z.string(),
            href: z.string(),
            uri: z.string(),
            external_urls: z.object({
              spotify: z.string(),
            }),
          })
        ),
        href: z.string(),
        id: z.string(),
        images: z.array(
          z.object({
            height: z.number(),
            width: z.number(),
            url: z.string(),
          })
        ),
        name: z.string(),
        uri: z.string(),
        external_urls: z.object({
          spotify: z.string(),
        }),
      }),
      artists: z.array(
        z.object({
          name: z.string(),
          href: z.string(),
          uri: z.string(),
          external_urls: z.object({
            spotify: z.string(),
          }),
        })
      ),
      name: z.string(),
      href: z.string(),
    })
  ),
});

type SpotifyTopItemsResponse = z.infer<typeof SpotifyTopItemsResponse>;

export const SPOTIFY_CLIENT_CREDENTIALS = Buffer.from(
  `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
).toString("base64");

export function getAccessToken(): Promise<
  SpotifyAccessTokenResponse["access_token"]
> {
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${SPOTIFY_CLIENT_CREDENTIALS}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }).toString(),
  })
    .then((res) => res.json())
    .then((res) => SpotifyAccessTokenResponse.parse(res))
    .then((res) => res.access_token);
}

export function getTopItems(
  accessToken: string
): Promise<SpotifyTopItemsResponse> {
  const params = new URLSearchParams({
    limit: "10",
    time_range: "short_term",
  }).toString();

  return fetch(`${SPOTIFY_API_BASE_URL}/me/top/tracks?${params}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((res) => SpotifyTopItemsResponse.parse(res));
}

function makeAuthorizationUrl() {
  const params = new URLSearchParams({
    client_id: env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: "https://andrewjleung.me/",
    scope:
      "user-read-playback-state user-read-currently-playing user-top-read user-read-recently-played",
  }).toString();

  return `https://accounts.spotify.com/authorize?${params}`;
}
