/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    },
    extend: {
      gridTemplateColumns: {
        'master-detail-desktop': 'minmax(350px, 1fr) 3fr',
        'master-detail-mobile-tablet': 'minmax(250px, 1fr) 2fr'
        // 'master-detail': '1fr 3fr'
        // 'master-detail': '350px 1fr'
      },
      backgroundImage: {
        'chat-pattern-lightmode': "url('/src/assets/light-pattern.png')",
        'chat-pattern-darkmode': "url('/src/assets/pattern.png')",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true, preferredStrategy: 'pseudoelements' }),
    require("daisyui"),
    require('tailwindcss-animated')
  ],
  daisyui: {
    themes: ['light', 'dark'],
  }
}

