import cn from "classnames";

export default function Layout({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto h-full w-full max-w-screen-lg", className)}>
      {children}
    </div>
  );
}
