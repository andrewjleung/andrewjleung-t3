import { type NextPage } from "next";
import Container from "../components/Container";
import { Inter } from "@next/font/google";
import cn from "classnames";

const inter600 = Inter({ weight: "600", subsets: ["latin"] });

function Panel({
  top,
  bottom,
  children,
  className,
}: {
  top?: boolean;
  bottom?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (top && bottom) {
    throw new Error("Cannot be top and bottom.");
  }

  if (top) {
    return (
      <div
        className={cn(
          "flex h-[calc(100vh-4.75rem)] items-center pb-[4.75rem]",
          className
        )}
      >
        {children}
      </div>
    );
  }

  if (bottom) {
    return (
      <div
        className={cn(
          "flex h-[calc(100vh-4rem)] items-center pt-[4rem]",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={cn("flex h-screen items-center", className)}>
      {children}
    </div>
  );
}

const Home: NextPage = ({}) => {
  return (
    <Container>
      <Panel top>
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="invisible absolute h-full w-full rotate-45 skew-y-6 rounded-full bg-transparent bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-400 via-neutral-900 to-neutral-900 opacity-10 blur-2xl dark:visible"></div>
          <div
            className={cn(
              inter600.className,
              "relative max-w-screen-md pb-10 text-center text-5xl motion-safe:animate-fade-up md:text-6xl"
            )}
          >
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Andrew Leung
            </span>{" "}
            is making <span>software</span>, <span>music</span>, and
            <span className="">...</span>
          </div>
        </div>
      </Panel>
      <Panel>
        <div className="text-5xl">Another thing.</div>
      </Panel>
      <Panel className="justify-end">Another thing.</Panel>
      <Panel>Another thing.</Panel>
      <Panel bottom className="justify-center">
        Another thing.
      </Panel>
    </Container>
  );
};

export default Home;
