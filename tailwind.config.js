/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#000000',
          dark: '#080808',
          card: '#0e0e0e',
          elevated: '#171717',
          surface: '#121212',
        },
        agenciy: {
          white: '#ffffff',
          light: '#e7e7e7',
          muted: '#999999',
          subtle: '#6e6e6e',
          dark: '#262626',
          border: 'rgba(255, 255, 255, 0.09)',
          borderHover: 'rgba(255, 255, 255, 0.22)',
          pillBg: 'rgba(255, 255, 255, 0.05)',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        urbanist: ['Urbanist', 'Inter', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 6s ease-in-out infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
