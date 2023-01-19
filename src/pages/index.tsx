import Container from "../components/Container";
import { Inter } from "@next/font/google";
import cn from "classnames";
import Balancer from "react-wrap-balancer";
import theme from "../utils/theme";

const inter600 = Inter({ weight: "700", subsets: ["latin"] });

function HashNavItem({ id, title }: { id: string; title: string }) {
  return (
    <div
      className="cursor-pointer no-underline"
      onClick={() => {
        const element = document.getElementById(id);
        if (element !== null) {
          element.scrollIntoView({ behavior: "smooth" });
          window.location.hash = id;
        }
      }}
    >
      {title}
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
    <Container>
      <Panel id="top-section" top>
        <div className="relative flex h-full w-full items-center overflow-hidden sm:justify-center">
          <div className="invisible absolute h-5/6 w-full max-w-full rotate-45 skew-y-6 rounded-full bg-transparent bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-300 via-neutral-900 to-neutral-900 opacity-15 blur-2xl dark:visible" />
          <div className="relative flex flex-col px-6 motion-safe:animate-fade-up sm:items-center sm:pl-0 sm:text-center">
            <Balancer ratio={0.8} as="div">
              <div
                className={cn(inter600.className, "pb-1 text-5xl sm:text-6xl")}
              >
                <span className="">Andrew Leung</span>{" "}
              </div>
            </Balancer>
            <Balancer ratio={1} as="div">
              <div className="pb-1 text-xl text-neutral-400">
                Entry-level software engineer seeking full-time opportunities.
              </div>
            </Balancer>
            <div className="flex flex-row items-center gap-2 whitespace-nowrap text-sm text-neutral-500 sm:justify-center">
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
        {/* TODO: Clean this up and make it more robust/usable */}
        <div
          className="cursor-pointer hover:underline"
          onClick={() => {
            const destination = document.getElementById("top-section");
            destination?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Back to top
        </div>
      </Panel>
    </Container>
  );
}
