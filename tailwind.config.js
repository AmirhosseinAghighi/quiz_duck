/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ["sky-blue"]: "#20A39E",
        ["text-gray"]: "rgba(255, 255, 255, 0.75)",
        ["main_pink"]: "#7D1D3F",
        ["main_blue"]: "#3A405A",
        ["main_yellow"]: "#FFBA49",
        ["dark_orange"]: "#61210F",
      }
    },
  },
  plugins: [],
}

