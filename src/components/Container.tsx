import Head from "next/head";
import Link from "next/link";
import React from "react";
import cn from "classnames";
import ThemeToggler from "./ThemeToggler";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";

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
    <Link href={href} className={cn("no-underline", className)}>
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
    // TODO: Move hash navigation to the center, then different pages to the left. Make it all collapse in smaller screens.
    <div className={cn("flex flex-row items-center gap-5 ", className)}>
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
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <link rel="icon" href={m.image} />
        {/* TODO: add more metadata */}
      </Head>
      <div
        id={id}
        className={cn(
          inter300.className,
          // TODO: Make prose only apply to child content so that the rest of the container can fit the full width!
          "flex min-h-screen flex-col",
          className
        )}
      >
        <NavBar
          className={cn("z-50 box-border w-full p-6", {
            absolute: pathname === "/",
          })}
        >
          <NavItem title="Home" href="/" />
          <NavItem title="Blog" href="/blog" />
          <NavItem title="Bits" href="/bits" />
          <NavItem title="Resume" href="/resume" />
          <ThemeToggler className="ml-auto" />
        </NavBar>
        <div className={cn("mx-auto w-full", { "px-6": pathname !== "/" })}>
          {children}
        </div>
        <Footer className="mt-auto p-6">
          <div className="mx-auto whitespace-nowrap text-xs text-neutral-400 sm:ml-auto sm:mr-0">
            © {new Date().getFullYear()} Andrew Leung. All rights reserved.
          </div>
        </Footer>
      </div>
    </>
  );
}
