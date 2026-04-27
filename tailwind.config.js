/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enables toggling via html.dark
  theme: {
    extend: {
      colors: {
        primary: '#B91C1C',    // Deep Red
        secondary: '#1F2937',  // Charcoal
        neutral: {
          light: '#F9FAFB',
          border: '#E5E7EB',
        },
        redMain: '#B91C1C', // Backwards compatibility
        charcoal: '#1F2937', // Backwards compatibility
        neutralLight: '#F9FAFB', // Backwards compatibility
      },
      borderRadius: {
        'button': '1.5rem',
        'card': '2.5rem',
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(31, 41, 55, 0.08)',
        'red-glow': '0 10px 15px -3px rgba(185, 28, 28, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['2.5rem', { lineHeight: '1.1', fontWeight: '900', letterSpacing: '-0.05em' }],
        'heading': ['1.875rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'base': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'action': ['0.75rem', { lineHeight: '1', fontWeight: '700', letterSpacing: '0.1em' }],
        h1: ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        h2: ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
      },
        keyframes: {
    fadeIn: {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
  animation: {
    fadeIn: 'fadeIn 0.5s ease-out forwards',
  },
      typography: {
        DEFAULT: {
          css: {
            color: '#1F2937',
            a: { color: '#B91C1C' },
            h1: { color: '#1F2937' },
            h2: { color: '#1F2937' },
            p: { color: '#1F2937' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
