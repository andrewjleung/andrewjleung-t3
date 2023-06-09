import Container from "../../components/Container";
import Layout from "../../components/Layout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Andrew Leung - Blog",
  description: "Writings on various tastes and topics.",
  viewport: "width=device-width, initial-scale=1",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex grow">
      <Layout className="flex flex-col items-center gap-6 px-6 sm:px-24">
        {children}
      </Layout>
    </Container>
  );
}
