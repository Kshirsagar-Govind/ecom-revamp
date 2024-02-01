/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'primary': '#14b8a6',
            'secondary': '#e7e5e4',
            'ternary': '#000000',
            'primary-dark': '#002635',
            'secondary-dark': '#001118',
            'ternary-dark': '#ffffff'
        },
        boxShadow: {
            '4xl': '0px 34px 21px -12px rgba(0, 0, 0, 0.16);',
            'dark-shadow': '0px 18px 15px -3px rgba(0, 0, 0, 0.18);'
        }
    }
},
  plugins: [],
}