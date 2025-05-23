import {
  GithubLogo,
  LinkedinLogo,
  SpotifyLogo,
  YoutubeLogo,
  CaretRight,
  PaperPlaneTilt,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { Inter } from "next/font/google";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Stats } from "./_components/stats";

const inter400 = Inter({ weight: "400", subsets: ["latin"] });

function IconLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex flex-row items-center gap-2 dark:hover:text-white transition-all duration-200",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export default async function Home() {
  return (
    <section id="hero" className="">
      <h1
        className="whitespace-nowrap w-fit bg-linear-to-br from-black via-transparent to-transparent bg-clip-text text-transparent motion-safe:animate-background-pan dark:from-white dark:via-black -mb-2 pb-2 text-5xl xs:text-6xl"
        style={{ backgroundSize: "500% 500%" }}
      >
        Andrew Leung
      </h1>
      {/* TODO: Cursed hack to avoid horizontal layout shifting with long, wrapping stat text.
                This more or less invisible div matches the pixel widths of the short bio below at 
                different breakpoints, ensuring that the stat component will never get wider than the
                width of the bio.
            */}
      <div className="w-[305px] xs:w-[453px] sm:w-[566px]" />
      <div className="motion-safe:animate-fade-up">
        <Balancer
          ratio={1}
          as="div"
          className="mt-6 w-0 min-w-full text-black dark:text-white text-lg xs:text-xl"
        >
          Software Engineer at PayPal, Braintree Post-Processing. Looking to
          improve the lives of users and developers alike.
        </Balancer>
        <Stats className="mt-6 w-0 min-w-full text-black dark:text-white xs:text-base text-sm" />
        <div className="mt-8 flex flex-row items-center gap-3 text-sm text-black dark:text-white">
          <IconLink href="https://github.com/andrewjleung">
            <GithubLogo weight="fill" className="m-1 inline h-6 w-6" />
          </IconLink>
          <IconLink href="https://www.linkedin.com/in/andrewjleung-">
            <LinkedinLogo weight="fill" className="m-1 inline h-6 w-6" />
          </IconLink>
          <IconLink href="https://open.spotify.com/artist/00zDjeTQDVOFlNttOnv9bc">
            <SpotifyLogo weight="fill" className="m-1 inline h-6 w-6" />
          </IconLink>
          <IconLink href="https://www.youtube.com/channel/UCVxaN-2GATE-3Ag9RTGrIXw">
            <YoutubeLogo weight="fill" className="m-1 inline h-6 w-6" />
          </IconLink>
          <IconLink href="mailto:andrewleung104@gmail.com">
            <PaperPlaneTilt weight="fill" className="m-1 inline h-6 w-6" />
          </IconLink>
          <Link
            href="https://andrewjleung.github.io/resumes/AndrewLeung_Resume.pdf"
            className="flex w-fit flex-row items-center gap-1 rounded-full dark:bg-white bg-black text-white dark:text-black px-4 py-2 transition-all duration-200 dark:hover:bg-white"
          >
            <span className="whitespace-nowrap text-sm">My resume</span>
            <CaretRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
