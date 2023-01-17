import Container from "../components/Container";
import type { GetStaticProps } from "next";
import type { BitsQuery } from "../../graphql/generated";
import { BitsDocument } from "../../graphql/generated";
import { request } from "../server/dato";
import type { StructuredTextGraphQlResponse } from "react-datocms";
import { renderRule } from "react-datocms";
import { StructuredText } from "react-datocms";
import Highlight, { defaultProps } from "prism-react-renderer";
import { Code } from "datocms-structured-text-utils";
import { isCode } from "datocms-structured-text-utils";
import { z } from "zod";
import vsDark from "prism-react-renderer/themes/vsDark";
import vsLight from "prism-react-renderer/themes/vsLight";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import cn from "classnames";

type Language = React.ComponentProps<typeof Highlight>["language"];
const language: z.ZodType<Language> = z.enum(["typescript", "python"]);
type Bit = BitsQuery["allBits"][number];

function Code({ node, theme }: { node: Code; theme: string }) {
  const codeTheme = theme === "dark" ? vsDark : vsLight;

  return (
    <div className="relative">
      <div
        className="absolute top-3 right-3 cursor-pointer text-gray-300 transition duration-100 ease-in-out hover:text-blue-300 active:text-gray-300 dark:hover:text-blue-400 dark:active:text-gray-300"
        onClick={() => {
          // TODO: Make responsive (right now it overlaps the code).
          // TODO: Add some feedback for copying to clipboard.
          navigator.clipboard.writeText(node.code).catch((err) => {
            console.log(err);
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <rect x="8" y="8" width="12" height="12" rx="2"></rect>
          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
        </svg>
      </div>
      <Highlight
        {...defaultProps}
        code={node.code}
        language={language.parse(node.language || "unknown")}
        theme={codeTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={cn(className, "border-1  py-2 px-3")} style={style}>
            {tokens.map((line, i) => (
              <div key={i}>
                <span className="select-none pr-3 text-gray-400 dark:text-gray-600">
                  {i + 1}
                </span>
                <span {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

function BitTitle({
  title,
  className,
}: {
  title: Bit["title"];
  className?: string;
}) {
  return <div className={cn("text-4xl", className)}>{title}</div>;
}

function BitContent({
  content,
  theme,
}: {
  content: Bit["content"];
  theme: string;
}) {
  return (
    <div className="">
      <StructuredText
        // TODO: Figure out how to type this.
        data={content?.value as StructuredTextGraphQlResponse}
        customNodeRules={[
          renderRule(isCode, ({ node }) => {
            return <Code node={node} theme={theme} />;
          }),
        ]}
      />
    </div>
  );
}

function BitTags({
  tags,
  className,
}: {
  tags: Bit["tags"];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-row gap-1", className)}>
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="rounded-full bg-gray-100 px-2 dark:bg-gray-800"
        >
          #{tag.tag}
        </span>
      ))}
    </div>
  );
}

function Bit({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative">
      <div className="absolute h-full w-full rounded-lg bg-blue-300 transition duration-300 group-hover:blur-lg group-hover:duration-200"></div>
      <div className="relative rounded-lg border-1 bg-white px-5 pt-5 shadow-md dark:bg-black">
        {children}
      </div>
    </div>
  );
}

function Bits({ bits }: { bits: BitsQuery["allBits"] }) {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // TODO: Render a proper skeleton.
  if (!isMounted || resolvedTheme === undefined) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-6">
      {bits.map((bit) => (
        <Bit key={bit.id}>
          <BitTitle title={bit.title} className="mb-2" />
          <BitTags tags={bit.tags} className="mb-4" />
          <BitContent content={bit.content} theme={resolvedTheme} />
        </Bit>
      ))}
    </div>
  );
}

export default function Musings({ result }: { result: BitsQuery }) {
  return (
    <Container>
      {/* TODO: Set up filtering bits by tags. */}
      <Bits bits={result.allBits} />
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO: Paginate in the future rather than requesting everything?
  const result = await request(BitsDocument);

  return {
    props: {
      result,
    },
    // TODO: Setup on-demand revalidation: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
    revalidate: 60,
  };
};
