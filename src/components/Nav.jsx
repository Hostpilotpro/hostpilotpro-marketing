import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowUpRight, Layers, User, Wrench, Sparkles } from 'lucide-react';
import Logo from './Logo.jsx';

const SOLUTIONS = [
  { to: '/full-suite',   label: 'Full Suite',   tag: 'All three, bundled', description: 'Owner + Ops + Guest — one platform, one contract, one price.', icon: Layers,   featured: true },
  { to: '/owner-portal', label: 'Owner Portal', tag: 'HostPilot Owner',    description: 'Earnings, statements, reviews and inspections — for owners.',   icon: User },
  { to: '/ops-hub',      label: 'Ops Hub',      tag: 'HostPilot Ops',      description: 'Reservations, tasks, payroll and bills — for the internal team.', icon: Wrench },
  { to: '/guest-portal', label: 'Guest Portal', tag: 'HostPilot Guest',    description: 'Guides, add-ons, tours, transport — for guests during their stay.', icon: Sparkles },
];

const OTHER_LINKS = [
  { to: '/features',     label: 'Features' },
  { to: '/pricing',      label: 'Pricing' },
  { to: '/about',        label: 'About' },
  { to: '/testimonials', label: 'Testimonials' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [mobileSolOpen, setMobileSolOpen] = useState(false);
  const solRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setSolOpen(false); setOpen(false); setMobileSolOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onDown = (e) => { if (solRef.current && !solRef.current.contains(e.target)) setSolOpen(false); };
    const onKey = (e) => e.key === 'Escape' && setSolOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, []);

  const solutionRoutes = SOLUTIONS.map((s) => s.to);
  const solutionsActive = solutionRoutes.includes(location.pathname);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200' : 'bg-transparent'}`}>
      <div className="container-editorial flex items-center justify-between h-20">
        <Link to="/" aria-label="HostPilotPro home"><Logo /></Link>

        <nav className="hidden md:flex items-center gap-8">
          <div
            ref={solRef}
            className="relative"
            onMouseEnter={() => setSolOpen(true)}
            onMouseLeave={() => setSolOpen(false)}
          >
            <button
              onClick={() => setSolOpen((v) => !v)}
              aria-expanded={solOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${solutionsActive ? 'text-sky' : 'text-slate-700 hover:text-sky'}`}
            >
              Solutions
              <ChevronDown size={14} className={`transition-transform duration-200 ${solOpen ? 'rotate-180' : ''}`} />
            </button>

            {solOpen && (
              <div className="absolute top-full right-0 pt-3 w-[560px]" role="menu">
                <div className="bg-white border border-slate-200 shadow-card-lift rounded-xl overflow-hidden">
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {SOLUTIONS.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Link
                          key={s.to}
                          to={s.to}
                          onClick={() => setSolOpen(false)}
                          className={`group p-4 rounded-lg transition-colors ${s.featured ? 'col-span-2 bg-brand-gradient text-white' : 'hover:bg-slate-50'}`}
                        >
                          <div className="flex items-start gap-3.5">
                            <span className={`mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${s.featured ? 'bg-white/20 text-white' : 'bg-slate-100 text-sky group-hover:bg-sky/10'}`}>
                              <Icon size={16} strokeWidth={1.9} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={`font-semibold text-sm ${s.featured ? 'text-white' : 'text-ink'}`}>{s.label}</span>
                                {s.featured && (
                                  <span className="text-[9px] uppercase tracking-widest bg-white/25 text-white px-1.5 py-0.5 rounded font-semibold">Recommended</span>
                                )}
                              </div>
                              <div className={`text-[10px] uppercase tracking-[0.14em] font-semibold mb-1.5 ${s.featured ? 'text-white/80' : 'text-sky'}`}>{s.tag}</div>
                              <p className={`text-xs leading-relaxed ${s.featured ? 'text-white/90' : 'text-muted'}`}>{s.description}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between bg-slate-50">
                    <span className="text-xs text-muted">Individual plugins or the full suite — you choose.</span>
                    <Link to="/pricing" onClick={() => setSolOpen(false)} className="inline-flex items-center gap-1 text-xs font-semibold text-sky hover:gap-1.5 transition-all">
                      Compare pricing <ArrowUpRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {OTHER_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-sky' : 'text-slate-700 hover:text-sky'}`}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/demo" className="btn-primary text-sm py-2.5">Request a demo</Link>
        </nav>

        <button className="md:hidden text-slate-700" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="container-editorial py-6 flex flex-col gap-1">
            <button onClick={() => setMobileSolOpen((v) => !v)} className="flex items-center justify-between py-3 text-base font-semibold text-ink border-b border-slate-200">
              Solutions
              <ChevronDown size={16} className={`transition-transform ${mobileSolOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileSolOpen && (
              <div className="pl-1 py-2 space-y-2 border-b border-slate-200">
                {SOLUTIONS.map((s) => (
                  <Link key={s.to} to={s.to} className={`block py-2.5 px-3 rounded-lg ${s.featured ? 'bg-brand-gradient text-white' : 'text-slate-700'}`}>
                    <div className={`font-semibold ${s.featured ? 'text-white' : 'text-ink'}`}>
                      {s.label}
                      {s.featured && <span className="ml-2 text-[9px] uppercase tracking-widest bg-white/25 text-white px-1.5 py-0.5 rounded font-semibold">Recommended</span>}
                    </div>
                    <div className={`text-xs mt-0.5 ${s.featured ? 'text-white/85' : 'text-muted'}`}>{s.tag}</div>
                  </Link>
                ))}
              </div>
            )}
            {OTHER_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `py-3 border-b border-slate-200 ${isActive ? 'text-sky font-semibold' : 'text-slate-700'}`}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/demo" className="btn-primary self-start mt-4">Request a demo</Link>
          </div>
        </div>
      )}
    </header>
  );
}
