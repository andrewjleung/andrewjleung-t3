import { type NextPage } from "next";
import Container from "../components/Container";
import { Inter } from "@next/font/google";
import cn from "classnames";

const inter500 = Inter({ weight: "500", subsets: ["latin"] });

function Panel({
  first,
  children,
  className,
}: {
  first?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (first) {
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

  return (
    <div className={cn("flex h-screen items-center", className)}>
      {children}
    </div>
  );
}

const Home: NextPage = ({}) => {
  return (
    <Container>
      <Panel first>
        <div className={cn(inter500.className, "pb-20 text-6xl")}>
          <span className="">Andrew Leung</span> is making{" "}
          <span className="">software</span>, <span className="">music</span>,
          and...
        </div>
      </Panel>
      <Panel>Another thing.</Panel>
      <Panel className="justify-end">Another thing.</Panel>
      <Panel>Another thing.</Panel>
      <Panel className="justify-center">Another thing.</Panel>
    </Container>
  );
};

export default Home;
