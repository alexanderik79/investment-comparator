/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        heartbeat: {
          // Имитация двойного удара сердца
          '0%':   { transform: 'scale(1)' },
          '7%':   { transform: 'scale(1.18)' },
          '14%':  { transform: 'scale(1)' },
          '21%':  { transform: 'scale(1.18)' },
          '35%':  { transform: 'scale(1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        // 1.5s — оптимальный ритм для спокойного пульса
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}