import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#C8953A',
        secondary: '#2D5016',
        accent: '#E8F4E8',
        background: '#FAFAF7'
      },
      fontFamily: {
        philosopher: ['Philosopher', 'serif'],
        inter: ['Inter', 'sans-serif']
      },
      minHeight: {
        touch: '44px'
      },
      minWidth: {
        touch: '44px'
      }
    }
  },
  plugins: []
} satisfies Config;
