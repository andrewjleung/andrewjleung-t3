export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mb-auto max-w-screen-md">{children}</div>;
}
