"use client";

import clsx from "clsx";
import { CodeIcon, DeviceSpeakerIcon, MapPinIcon } from "../_components/icons";
import { z } from "zod";
import Link from "next/link";
import { useRandomTransition } from "../_hooks/use-random-transition";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { api } from "../../trpc/react";
import { Roboto_Mono } from "next/font/google";
import type {
  GetCurrentTrackResponse,
  SpotifyPlayableItem,
} from "~/server/api/routers/spotify";
import type { getLastCommitFromEvents } from "~/server/api/routers/github";

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

  const [fallback, hasTransitioned] = useRandomTransition(data, 44);

  if (components === undefined || !hasTransitioned) {
    return <div>{fallback}</div>;
  }

  return (
    <div className={clsx("line-clamp-2", className)}>
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
      {components.createdAt}
    </div>
  );
}

function LocationAndWeatherStat({ weather }: { weather?: string }) {
  const [fallback, hasTransitioned] = useRandomTransition(weather, 44);

  if (weather === undefined || !hasTransitioned) {
    return <div>{fallback}</div>;
  }

  return <div className="line-clamp-2">Based in {weather} Fort Worth, TX</div>;
}

export function Stats({ className }: { className?: string }) {
  const { data: spotifyData } = api.spotify.getCurrentTrack.useQuery();
  const { data: githubData } = api.github.getLastCommit.useQuery();
  const { data: weather } = api.weather.getCurrentWeather.useQuery();

  return (
    <div className={clsx(robotoMono300.className, className)}>
      {/* The breakpoint-based height here is used to avoid vertical layout
          shift on smaller screens where stats span multiple lines. In such 
          cases, text that loads in will may cause layout shift as they appear
          otherwise. This is not robust against stats that span more than two
          lines, and this will cause stats to remain spaced as if they contained
          two lines on small screens even if they only span one. */}
      <div className="flex h-8 max-w-2xl flex-row gap-2 xs:h-full">
        <MapPinIcon className="inline h-4 w-4 flex-shrink-0 sm:m-[0.125rem]" />
        <LocationAndWeatherStat weather={weather} />
      </div>
      <div className="mt-1 flex h-8 max-w-2xl flex-row gap-2 xs:h-full">
        <DeviceSpeakerIcon className="inline h-4 w-4 flex-shrink-0 sm:m-[0.125rem]" />
        <SpotifyCurrentlyListeningStat currentTrackResponse={spotifyData} />
      </div>
      {/* TODO: Derive this via a static prop with ~1 hour invalidation to avoid rate limits. */}
      <div className="mt-1 flex h-8 max-w-2xl flex-row gap-2 xs:h-full">
        <CodeIcon className="inline h-4 w-4 flex-shrink-0 sm:m-[0.125rem]" />
        <GitLastCommitStat lastCommit={githubData} />
      </div>
    </div>
  );
}
