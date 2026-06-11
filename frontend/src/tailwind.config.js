/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A6B4A',  // verde escuro principal
          light: '#2D8B63',
          dark: '#145538',
        },
        accent: {
          orange: '#F5A623',   // badge "Comunidade Ativa"
          green: '#2ECC8A',    // texto verde no hero
        },
        surface: {
          DEFAULT: '#F0EDE6',  // fundo bege/creme
          card: '#FFFFFF',
        },
        sidebar: {
          bg: '#FFFFFF',
          active: '#1A6B4A',
          text: '#3D3D3D',
          muted: '#8A8A8A',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#555555',
          muted: '#888888',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
    },
  },
  plugins: [],
}