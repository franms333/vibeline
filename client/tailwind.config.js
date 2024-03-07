/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'master-detail': '1fr 3fr'
        // 'master-detail': '350px 1fr'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true, preferredStrategy: 'pseudoelements' }),
    require("daisyui")
  ],
}

