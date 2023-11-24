import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./_components/theme-provider";
import { NavBar, NavItem } from "./_components/navbar";
import ThemeToggler from "./_components/theme-toggler";
import clsx from "clsx";
import { Spotlight } from "./_components/spotlight";

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
          <Spotlight />
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
