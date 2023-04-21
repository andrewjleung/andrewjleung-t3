const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      animation: {
        "fade-up": "fade-up 2s ease-in-out",
        "light-up": "light-up 3s ease-in-out",
        stretch: "stretch 3s",
        "background-pan": "background-pan 2s",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(10%)" },
          "50%": { opacity: 0, transform: "translateY(10%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "light-up": {
          "0%": { opacity: 0 },
          "100%": { opacity: 0.2 },
        },
        stretch: {
          "0%": { padding: "0.5rem 1rem" },
          "40%": { padding: "0.5rem 1rem" },
          "50%": { padding: "0.5rem 0.5rem" },
          "65%": { padding: "0.5rem 4rem" },
          "75%": { padding: "0.5rem 4rem" },
          "100%": { padding: "0.5rem 1rem" },
        },
        "background-pan": {
          "0%": {
            "background-position": "100% 100%",
            opacity: 0,
          },
          "100%": {
            "background-position": "0% 0%",
            opacity: 100,
          },
        },
      },
      borderWidth: {
        1: "1px",
      },
      colors: {
        spotify: "#1db954",
      },
      backgroundColor: {},
      fontSize: {
        "2xs": "0.625rem",
      },
      opacity: {
        15: "0.15",
      },
      boxShadow: {
        card: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
    },
    variants: {
      extend: {
        animation: ["motion-safe"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
