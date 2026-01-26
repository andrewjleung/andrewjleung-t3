export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mb-auto max-w-(--breakpoint-md) px-10">{children}</div>;
}
