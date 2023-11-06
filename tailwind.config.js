import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sunset: '#f87070',
        glacier: '#70f3f8',
        orchid: '#d881f8',
        nimbus: '#d7e0ff',
        eclipse: '#13213f',
        blizzard: '#ffffff',
        whisper: '#eff1fa',
        obsidian: '#161932',
      },
      fontFamily: {
        sans: ['"Kumbh Sans"', ...defaultTheme.fontFamily.sans],
        serif: ['"Roboto Slab"', ...defaultTheme.fontFamily.serif],
        mono: ['"Space Mono"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}
