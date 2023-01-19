import Container from "../components/Container";
import { Inter } from "@next/font/google";
import cn from "classnames";
import Balancer from "react-wrap-balancer";
import useInterval from "../hooks/useInterval";
import React, { useEffect, useState } from "react";

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
      threshold: 0.5,
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
        "duration-400 fixed left-1/2 top-5 z-30 flex w-fit -translate-x-1/2 flex-row gap-4 rounded-full border-1 border-black py-2 px-4 transition-all ease-in dark:border-neutral-500 sm:motion-safe:animate-stretch",
        { "hover:px-8": panelNavCanAnimate }
      )}
    >
      {children}
    </div>
  );
}

function Panel({
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

  const commonStyles = "flex items-center bg-transparent";

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
          "h-[calc(100vh-4rem)] pt-[4rem]",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div id={id} className={cn(commonStyles, "h-screen", className)}>
      {children}
    </div>
  );
}

export default function Home({}) {
  return (
    <Container id="container">
      <SectionNav>
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
      </SectionNav>
      <Panel id="top-section" top>
        <div className="relative flex h-full w-full items-center overflow-hidden sm:justify-center">
          <div className="invisible absolute h-5/6 w-full max-w-full rotate-45 skew-y-6 rounded-full bg-transparent bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-300 via-neutral-900 to-neutral-900 opacity-15 blur-2xl dark:visible" />
          <div className="relative flex flex-col px-6 motion-safe:animate-fade-up sm:items-center sm:pl-0 sm:text-center">
            <div
              className={cn(inter600.className, "pb-1 text-5xl sm:text-6xl")}
            >
              <span className="whitespace-nowrap">Andrew Leung</span>{" "}
            </div>
            <Balancer ratio={1} as="div">
              <div className="pb-1 text-xl text-neutral-600 dark:text-neutral-400">
                Entry-level software engineer seeking full-time opportunities.
              </div>
            </Balancer>
            <div className="flex flex-row items-center gap-2 whitespace-nowrap text-sm text-neutral-400 dark:text-neutral-500 sm:justify-center">
              <MapPinIcon className="inline h-4 w-4" />
              Remote or near Dallas–Fort Worth, TX
            </div>
          </div>
        </div>
      </Panel>
      <Panel id="experience-section">
        <div className="px-6 text-5xl">My experience.</div>
      </Panel>
      <Panel id="projects-section" className="flex justify-end px-6">
        My projects.
      </Panel>
      <Panel
        id="contact-section"
        bottom
        className="flex flex-col justify-center px-6"
      >
        What&apos;s next? Contact me!
      </Panel>
    </Container>
  );
}
