/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/templates/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      'up-lg': { min: '942px' },
      'down-lg': { max: '940px' },
      'up-md': { min: '913px' },
      'down-md': { max: '539px' },
      'up-sm': { min: '551px' },
      'down-sm': { max: '324px' },
      'up-desktop': { min: '1281px' },
      'down-desktop': { max: '1279px' },
      'up-tablet': { min: '821px' },
      'down-tablet': { max: '767px' },
      'up-phone': { min: '421px' },
      'down-phone': { max: '299px' },
      phone: { min: '300px', max: '420px' },
      tablet: { min: '768px', max: '820px' },
      sm: { min: '325px', max: '550px' },
      md: { min: '540px', max: '912px' },
    },
    fontFamily: {
      primary: ['Inter', ...defaultTheme.fontFamily.sans],
      secondary: ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        base: '#fff',
        primary: '#343240',
        secondary: '#a8acae',
        black: '#263238',
        white: '#fff',
        'gray-1': '#343240',
        'gray-2': '#373d47',
        'gray-3': '#5b6367',
        'gray-4': '#a8acae',
        'gray-5': '#d8dfe3',
        'gray-6': '#eaeaea',
        'gray-7': '#f7f7f7',
        'dark-blue': '#049be0',
        blue: '#03a9f4',
        'light-blue': '#57c1f1',
        'gray-blue': '#f2f4f6',
        'dark-red': '#c14341',
        red: '#ef5350',
        'light-red': '#ff7c79',
        yellow: '#ffd54f',
        green: '#66bb6a',
      },
      backgroundColor: {
        base: '#fff',
        primary: '#f2f4f6',
      },
      fontSize: {
        large: [
          'clamp(1.5rem, 0.7381rem + 3.8095vw, 3.5rem)', // 56
          {
            lineHeight: 'clamp(2rem, 1.2381rem + 3.8095vw, 4rem)', // 64
            fontWeight: 700,
          },
        ],
        h1: [
          'clamp(1.5rem, 0.75rem + 3.3333vw, 2.5rem)', // 40
          {
            lineHeight: 'clamp(2.625rem, 2.4076rem + 1.087vw, 3.25rem)', // 52
            fontWeight: 700,
          },
        ],
        h2: [
          'clamp(1.5rem, 0.9891rem + 1.3043vw, 2rem)', // 32
          {
            lineHeight: 'clamp(2rem, 1.7826rem + 1.087vw, 2.625rem)', // 42
            fontWeight: 700,
          },
        ],
        h3: [
          'clamp(1.125rem, 1.0053rem + 0.6383vw, 1.5rem)', // 24
          {
            lineHeight: 'clamp(1.625rem, 1.5053rem + 0.6383vw, 2rem)', // 32
            fontWeight: 700,
          },
        ],
        'body-1': [
          'clamp(1rem, 0.9202rem + 0.4255vw, 1.25rem)', // 20
          {
            lineHeight: 'clamp(1.5rem, 1.3404rem + 0.8511vw, 2rem)', // 32
            fontWeight: 400,
          },
        ],
        'body-2': [
          'clamp(1rem, 0.9601rem + 0.2128vw, 1.125rem)', // 18
          {
            lineHeight: 'clamp(1.75rem, 1.6702rem + 0.4255vw, 2rem)', // 32
            fontWeight: 400,
          },
        ],
        'body-3': [
          '1rem', // 16
          {
            lineHeight: '24px',
            fontWeight: 400,
          },
        ],
        'body-4': [
          '0.875rem', // 14
          {
            lineHeight: '20px',
            fontWeight: 400,
          },
        ],
        'body-5': [
          '0.75rem', // 12
          {
            lineHeight: '14px',
            fontWeight: 400,
          },
        ],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      // Rewrite text color class prefix to "clr-":
      const colors = theme('colors')
      const textColorClasses = {}
      // output: { ".clr-base": { color: "#fff" } } - taken from the theme
      // usage: <p className="clr-base">...</p>
      for (const [name, color] of Object.entries(colors)) {
        textColorClasses[`.clr-${name}`] = {
          color,
        }
      }

      // Override tw's default background color classes:
      // output: { ".bg-base": { backgroundColor: "#fff" } } - taken from the theme
      // usage: <p className="bg-base">...</p>
      const backgroundColorClasses = {}
      for (const [name, color] of Object.entries(colors)) {
        backgroundColorClasses[`.bg-${name}`] = {
          backgroundColor: color,
        }
      }

      // Remove tw's default text size color prefix
      // output: { ".body-4": { fontSize: "0.875rem" etc... } } - taken from the theme
      // usage <p className="body-4">...</p>
      const fontSize = theme('fontSize')
      const fontSizeClasses = {}
      for (const [name, size] of Object.entries(fontSize)) {
        fontSizeClasses[`.${name}`] = {
          fontSize: size[0],
          lineHeight: size[1].lineHeight,
          fontWeight: size[1].fontWeight,
        }
      }

      // Add all the new classes to tw
      addUtilities({
        ...textColorClasses,
        ...backgroundColorClasses,
        ...fontSizeClasses,
      })
    }),
  ],
}
