import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SunIcon from "../public/sun.svg";
import MoonIcon from "../public/moon.svg";
import Image from "next/image";

function TogglerIcon({ theme, size }: { theme: string; size: number }) {
  if (theme === "dark") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
      <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
      <path d="M19 11h2m-1 -1v2"></path>
    </svg>
  );
}

export default function ThemeToggler() {
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

  if (!mounted || resolvedTheme === undefined) return <></>;

  return (
    <button onClick={toggleTheme}>
      <div className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
        <TogglerIcon theme={resolvedTheme} size={16} />
      </div>
    </button>
  );
}
