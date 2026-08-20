// @ts-check

import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import vercelAdapter from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [markdoc(), react()],

    redirects: {
        "/resume":
            "https://andrewjleung.github.io/resumes/AndrewLeung_Resume.pdf",
        "/github": "https://github.com/andrewjleung",
        "/linkedin": "https://linkedin.com/in/andrewjleung-",
    },

    adapter: vercelAdapter(),

    fonts: [
        {
            provider: fontProviders.fontshare(),
            name: "Switzer",
            cssVariable: "--font-switzer",
            styles: ["normal"],
            weights: ["100 900"],
        },
    ],
});

