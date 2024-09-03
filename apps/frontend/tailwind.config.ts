import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        primary: '#00a6fb',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(156, 163, 175, 0.5) rgba(229, 231, 235, 0.5)',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: 'none',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(229, 231, 235, 0.5)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(156, 163, 175, 0.5)',
            borderRadius: '8px',
            border: '2px solid white',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },

    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '&::-webkit-scrollbar-track': {
            display: 'none',
          },
          '&::-webkit-scrollbar-thumb': {
            display: 'none',
          },
        },
        '.no.scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;

export default config;
