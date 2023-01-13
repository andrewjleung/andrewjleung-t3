/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    typography: (theme) => ({}),
    extend: {
      typography: (theme) => ({
        dark: {
          css: {
            color: "white",
          },
        },
      }),
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
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
