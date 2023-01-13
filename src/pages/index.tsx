import { type NextPage } from "next";
import Container from "../components/Container";
import { Inter } from "@next/font/google";
import cn from "classnames";

const inter500 = Inter({ weight: "500", subsets: ["latin"] });

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
        <div className={cn(inter500.className, "pb-20 text-6xl")}>
          <span className="">Andrew Leung</span> is making{" "}
          <span className="">software</span>, <span className="">music</span>,
          and...
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
