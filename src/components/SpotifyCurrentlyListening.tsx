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
  // const image = lastPlayedTrack.album.images.find(Boolean)?.url;

  return (
    <div className={cn("flex flex-row items-center", className)}>
      <div>
        {isCurrentlyPlaying ? (
          <span className="flex flex-row items-center">
            Listening to{" "}
            <Link
              href={href}
              className="hover:underline dark:hover:text-neutral-300"
            >
              {lastPlayedTrack.name} by {artistNames}
            </Link>
          </span>
        ) : (
          <span>
            Last listened to{" "}
            <Link
              href={href}
              className="hover:underline dark:hover:text-neutral-300"
            >
              {lastPlayedTrack.name} by {artistNames}
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}
