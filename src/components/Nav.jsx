import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Play, Sun, Moon } from 'lucide-react';
import Logo from './Logo.jsx';
import useTheme from '../lib/theme.jsx';

const products = [
  { to: '/owner', name: 'HostPilot Owner', desc: 'Statements, payouts, approvals' },
  { to: '/ops', name: 'HostPilot Ops', desc: 'The staff console' },
  { to: '/guest', name: 'HostPilot Guest', desc: 'Stay app and add-ons' },
  { to: '/field', name: 'HostPilot Field', desc: 'The staff mobile app' },
  { to: '/full-suite', name: 'Full suite', desc: 'All four, one database' },
];

function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const next = theme === 'light' ? 'dark' : 'light';
  return (
    <button
      type="button"
      onClick={toggle}
      className={`theme-toggle ${className}`}
      aria-label={`Switch to the ${next} theme`}
      title={`Switch to the ${next} theme`}
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? 'border-b border-hp-lineSoft bg-[color:var(--hp-nav)] backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      {!solid && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[image:var(--hp-nav-top)]"
        />
      )}
      <div className="relative shell-wide flex h-16 items-center justify-between gap-4">
        <Link to="/" className="text-hp-text" aria-label="HostPilot Pro home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
          >
            <button
              className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] text-hp-text2 transition hover:text-hp-text"
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
            >
              Product <ChevronDown size={15} className={menu ? 'rotate-180 transition' : 'transition'} />
            </button>
            {menu && (
              <div className="absolute left-0 top-full w-[330px] pt-2">
                <div className="hp-card overflow-hidden p-1.5">
                  {products.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="block rounded-xl px-3.5 py-2.5 transition hover:bg-[color:var(--hp-veil-3)]"
                    >
                      <div className="text-[14.5px] font-medium text-hp-text">{p.name}</div>
                      <div className="text-[13px] text-hp-text3">{p.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/tour"
            className={({ isActive }) =>
              `ml-1 flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[15px] transition ${
                isActive
                  ? 'border-hp-gold/60 bg-[color:var(--hp-gold-wash-2)] text-hp-goldInk'
                  : 'border-hp-gold/35 text-hp-goldInk hover:bg-[color:var(--hp-gold-wash-2)]'
              }`
            }
          >
            <Play size={13} className="fill-current" /> Live tour
          </NavLink>

          {[
            ['/pricing', 'Pricing'],
            ['/about', 'About'],
            ['/proof', 'Proof'],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-[15px] transition ${
                  isActive ? 'text-hp-text' : 'text-hp-text2 hover:text-hp-text'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Link to="/demo" className="btn btn-gold !py-2.5 !text-[14.5px]">
            Book a call
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
        <button
          className="rounded-lg border border-hp-line p-2 text-hp-text"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hp-lineSoft bg-[color:var(--hp-nav-solid)] px-5 pb-6 pt-3 lg:hidden">
          <Link to="/tour" className="btn btn-gold w-full">
            Open the live tour
          </Link>
          <div className="mt-4 grid gap-0.5">
            {products.map((p) => (
              <Link key={p.to} to={p.to} className="py-2 text-[15px] text-hp-text2">
                {p.name}
              </Link>
            ))}
            <div className="rule my-2" />
            {[
              ['/pricing', 'Pricing'],
              ['/about', 'About'],
              ['/proof', 'Proof'],
              ['/blog', 'Field notes'],
              ['/demo', 'Book a call'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="py-2 text-[15px] text-hp-text2">
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
