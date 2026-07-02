import { Link } from 'react-router-dom';
import {
  ArrowUpRight, Check, User, Wrench, Sparkles,
  FileText, ClipboardCheck, Megaphone, Receipt, Camera, MessagesSquare,
} from 'lucide-react';
import ScreenMock from '../components/ScreenMock.jsx';

const PLUGINS = [
  { icon: User,     tag: 'HostPilot Owner', name: 'Owner Portal', body: 'Owners see their earnings, statements, reviews, marketing, and inspections in one calm dashboard — updated live.', to: '/owner-portal' },
  { icon: Wrench,   tag: 'HostPilot Ops',   name: 'Ops Hub',      body: 'Your team runs reservations, tasks, payroll, bills, and statements from a single console synced to Hostaway.',    to: '/ops-hub' },
  { icon: Sparkles, tag: 'HostPilot Guest', name: 'Guest Portal', body: 'Guests get a branded companion for their stay — property guides, add-ons, tours, transport, in-stay chat.',       to: '/guest-portal' },
];

const REASONS = [
  { icon: FileText,       title: 'One data model',      body: 'A villa is defined once — owner, ops, and guest views all read from the same source. Nothing is duplicated, nothing goes stale.' },
  { icon: MessagesSquare, title: 'One inbox',           body: 'Guest messages, owner requests, and internal tasks share the same routing engine. Nothing gets lost between tools.' },
  { icon: ClipboardCheck, title: 'One onboarding',      body: 'Set up a villa once. It appears in Ops, in the owner\'s portal, and in the guest experience — automatically.' },
  { icon: Megaphone,      title: 'One brand',           body: 'Your logo, colors and voice apply across all three products — for owners, for staff, for guests.' },
  { icon: Receipt,        title: 'One monthly close',   body: 'Statements, payouts, commissions and P&L generated from the same ledger. Month-end takes hours, not days.' },
  { icon: Camera,         title: 'One integration',     body: 'Hostaway plugs in once. Reservations, guests, listings sync into every product at the same time.' },
];

export default function FullSuite() {
  return (
    <>
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="container-editorial">
          <div className="inline-flex items-center gap-2 mb-6 reveal">
            <span className="eyebrow">Full Suite</span>
            <span className="text-[10px] uppercase tracking-widest bg-brand-gradient text-white px-2 py-0.5 rounded font-semibold">Recommended</span>
          </div>
          <h1 className="text-5xl md:text-7xl leading-[1.05] text-ink max-w-5xl reveal">
            All three products. <span className="gradient-text">One villa platform.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed reveal">
            Owner Portal, Ops Hub, and Guest Portal — bundled into a single system. Shared data, shared brand, shared login, one contract. Built as Hostaway plugins.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 reveal">
            <Link to="/demo" className="btn-primary">Request a demo <ArrowUpRight size={16} /></Link>
            <Link to="/pricing" className="btn-ghost">See pricing</Link>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-28">
        <div className="container-editorial reveal"><ScreenMock variant="ops" /></div>
      </section>

      <section className="py-20 md:py-24 bg-white border-y border-slate-200">
        <div className="container-editorial">
          <div className="max-w-2xl mb-12 reveal">
            <div className="eyebrow mb-3">What's inside</div>
            <h2 className="text-4xl md:text-5xl text-ink leading-tight">
              Three plugins.<br />One connected system.
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">Each plugin is a real product — not a feature slice. Together they cover every stakeholder in a villa business.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {PLUGINS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Link key={p.name} to={p.to} className="reveal group card border border-slate-200 flex flex-col" style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-btn">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <span className="eyebrow">{p.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">{p.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">{p.body}</p>
                  <span className="inline-flex items-center gap-1.5 text-sky text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Deep-dive <ArrowUpRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-editorial">
          <div className="max-w-2xl mb-12 reveal">
            <div className="eyebrow mb-3">Why the Full Suite</div>
            <h2 className="text-4xl md:text-5xl text-ink leading-tight">
              Individual plugins solve a problem.<br />
              <span className="gradient-text">The suite removes the seams.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="reveal">
                  <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center text-white mb-5 shadow-btn">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <h4 className="text-lg font-bold text-ink mb-2">{r.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{r.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-slate-900 text-white">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="reveal">
              <div className="text-xs uppercase tracking-[0.14em] font-semibold gradient-text mb-4">Standalone vs. Suite</div>
              <h2 className="text-4xl md:text-5xl text-white leading-tight font-bold">
                Buy one plugin.<br />
                <span className="gradient-text">Or buy the platform.</span>
              </h2>
              <p className="mt-6 text-slate-300 leading-relaxed max-w-md">
                Every plugin is available standalone — start with what hurts most. When you're ready to unify owner, ops and guest data, upgrade to the Full Suite in one click.
              </p>
            </div>
            <div className="reveal grid grid-cols-2 gap-4">
              {[
                { label: 'One contract',         standalone: false, suite: true },
                { label: 'Volume pricing',       standalone: false, suite: true },
                { label: 'Shared owner logins',  standalone: false, suite: true },
                { label: 'One-click onboarding', standalone: false, suite: true },
                { label: 'Shared brand system',  standalone: false, suite: true },
                { label: 'Hostaway sync',        standalone: true,  suite: true },
              ].map((row) => (
                <div key={row.label} className="col-span-2 grid grid-cols-[1fr_auto_auto] gap-6 py-3 border-b border-slate-800 items-center">
                  <span className="text-sm text-slate-200">{row.label}</span>
                  <span className="w-6 text-center text-slate-500 text-sm">{row.standalone ? <Check size={14} className="inline" /> : '—'}</span>
                  <span className="w-6 text-center text-sky text-sm">{row.suite ? <Check size={14} className="inline" strokeWidth={3} /> : '—'}</span>
                </div>
              ))}
              <div className="col-span-2 grid grid-cols-[1fr_auto_auto] gap-6 pt-2 text-[10px] uppercase tracking-widest font-semibold">
                <span />
                <span className="text-slate-500 w-6 text-center">Solo</span>
                <span className="gradient-text w-6 text-center">Suite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-editorial reveal">
          <div className="bg-brand-gradient rounded-2xl p-12 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              The whole platform. One conversation away.
            </h2>
            <p className="mt-5 text-white/90 max-w-xl mx-auto leading-relaxed">
              30 minutes to see all three plugins working on your portfolio. Then a straight quote.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link to="/demo" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-sky font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-btn transition-all">
                Request a demo <ArrowUpRight size={16} />
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 px-7 py-3 bg-white/10 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all">
                See suite pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
