/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'master-detail-desktop': 'minmax(350px, 1fr) 3fr',
        'master-detail-mobile-tablet': 'minmax(250px, 1fr) 2fr'
        // 'master-detail': '1fr 3fr'
        // 'master-detail': '350px 1fr'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true, preferredStrategy: 'pseudoelements' }),
    require("daisyui")
  ],
}

