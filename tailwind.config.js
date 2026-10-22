/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#04050c',
          900: '#070a16',
          800: '#0d1122',
          700: '#141a30',
          600: '#1d2542',
        },
        saffron: {
          100: '#ffe9c7',
          300: '#ffc46b',
          400: '#ffa62b',
          500: '#f98a09',
          600: '#e06f00',
        },
        lotus: {
          300: '#ff8fa8',
          400: '#f4637d',
          500: '#e0395c',
        },
        peacock: {
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
        },
        indigo2: {
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      boxShadows: {
        glass:
          '0 24px 70px -20px rgba(3, 6, 18, 0.85), inset 0 1px 0 0 rgba(255,255,255,0.14)',
        'glass-lg':
          '0 40px 120px -30px rgba(3, 6, 18, 0.9), inset 0 1px 0 0 rgba(255,255,255,0.18)',
        glow: '0 0 60px -10px rgba(249, 138, 9, 0.55)',
      },
      animation: {
        'aurora-a': 'aurora-a 26s ease-in-out infinite',
        'aurora-b': 'aurora-b 32s ease-in-out infinite',
        'aurora-c': 'aurora-c 38s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-ring': 'pulse-ring 2.6s ease-out infinite',
        marquee: 'marquee 38s linear infinite',
        'spin-slow': 'spin 26s linear infinite',
      },
      keyframes: {
        'aurora-a': {
          '0%,100%': { transform: 'translate3d(-6%, -4%, 0) scale(1)' },
          '50%': { transform: 'translate3d(8%, 6%, 0) scale(1.18)' },
        },
        'aurora-b': {
          '0%,100%': { transform: 'translate3d(6%, 4%, 0) scale(1.1)' },
          '50%': { transform: 'translate3d(-9%, -7%, 0) scale(0.92)' },
        },
        'aurora-c': {
          '0%,100%': { transform: 'translate3d(0, 8%, 0) scale(0.95)' },
          '50%': { transform: 'translate3d(4%, -8%, 0) scale(1.2)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.8' },
          '80%,100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
