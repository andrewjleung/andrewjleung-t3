import Container from "../components/Container";
import { Inter } from "@next/font/google";
import cn from "classnames";
import Balancer from "react-wrap-balancer";
import useInterval from "../hooks/useInterval";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import useIntersection from "../hooks/useIntersection";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { SpotifyPlayableItem } from "../server/spotify";
import { getCurrentlyPlayingTrack } from "../server/spotify";
import {
  getAccessToken,
  getTopTracks,
  getRecentlyPlayedTracks,
} from "../server/spotify";
import SpotifyCurrentlyListening from "../components/SpotifyCurrentlyListening";
import { CodeIcon, DeviceSpeakerIcon } from "../components/Icons";
import { getLastCommitFromEvents } from "../server/github";
import { getGitHubEvents } from "../server/github";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const inter700 = Inter({ weight: "700", subsets: ["latin"] });
const inter800 = Inter({ weight: "800", subsets: ["latin"] });

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
    company: "Sandbox @ NEU",
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

function HandStopIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5"></path>
      <path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5"></path>
      <path d="M14 5.5a1.5 1.5 0 0 1 3 0v6.5"></path>
      <path d="M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"></path>
    </svg>
  );
}

function BooksIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
      <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
      <path d="M5 8h4"></path>
      <path d="M9 16h4"></path>
      <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z"></path>
      <path d="M14 9l4 -1"></path>
      <path d="M16 16l3.923 -.98"></path>
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <rect x="3" y="7" width="18" height="13" rx="2"></rect>
      <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="12" y1="12" x2="12" y2="12.01"></line>
      <path d="M3 13a20 20 0 0 0 18 0"></path>
    </svg>
  );
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
      <line x1="12" y1="12" x2="20" y2="7.5"></line>
      <line x1="12" y1="12" x2="12" y2="21"></line>
      <line x1="12" y1="12" x2="4" y2="7.5"></line>
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
      <polyline points="3 7 12 13 21 7"></polyline>
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="12" cy="11" r="3"></circle>
      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <rect x="4" y="4" width="16" height="16" rx="2"></rect>
      <line x1="8" y1="11" x2="8" y2="16"></line>
      <line x1="8" y1="8" x2="8" y2="8.01"></line>
      <line x1="12" y1="16" x2="12" y2="11"></line>
      <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
    </svg>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527"></path>
      <path d="M9 15c1.5 -1 4 -1 5 .5"></path>
      <path d="M7 9c2 -1 6 -2 10 .5"></path>
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <rect x="3" y="5" width="18" height="14" rx="4"></rect>
      <path d="M10 9l5 3l-5 3z"></path>
    </svg>
  );
}

function RightChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 6l6 6l-6 6"></path>
    </svg>
  );
}

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

function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div id={id} className={cn("bg-transparent", className)}>
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
        <div className="ml-1 h-10 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent to-black dark:from-black dark:to-neutral-800" />
        {children}
        <div className="ml-1 h-10 w-0.5 -translate-x-1/2 bg-gradient-to-t from-transparent to-black dark:from-black dark:to-neutral-800" />
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
        <div className="absolute top-1/2 z-10 h-2 w-2 scale-110 rounded-full bg-black transition-all duration-200 dark:bg-neutral-800 dark:group-hover:bg-neutral-400" />
        <div className="ml-1 h-full w-0.5 -translate-x-1/2 bg-black dark:bg-neutral-800" />
      </div>
      <div
        className={cn(
          "relative my-4 flex w-full flex-row items-center gap-4 rounded-xl border-1 border-black bg-gradient-to-br p-4 transition-transform duration-200 group-hover:translate-x-2 group-hover:duration-300 dark:border-neutral-800 dark:from-black dark:via-neutral-900/40 dark:to-neutral-900/75 md:my-6 md:gap-6 md:p-6",
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
              className={cn(inter800.className, "text-xl md:text-2xl")}
              href={link}
            >
              {company}
            </Link>
            <span className="mb-2 text-xs text-black dark:text-neutral-400 md:mb-0">
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
      </div>
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
    <div
      className={cn(
        className,
        projectClassName,
        "rounded-xl border-1 border-black bg-gradient-to-br p-6 dark:border-neutral-800 dark:from-black dark:via-neutral-900/40 dark:to-neutral-900/75"
      )}
    >
      <div className={cn(inter700.className, "text-2xl sm:text-4xl")}>
        {title}
      </div>
      <Balancer className="mt-6" ratio={0.5}>
        {description}
      </Balancer>
    </div>
  );
}

export default function Home({
  topTracks,
  isCurrentlyPlaying,
  lastPlayedTrack,
  lastCommit,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { viewed: experienceSectionViewed } = useIntersection(
    "experience-section",
    { threshold: 0.3 }
  );

  const { viewed: projectsSectionViewed } = useIntersection(
    "projects-section",
    { threshold: 0.75 }
  );

  return (
    <Container id="container">
      <div className="invisible absolute top-[50vh] left-[50vw] -z-10 h-5/6 w-full -translate-x-1/2 -translate-y-1/2 rotate-45 skew-y-6 rounded-full bg-transparent bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-400 via-neutral-900 to-neutral-900 opacity-10 blur-2xl motion-safe:animate-light-up dark:visible" />
      {/* <SectionNav>
        <SectionNavItem
          id="top-section"
          title="Top"
          icon={<HandStopIcon className="h-4 w-4 rotate-12" />}
        />
        <SectionNavItem
          id="experience-section"
          title="Experience"
          icon={<BriefcaseIcon className="h-4 w-4" />}
        />
        <SectionNavItem
          id="projects-section"
          title="Projects"
          icon={<LightbulbIcon className="h-4 w-4" />}
        />
        <SectionNavItem
          id="contact-section"
          title="Contact"
          icon={<EmailIcon className="h-4 w-4" />}
        />
      </SectionNav> */}
      <Section id="top-section" className="h-screen w-screen">
        <Layout className="relative flex h-full w-full items-center justify-center overflow-hidden px-6">
          <div className="relative flex flex-col">
            <div
              className={cn(
                inter700.className,
                "relative whitespace-nowrap text-5xl motion-safe:animate-fade-up-0 md:text-6xl"
              )}
            >
              Andrew Leung
            </div>
            <Balancer
              ratio={1}
              as="div"
              className="mt-6 text-lg text-black motion-safe:animate-fade-up-1 dark:text-neutral-300 md:text-xl"
            >
              Software engineer seeking full-time, full-stack opportunities.
              Looking to improve the lives of developers and users alike.
            </Balancer>
            <div className="mt-6 text-xs text-black motion-safe:animate-fade-up-2 dark:text-neutral-400 sm:text-sm">
              <div className="flex flex-row items-center gap-2">
                <MapPinIcon className="inline h-4 w-4" />
                Open to remote or near Dallas–Fort Worth, TX
              </div>
              {lastPlayedTrack && (
                <div className="mt-1 flex flex-row items-center gap-2">
                  <DeviceSpeakerIcon className="inline h-4 w-4" />
                  <SpotifyCurrentlyListening
                    topTracks={topTracks}
                    isCurrentlyPlaying={isCurrentlyPlaying}
                    lastPlayedTrack={lastPlayedTrack}
                  />
                </div>
              )}
              {lastCommit && (
                <div className="mt-1 flex flex-row items-center gap-2">
                  <CodeIcon className="inline h-4 w-4" />
                  <div>
                    Pushed{" "}
                    <Link
                      href={lastCommit.href}
                      className="hover:underline dark:hover:text-white"
                    >
                      {lastCommit.sha.substring(0, 7)}
                    </Link>{" "}
                    to{" "}
                    <Link
                      href={`https://github.com/${lastCommit.repo}`}
                      className="hover:underline dark:hover:text-white"
                    >
                      {lastCommit.repo}
                    </Link>{" "}
                    {dayjs(lastCommit.createdAt).fromNow()}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 flex flex-row items-center gap-3 text-sm text-black dark:text-neutral-400">
              <IconLink
                href="https://github.com/andrewjleung"
                Icon={GitHubIcon}
                className="motion-safe:animate-fade-up-2"
              />
              <IconLink
                href="https://www.linkedin.com/in/andrewjleung-"
                Icon={LinkedInIcon}
                className="motion-safe:animate-fade-up-3"
              />
              <IconLink
                href="https://open.spotify.com/artist/00zDjeTQDVOFlNttOnv9bc"
                Icon={SpotifyIcon}
                className="motion-safe:animate-fade-up-4"
              />
              <IconLink
                href="https://www.youtube.com/channel/UCVxaN-2GATE-3Ag9RTGrIXw"
                Icon={YouTubeIcon}
                className="motion-safe:animate-fade-up-5"
              />
              <Link
                href="/resume"
                className="ml-2 flex w-fit flex-row items-center gap-1 rounded-full border-1 border-black px-4 py-2 transition-all duration-200 hover:bg-black hover:text-white motion-safe:animate-fade-up-6 motion-safe:animate-fade-up-5 dark:border-neutral-400 dark:hover:border-white dark:hover:bg-transparent dark:hover:text-white"
              >
                <span className="whitespace-nowrap text-sm">My resume</span>
                <RightChevronIcon className="h-4 w-4" />
              </Link>
            </div>
            {/* <div className="relative h-40 w-40 rounded-xl">
              <Image
                className="rounded-xl object-cover"
                src="/profile.png"
                alt="Me!"
                fill
              />
            </div> */}
          </div>
        </Layout>
      </Section>
      <Section id="experience-section">
        <Layout className="flex flex-col items-center px-6 sm:px-24">
          <div className="w-full">
            <div
              className={cn(inter700.className, "my-8 text-4xl sm:text-5xl")}
            >
              Experience
            </div>
            <Experiences className="my-8">
              {EXPERIENCES.map((experience) => (
                <Experience
                  key={`experience-${experience.company}-${experience.title}`}
                  experience={experience}
                  className={cn({
                    invisible: !experienceSectionViewed,
                    [experience.animation]: experienceSectionViewed,
                  })}
                />
              ))}
            </Experiences>
          </div>
        </Layout>
      </Section>
      <Section id="projects-section" className="flex justify-center">
        <Layout className="flex flex-col items-center px-6 sm:px-24">
          <div className="w-full">
            <div
              className={cn(inter700.className, "my-8 text-4xl sm:text-5xl")}
            >
              Projects
            </div>
            <Projects className="my-8 max-w-3xl">
              {PROJECTS.map((project) => (
                <Project
                  key={`project-${project.title}`}
                  project={project}
                  className={cn({
                    invisible: !projectsSectionViewed,
                    [project.animation]: projectsSectionViewed,
                  })}
                />
              ))}
            </Projects>
          </div>
        </Layout>
      </Section>
      <Section id="contact-section" className="flex flex-col justify-center">
        What&apos;s next? Contact me!
      </Section>
    </Container>
  );
}

type GetServerSidePropsData = {
  topTracks: SpotifyPlayableItem[] | null;
  isCurrentlyPlaying: boolean;
  lastPlayedTrack: SpotifyPlayableItem | null;
  lastCommit: ReturnType<typeof getLastCommitFromEvents> | null;
};

const getFulfilled = <T,>(p: PromiseSettledResult<T>): T | undefined =>
  p.status === "fulfilled" ? p.value : undefined;

export const getServerSideProps: GetServerSideProps<
  GetServerSidePropsData
> = async () => {
  const accessToken = await getAccessToken();

  if (accessToken === undefined) {
    return {
      props: {
        topTracks: null,
        isCurrentlyPlaying: false,
        lastPlayedTrack: null,
        lastCommit: null,
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
    props: {
      topTracks: topTracks || null,
      isCurrentlyPlaying: currentlyPlayingItem?.is_playing || false,
      lastPlayedTrack: currentlyPlayingItem?.item || lastPlayedTrack || null,
      lastCommit: lastCommit || null,
    },
  };
};
