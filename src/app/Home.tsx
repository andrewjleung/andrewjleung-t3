import cn from "classnames";
import Balancer from "react-wrap-balancer";
import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import {
  GitHubIcon,
  LinkedInIcon,
  RightChevronIcon,
  SpotifyIcon,
  YouTubeIcon,
} from "../components/Icons";
import Container from "../components/Container";
import Stats from "./Stats";

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

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute -z-10 h-screen w-screen overflow-hidden">
        <div className="invisible absolute left-[50vw] top-[50vh] -z-10 h-5/6 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 skew-y-6 rounded-full bg-transparent bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-400 via-neutral-900 to-neutral-900 opacity-20 blur-3xl motion-safe:animate-light-up dark:visible xl:w-5/6 " />
      </div>
      <Container className="flex grow items-center justify-center">
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
