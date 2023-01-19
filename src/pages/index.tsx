import Container from "../components/Container";
import { Inter } from "@next/font/google";
import cn from "classnames";
import Balancer from "react-wrap-balancer";
import useInterval from "../hooks/useInterval";
import { useEffect, useState } from "react";

const inter600 = Inter({ weight: "700", subsets: ["latin"] });

function HashNavItem({ id, title }: { id: string; title: string }) {
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
      className="cursor-pointer no-underline"
      onClick={() => {
        const element = document.getElementById(id);
        if (element !== null) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <div
        className={cn(
          "hover:bg-neutral-400",
          isIntersecting ? "bg-neutral-500" : "bg-neutral-200"
        )}
      >
        {title}
      </div>
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
  const [panelNavCanAnimate, setPanelNavCanAnimate] = useState(false);

  useInterval(() => {
    setPanelNavCanAnimate(true);
  }, 3000); // TODO: Magic number, make a single source of truth for this and the `stretch` animation.

  return (
    <Container id="container">
      <div
        className={cn(
          "duration-400 fixed left-1/2 top-6 z-50 flex -translate-x-1/2 flex-row gap-4 rounded-2xl border-1 py-2 px-4 transition-all motion-safe:animate-stretch",
          { "hover:px-8": panelNavCanAnimate }
        )}
      >
        <HashNavItem id="top-section" title="Top" />
        <HashNavItem id="experience-section" title="Experience" />
        <HashNavItem id="skills-section" title="Skill" />
        <HashNavItem id="projects-section" title="Projects" />
        <HashNavItem id="contact-section" title="Contact" />
      </div>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline h-4 w-4"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="11" r="3"></circle>
                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
              </svg>
              Remote or near Dallas–Fort Worth, TX
            </div>
          </div>
        </div>
      </Panel>
      <Panel id="experience-section">
        <div className="px-6 text-5xl">My experience.</div>
      </Panel>
      <Panel id="skills-section" className="justify-end px-6">
        My skills.
      </Panel>
      <Panel id="projects-section" className="px-6">
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
