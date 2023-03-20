import Container from "../components/Container";
import { inter700, inter800, RobotoMono300 } from "../components/Fonts";
import cn from "classnames";
import Balancer from "react-wrap-balancer";
import useInterval from "../hooks/useInterval";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import useIntersection from "../hooks/useIntersection";
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
import Card from "../components/Card";
import { api } from "../utils/api";
import type { SpotifyPlayableItem } from "../server/spotify";
import type { getLastCommitFromEvents } from "../server/github";
import { z } from "zod";

dayjs.extend(relativeTime);

type Experience = {
  startDate: Date;
  endDate: Date;
  company: string;
  title: string;
  description: string;
  image: string;
  link: string;
  animation: string; // TODO: Bad separation of concerns. Instead zip with an array of animation classes.
};

const EXPERIENCES: Experience[] = [
  {
    startDate: new Date("2021-01-01T00:00:00"),
    endDate: new Date("2021-08-01T00:00:00"),
    company: "Poloniex",
    title: "Software Engineer Co-op",
    description:
      "Developed internal web tools with TypeScript, React, and PHP. Led migration to a CMS and helped design and implement a permissions microservice.",
    image: "/poloniex.png",
    link: "https://www.poloniex.com/",
    animation: "motion-safe:animate-fade-up-0",
  },

  {
    startDate: new Date("2020-09-01T00:00:00"),
    endDate: new Date("2021-05-02"),
    company: "Sandbox @ NU",
    title: "Software Developer",
    description:
      "Implemented full-stack features for GraduateNU, a course-planning web app for students, using TypeScript, React, and Ruby on Rails.",
    image: "/sandboxnu.png",
    link: "https://www.sandboxnu.com/",
    animation: "motion-safe:animate-fade-up-1",
  },
  {
    startDate: new Date("2020-01-01T00:00:00"),
    endDate: new Date("2020-08-01T00:00:00"),
    company: "Teikametrics",
    title: "Software Engineer Co-op",
    description:
      "Picked up web development for the first time working on a TypeScript and React frontend and a functional Scala with Cats backend.",
    image: "/teikametrics.png",
    link: "https://www.teikametrics.com/",
    animation: "motion-safe:animate-fade-up-2",
  },
  {
    startDate: new Date("2019-01-01T00:00:00"),
    endDate: new Date("2019-07-01T00:00:00"),
    company: "Curriculum Associates",
    title: "Software Engineer Co-op",
    description:
      "Worked on QA, database migrations with Liquibase, and SQL query templates in Java.",
    image: "/curriculum-associates.jpg",
    link: "https://www.curriculumassociates.com/",
    animation: "motion-safe:animate-fade-up-3",
  },
];

type Project = {
  title: string;
  description: string;
  image: string;
  link?: string;
  github: string;
  animation: string;
  className?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Raudi",
    description:
      "Get random sounds for instant inspiration, made for audio creatives prone to overthinking. Built off of the Freesound API.",
    image: "/raudi.png",
    link: "https://raudi.xyz/",
    github: "https://github.com/andrewjleung/raudi",
    animation: "motion-safe:animate-fade-up-0",
    className: "col-span-1 md:col-span-2",
  },
  {
    title: "TND Reviews",
    description:
      "Generating/live-updating a dataset containing all of Anthony Fantano's scored music reviews using the YouTube Data API.",
    image: "/tnd-reviews.png",
    github: "https://github.com/andrewjleung/fantano-reviews",
    animation: "motion-safe:animate-fade-up-1",
    className: "col-span-1",
  },
];

function SectionNavItem({
  id,
  title,
  icon,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
}) {
  const { intersecting } = useIntersection(id, { threshold: 0.7 });

  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        const element = document.getElementById(id);
        if (element !== null) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <div
        className={cn(
          "flex flex-row items-center rounded-full p-1",
          intersecting
            ? "bg-black text-white dark:bg-transparent dark:text-white"
            : "text-black dark:text-neutral-500 dark:hover:text-neutral-400"
        )}
      >
        {icon}
      </div>
    </button>
  );
}

function SectionNav({ children }: { children: React.ReactNode }) {
  const [panelNavCanAnimate, setPanelNavCanAnimate] = useState(false);

  useInterval(() => {
    setPanelNavCanAnimate(true);
  }, 3000); // TODO: Magic number, make a single source of truth for this and the `stretch` animation.

  return (
    <div
      className={cn(
        "duration-400 fixed left-1/2 top-5 z-40 flex w-fit -translate-x-1/2 flex-row gap-4 rounded-full border-1 border-black bg-white py-2 px-4 transition-all ease-in dark:border-neutral-500 dark:bg-black sm:motion-safe:animate-stretch",
        { "hover:px-8": panelNavCanAnimate }
      )}
    >
      {children}
    </div>
  );
}

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

function Experiences({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div id="experiences" className={cn("relative", className)}>
      <div className="flex h-full w-fit flex-col">
        <div className="ml-1 h-10 w-[0.0625rem] -translate-x-1/2 bg-gradient-to-b from-transparent to-neutral-200 dark:from-black dark:to-neutral-800" />
        {children}
        <div className="ml-1 h-10 w-[0.0625rem] -translate-x-1/2 bg-gradient-to-t from-transparent to-neutral-200 dark:from-black dark:to-neutral-800" />
      </div>
    </div>
  );
}

function Experience({
  experience: { startDate, endDate, company, title, description, image, link },
  className,
}: {
  experience: Experience;
  className?: string;
}) {
  const [formattedStartDate, formattedEndDate] = [startDate, endDate].map(
    (date) =>
      date.toLocaleString("default", { month: "short", year: "numeric" })
  );

  return (
    <div className="group group flex flex-row items-stretch gap-6 sm:gap-8">
      <div className="relative">
        <div className="absolute top-1/2 z-10 h-2 w-2 scale-110 rounded-full bg-neutral-200 transition-all duration-200 group-hover:bg-black dark:bg-neutral-800 dark:group-hover:bg-neutral-400" />
        <div className="ml-1 h-full w-[0.0625rem] -translate-x-1/2 bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <Card
        className={cn(
          "relative my-4 flex w-full flex-row items-center gap-4 p-6 md:gap-6",
          className
        )}
      >
        <Link
          className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16"
          href={link}
        >
          <Image
            src={image}
            fill
            className="rounded-xl object-cover transition-all duration-300 ease-in-out dark:opacity-80 dark:brightness-75 dark:grayscale dark:group-hover:opacity-100 dark:group-hover:brightness-100 dark:group-hover:grayscale-0"
            alt={`${company} logo`}
          />
        </Link>
        <div className="shrink">
          <div className="flex flex-col-reverse justify-between md:flex-row">
            <Link
              className={cn(inter800.className, "w-fit text-xl md:text-2xl")}
              href={link}
            >
              {company}
            </Link>
            <span className="mb-2 text-xs text-black dark:text-neutral-400 md:mb-0 lg:text-sm">
              {formattedStartDate} - {formattedEndDate}
            </span>
          </div>
          <div className="text-base italic dark:text-neutral-200 md:text-lg">
            {title}
          </div>
          <div className="mt-2 text-xs dark:text-neutral-400 md:text-base">
            {description}
          </div>
        </div>
      </Card>
    </div>
  );
}

function Projects({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">{children}</div>
  );
}

function Project({
  project: {
    title,
    description,
    image,
    link,
    github,
    className: projectClassName,
  },
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Card className={cn("p-6", className, projectClassName)}>
      <div className={cn(inter700.className, "text-2xl sm:text-4xl")}>
        {title}
      </div>
      <Balancer className="mt-6" ratio={0.5}>
        {description}
      </Balancer>
    </Card>
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

      // if (randomString.length < finalString.length) {
      //   setRandomString((randomString) =>
      //     makeRandomString(randomString.length + 1)
      //   );
      //   return;
      // }

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
      <div className="flex max-w-2xl flex-row gap-2">
        <MapPinIcon className="inline h-4 w-4 flex-shrink-0 sm:m-[0.125rem]" />
        Open to remote or near Dallas–Fort Worth, TX
      </div>
      <div className="mt-1 flex max-w-2xl flex-row gap-2">
        <DeviceSpeakerIcon className="inline h-4 w-4 flex-shrink-0 sm:m-[0.125rem]" />
        <SpotifyCurrentlyListeningStat
          isCurrentlyPlaying={data?.isCurrentlyPlaying}
          lastPlayedTrack={data?.lastPlayedTrack}
        />
      </div>
      {/* TODO: Derive this via a static prop with ~1 hour invalidation to avoid rate limits. */}
      <div className="mt-1 flex max-w-2xl flex-row gap-2">
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
                "relative whitespace-nowrap text-4xl motion-safe:animate-fade-up-0 xs:text-5xl sm:text-6xl"
              )}
            >
              Andrew Leung
            </div>
            <Balancer
              ratio={1}
              as="div"
              className="mt-6 text-base text-black motion-safe:animate-fade-up-1 dark:text-neutral-300 sm:text-xl"
            >
              Software engineer seeking full-time, full-stack opportunities.
              Looking to improve the lives of developers and users alike.
            </Balancer>
            <Stats className="mt-6 w-0 min-w-full text-xs text-black motion-safe:animate-fade-up-2 dark:text-neutral-400 sm:text-sm" />
            <div className="mt-8 flex flex-row items-center gap-3 text-sm text-black motion-safe:animate-fade-up-2 dark:text-neutral-400">
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
        </Layout>
      </Container>
    </div>
  );
}
