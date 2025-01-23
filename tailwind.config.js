/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'harry-potter': ['"Harry Potter"', 'sans-serif'] // เพิ่ม font family
      }
    },
  },
  plugins: [],
}