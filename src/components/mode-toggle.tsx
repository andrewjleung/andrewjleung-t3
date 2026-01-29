import * as React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
	const [theme, setThemeState] = React.useState<
		"theme-light" | "dark" | "system"
	>("theme-light");

	React.useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains("dark");
		setThemeState(isDarkMode ? "dark" : "theme-light");
	}, []);

	React.useEffect(() => {
		const isDark =
			theme === "dark" ||
			(theme === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);
		document.documentElement.classList[isDark ? "add" : "remove"]("dark");
	}, [theme]);

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger>
				<span className="text-muted-foreground hover:cursor-pointer hover:text-foreground">
					Set theme
				</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="top" align="end" className="dark:border-0">
				<DropdownMenuItem onClick={() => setThemeState("theme-light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setThemeState("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setThemeState("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
