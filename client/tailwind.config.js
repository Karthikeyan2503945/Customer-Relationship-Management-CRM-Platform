/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
        },
        secondary: {
          DEFAULT: '#1E293B',
          hover: '#0F172A',
        },
        accent: {
          DEFAULT: '#06B6D4',
          hover: '#0891B2',
        },
        lightBg: '#F8FAFC',
        darkBg: '#020617',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      borderRadius: {
        'card': '20px',
        'button': '14px',
        'input': '14px',
        'modal': '24px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2' }],
        'h1': ['36px', { lineHeight: '1.3' }],
        'h2': ['28px', { lineHeight: '1.35' }],
        'h3': ['22px', { lineHeight: '1.4' }],
        'body': ['16px', { lineHeight: '1.5' }],
        'small': ['14px', { lineHeight: '1.45' }],
      },
    },
  },
  plugins: [],
}

