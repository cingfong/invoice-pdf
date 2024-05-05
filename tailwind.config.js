/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", //記得要是字串
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

