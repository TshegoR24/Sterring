/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'inmotion': {
          'primary': '#1E3A8A', // Dark blue
          'secondary': '#059669', // Green
          'accent': '#F59E0B', // Orange
          'dark': '#111827', // Dark background
          'light': '#F3F4F6', // Light text
          'gray': '#6B7280', // Gray text
          'black': '#000000', // Pure black
        }
      },
      fontFamily: {
        'sans': ['Segoe UI', 'Arial', 'sans-serif'],
        'display': ['Segoe UI', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 