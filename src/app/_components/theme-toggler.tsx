"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

function TogglerIcon({
  theme,
  size,
  className,
}: {
  theme: string;
  size: number;
  className?: string;
}) {
  if (theme === "dark") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
        <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
        <path d="M19 11h2m-1 -1v2"></path>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
    </svg>
  );
}

export default function ThemeToggler({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Per the `next-themes` documentation, `useTheme` is hydration unsafe since
  // `theme` is not known on the server, and will be undefined until mounted on
  // the client. This is used to delay rendering the toggle until it is mounted.
  // See https://github.com/pacocoursey/next-themes#usetheme.
  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleTheme() {
    if (resolvedTheme === "dark") {
      setTheme("light");
      return;
    }

    setTheme("dark");
  }

  if (!mounted || resolvedTheme === undefined) {
    return (
      <div
        className={clsx(
          "border-1 h-7 w-7 cursor-pointer rounded-md border-black dark:border-neutral-500",
          className,
        )}
      ></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "flex h-7 w-7 cursor-pointer items-center justify-center rounded-md outline outline-1 outline-black transition-all duration-200  ease-in-out hover:bg-black hover:text-white dark:text-neutral-500 dark:outline-neutral-500 dark:hover:text-white dark:hover:outline-white dark:active:bg-transparent",
        className,
      )}
    >
      <TogglerIcon theme={resolvedTheme} size={16} />
    </button>
  );
}
