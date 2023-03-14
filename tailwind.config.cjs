/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-up-0": "fade-up-0 3s",
        "fade-up-1": "fade-up-1 2s",
        "fade-up-2": "fade-up-2 2s",
        "fade-up-3": "fade-up-3 2s",
        "fade-up-4": "fade-up-4 2s",
        "fade-up-5": "fade-up-5 2s",
        "fade-up-6": "fade-up-6 2s",
        "fade-down-0": "fade-down-0 6s",
        "light-up": "light-up 3s",
        stretch: "stretch 3s",
      },
      keyframes: {
        "fade-up-0": {
          "0%": { opacity: 0, transform: "translateY(60%)" },
          "20%": { transform: "translateY(0)" },
          "40%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "fade-up-1": {
          "0%": { opacity: 0, transform: "translateY(60%)" },
          "10%": { opacity: 0, transform: "translateY(60%)" },
          "30%": { transform: "translateY(0)" },
          "50%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "fade-up-2": {
          "0%": { opacity: 0, transform: "translateY(60%)" },
          "20%": { opacity: 0, transform: "translateY(60%)" },
          "40%": { transform: "translateY(0)" },
          "80%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "fade-up-3": {
          "0%": { opacity: 0, transform: "translateY(60%)" },
          "30%": { opacity: 0, transform: "translateY(60%)" },
          "50%": { transform: "translateY(0)" },
          "70%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "fade-up-4": {
          "0%": { opacity: 0, transform: "translateY(60%)" },
          "40%": { opacity: 0, transform: "translateY(60%)" },
          "60%": { transform: "translateY(0)" },
          "80%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "fade-up-5": {
          "0%": { opacity: 0, transform: "translateY(60%)" },
          "50%": { opacity: 0, transform: "translateY(60%)" },
          "70%": { transform: "translateY(0)" },
          "90%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "fade-up-6": {
          "0%": { opacity: 0, transform: "translateY(60%)" },
          "60%": { opacity: 0, transform: "translateY(60%)" },
          "80%": { transform: "translateY(0)" },
          "100%": { opacity: 1 },
        },
        "fade-down-0": {
          "0%": { opacity: 0, transform: "translateY(-60%)" },
          "20%": { transform: "translateY(0)" },
          "40%": { opacity: 1 },
          "100%": { opacity: 1 },
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
