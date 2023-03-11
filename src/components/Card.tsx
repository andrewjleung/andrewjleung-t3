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
        "relative rounded-xl bg-white bg-gradient-to-br outline outline-1 outline-neutral-200 transition-all duration-300 ease-in-out after:absolute after:left-0 after:top-0 after:-z-10 after:block after:h-full after:w-full after:shadow-card hover:outline-black dark:border-neutral-800 dark:bg-black dark:from-neutral-900/80 dark:via-neutral-900/60 dark:to-black dark:outline-neutral-800  dark:after:shadow-none hover:dark:border-neutral-600 hover:dark:bg-neutral-900/70",
        className
      )}
    >
      {children}
    </div>
  );
}
