/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#fd1e9b",
        "pink-light": "#ffe1e6",
        black: "#000",
        white: "#FFF",
        green: "#adff2f",
        blue: colors.lightBlue, // Using Tailwind's default lightBlue
        purple: "#6441ff",
        orange: "#ff7849",
        yellow: "#ffc82c",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
        // New Colors
        "gray-800": colors.gray[800], // Adjust the shades as needed
        "gray-700": colors.gray[700],
        "gray-600": colors.gray[600],
        "gray-500": colors.gray[500],
        "gray-400": colors.gray[400],
        "gray-300": colors.gray[300],
        "gray-200": colors.gray[200],
        "gray-100": colors.gray[100],
        "green-500": colors.green[500],
      },
    },
  },
  plugins: [],
};
