/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00aa55',
        secondary: '#ccffe4',
        primaryLight: '#00cc66',
      },
    },
  },
  plugins: [],
};
