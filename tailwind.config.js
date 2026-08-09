/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        hp: {
          bg: '#0D0C0A',
          surface: '#141210',
          card: '#1B1815',
          hi: '#232019',
          line: '#2E2A23',
          lineSoft: '#221F1A',
          gold: '#E3C89B',
          goldDeep: '#C2A470',
          goldDim: '#8A7A59',
          text: '#FBFAF6',
          text2: '#C9C3B7',
          text3: '#8B857A',
          pos: '#7FA66B',
          neg: '#C4705C',
          info: '#6E8CA8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.8)',
        frame: '0 40px 120px -40px rgba(0,0,0,0.9)',
        goldGlow: '0 0 0 1px rgba(227,200,155,0.35), 0 18px 40px -18px rgba(227,200,155,0.35)',
      },
      maxWidth: { container: '1200px', wide: '1400px' },
      letterSpacing: { eyebrow: '0.16em' },
    },
  },
  plugins: [],
};
