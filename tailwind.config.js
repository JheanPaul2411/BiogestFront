/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        cyan: {
          50: "#faf4ff",
          100: "#f3e6ff",
          200: "#e8d2ff",
          300: "#d7aeff",
          400: "#be7bff",
          500: "#a549ff",
          600: "#9125f8",
          700: "#7c15db",
          800: "#6b17b5",
          900: "#57148f",
          950: "#3a006b",
        },
      },
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}" /* src folder, for example */,
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  plugins: [import("flowbite/plugin")],
  darkMode: "class",
};
