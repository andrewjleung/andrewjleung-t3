import Container from "../components/Container";
import type { GetStaticProps } from "next";
import type { BitsQuery } from "../../graphql/generated";
import { BitsDocument } from "../../graphql/generated";
import { request } from "../server/dato";
import type { StructuredTextGraphQlResponse } from "react-datocms";
import { renderRule } from "react-datocms";
import { StructuredText } from "react-datocms";
import Highlight, { defaultProps } from "prism-react-renderer";
import { isCode } from "datocms-structured-text-utils";
import { z } from "zod";
import vsDark from "prism-react-renderer/themes/vsDark";
import vsLight from "prism-react-renderer/themes/vsLight";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Language = React.ComponentProps<typeof Highlight>["language"];
const language: z.ZodType<Language> = z.enum(["typescript", "python"]);

export default function Musings({ result }: { result: BitsQuery }) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div>foo</div>;

  const codeTheme = theme === "dark" ? vsDark : vsLight;

  return (
    <Container>
      {result.allBits.map((bit) => (
        <div key={bit.id}>
          <div className="text-3xl">{bit.title}</div>{" "}
          {bit.tags.map((tag) => (
            <span key={tag.id}>#{tag.tag}</span>
          ))}
          <StructuredText
            data={bit.content.value as StructuredTextGraphQlResponse}
            customNodeRules={[
              renderRule(isCode, ({ node, key }) => {
                return (
                  <Highlight
                    {...defaultProps}
                    code={node.code}
                    language={language.parse(node.language || "unknown")}
                    theme={codeTheme}
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre className={className} style={style}>
                        {tokens.map((line, i) => (
                          <div key={i}>
                            <span className="select-none pr-3 text-gray-400 dark:text-gray-600">
                              {i + 1}
                            </span>
                            <span {...getLineProps({ line, key: i })}>
                              {line.map((token, key) => (
                                <span
                                  key={key}
                                  {...getTokenProps({ token, key })}
                                />
                              ))}
                            </span>
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                );
              }),
            ]}
          />
        </div>
      ))}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const result = await request(BitsDocument);

  return {
    props: {
      result,
    },
    // TODO: Setup on-demand revalidation: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  };
};
