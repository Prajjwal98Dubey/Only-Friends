/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'doto':["Doto", "sans-serif"],
        'sour':["Sour Gummy", "sans-serif"],
        'bebas':["Bebas Neue", "sans-serif"]
      }
    },
  },
  plugins: [],
}

