/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          indigo: '#6366f1',
          violet: '#8b5cf6',
          cyan: '#06b6d4',
        },
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
      },
      keyframes: {
        auroraFloat: {
          '0%':   { transform: 'translate(0,0) scale(1)' },
          '33%':  { transform: 'translate(40px,-30px) scale(1.06)' },
          '66%':  { transform: 'translate(-25px,20px) scale(0.97)' },
          '100%': { transform: 'translate(15px,-15px) scale(1.03)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0.5), 0 0 0 8px rgba(139,92,246,0.2)' },
          '50%':      { boxShadow: '0 0 0 10px rgba(99,102,241,0.15), 0 0 0 20px rgba(6,182,212,0.08)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      animation: {
        aurora:    'auroraFloat 20s ease-in-out infinite alternate',
        shimmer:   'shimmer 4s linear infinite',
        pulseRing: 'pulseRing 2.5s ease-in-out infinite',
        blink:     'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
