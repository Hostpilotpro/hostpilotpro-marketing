import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Sun, Moon } from 'lucide-react';
import Logo from './Logo.jsx';
import useTheme from '../lib/theme.jsx';
import { audiences } from '../data/audiences.js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname, search } = useLocation();
  const { theme, toggle } = useTheme();
  useEffect(() => setOpen(false), [pathname, search]);
  useEffect(() => {
    const close = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const navClass = ({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`;
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hp-lineSoft bg-[color:var(--hp-nav)] backdrop-blur-xl">
      <div className="shell-wide flex h-16 items-center justify-between gap-3">
        <Link to="/" aria-label="HostPilot Pro home"><Logo /></Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {audiences.map((a) => <NavLink key={a.key} to={a.to} className={navClass}>{a.label}</NavLink>)}
          <NavLink to="/tour" className={navClass}><FileText size={13} /> Walkthroughs</NavLink>
          <NavLink to="/pricing" className={navClass}>Pricing</NavLink>
          <NavLink to="/proof" className={navClass}>MPS showcase</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/demo" className="btn btn-gold !py-2 !text-[14px] hidden sm:inline-flex">Book a call</Link>
          <button type="button" onClick={toggle} className="theme-toggle" aria-label={`Switch to the ${theme === 'light' ? 'dark' : 'light'} theme`}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button type="button" className="rounded-lg border border-hp-line p-2 xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && <nav id="mobile-navigation" className="border-t border-hp-lineSoft bg-[color:var(--hp-nav-solid)] p-5 xl:hidden max-h-[calc(100dvh-64px)] overflow-y-auto" aria-label="Mobile">
        <p className="eyebrow mb-3">Discover HostPilot Pro for</p>
        {audiences.map((a) => <NavLink key={a.key} to={a.to} className={({ isActive }) => `block rounded-xl p-3 ${isActive ? 'bg-[color:var(--hp-gold-wash-2)]' : ''}`}>
          <span className="block font-medium">{a.label}</span><span className="text-[13px] text-hp-text3">{a.product}</span>
        </NavLink>)}
        <div className="rule my-3" />
        {[['/tour', 'PDF walkthroughs'], ['/proof', 'MPS showcase'], ['/pricing', 'Pricing'], ['/about', 'About'], ['/demo', 'Book a call']].map(([to, text]) => <Link className="block p-3" key={to} to={to}>{text}</Link>)}
      </nav>}
    </header>
  );
}
