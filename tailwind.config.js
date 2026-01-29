/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sasanka: {
          green: '#4CAF50', // Placeholder green, will refine
          dark: '#2E3D30',
          light: '#F5F9F5',
        }
      }
    },
  },
  plugins: [],
}
