import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

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
      }),
    ),
    href: z.string(),
    id: z.string(),
    images: z.array(
      z.object({
        height: z.number(),
        width: z.number(),
        url: z.string(),
      }),
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
    }),
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
      context: z.nullable(
        z.object({
          type: z.string(),
          external_urls: z.object({
            spotify: z.string(),
          }),
          href: z.string(),
          uri: z.string(),
        }),
      ),
    }),
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
  item: z.nullable(SpotifyPlayableItem),
  currently_playing_type: z.enum(["track", "episode", "ad", "unknown"]),
});

type SpotifyGetCurrentlyPlayingTrackResponse = z.infer<
  typeof SpotifyGetCurrentlyPlayingTrackResponse
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

export async function getRecentlyPlayedTracks(
  accessToken: string,
  limit: number,
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
    },
  );

  if (response.status === 200) {
    return handle200(response, SpotifyRecentlyPlayedTracksResponse);
  }
}

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

export const spotifyRouter = createTRPCRouter({
  getCurrentTrack: publicProcedure.query(async () => {
    const accessToken = await getSpotifyAccessToken();

    if (accessToken === undefined) {
      return undefined;
    }

    const currentlyPlayingTrack = await getCurrentlyPlayingTrack(accessToken);
    const mostRecentlyPlayedTrack = await getRecentlyPlayedTracks(
      accessToken,
      1,
    ).then((res) => res?.items.find(Boolean)?.track);
    // TODO: Get the most recent track from the database and persist/return the latest one.

    return {
      isCurrentlyPlaying:
        (currentlyPlayingTrack?.is_playing &&
          currentlyPlayingTrack?.currently_playing_type === "track") ??
        false,
      track:
        currentlyPlayingTrack?.item ?? mostRecentlyPlayedTrack ?? undefined,
    };
  }),
});
