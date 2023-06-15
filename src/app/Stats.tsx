"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import useInterval from "../hooks/useInterval";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { CodeIcon, DeviceSpeakerIcon, MapPinIcon } from "../components/Icons";
import { RobotoMono300 } from "../components/Fonts";
import cn from "classnames";
import { useQuery } from "@tanstack/react-query";
import { Stats } from "./api/stats";

dayjs.extend(relativeTime);

function useRandomTransition(
  finalString?: string,
  limit = 50,
  tick = 15,
  delay = 500
): [string, boolean] {
  const letters = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
  const [started, setStarted] = useState(false);
  const [randomString, setRandomString] = useState("");
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [pointer, setPointer] = useState(0);

  const makeRandomString = (length: number): string =>
    Array(length)
      .fill("0")
      .map(() => letters[Math.floor(Math.random() * letters.length)])
      .join("");

  useInterval(
    () => {
      setStarted(true);
    },
    started ? null : delay
  );

  useInterval(
    () => {
      if (finalString === undefined) {
        setRandomString((randomString) =>
          makeRandomString(Math.min(randomString.length + 1, limit))
        );
        return;
      }

      if (randomString === finalString) {
        setHasTransitioned(true);
        setStarted(false);
        return;
      }

      setRandomString((randomString) =>
        finalString.slice(0, pointer).concat(
          makeRandomString(
            Math.max(
              0,
              (() => {
                if (randomString.length < finalString.length) {
                  return randomString.length - pointer + 1;
                } else if (randomString.length > finalString.length) {
                  return randomString.length - pointer - 1;
                } else {
                  return randomString.length - pointer;
                }
              })()
            )
          )
        )
      );

      setPointer((pointer) => pointer + 1);
    },
    started && !hasTransitioned ? tick : null
  );

  return [randomString, hasTransitioned];
}

function SpotifyCurrentlyListeningStat({
  isCurrentlyPlaying,
  lastPlayedTrack,
  className,
}: {
  isCurrentlyPlaying?: boolean;
  lastPlayedTrack?: SpotifyPlayableItem;
  className?: string;
}) {
  const getHrefFromUri = (uri: string): string | undefined => {
    const result = z
      .tuple([z.string(), z.string(), z.string()])
      .safeParse(uri.split(":"));

    if (!result.success) {
      return;
    }

    const [, type, id] = result.data;
    return `https://open.spotify.com/${type}/${id}`;
  };

  const components = (() => {
    if (isCurrentlyPlaying === undefined || lastPlayedTrack === undefined) {
      return;
    }

    const lastPlayedTrackHref = getHrefFromUri(lastPlayedTrack.uri);
    if (lastPlayedTrackHref === undefined) {
      return;
    }

    const artists = lastPlayedTrack.artists.flatMap((artist) => {
      const href = getHrefFromUri(artist.uri);

      if (href === undefined) {
        return [];
      }

      return [
        {
          name: artist.name,
          href,
        },
      ];
    });

    return {
      preamble: isCurrentlyPlaying ? "Listening to" : "Last listened to",
      lastPlayedTrackHref,
      lastPlayedTrackName: lastPlayedTrack.name,
      lastPlayedTrackArtists: artists,
    };
  })();

  const data = (() => {
    if (components === undefined) {
      return;
    }

    const artistNames = components.lastPlayedTrackArtists
      .map(({ name }) => name)
      .join(", ");

    return `${components.preamble} ${components.lastPlayedTrackName} by ${artistNames}`;
  })();

  const [fallback, hasTransitioned] = useRandomTransition(data, 44);

  if (components === undefined || !hasTransitioned) {
    return <div>{fallback}</div>;
  }

  return (
    <div className={className}>
      {components.preamble}{" "}
      <Link
        href={components.lastPlayedTrackHref}
        className="hover:underline dark:hover:text-white"
      >
        {components.lastPlayedTrackName}
      </Link>{" "}
      by{" "}
      {components.lastPlayedTrackArtists.map(({ name, href }, i) => [
        i > 0 ? ", " : null,
        <Link
          key={`artist-${name}`}
          href={href}
          className="hover:underline dark:hover:text-white"
        >
          {name}
        </Link>,
      ])}
    </div>
  );
}

function GitLastCommitStat({ lastCommit }: { lastCommit?: CommitEvent }) {
  const components = (() => {
    if (lastCommit === undefined) {
      return;
    }

    const [org, repo] = lastCommit.repo.split("/");

    if (org === undefined || repo === undefined) {
      return undefined;
    }

    return {
      href: lastCommit.href,
      sha: lastCommit.sha.substring(0, 7),
      org,
      repo,
      createdAt: dayjs(lastCommit.createdAt).fromNow(),
    };
  })();

  const data = (() => {
    if (components === undefined) {
      return;
    }
    return `Pushed ${components.sha} to ${components.repo} ${components.createdAt}`;
  })();

  const [fallback, hasTransitioned] = useRandomTransition(data, 44);

  if (components === undefined || !hasTransitioned) {
    return <div>{fallback}</div>;
  }

  return (
    <div>
      Pushed{" "}
      <Link
        href={components.href}
        className="hover:underline dark:hover:text-white"
      >
        {components.sha}
      </Link>{" "}
      to{" "}
      <Link
        href={`https://github.com/${components.org}/${components.repo}`}
        className="hover:underline dark:hover:text-white"
      >
        {components.repo}
      </Link>{" "}
      {components.createdAt}
    </div>
  );
}

export default function StatsComponent({ className }: { className?: string }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["stats"],
    queryFn: async () =>
      await fetch("/api/stats")
        .then((res) => res.json())
        .then((res) => Stats.parse(res)),
  });

  return (
    <div className={cn(RobotoMono300.className, className)}>
      {/* The breakpoint-based height here is used to avoid vertical layout
          shift on smaller screens where stats span multiple lines. In such 
          cases, text that loads in will may cause layout shift as they appear
          otherwise. This is not robust against stats that span more than two
          lines, and this will cause stats to remain spaced as if they contained
          two lines on small screens even if they only span one. */}
      <div className="flex h-8 max-w-2xl flex-row gap-2 xs:h-full">
        <MapPinIcon className="inline h-4 w-4 flex-shrink-0 sm:m-[0.125rem]" />
        Open to remote or near Dallas–Fort Worth, TX
      </div>
      <div className="mt-1 flex h-8 max-w-2xl flex-row gap-2 xs:h-full">
        <DeviceSpeakerIcon className="inline h-4 w-4 flex-shrink-0 sm:m-[0.125rem]" />
        <SpotifyCurrentlyListeningStat
          isCurrentlyPlaying={data?.spotify.isCurrentlyPlaying}
          lastPlayedTrack={data?.spotify.lastPlayedTrack}
        />
      </div>
      {/* TODO: Derive this via a static prop with ~1 hour invalidation to avoid rate limits. */}
      <div className="mt-1 flex h-8 max-w-2xl flex-row gap-2 xs:h-full">
        <CodeIcon className="inline h-4 w-4 flex-shrink-0 sm:m-[0.125rem]" />
        <GitLastCommitStat lastCommit={data?.github.lastCommit} />
      </div>
    </div>
  );
}
