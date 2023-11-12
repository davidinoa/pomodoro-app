import defaultTheme from 'tailwindcss/defaultTheme'
import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sunset: '#f87070',
        glacier: '#70f3f8',
        orchid: '#d881f8',
        nimbus: '#d7e0ff',
        eclipse: '#1e213f',
        blizzard: '#ffffff',
        whisper: '#eff1fa',
        obsidian: '#161932',
        theme: 'var(--theme-color)',
      },
      fontFamily: {
        sans: ['"Kumbh Sans"', ...defaultTheme.fontFamily.sans],
        serif: ['"Roboto Slab"', ...defaultTheme.fontFamily.serif],
        mono: ['"Space Mono"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      defaultTheme: 'dark',
      defaultExtendTheme: 'dark',
      themes: {
        dark: {
          colors: {
            background: '#1e213f',
          },
        },
      },
    }),
  ],
}
