import type { SpotifyPlayableItem } from "../server/spotify";
import Link from "next/link";

export default function SpotifyCurrentlyListening({
  topTracks,
  isCurrentlyPlaying,
  lastPlayedTrack,
  className,
}: {
  topTracks: SpotifyPlayableItem[] | null;
  isCurrentlyPlaying?: boolean;
  lastPlayedTrack: SpotifyPlayableItem | null;
  className?: string;
}) {
  if (isCurrentlyPlaying === null || lastPlayedTrack === null) {
    return null;
  }

  const artistNames =
    lastPlayedTrack.artists.length < 1
      ? "Unknown Artist"
      : lastPlayedTrack.artists.map((artist) => artist.name).join(", ");

  const [, type, id] = lastPlayedTrack.uri.split(":");
  const href = `https://open.spotify.com/${type as string}/${id as string}`;

  const preamble = isCurrentlyPlaying ? "Listening to" : "Last listened to";

  return (
    <div className={className}>
      {preamble}{" "}
      <Link href={href} className="hover:underline dark:hover:text-neutral-300">
        {lastPlayedTrack.name} by {artistNames}
      </Link>
    </div>
  );
}
