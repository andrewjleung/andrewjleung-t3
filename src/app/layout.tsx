import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./_components/theme-provider";
import { NavBar, NavItem } from "./_components/navbar";
import ThemeToggler from "./_components/theme-toggler";
import clsx from "clsx";

const inter300 = Inter({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Andrew Leung",
  description: "My personal landing and portfolio for development and music.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function Footer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex w-full justify-center", className)}>
      <div className="flex w-full max-w-screen-lg flex-row items-center p-6">
        {children}
      </div>
    </div>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider cookies={cookies().toString()}>
      <ThemeProvider>{children}</ThemeProvider>
    </TRPCReactProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter300.className}>
        <Providers>
          {/* TODO: This can be made to only show on the home screen by pulling this into a client component. */}
          <div className="absolute -z-10 h-screen w-screen overflow-hidden">
            <div className="invisible absolute left-[50vw] top-[50vh] -z-10 h-5/6 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 skew-y-6 rounded-full bg-transparent bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-400 via-neutral-900 to-neutral-900 opacity-20 blur-3xl motion-safe:animate-light-up dark:visible xl:w-5/6 " />
          </div>
          <div className="flex min-h-screen min-w-fit flex-col">
            <NavBar>
              <NavItem title="Home" href="/" />
              <NavItem title="Blog" href="/blog" />
              <ThemeToggler className="ml-auto" />
            </NavBar>
            <div className="flex grow items-center justify-center">
              {children}
            </div>
            <Footer>
              <span className="ml-auto whitespace-nowrap text-2xs dark:text-neutral-500">
                © {new Date().getFullYear()} Andrew Leung. All rights reserved.
              </span>
            </Footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
