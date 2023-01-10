import Head from "next/head";

type Metadata = {
  title: string;
  description: string;
  image: string;
};

const INITIAL_METADATA: Metadata = {
  title: "Andrew Leung",
  description: "My personal landing and portfolio for development and music.",
  image: "/profile.png",
};

type ContainerProps = {
  children: React.ReactNode;
  metadata?: Metadata;
};

export default function Container({
  children,
  metadata = INITIAL_METADATA,
}: ContainerProps) {
  const m = { ...INITIAL_METADATA, ...metadata };

  return (
    <>
      <Head>
        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <link rel="icon" href={m.image} />
      </Head>
      <div>{children}</div>
    </>
  );
}
