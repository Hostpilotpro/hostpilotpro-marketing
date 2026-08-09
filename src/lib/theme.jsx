import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Site theme. Two options: the original near-black canvas ('dark') and the
 * warm champagne canvas ('light'), which matches the shipped Owner and Guest
 * portals.
 *
 * Light is the default so the new option is what loads. The choice is held in
 * React state only — no localStorage, because sandboxed iframes block it.
 */
const ThemeContext = createContext({ theme: 'light', setTheme: () => {}, toggle: () => {} });

export function ThemeProvider({ children, initial = 'light' }) {
  const [theme, setTheme] = useState(initial);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#F7F2E7' : '#0D0C0A');
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>;
}

export default function useTheme() {
  return useContext(ThemeContext);
}
