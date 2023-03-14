import { getGitHubEvents, getLastCommitFromEvents } from "../../github";
import {
  getCurrentlyPlayingTrack,
  getRecentlyPlayedTracks,
  getSpotifyAccessToken,
  getTopTracks,
} from "../../spotify";
import { createTRPCRouter, publicProcedure } from "../trpc";

const getFulfilled = <T>(p: PromiseSettledResult<T>): T | undefined =>
  p.status === "fulfilled" ? p.value : undefined;

export const homeRouter = createTRPCRouter({
  stats: publicProcedure.query(async () => {
    const accessToken = await getSpotifyAccessToken();

    if (accessToken === undefined) {
      return {
        props: {
          isCurrentlyPlaying: false,
        },
      };
    }

    const { topTracks, currentlyPlayingItem, lastPlayedTrack, githubEvents } =
      await Promise.allSettled([
        getTopTracks(accessToken),
        getCurrentlyPlayingTrack(accessToken),
        getRecentlyPlayedTracks(accessToken, 1).then(
          (res) => res?.items.find(Boolean)?.track
        ),
        getGitHubEvents(),
      ]).then(
        ([topTracks, currentlyPlayingItem, lastPlayedTrack, githubEvents]) => {
          return {
            topTracks: getFulfilled(topTracks),
            currentlyPlayingItem: getFulfilled(currentlyPlayingItem),
            lastPlayedTrack: getFulfilled(lastPlayedTrack),
            githubEvents: getFulfilled(githubEvents),
          };
        }
      );

    const lastCommit = getLastCommitFromEvents(githubEvents || []);

    return {
      topTracks: topTracks,
      isCurrentlyPlaying: currentlyPlayingItem?.is_playing || false,
      lastPlayedTrack: currentlyPlayingItem?.item || lastPlayedTrack,
      lastCommit,
    };
  }),
});
