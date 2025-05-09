/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        black: '#212125',
        sand: '#DBD8CD',
        'dark-grey': '#626262',
        westar: '#E5E3DB',
        'off-white': '#F8F8F8',
      },
    },
  },
  plugins: [],
}

