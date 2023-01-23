export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mx-auto h-full w-full max-w-screen-lg">{children}</div>
  );
}
