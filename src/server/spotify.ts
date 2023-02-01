import { env } from "../env/server.mjs";
import { z } from "zod";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

const SpotifyAccessTokenResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),
  scope: z.string(),
  expires_in: z.number(),
});

export type SpotifyAccessTokenResponse = z.infer<
  typeof SpotifyAccessTokenResponse
>;

const SpotifyPlayableItem = z.object({
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
  uri: z.string(),
  type: z.string(),
});

export type SpotifyPlayableItem = z.infer<typeof SpotifyPlayableItem>;

const SpotifyRecentlyPlayedTracksResponse = z.object({
  href: z.string(),
  items: z.array(
    z.object({
      track: SpotifyPlayableItem,
      played_at: z.string(),
      context: z.object({
        type: z.string(),
        external_urls: z.object({
          spotify: z.string(),
        }),
        href: z.string(),
        uri: z.string(),
      }),
    })
  ),
  limit: z.number(),
  next: z.string(),
  cursors: z.object({
    after: z.string(),
  }),
});

type SpotifyRecentlyPlayedTracksResponse = z.infer<
  typeof SpotifyRecentlyPlayedTracksResponse
>;

const SpotifyGetCurrentlyPlayingTrackResponse = z.object({
  is_playing: z.boolean(),
  item: SpotifyPlayableItem,
  currently_playing_type: z.string(),
});

type SpotifyGetCurrentlyPlayingTrackResponse = z.infer<
  typeof SpotifyGetCurrentlyPlayingTrackResponse
>;

export const SPOTIFY_CLIENT_CREDENTIALS = Buffer.from(
  `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
).toString("base64");

export async function getAccessToken(): Promise<
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
    return await response
      .json()
      .then((res) => SpotifyAccessTokenResponse.parse(res))
      .then((res) => res.access_token);
  }

  return undefined;
}

export async function getTopTracks(
  accessToken: string
): Promise<SpotifyPlayableItem[] | undefined> {
  const params = new URLSearchParams({
    limit: "10",
    time_range: "short_term",
  }).toString();

  const response = await fetch(
    `${SPOTIFY_API_BASE_URL}/me/top/tracks?${params}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 200) {
    return await response
      .json()
      .then((res) =>
        z.object({ items: z.array(SpotifyPlayableItem) }).parse(res)
      )
      .then((res) => res.items);
  }

  return undefined;
}

export async function getRecentlyPlayedTracks(
  accessToken: string,
  limit: number
): Promise<SpotifyRecentlyPlayedTracksResponse | undefined> {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
  }).toString();

  const response = await fetch(
    `${SPOTIFY_API_BASE_URL}/me/player/recently-played?${queryParams}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 200) {
    return await response.json().then((res) => {
      return SpotifyRecentlyPlayedTracksResponse.parse(res);
    });
  }

  return undefined;
}

export async function getCurrentlyPlayingTrack(
  accessToken: string
): Promise<SpotifyGetCurrentlyPlayingTrackResponse | undefined> {
  const response = await fetch(
    `${SPOTIFY_API_BASE_URL}/me/player/currently-playing`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 200) {
    return await response
      .json()
      .then((res) => SpotifyGetCurrentlyPlayingTrackResponse.parse(res));
  }

  return undefined;
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
