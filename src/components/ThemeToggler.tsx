import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Per the `next-themes` documentation, `useTheme` is hydration unsafe since
  // `theme` is not known on the server, and will be undefined until mounted on
  // the client. This is used to delay rendering the toggle until it is mounted.
  // See https://github.com/pacocoursey/next-themes#usetheme.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <button
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      {resolvedTheme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}
