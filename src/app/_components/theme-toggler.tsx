"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function TogglerIcon({
	theme,
	size,
	className,
}: {
	theme: string;
	size: number;
	className?: string;
}) {
	if (theme === "dark") {
		return (
			<Moon weight="fill" className={className} width={size} height={size} />
		);
	}

	return <Sun weight="fill" className={className} width={size} height={size} />;
}

export default function ThemeToggler({ className }: { className?: string }) {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Per the `next-themes` documentation, `useTheme` is hydration unsafe since
	// `theme` is not known on the server, and will be undefined until mounted on
	// the client. This is used to delay rendering the toggle until it is mounted.
	// See https://github.com/pacocoursey/next-themes#usetheme.
	useEffect(() => {
		setMounted(true);
	}, []);

	function toggleTheme() {
		if (resolvedTheme === "dark") {
			setTheme("light");
			return;
		}

		setTheme("dark");
	}

	if (!mounted || resolvedTheme === undefined) {
		return <div className={clsx("h-8 w-8 cursor-pointer", className)} />;
	}

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className={clsx(
				"flex h-8 w-8 cursor-pointer items-center justify-center transition-all duration-200 ease-in-out dark:text-neutral-500 dark:hover:text-white dark:active:bg-transparent",
				className,
			)}
		>
			<TogglerIcon theme={resolvedTheme} size={16} />
		</button>
	);
}
