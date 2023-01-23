import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
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

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="0.75"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <line x1="4" y1="6" x2="20" y2="6"></line>
      <line x1="4" y1="12" x2="20" y2="12"></line>
      <line x1="4" y1="18" x2="20" y2="18"></line>
    </svg>
  );
}

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
  const isSelected = pathname === href;

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

function NavMenuMobile({
  children,
  isOpen,
  setIsOpen,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  className?: string;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div className="absolute mt-24 box-border flex w-full flex-col gap-3 bg-neutral-200 p-6 text-6xl dark:bg-neutral-800">
        {children}
      </div>
    </div>
  );
}

function NavBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // TODO: Move hash navigation to the center, then dif//ferent pages to the left. Make it all collapse in smaller screens.
    <div className={cn("flex w-full justify-center", className)}>
      <div className="flex w-full max-w-screen-lg flex-row items-center gap-5 p-6 md:hidden">
        <div className="text-black transition-all duration-200 ease-out dark:text-neutral-500 dark:hover:text-white">
          <div
            onClick={() => {
              setIsOpen((open) => !open);
            }}
          >
            <MenuIcon className="h-8 w-8 cursor-pointer" />
          </div>
          <NavMenuMobile isOpen={isOpen} setIsOpen={setIsOpen}>
            {children}
          </NavMenuMobile>
        </div>
        <ThemeToggler className="ml-auto" />
      </div>
      <div
        className={cn(
          "hidden w-full max-w-screen-lg flex-row items-center gap-5 p-6 md:flex",
          className
        )}
      >
        {children}
        <ThemeToggler className="ml-auto" />
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
          "mx-auto flex min-h-screen flex-col",
          className
        )}
      >
        <NavBar
          className={cn("z-30", {
            absolute: pathname === "/",
          })}
        >
          <NavItem title="Home" href="/" />
          <NavItem title="Blog" href="/blog" />
          <NavItem title="Bits" href="/bits" />
          <NavItem title="Resume" href="/resume" />
        </NavBar>
        <div className={cn("w-full", { "px-6": pathname !== "/" })}>
          {children}
        </div>
        <Footer className="mt-auto">
          <div className="mx-auto whitespace-nowrap text-xs text-neutral-400 sm:ml-auto sm:mr-0">
            © {new Date().getFullYear()} Andrew Leung. All rights reserved.
          </div>
        </Footer>
      </div>
    </>
  );
}
