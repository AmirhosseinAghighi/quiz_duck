/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ["blue"]: "#003d86",
        ["sky-blue"]: "#20A39E",
        ["dark-sky-blue"]: "#1d4c46",
        ["light-sky-blue"]: "#8fd0cf",
        ["very-light-sky-blue"]: "#81d8cf",
        ["text-gray"]: "rgba(255, 255, 255, 0.75)",
        ["main_pink"]: "#7D1D3F",
        ["main_blue"]: "#3A405A",
        ["main_yellow"]: "#FFBA49",
        ["main_green"]: "#18ff6d",
        ["main_red"]: "#b53a3a",
        ["dark_orange"]: "#61210F",
      }
    },
  },
  plugins: [],
}

