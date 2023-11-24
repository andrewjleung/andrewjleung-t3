"use client";

import { usePathname } from "next/navigation";

export function Spotlight() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <div className="absolute -z-10 h-screen w-screen overflow-hidden">
        <div className="invisible absolute left-[50vw] top-[50vh] -z-10 h-5/6 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 skew-y-6 rounded-full bg-transparent bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-400 via-neutral-900 to-neutral-900 opacity-20 blur-3xl motion-safe:animate-light-up dark:visible xl:w-5/6 " />
      </div>
    );
  }

  return null;
}
