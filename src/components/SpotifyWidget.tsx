import type { SpotifyPlayableItem } from "../server/spotify";

export default function SpotifyWidget({
  topTracks,
  isCurrentlyPlaying,
  lastPlayedTrack,
  className,
}: {
  topTracks?: SpotifyPlayableItem[];
  isCurrentlyPlaying?: boolean;
  lastPlayedTrack?: SpotifyPlayableItem;
  className?: string;
}) {
  if (isCurrentlyPlaying === undefined || lastPlayedTrack === undefined) {
    return <div className={className}>Loading</div>;
  }

  // if (playbackState.status === 204) {
  //   return (
  //     <div className={className}>Recently played {lastPlayedTrack.name}</div>
  //   );
  // }

  // if (playbackState.status === 200) {
  return (
    <div className={className}>
      {isCurrentlyPlaying
        ? `Playing ${lastPlayedTrack.name} by ${
            lastPlayedTrack.artists.find(Boolean)?.name || "Unknown Artist"
          }`
        : `Last played ${lastPlayedTrack.name}`}
    </div>
  );
  // }

  return null;
}
