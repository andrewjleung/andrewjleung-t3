/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-up-0": "fade-up-0 4s",
        "fade-up-1": "fade-up-1 3s",
        "fade-up-2": "fade-up-2 3s",
        "fade-up-3": "fade-up-3 3s",
        "fade-up-4": "fade-up-4 3s",
        "fade-up-5": "fade-up-5 3s",
        stretch: "stretch 3s",
      },
      keyframes: {
        "fade-up-0": {
          "0%": { opacity: 0, transform: "translateY(80%)" },
          "30%": { transform: "translateY(0)" },
          "50%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "fade-up-1": {
          "0%": { opacity: 0, transform: "translateY(80%)" },
          "10%": { opacity: 0, transform: "translateY(80%)" },
          "40%": { transform: "translateY(0)" },
          "60%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "fade-up-2": {
          "0%": { opacity: 0, transform: "translateY(80%)" },
          "20%": { opacity: 0, transform: "translateY(80%)" },
          "50%": { transform: "translateY(0)" },
          "70%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "fade-up-3": {
          "0%": { opacity: 0, transform: "translateY(80%)" },
          "30%": { opacity: 0, transform: "translateY(80%)" },
          "60%": { transform: "translateY(0)" },
          "80%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "fade-up-4": {
          "0%": { opacity: 0, transform: "translateY(80%)" },
          "40%": { opacity: 0, transform: "translateY(80%)" },
          "70%": { transform: "translateY(0)" },
          "90%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "fade-up-5": {
          "0%": { opacity: 0, transform: "translateY(80%)" },
          "50%": { opacity: 0, transform: "translateY(80%)" },
          "80%": { transform: "translateY(0)" },
          "100%": { opacity: 1 },
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
