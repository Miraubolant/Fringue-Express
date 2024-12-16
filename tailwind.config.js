/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f8',
          100: '#d9e1ed',
          200: '#b3c3db',
          300: '#8da5c9',
          400: '#6687b7',
          500: '#4069a5',
          600: '#335384',
          700: '#263e63',
          800: '#1a2942',
          900: '#0d1421',
        },
      },
    },
  },
  plugins: [],
};