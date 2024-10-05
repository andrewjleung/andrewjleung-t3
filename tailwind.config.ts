import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			screens: {
				xs: "475px",
				...defaultTheme.screens,
			},
			backgroundSize: {
				oversized: "400% 400%",
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
			},
			fontSize: {
				"2xs": "0.625rem",
			},
			animation: {
				"background-pan": "background-pan 2s",
				"fade-up": "fade-up 1.75s ease-in-out",
				"light-up": "light-up 3s ease-in-out",
			},
			keyframes: {
				"background-pan": {
					"0%": {
						"background-position": "100% 100%",
					},
					"100%": {
						"background-position": "0% 0%",
					},
				},
				"fade-up": {
					"0%": { opacity: "0", transform: "translateY(5%)" },
					"50%": { opacity: "0", transform: "translateY(5%)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"light-up": {
					"0%": { opacity: "0" },
					"100%": { opacity: "0.2" },
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
	darkMode: "class",
} satisfies Config;
