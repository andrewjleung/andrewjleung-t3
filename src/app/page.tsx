import Home from "./Home";
import type { SpotifyPlayableItem } from "../server/spotify";
import {
  getCurrentlyPlayingTrack,
  getRecentlyPlayedTracks,
  getSpotifyAccessToken,
} from "../server/spotify";
import { getLastCommitFromEvents, getGitHubEvents } from "../server/github";
import type { Stats } from "./Home";

function getFulfilled<T>(p: PromiseSettledResult<T>): T | undefined {
  return p.status === "fulfilled" ? p.value : undefined;
}

async function getMostRecentlyPlayedTrack(
  token: string
): Promise<SpotifyPlayableItem | undefined> {
  return getRecentlyPlayedTracks(token, 1).then(
    (res) => res?.items.find(Boolean)?.track
  );
}

async function getSpotifyStats(): Promise<Stats["spotify"]> {
  const spotifyAccessToken = await getSpotifyAccessToken();

  if (spotifyAccessToken === undefined) {
    return {};
  }

  const [currentlyPlayingTrack, mostRecentlyPlayedTrack] =
    await Promise.allSettled([
      getCurrentlyPlayingTrack(spotifyAccessToken),
      getMostRecentlyPlayedTrack(spotifyAccessToken),
    ]).then(
      ([currentlyPlayingTrack, mostRecentlyPlayedTrack]) =>
        [
          getFulfilled(currentlyPlayingTrack),
          getFulfilled(mostRecentlyPlayedTrack),
        ] as const
    );

  return {
    isCurrentlyPlaying:
      (currentlyPlayingTrack?.is_playing &&
        currentlyPlayingTrack?.currently_playing_type === "track") ||
      false,
    lastPlayedTrack: currentlyPlayingTrack?.item || mostRecentlyPlayedTrack,
  };
}

async function getGithubStats(): Promise<Stats["github"]> {
  const events = await getGitHubEvents();
  const lastCommit = getLastCommitFromEvents(events || []);

  return {
    lastCommit,
  };
}

async function getStats(): Promise<Stats> {
  return {
    spotify: await getSpotifyStats(),
    github: await getGithubStats(),
  };
}

export default async function Page() {
  const stats = await getStats();

  return <Home stats={stats} />;
}
