/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-up": "fade-up 2s",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(25%)" },
          "60%": { transform: "translateY(0)" },
          "100%": { opacity: 1 },
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
