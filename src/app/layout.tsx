import Link from "next/link";
import cn from "classnames";
import ThemeToggler from "../components/ThemeToggler";
import { inter300 } from "../components/Fonts";
import { useRouter } from "next/router";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

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

export const metadata: Metadata = {
  title: "Andrew Leung",
  description: "My personal landing and portfolio for development and music.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/profile.png" />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" attribute="class">
          <div
            className={cn(
              inter300.className,
              "mx-auto flex min-h-screen min-w-fit flex-col"
            )}
          >
            <NavBar>
              <NavItem title="Home" href="/" />
              <NavItem title="Blog" href="/blog" />
              {/* TODO: Uncomment when bits are ready... */}
              {/* <NavItem title="Bits" href="/bits" /> */}
              <ThemeToggler className="ml-auto" />
            </NavBar>
            <div className={className}>{children}</div>
            <Footer>
              <span className="ml-auto whitespace-nowrap text-2xs dark:text-neutral-400">
                © {new Date().getFullYear()} Andrew Leung. All rights reserved.
              </span>
            </Footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
