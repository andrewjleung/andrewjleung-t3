import { type NextPage } from "next";
import Container from "../components/Container";
import { Inter } from "@next/font/google";
import cn from "classnames";
import Balancer from "react-wrap-balancer";

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

  const commonStyles = "flex items-center bg-transparent";

  if (top) {
    return (
      <div className={cn(commonStyles, "h-screen", className)}>{children}</div>
    );
  }

  if (bottom) {
    return (
      <div
        className={cn(
          commonStyles,
          "h-[calc(100vh-4rem)] pt-[4rem]",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={cn(commonStyles, "h-screen", className)}>{children}</div>
  );
}

const Home: NextPage = ({}) => {
  return (
    <Container>
      <Panel top>
        <div className="relative flex h-full w-full items-center overflow-hidden sm:justify-center">
          <div className="invisible absolute h-5/6 w-full max-w-full rotate-45 skew-y-6 rounded-full bg-transparent bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-300 via-neutral-900 to-neutral-900 opacity-15 blur-2xl dark:visible"></div>
          <Balancer ratio={0.6}>
            <div
              className={cn(
                inter600.className,
                "relative pb-1 pl-6 text-5xl motion-safe:animate-fade-up sm:pl-0 sm:text-center sm:text-6xl"
              )}
            >
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Andrew Leung
              </span>{" "}
              is making software, music, and...
            </div>
          </Balancer>
        </div>
      </Panel>
      <Panel>
        <div className="px-6 text-5xl">Another thing.</div>
      </Panel>
      <Panel className="justify-end px-6">Another thing.</Panel>
      <Panel className="px-6">Another thing.</Panel>
      <Panel bottom className="justify-center px-6">
        Another thing.
      </Panel>
    </Container>
  );
};

export default Home;
