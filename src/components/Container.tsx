import Head from "next/head";
import Link from "next/link";
import React from "react";
import cn from "classnames";
import ThemeToggler from "./ThemeToggler";

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
  return (
    <Link href={href} className={cn("", className)}>
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
    <div className={cn("flex flex-row gap-3", className)}>
      {children}
      <ThemeToggler />
    </div>
  );
}

// This component is meant to wrap every page. It has customizable metadata
// however so that individual pages can have a say. Individual pages with
// consistent layouts can define their own custom layouts separately.
export default function Container({
  children,
  metadata = INITIAL_METADATA,
}: {
  children: React.ReactNode;
  metadata?: Metadata;
}) {
  const m = { ...INITIAL_METADATA, ...metadata };

  return (
    <>
      <Head>
        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <link rel="icon" href={m.image} />
      </Head>
      <div className={cn("m-5")}>
        <NavBar className="pb-5">
          <NavItem title="Home" href="/" />
          <NavItem title="Projects" href="/projects" className="ml-auto" />
          <NavItem title="Blog" href="/blog" />
          <NavItem title="Resume" href="/resume" />
        </NavBar>
        {children}
      </div>
    </>
  );
}
