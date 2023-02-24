import cn from "classnames";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border-1 border-black bg-gradient-to-br transition-all duration-300 ease-in-out dark:border-neutral-800 dark:from-black dark:via-neutral-900/40 dark:to-neutral-900/75 hover:dark:border-neutral-600 hover:dark:bg-neutral-900/50",
        className
      )}
    >
      {children}
    </div>
  );
}
