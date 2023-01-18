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
import codeThemeDark from "prism-react-renderer/themes/vsDark";
import codeThemeLight from "prism-react-renderer/themes/vsLight";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import useInterval from "../hooks/useInterval";

type Language = React.ComponentProps<typeof Highlight>["language"];
const language: z.ZodType<Language> = z.enum(["typescript", "python"]);
type Bit = BitsQuery["allBits"][number];

function Code({ node, theme }: { node: Code; theme: string }) {
  const codeTheme = theme === "dark" ? codeThemeDark : codeThemeLight;
  const [checked, setChecked] = useState(false);

  // Uncheck the copy box after 1 second.
  useInterval(
    () => {
      setChecked(false);
    },
    checked ? 1000 : null
  );

  return (
    <div className="relative">
      <div
        className="absolute top-2 right-2 cursor-pointer rounded-md text-gray-300 transition duration-100 ease-in-out hover:text-blue-300 active:text-gray-300 dark:text-white dark:hover:text-blue-400 dark:active:text-gray-300 md:m-1"
        onClick={() => {
          // TODO: Make responsive (right now it overlaps the code).
          // TODO: Add some feedback for copying to clipboard.
          navigator.clipboard.writeText(node.code).catch((err) => {
            console.log(err);
          });
          setChecked(true);
        }}
      >
        {checked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 12l5 5l10 -10"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <rect x="8" y="8" width="12" height="12" rx="2"></rect>
            <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
          </svg>
        )}
      </div>
      <Highlight
        {...defaultProps}
        code={node.code}
        language={language.parse(node.language || "unknown")}
        theme={codeTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(className, "overflow-auto rounded-md py-2 px-3")}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i}>
                <span className="select-none pr-3 text-gray-400 dark:text-gray-600">
                  {i + 1}
                </span>
                <span {...getLineProps({ line, key: i })} className="pr-3">
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

function BitDate({
  date,
  locale,
  className,
}: {
  date?: string;
  locale?: string;
  className?: string;
}) {
  if (date === undefined) {
    return null;
  }

  return (
    <div className={className}>
      {new Date(date).toLocaleDateString(locale || "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </div>
  );
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

function BitTags({
  tags,
  className,
}: {
  tags: Bit["tags"];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-row flex-wrap gap-1 text-xs", className)}>
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="rounded-full bg-gray-100 px-2 py-1 dark:bg-neutral-700"
        >
          #{tag.tag}
        </span>
      ))}
    </div>
  );
}

function Bit({
  bit,
  theme,
  className,
}: {
  bit: Bit;
  theme: string;
  className?: string;
}) {
  const { locale } = useRouter();

  return (
    <div className={cn("flex flex-col py-6 md:flex-row", className)}>
      <div className="mb-3 flex w-full flex-row gap-2 md:mr-2 md:w-52 md:flex-col">
        <BitDate
          date={bit._firstPublishedAt || undefined}
          locale={locale}
          className="whitespace-nowrap"
        />
        <BitTags tags={bit.tags} />
      </div>
      <div className="prose prose-sm w-full rounded-lg bg-white dark:bg-neutral-900 dark:prose-invert md:prose-base">
        <BitContent content={bit.content} theme={theme} />
      </div>
    </div>
  );
}

export default function Bits({ result }: { result: BitsQuery }) {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // TODO: Render a proper skeleton.
  if (!isMounted || resolvedTheme === undefined) return <div>Loading...</div>;

  return (
    <Container>
      {/* TODO: Set up filtering bits by tags. */}
      <div className="flex w-full justify-center">
        <div
          className={cn(
            "flex min-w-0 flex-col divide-y-1 dark:divide-neutral-800"
          )}
        >
          {result.allBits.map((bit) => (
            <Bit key={bit.id} bit={bit} theme={resolvedTheme} />
          ))}
        </div>
      </div>
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
