/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        spotify: "#1db954",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
