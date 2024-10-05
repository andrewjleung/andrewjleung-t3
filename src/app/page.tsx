import {
	GithubLogo,
	LinkedinLogo,
	SpotifyLogo,
	YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { Inter } from "next/font/google";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { RightChevronIcon } from "./_components/icons";
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
		<main>
			<div className={inter400.className}>
				<div className="relative -my-3 h-full w-fit whitespace-nowrap bg-gradient-to-br from-black via-transparent to-transparent bg-clip-text bg-oversized py-3 text-4xl leading-5 text-transparent motion-safe:animate-background-pan dark:from-white dark:via-black xs:text-5xl sm:-mb-2 sm:pb-2 sm:text-6xl">
					Andrew Leung
				</div>
			</div>
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
					className="mt-6 w-0 min-w-full text-base text-black dark:text-neutral-300 sm:text-xl"
				>
					Software Engineer at PayPal, Braintree Post-Processing. Looking to
					improve the lives of users and developers alike.
				</Balancer>
				<Stats className="mt-6 w-0 min-w-full text-xs text-black dark:text-neutral-300 sm:text-sm" />
				<div className="mt-8 flex flex-row items-center gap-3 text-sm text-black dark:text-neutral-500">
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
					<Link
						href="https://raw.githubusercontent.com/andrewjleung/resumes/main/artifacts/AndrewLeung_Resume.pdf"
						className="ml-2 flex w-fit flex-row items-center gap-1 rounded-full dark:bg-neutral-500 bg-black text-white dark:text-black px-4 py-2 transition-all duration-200 dark:hover:bg-white"
					>
						<span className="whitespace-nowrap text-sm">My resume</span>
						<RightChevronIcon className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</main>
	);
}
