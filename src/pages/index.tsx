import Container from "../components/Container";
import { Inter } from "@next/font/google";
import cn from "classnames";
import Balancer from "react-wrap-balancer";
import useInterval from "../hooks/useInterval";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";

const inter600 = Inter({ weight: "700", subsets: ["latin"] });

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
        "flex flex-row items-center gap-2 dark:hover:bg-transparent",
        className
      )}
    >
      <Icon className="m-1 inline h-6 w-6" />
    </Link>
  );
}

export default function Home({}) {
  return (
    <Container id="container">
      <div className="invisible absolute top-1/2 left-1/2 h-5/6 w-full -translate-x-1/2 -translate-y-1/2 rotate-45 skew-y-6 rounded-full bg-transparent bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-300 via-neutral-900 to-neutral-900 opacity-15 blur-2xl motion-safe:animate-light-up dark:visible" />
      <Layout className="px-6">
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
                    inter600.className,
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
                  Entry-level software engineer seeking full-time, full-stack
                  opportunities. Lorem ipsum dolor sit amet, consectetur.
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
        </Section>
        <Section id="experience-section">
          <div className="px-6 text-5xl">My experience.</div>
        </Section>
        <Section id="projects-section" className="flex justify-end px-6">
          My projects.
        </Section>
        <Section
          id="contact-section"
          bottom
          className="flex flex-col justify-center px-6"
        >
          What&apos;s next? Contact me!
        </Section>
      </Layout>
    </Container>
  );
}
