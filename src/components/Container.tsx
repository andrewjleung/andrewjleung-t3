import Head from "next/head";
import Link from "next/link";
import React from "react";
import cn from "classnames";
import ThemeToggler from "./ThemeToggler";
import { Inter } from "@next/font/google";

const inter300 = Inter({ weight: "300", subsets: ["latin"] });

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
    <Link href={href} className={cn("py-1", className)}>
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
    <div className={cn("flex flex-row items-center gap-5", className)}>
      {children}
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
    <div className={cn("flex flex-row items-center", className)}>
      {children}
    </div>
  );
}

function Line() {
  return (
    <div className="hidden grow border-b-1 dark:border-gray-700 sm:block"></div>
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
        {/* TODO: add more metadata */}
      </Head>
      <div
        className={cn(
          inter300.className,
          "mx-auto flex min-h-screen max-w-4xl flex-col px-6"
        )}
      >
        <NavBar className="mt-6 pb-5">
          <NavItem title="Home" href="/" />
          <NavItem title="Projects" href="/projects" />
          <NavItem title="Blog" href="/blog" />
          <NavItem title="Resume" href="/resume" />
          <ThemeToggler className="ml-auto" />
        </NavBar>
        {children}
        <Footer className="mt-auto mb-6">
          <div className="mx-auto whitespace-nowrap text-xs text-gray-400 sm:ml-auto sm:mr-0">
            © {new Date().getFullYear()} Andrew Leung. All rights reserved.
          </div>
        </Footer>
      </div>
    </>
  );
}
