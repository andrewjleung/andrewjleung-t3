/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-up": "fade-up 2s",
        stretch: "stretch 3s",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(80%)" },
          "60%": { transform: "translateY(0)" },
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
