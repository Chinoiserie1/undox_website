/** @type {import('tailwindcss').Config} */

// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ob: {
          blackbg: "#222222",
          blackborder: "#2C2C2C",
        },
      },
      borderWidth: {
        3: "3px",
      },
      borderRadius: {
        "2.5xl": "20px",
      },
      fontSize: {
        xxs: ".65rem",
      },
      dropShadow: {
        "3xl": "0 15px 15px rgba(0, 0, 0, 0.3)",
      },
    },
    fontFamily: {
      proxima: ["proxima"],
      arial: ["arial"],
    },
    variants: {
      extend: {
        transitionProperty: ["group-hover"],
        inset: ["group-hover"],
      },
    },
  },
  plugins: [],
};
