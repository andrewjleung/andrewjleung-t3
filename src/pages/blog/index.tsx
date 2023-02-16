import Link from "next/link";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import cn from "classnames";
import { inter700 } from "../../components/Fonts";

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
    <Link
      href={`/blog/${slug}`}
      className="w-full rounded-xl border-1 border-black bg-gradient-to-br p-6 transition-all duration-300 ease-in-out dark:border-neutral-800 dark:from-black dark:via-neutral-900/40 dark:to-neutral-900/75 hover:dark:border-neutral-600 hover:dark:bg-neutral-900/50"
    >
      <h1 className={cn(inter700.className, "mb-3 text-2xl")}>{title}</h1>
      <p>{description}</p>
    </Link>
  );
}

export default function Blog() {
  return (
    <Container>
      <Layout className="flex flex-col items-center gap-6 px-6 sm:px-24">
        <BlogPost
          title="Quitters"
          description="A road trip through my past and present perspectives on making music, being a musician, finding meaning in that, and losing meaning in that. Undertones of DAW hatred."
          date="2021-08-26"
          slug="quitters"
        />
      </Layout>
    </Container>
  );
}
