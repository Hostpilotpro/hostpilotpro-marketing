/** @type {import('tailwindcss').Config} */

// Colours resolve from CSS custom properties so the same class works in the
// dark theme, the light champagne theme and inside the fixed-theme product
// replicas. Channel triplets keep Tailwind's `/opacity` modifiers working.
const c = (v) => `rgb(var(${v}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        hp: {
          bg: c('--hp-bg-rgb'),
          surface: c('--hp-surface-rgb'),
          card: c('--hp-card-rgb'),
          hi: c('--hp-hi-rgb'),
          line: c('--hp-line-rgb'),
          lineSoft: c('--hp-line-soft-rgb'),
          gold: c('--hp-gold-rgb'),
          goldDeep: c('--hp-gold-deep-rgb'),
          goldDim: c('--hp-gold-dim-rgb'),
          goldInk: c('--hp-gold-ink-rgb'),
          text: c('--hp-text-rgb'),
          text2: c('--hp-text-2-rgb'),
          text3: c('--hp-text-3-rgb'),
          pos: c('--hp-pos-rgb'),
          neg: c('--hp-neg-rgb'),
          info: c('--hp-info-rgb'),
          warn: c('--hp-warn-rgb'),
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: 'var(--hp-card-shadow)',
        frame: 'var(--hp-frame-shadow)',
        goldGlow: '0 0 0 1px var(--hp-gold-rule), 0 18px 40px -18px var(--hp-gold-glow)',
      },
      maxWidth: { container: '1200px', wide: '1400px' },
      letterSpacing: { eyebrow: '0.16em' },
    },
  },
  plugins: [],
};
