import clsx from "clsx";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter700 = Inter({ weight: "700", subsets: ["latin"] });

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "after:shadow-card relative rounded-xl bg-white bg-gradient-to-br outline outline-1 outline-neutral-200 transition-all duration-300 ease-in-out after:absolute after:left-0 after:top-0 after:-z-10 after:block after:h-full after:w-full hover:outline-black dark:border-neutral-800 dark:bg-black dark:from-neutral-900/80 dark:via-neutral-900/60 dark:to-black dark:outline-neutral-800  dark:after:shadow-none hover:dark:border-neutral-600 hover:dark:bg-neutral-900/70",
        className,
      )}
    >
      {children}
    </div>
  );
}

function BlogPost({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return (
    <Card className="w-full">
      <Link href={`/blog/${slug}`}>
        <div className="p-6">
          <h1 className={clsx(inter700.className, "mb-3 text-2xl")}>{title}</h1>
          <p>{description}</p>
        </div>
      </Link>
    </Card>
  );
}

export default function Blog() {
  return (
    <div className="mb-auto max-w-screen-lg p-6">
      <BlogPost
        title="Quitters"
        description="A road trip through my past and present perspectives on making music, being a musician, finding meaning in that, and losing meaning in that. Undertones of DAW hatred."
        date="2021-08-26"
        slug="quitters"
      />
    </div>
  );
}
