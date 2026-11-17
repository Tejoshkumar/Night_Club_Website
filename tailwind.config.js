/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nc: {
          bg: '#09090D',
          'surface-1': '#111218',
          'surface-2': '#191A23',
          'surface-3': '#20212C',
          border: '#292A36',
          text: '#F1F0F5',
          'text-muted': '#9696A8',
          'text-subtle': '#707184',
          violet: '#9B7BFF',
          'violet-soft': '#B9A6FF',
          blue: '#8BB9FF',
          success: '#9AD8B0',
          warning: '#E8C58C',
          danger: '#E58F9A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      },
      borderRadius: {
        'sm': '8px',
        'DEFAULT': '12px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'pill': '9999px',
      },
      boxShadow: {
        'glow-violet': '0 0 35px -5px rgba(155, 123, 255, 0.25)',
        'glow-subtle': '0 0 20px 0 rgba(155, 123, 255, 0.12)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
