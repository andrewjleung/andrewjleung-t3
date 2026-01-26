"use client";

import { Code, MapPin, SpeakerHifi } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Roboto_Mono } from "next/font/google";
import Link from "next/link";
import { z } from "zod";
import type { getLastCommitFromEvents } from "~/server/api/routers/github";
import type { GetCurrentTrackResponse } from "~/server/api/routers/spotify";
import { api } from "../../trpc/react";
import { useRandomTransitionWithTimeout } from "../_hooks/use-random-transition";

const robotoMono300 = Roboto_Mono({ weight: "300", subsets: ["latin"] });

dayjs.extend(relativeTime);

function SpotifyCurrentlyListeningStat({
  currentTrackResponse,
  className,
}: {
  currentTrackResponse?: GetCurrentTrackResponse;
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
    if (currentTrackResponse === undefined) {
      return;
    }

    if (currentTrackResponse.status === "failure") {
      return;
    }

    const trackHref = getHrefFromUri(currentTrackResponse.track.uri);
    if (trackHref === undefined) {
      return;
    }

    const artists = currentTrackResponse.track.artists.flatMap((artist) => {
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
      preamble: currentTrackResponse.isCurrentlyPlaying
        ? "Listening to"
        : "Last listened to",
      trackHref,
      trackName: currentTrackResponse.track.name,
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

    return `${components.preamble} ${components.trackName} by ${artistNames}`;
  })();

  const [fallback, hasTransitioned] = useRandomTransitionWithTimeout(
    "Failed to fetch Spotify data...",
    data,
    44,
  );

  if (components === undefined || !hasTransitioned) {
    return <div className="overflow-hidden whitespace-nowrap [text-overflow:'']">{fallback}</div>;
  }

  return (
    <div className={clsx("line-clamp-3", className)}>
      {components.preamble}{" "}
      <Link
        href={components.trackHref}
        className="hover:underline dark:hover:text-white"
      >
        {components.trackName}
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

function GitLastCommitStat({
  lastCommit,
}: {
  lastCommit: ReturnType<typeof getLastCommitFromEvents>;
}) {
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
      createdAt: lastCommit.createdAt,
    };
  })();

  const data = (() => {
    if (components === undefined) {
      return;
    }
    return `Pushed ${components.sha} to ${components.repo} ${dayjs(components.createdAt).fromNow()}`;
  })();

  const [fallback, hasTransitioned] = useRandomTransitionWithTimeout(
    "Failed to fetch GitHub data...",
    data,
    44,
  );

  if (components === undefined || !hasTransitioned) {
    return <div className="overflow-hidden whitespace-nowrap [text-overflow:'']">{fallback}</div>;
  }

  return (
    <div className="line-clamp-2">
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
      <span title={dayjs(components.createdAt).toString()}>
        {dayjs(components.createdAt).fromNow()}
      </span>
    </div>
  );
}

function LocationAndWeatherStat({ weather }: { weather?: string }) {
  const [fallback, hasTransitioned] = useRandomTransitionWithTimeout(
    "Based in Fort Worth, TX",
    weather ? `Based in ${weather} Fort Worth, TX` : undefined,
    44,
  );

  if (weather === undefined || !hasTransitioned) {
    return <div className="overflow-hidden whitespace-nowrap [text-overflow:'']">{fallback}</div>;
  }

  return <div className="line-clamp-2">Based in {weather} Fort Worth, TX</div>;
}

export function Stats({ className }: { className?: string }) {
  const { data: spotifyData } = api.spotify.getCurrentTrack.useQuery();
  const { data: githubData } = api.github.getLastCommit.useQuery();
  const { data: weather } = api.weather.getCurrentWeather.useQuery();

  return (
    <div className={clsx(robotoMono300.className, className)}>
      <div className="flex max-w-2xl flex-row gap-2 h-full">
        <div className="xs:h-6 h-5 flex items-center justify-center">
          <MapPin className="h-4 w-4" />
        </div>
        <LocationAndWeatherStat weather={weather} />
      </div>
      <div className="mt-1 flex max-w-2xl flex-row gap-2 h-full">
        <div className="xs:h-6 h-5 flex items-center justify-center">
          <SpeakerHifi className="h-4 w-4" />
        </div>
        <SpotifyCurrentlyListeningStat currentTrackResponse={spotifyData} />
      </div>
      <div className="mt-1 flex max-w-2xl flex-row gap-2 h-full">
        <div className="xs:h-6 h-5 flex items-center justify-center">
          <Code className="h-4 w-4" />
        </div>
        <GitLastCommitStat lastCommit={githubData} />
      </div>
    </div>
  );
}
