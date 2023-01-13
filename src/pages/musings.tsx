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
  );
}

function BitTitle({ title }: { title: Bit["title"] }) {
  return <div className="text-3xl">{title}</div>;
}

function BitContent({
  content,
  theme,
}: {
  content: Bit["content"];
  theme: string;
}) {
  return (
    <StructuredText
      // TODO: Figure out how to type this.
      data={content?.value as StructuredTextGraphQlResponse}
      customNodeRules={[
        renderRule(isCode, ({ node }) => {
          return <Code node={node} theme={theme} />;
        }),
      ]}
    />
  );
}
function BitTags({ tags }: { tags: Bit["tags"] }) {
  return (
    <>
      {tags.map((tag) => (
        <span key={tag.id}>#{tag.tag}</span>
      ))}
    </>
  );
}

function Bit({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border-1 p-4">{children}</div>;
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
    <div>
      {bits.map((bit) => (
        <Bit key={bit.id}>
          <BitTitle title={bit.title} />
          <BitTags tags={bit.tags} />
          <BitContent content={bit.content} theme={resolvedTheme} />
        </Bit>
      ))}
    </div>
  );
}

export default function Musings({ result }: { result: BitsQuery }) {
  return (
    <Container>
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
