import type { SpotifyPlayableItem } from "../server/spotify";
import cn from "classnames";
import { DeviceSpeakerIcon } from "./Icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function Track({
  track,
  className,
}: {
  track: SpotifyPlayableItem;
  className?: string;
}) {
  const [, type, id] = track.uri.split(":");
  const href = `https://open.spotify.com/${type as string}/${id as string}`;
  const image = track.album.images.find(Boolean)?.url;

  return (
    <Link href={href} className={className}>
      <div className="relative h-36 w-36">
        {image && (
          <Image
            alt="Currently listening cover art"
            src={image}
            className="object-cover"
            fill
          />
        )}
      </div>
    </Link>
  );
}

function TrackAndArtist({ track, artist }: { track: string; artist: string }) {
  return (
    <span>
      <span>{track}</span> by <span>{artist}</span>
    </span>
  );
}

export default function SpotifyWidget({
  topTracks,
  // recentlyPlayedTracks,
  isCurrentlyPlaying,
  lastPlayedTrack,
  className,
}: {
  topTracks: SpotifyPlayableItem[] | null;
  // recentlyPlayedTracks: SpotifyPlayableItem[] | null;
  isCurrentlyPlaying?: boolean;
  lastPlayedTrack: SpotifyPlayableItem | null;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  if (isCurrentlyPlaying === null || lastPlayedTrack === null) {
    return null;
  }

  const artistNames =
    lastPlayedTrack.artists.length < 1
      ? "Unknown Artist"
      : lastPlayedTrack.artists.map((artist) => artist.name).join(", ");

  const [, type, id] = lastPlayedTrack.uri.split(":");
  const href = `https://open.spotify.com/${type as string}/${id as string}`;
  const image = lastPlayedTrack.album.images.find(Boolean)?.url;

  return (
    <div
      className={cn(
        "flex flex-row items-center motion-safe:animate-fade-up-4",
        className
      )}
    >
      {/* <button
        onClick={() => {
          setVisible((visible) => !visible);
        }}
        className="w-fit rounded-full border-1 px-2 py-1"
      >
        Show music
      </button> */}
      <Link href={href} className="peer relative mr-6 h-20 w-20">
        {image && (
          <Image
            alt="Currently listening cover art"
            src={image}
            className={cn("object-cover", {
              "brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0":
                !isCurrentlyPlaying,
            })}
            fill
          />
        )}
      </Link>
      <div
        className={cn(
          "invisible text-sm opacity-0 transition-all duration-300 peer-hover:visible peer-hover:opacity-100",
          {
            "text-neutral-400 dark:text-neutral-600": !isCurrentlyPlaying,
            "text-black dark:text-white": isCurrentlyPlaying,
          }
        )}
      >
        {isCurrentlyPlaying ? (
          <span className="flex flex-row items-center">
            <DeviceSpeakerIcon className="mr-1 h-4 w-4" />
            <TrackAndArtist track={lastPlayedTrack.name} artist={artistNames} />
          </span>
        ) : (
          <span>
            Last listened to{" "}
            <TrackAndArtist track={lastPlayedTrack.name} artist={artistNames} />
          </span>
        )}
      </div>
      {/* <div className="flex w-screen flex-row gap-2 overflow-x-scroll py-3">
            {recentlyPlayedTracks?.map((track, i) => (
              <Track
                key={`${track.uri}-${i}`}
                track={track}
                className="outline-blue-500 brightness-50 transition-all duration-200 hover:outline hover:outline-4 hover:brightness-100"
              />
            ))}
          </div> */}
    </div>
  );
}
