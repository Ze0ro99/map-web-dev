/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#32CD32', // Xenial-like green
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // More Xenial-like font style
      },
    },
  },
  plugins: [],
};
