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
    <button
      className="fixed inset-0 h-screen w-screen backdrop-blur-2xl transition-all duration-300"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div className="absolute m-6 mt-24 box-border flex w-full flex-col gap-3 rounded-xl p-6 text-6xl">
        {children}
      </div>
    </button>
  );
}

function NavBar({
  children,
  className,
}: {
  animateNavBar?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("flex w-full justify-center ", className)}>
      {/* <div className="flex w-full max-w-screen-lg flex-row items-center gap-5 p-6 md:hidden">
        <div className="text-black transition-all duration-200 ease-out dark:text-neutral-500 dark:hover:text-white">
          <button
            onClick={() => {
              setIsOpen((open) => !open);
            }}
          >
            <MenuIcon className="h-8 w-8 cursor-pointer" />
          </button>
          <NavMenuMobile isOpen={isOpen} setIsOpen={setIsOpen}>
            {children}
          </NavMenuMobile>
        </div>
        <ThemeToggler className="ml-auto" />
      </div> */}
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
  animateNavBar = false,
}: {
  children: React.ReactNode;
  metadata?: Metadata;
  className?: string;
  id?: string;
  animateNavBar?: boolean;
}) {
  const m = { ...INITIAL_METADATA, ...metadata };
  const { pathname } = useRouter();

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
        <NavBar
          className={cn("z-30", {
            absolute: pathname === "/",
          })}
          animateNavBar={animateNavBar}
        >
          <NavItem title="Home" href="/" />
          <NavItem title="Blog" href="/blog" />
          <NavItem title="Bits" href="/bits" />
          <ThemeToggler className="ml-auto" />
        </NavBar>
        <div className="relative h-full w-full">{children}</div>
        <Footer className="mt-auto">
          <div className="mx-auto whitespace-nowrap text-xs text-neutral-400 sm:ml-auto sm:mr-0">
            © {new Date().getFullYear()} Andrew Leung. All rights reserved.
          </div>
        </Footer>
      </div>
    </>
  );
}
