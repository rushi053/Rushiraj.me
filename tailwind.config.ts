import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        primary: {
          black: '#212125',
          sand: '#DBDBCD',
          'dark-grey': '#626262',
          westar: '#E5E3DB',
          'off-white': '#F8F8F8',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config 