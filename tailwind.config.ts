import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#F6F6F4',
        'card-bg-start': '#0B0B0C',
        'card-bg-end': '#1A1A1C',
        'headline-white': '#F3F1ED',
        'muted-gray': '#B8B8B8',
        'button-bg': '#EFEDE7',
        'nav-gray': '#9A9A9A',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'hero': '1200px',
      },
      borderRadius: {
        'hero': '16px',
      },
    },
  },
  plugins: [],
}

export default config


