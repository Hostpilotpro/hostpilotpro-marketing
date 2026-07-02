/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Original HostPilotPro palette
        sky:     { DEFAULT: '#0ea5e9', 600: '#0284c7', 700: '#0369a1' },
        orange:  { DEFAULT: '#f97316', 600: '#ea580c', 700: '#c2410c' },
        slate:   { 900: '#0f172a', 800: '#1e293b', 700: '#334155', 500: '#64748b', 400: '#94a3b8', 300: '#cbd5e1', 200: '#e2e8f0', 100: '#f1f5f9', 50: '#f8fafc' },
        ink:     '#1e293b',
        muted:   '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0ea5e9, #f97316)',
      },
      boxShadow: {
        card:       '0 4px 6px -1px rgba(0,0,0,0.1)',
        'card-lift':'0 20px 25px -5px rgba(0,0,0,0.15)',
        btn:        '0 10px 20px rgba(14,165,233,0.3)',
      },
      maxWidth: { container: '1200px' },
    },
  },
  plugins: [],
};
