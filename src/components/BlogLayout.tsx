import Layout from "./Layout";

export default function BlogLayout({
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Layout className="flex justify-center px-6 sm:px-24">
      <div className="rounded-xl p-6 dark:bg-neutral-900 dark:outline dark:outline-2 dark:outline-neutral-800 sm:mt-3 sm:mb-6 sm:p-12">
        <div className="prose dark:prose-invert">{children}</div>
      </div>
    </Layout>
  );
}
