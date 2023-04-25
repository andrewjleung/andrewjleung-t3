import Container from "../components/Container";
import { inter700, RobotoMono300 } from "../components/Fonts";
import cn from "classnames";
import Balancer from "react-wrap-balancer";
import useInterval from "../hooks/useInterval";
import React, { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import {
  CodeIcon,
  DeviceSpeakerIcon,
  GitHubIcon,
  LinkedInIcon,
  MapPinIcon,
  RightChevronIcon,
  SpotifyIcon,
  YouTubeIcon,
} from "../components/Icons";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { api } from "../utils/api";
import type { SpotifyPlayableItem } from "../server/spotify";
import type { getLastCommitFromEvents } from "../server/github";
import { z } from "zod";

dayjs.extend(relativeTime);

function IconLink({
  Icon,
  href,
  className,
}: {
  Icon: React.FC<{ className?: string }>;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row items-center gap-2 dark:hover:bg-transparent dark:hover:text-white",
        className
      )}
    >
      <Icon className="m-1 inline h-6 w-6" />
    </Link>
  );
}

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

function Stats({ className }: { className?: string }) {
  const { data } = api.home.stats.useQuery();

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
          isCurrentlyPlaying={data?.isCurrentlyPlaying}
          lastPlayedTrack={data?.lastPlayedTrack}
        />
      </div>
      {/* TODO: Derive this via a static prop with ~1 hour invalidation to avoid rate limits. */}
      <div className="mt-1 flex h-8 max-w-2xl flex-row gap-2 xs:h-full">
        <CodeIcon className="inline h-4 w-4 flex-shrink-0 sm:m-[0.125rem]" />
        <GitLastCommitStat lastCommit={data?.lastCommit} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute -z-10 h-screen w-screen overflow-hidden">
        <div className="invisible absolute top-[50vh] left-[50vw] -z-10 h-5/6 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 skew-y-6 rounded-full bg-transparent bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-400 via-neutral-900 to-neutral-900 opacity-20 blur-3xl motion-safe:animate-light-up dark:visible xl:w-5/6 " />
      </div>
      <Container
        id="container"
        className="flex grow items-center justify-center"
      >
        <Layout className="relative flex h-full w-full flex-col items-center justify-center px-6">
          <div className="relative">
            <div
              className={cn(
                inter700.className,
                "relative -my-3 h-full w-fit whitespace-nowrap bg-gradient-to-br from-black via-transparent to-transparent bg-400% bg-clip-text py-3  text-4xl leading-5 text-transparent motion-safe:animate-background-pan dark:from-white dark:via-black xs:text-5xl sm:-mb-2 sm:pb-2 sm:text-6xl"
              )}
            >
              Andrew Leung
            </div>
            {/* TODO: Cursed hack to avoid horizontal layout shifting with long, wrapping stat text.
                This more or less invisible div matches the pixel widths of the short bio below at 
                different breakpoints, ensuring that the stat component will never get wider than the
                width of the bio.
            */}
            <div className="w-[305px] xs:w-[453px] sm:w-[566px]"></div>
            <div className="motion-safe:animate-fade-up">
              <Balancer
                ratio={1}
                as="div"
                className="mt-6 w-0 min-w-full text-base text-black dark:text-neutral-300 sm:text-xl"
              >
                Software engineer seeking full-time, full-stack opportunities.
                Looking to improve the lives of developers and users alike.
              </Balancer>
              <Stats className="mt-6 w-0 min-w-full text-xs text-black dark:text-neutral-400 sm:text-sm" />
              <div className="mt-8 flex flex-row items-center gap-3 text-sm text-black dark:text-neutral-400">
                <IconLink
                  href="https://github.com/andrewjleung"
                  Icon={GitHubIcon}
                />
                <IconLink
                  href="https://www.linkedin.com/in/andrewjleung-"
                  Icon={LinkedInIcon}
                />
                <IconLink
                  href="https://open.spotify.com/artist/00zDjeTQDVOFlNttOnv9bc"
                  Icon={SpotifyIcon}
                />
                <IconLink
                  href="https://www.youtube.com/channel/UCVxaN-2GATE-3Ag9RTGrIXw"
                  Icon={YouTubeIcon}
                />
                <Link
                  href="https://raw.githubusercontent.com/andrewjleung/resumes/main/AndrewLeung_Resume.pdf"
                  className="ml-2 flex w-fit flex-row items-center gap-1 rounded-full border-1 border-black px-4 py-2 transition-all duration-200 hover:bg-black hover:text-white dark:border-neutral-400 dark:hover:border-white dark:hover:bg-transparent dark:hover:text-white"
                >
                  <span className="whitespace-nowrap text-sm">My resume</span>
                  <RightChevronIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </Container>
    </div>
  );
}
