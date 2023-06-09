export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl p-6 dark:bg-neutral-900 dark:outline dark:outline-2 dark:outline-neutral-800 sm:mb-6 sm:mt-3 sm:p-12">
      <div className="prose dark:prose-invert">{children}</div>
    </div>
  );
}
