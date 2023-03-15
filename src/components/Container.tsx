import Head from "next/head";
import Link from "next/link";
import cn from "classnames";
import ThemeToggler from "./ThemeToggler";
import { inter300 } from "./Fonts";
import { useRouter } from "next/router";

type Metadata = {
  title: string;
  description: string;
  image: string;
};

const INITIAL_METADATA: Metadata = {
  title: "Andrew Leung",
  description: "My personal landing and portfolio for development and music.",
  image: "/profile.png",
};

function NavItem({
  title,
  href,
  className,
}: {
  title: string;
  href: string;
  className?: string;
}) {
  const { pathname } = useRouter();
  const isSelected =
    href === "/" ? href === pathname : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "w-fit text-black",
        isSelected
          ? "underline dark:text-white dark:no-underline"
          : "dark:text-neutral-500 dark:hover:text-neutral-400",
        className
      )}
    >
      {title}
    </Link>
  );
}

function NavBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full justify-center", className)}>
      <div
        className={cn(
          "flex w-full max-w-screen-lg flex-row items-center gap-5 p-6",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Footer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full justify-center", className)}>
      <div className="flex w-full max-w-screen-lg flex-row items-center p-6">
        {children}
      </div>
    </div>
  );
}

// This component is meant to wrap every page. It has customizable metadata
// however so that individual pages can have a say. Individual pages with
// consistent layouts can define their own custom layouts separately.
export default function Container({
  children,
  metadata = INITIAL_METADATA,
  className,
  id,
}: {
  children: React.ReactNode;
  metadata?: Metadata;
  className?: string;
  id?: string;
}) {
  const m = { ...INITIAL_METADATA, ...metadata };

  return (
    <>
      <Head>
        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={m.image} />
        {/* TODO: add more metadata */}
      </Head>
      <div
        id={id}
        className={cn(
          inter300.className,
          "mx-auto flex min-h-screen flex-col overflow-hidden",
          className
        )}
      >
        <NavBar>
          <NavItem title="Home" href="/" />
          <NavItem title="Blog" href="/blog" />
          {/* TODO: Uncomment when bits are ready... */}
          {/* <NavItem title="Bits" href="/bits" /> */}
          <ThemeToggler className="ml-auto" />
        </NavBar>
        <div className="relative my-auto">{children}</div>
        <Footer>
          <span className="ml-auto whitespace-nowrap text-2xs dark:text-neutral-400">
            © {new Date().getFullYear()} Andrew Leung. All rights reserved.
          </span>
        </Footer>
      </div>
    </>
  );
}
