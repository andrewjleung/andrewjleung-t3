import Container from "../components/Container";
import { Inter } from "@next/font/google";
import cn from "classnames";
import Balancer from "react-wrap-balancer";
import useInterval from "../hooks/useInterval";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";

const inter700 = Inter({ weight: "700", subsets: ["latin"] });
const inter800 = Inter({ weight: "800", subsets: ["latin"] });

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
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0.5, // TODO: Tune this.
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      });
    }, options);
    const target = document.getElementById(id);

    if (target !== null) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [id]);

  return (
    <div
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
          isIntersecting
            ? "bg-black text-white dark:bg-transparent dark:text-white"
            : "text-black dark:text-neutral-500 dark:hover:text-neutral-400"
        )}
      >
        {icon}
      </div>
    </div>
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
        "duration-400 fixed left-1/2 top-5 z-40 flex w-fit -translate-x-1/2 flex-row gap-4 rounded-full border-1 border-black py-2 px-4 transition-all ease-in dark:border-neutral-500 sm:motion-safe:animate-stretch",
        { "hover:px-8": panelNavCanAnimate }
      )}
    >
      {children}
    </div>
  );
}

function Section({
  id,
  top,
  bottom,
  children,
  className,
}: {
  id?: string;
  top?: boolean;
  bottom?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (top && bottom) {
    throw new Error("Cannot be top and bottom.");
  }

  const commonStyles = "bg-transparent";

  if (top) {
    return (
      <div id={id} className={cn(commonStyles, "h-screen", className)}>
        {children}
      </div>
    );
  }

  if (bottom) {
    return (
      <div
        id={id}
        className={cn(
          commonStyles,
          // "h-[calc(100vh-4rem)] pt-[4rem]",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div id={id} className={cn(commonStyles, className)}>
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
        <div className="h-2 w-2 scale-110 rounded-full bg-neutral-300 dark:bg-neutral-800" />
        <div className="ml-1 h-10 w-0.5 -translate-x-1/2 bg-neutral-300 dark:bg-neutral-800" />
        {children}
        <div className="ml-1 h-10 w-0.5 -translate-x-1/2 bg-neutral-300 dark:bg-neutral-800" />
        <div className="h-2 w-2 scale-110 rounded-full bg-neutral-300 dark:bg-neutral-800" />
      </div>
    </div>
  );
}

function Experience({ id }: { id: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0.8, // TODO: Tune this.
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, options);
    const target = document.getElementById(id);

    if (target !== null) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [id]);

  return (
    <div id={id} className="group flex flex-row items-stretch gap-6 sm:gap-8">
      <div className="relative">
        <div className="absolute top-1/2 z-10 h-2 w-2 scale-110 rounded-full bg-neutral-300 transition-all duration-200 group-hover:bg-indigo-400 dark:bg-neutral-800 dark:group-hover:bg-indigo-500" />
        <div className="ml-1 h-full w-0.5 -translate-x-1/2 bg-neutral-300 dark:bg-neutral-800" />
      </div>
      <div
        className={cn(
          "my-6 flex flex-row items-center gap-6 sm:my-8 sm:gap-8",
          {
            "motion-safe:animate-fade-up-0": isVisible,
            invisible: !isVisible,
          }
        )}
      >
        <div className="relative h-20 w-20 sm:h-24 sm:w-24">
          <div className="absolute h-full w-full rounded-lg bg-indigo-500 transition-all group-hover:blur-md group-hover:duration-200" />
          <Image
            src="/profile.png"
            fill
            className="rounded-lg object-cover"
            alt="Company"
          />
        </div>
        <div className="">
          <div className="text-xs text-neutral-500 sm:text-sm">
            Jan 2021 - Aug 2021
          </div>
          <div
            className={cn(
              inter800.className,
              "mt-2 from-indigo-500 to-pink-500 text-xl group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent group-hover:duration-200 dark:from-indigo-400 dark:to-pink-400 sm:text-2xl"
            )}
          >
            Company
          </div>
          <div className="text-base italic dark:text-neutral-200 sm:text-lg">
            Software Engineer
          </div>
          <Balancer
            as="div"
            className="mt-2 text-sm dark:text-neutral-400 sm:text-base"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Balancer>
        </div>
      </div>
    </div>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-52 w-72 rounded-xl border-1 border-black p-4 dark:border-neutral-700",
        className
      )}
    >
      {children}
    </div>
  );
}

export default function Home({}) {
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
      <Section id="top-section" top>
        <Layout className="px-6">
          <div className="relative flex h-full w-full items-center overflow-hidden sm:justify-center">
            <div className="relative flex flex-col sm:items-center sm:text-center">
              {/* <div className="relative h-40 w-40 rounded-xl">
              <Image
                className="rounded-xl object-cover"
                src="/profile.png"
                alt="Me!"
                fill
              />
            </div> */}
              <div className="pt-8">
                <div
                  className={cn(
                    inter700.className,
                    "text-5xl motion-safe:animate-fade-up-0 sm:text-6xl"
                  )}
                >
                  <span className="whitespace-nowrap">Andrew Leung</span>{" "}
                </div>
                <Balancer
                  ratio={1}
                  as="div"
                  className="mt-6 text-xl text-neutral-500 motion-safe:animate-fade-up-1 dark:text-neutral-400"
                >
                  Software engineer seeking full-time, full-stack opportunities.
                  Looking to improve the lives of developers and users alike.
                </Balancer>
                <div className="mt-2 flex flex-row items-center gap-2 whitespace-nowrap text-sm text-neutral-400 motion-safe:animate-fade-up-2 dark:text-neutral-500 sm:justify-center">
                  <MapPinIcon className="inline h-4 w-4" />
                  Remote or near Dallas–Fort Worth, TX
                </div>
                <div className="mt-8 flex flex-row items-center gap-3 text-sm text-black dark:text-neutral-500 sm:justify-center">
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
                    className="ml-2 flex w-fit flex-row items-center gap-1 rounded-full border-1 border-black px-4 py-2 transition-all duration-200 hover:bg-black hover:text-white motion-safe:animate-fade-up-6 motion-safe:animate-fade-up-5 dark:border-neutral-500 dark:hover:border-white dark:hover:bg-transparent dark:hover:text-white"
                  >
                    <span className="whitespace-nowrap text-sm">My resume</span>
                    <RightChevronIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </Section>
      <Section
        id="education-section"
        className="relative mb-16 flex flex-col items-center"
      >
        <Layout className="px-6">
          <div className="flex flex-col items-center text-center">
            <div className={cn(inter700.className, "my-8 text-4xl")}>
              Education
            </div>
            <div className="my-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Card className="group relative flex items-center justify-center overflow-clip">
                <div className="opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-30 dark:group-hover:opacity-70">
                  <div className="absolute left-0 bottom-0 h-16 w-16 -translate-x-1/2 translate-y-1/2 rounded-full border-1 border-black dark:border-neutral-700" />
                  <div className="absolute right-0 top-0 h-16 w-16 translate-x-1/2 -translate-y-1/2 rounded-full border-1 border-black dark:border-neutral-700" />
                  <div className="absolute left-0 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-1 border-black dark:border-neutral-700" />
                  <div className="absolute right-0 bottom-0 h-16 w-16 translate-x-1/2 translate-y-1/2 rounded-full border-1 border-black dark:border-neutral-700" />
                </div>
                <div className="flex flex-col items-center">
                  <span className={cn(inter700.className, "text-2xl")}>
                    Northeastern University
                  </span>{" "}
                  <span className="text-neutral-500">class of</span>
                  <div
                    className={cn(
                      inter700.className,
                      "w-fit bg-gradient-to-t from-rose-500 to-rose-300 bg-clip-text text-6xl text-transparent dark:from-rose-600 dark:to-rose-200"
                    )}
                  >
                    2022
                  </div>
                </div>
              </Card>
              <Card className="group relative flex flex-col items-center justify-center">
                <div className="opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-[0.25] dark:group-hover:opacity-100">
                  <div className="absolute inset-4 scale-110 border-1 border-black opacity-50 duration-500 group-hover:scale-100 dark:border-neutral-700" />
                  <div className="absolute inset-8 scale-110 border-1 border-black opacity-[0.45] duration-500 group-hover:scale-100 dark:border-neutral-700" />
                  <div className="absolute inset-12 scale-110 border-1 border-black opacity-40 duration-500 group-hover:scale-100 dark:border-neutral-700" />
                  <div className="absolute inset-16 scale-110 border-1 border-black opacity-[0.35] duration-500 group-hover:scale-100 dark:border-neutral-700" />
                  <div className="absolute inset-[5rem] scale-110 border-1 border-black opacity-30 duration-500 group-hover:scale-100 dark:border-neutral-700" />
                  <div className="absolute inset-[6rem] scale-110 border-1 border-black opacity-[0.25] duration-500 group-hover:scale-100 dark:border-neutral-700" />
                </div>
                <span className={cn(inter700.className, "relative text-2xl")}>
                  B.S. in
                </span>{" "}
                <span
                  className={cn(
                    inter700.className,
                    "relative w-fit bg-gradient-to-t from-teal-600 to-teal-300 bg-clip-text text-4xl text-transparent dark:from-teal-700 dark:to-teal-200"
                  )}
                >
                  Computer Science
                </span>
              </Card>
              <Card className="group relative flex items-center justify-center overflow-hidden">
                <div className="absolute flex h-full w-full items-center opacity-0 duration-500 ease-in-out group-hover:opacity-15 dark:group-hover:opacity-60">
                  <span
                    className={cn(
                      inter700.className,
                      "absolute left-[7.25rem] -translate-x-1/2 scale-100 text-[7rem] text-black opacity-[0.35] duration-500 ease-in-out group-hover:scale-150 dark:text-neutral-700"
                    )}
                  >
                    3.9
                  </span>
                  <span
                    className={cn(
                      inter700.className,
                      "absolute left-[7.25rem] -translate-x-1/2 scale-100 text-[8rem] text-black opacity-30 duration-500 ease-in-out group-hover:scale-150 dark:text-neutral-700"
                    )}
                  >
                    3.9
                  </span>
                  <span
                    className={cn(
                      inter700.className,
                      "absolute left-[7.25rem] -translate-x-1/2 scale-100 text-[9rem] text-black opacity-[0.25] duration-500 ease-in-out group-hover:scale-150 dark:text-neutral-700"
                    )}
                  >
                    3.9
                  </span>
                  <span
                    className={cn(
                      inter700.className,
                      "absolute left-[7.25rem] -translate-x-1/2 scale-100 text-[10rem] text-black opacity-20 duration-500 ease-in-out group-hover:scale-150 dark:text-neutral-700"
                    )}
                  >
                    3.9
                  </span>
                  <span
                    className={cn(
                      inter700.className,
                      "absolute left-[7.25rem] -translate-x-1/2 scale-100 text-[11rem] text-black opacity-[0.15] duration-500 ease-in-out group-hover:scale-150 dark:text-neutral-700"
                    )}
                  >
                    3.9
                  </span>
                  <span
                    className={cn(
                      inter700.className,
                      "absolute left-[7.25rem] -translate-x-1/2 scale-100 text-[12rem] text-black opacity-10 duration-500 ease-in-out group-hover:scale-150 dark:text-neutral-700"
                    )}
                  >
                    3.9
                  </span>
                </div>
                <div>
                  <span
                    className={cn(
                      inter700.className,
                      "relative w-fit bg-gradient-to-br from-sky-600 to-sky-300 bg-clip-text text-[6rem] text-transparent dark:from-sky-700 dark:to-sky-200"
                    )}
                  >
                    3.9
                  </span>{" "}
                  <span className={cn(inter700.className, "relative text-2xl")}>
                    GPA
                  </span>
                </div>
              </Card>
              <Card className="group relative flex items-center justify-center">
                <div className="opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-20 dark:group-hover:opacity-70">
                  <div className="absolute top-1/2 left-6 h-36 w-36 -translate-y-1/2 rounded-full border-1 border-black dark:border-neutral-700" />
                  <div className="absolute top-1/2 left-6 h-36 w-36 translate-x-4 -translate-y-1/2 rounded-full border-1 border-black opacity-90 dark:border-neutral-700" />
                  <div className="absolute top-1/2 left-6 h-36 w-36 translate-x-8 -translate-y-1/2 rounded-full border-1 border-black opacity-80 dark:border-neutral-700" />
                  <div className="absolute top-1/2 left-6 h-36 w-36 translate-x-12 -translate-y-1/2 rounded-full border-1 border-black opacity-70 dark:border-neutral-700" />
                  <div className="absolute top-1/2 left-6 h-36 w-36 translate-x-16 -translate-y-1/2 rounded-full border-1 border-black opacity-60 dark:border-neutral-700" />
                  <div className="absolute top-1/2 left-6 h-36 w-36 translate-x-20 -translate-y-1/2 rounded-full border-1 border-black opacity-50 dark:border-neutral-700" />
                  <div className="absolute top-1/2 left-6 h-36 w-36 translate-x-24 -translate-y-1/2 rounded-full border-1 border-black opacity-40 dark:border-neutral-700" />
                </div>
                <div>
                  <span
                    className={cn(
                      inter700.className,
                      "from- relative w-fit bg-gradient-to-br from-amber-500 to-amber-300 bg-clip-text text-[6rem] text-transparent dark:from-amber-600 dark:to-amber-200"
                    )}
                  >
                    3
                  </span>{" "}
                  <span className={cn(inter700.className, "relative text-2xl")}>
                    co-ops
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </Layout>
      </Section>
      <Section id="experience-section" className="flex flex-col items-center">
        <div className={cn(inter700.className, "my-8 text-4xl")}>
          Experience
        </div>
        <Experiences className="my-8">
          <Experience id="experience-1" />
          <Experience id="experience-2" />
          <Experience id="experience-3" />
          <Experience id="experience-4" />
        </Experiences>
      </Section>
      <Section id="projects-section" className="flex justify-end">
        My projects.
      </Section>
      <Section
        id="contact-section"
        bottom
        className="flex flex-col justify-center"
      >
        What&apos;s next? Contact me!
      </Section>
    </Container>
  );
}
