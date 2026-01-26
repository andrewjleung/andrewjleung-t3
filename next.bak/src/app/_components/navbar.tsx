"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function NavItem({
  title,
  href,
  className,
}: {
  title: string;
  href: string;
  className?: string;
}) {
  const pathname = usePathname();
  const isSelected = (() => {
    if (pathname === null) {
      return false;
    }

    if (href === "/") {
      return href === pathname;
    }

    return pathname.startsWith(href);
  })();

  return (
    <Link
      href={href}
      className={clsx(
        "w-fit",
        isSelected
          ? "underline dark:text-white dark:no-underline"
          : "dark:text-neutral-500 dark:hover:text-neutral-400",
        className,
      )}
    >
      {title}
    </Link>
  );
}

export function NavBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex w-full justify-center", className)}>
      <div
        className={clsx(
          "flex w-full max-w-(--breakpoint-lg) flex-row items-center gap-5 p-6",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
