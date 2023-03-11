import Link from "next/link";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import cn from "classnames";
import { inter700 } from "../../components/Fonts";
import Card from "../../components/Card";

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
          <h1 className={cn(inter700.className, "mb-3 text-2xl")}>{title}</h1>
          <p>{description}</p>
        </div>
      </Link>
    </Card>
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
