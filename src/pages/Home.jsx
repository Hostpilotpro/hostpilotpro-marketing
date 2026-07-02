import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText, Sparkles, ClipboardCheck, Megaphone, Receipt, Camera } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import FeatureItem from '../components/FeatureItem.jsx';
import ScreenMock from '../components/ScreenMock.jsx';

const PRODUCTS = [
  { eyebrow: 'Owner Portal',   name: 'HostPilot Owner', tagline: 'Where villa owners see everything.',            description: 'Earnings, payouts, inspections, reviews, marketing, inventory, and guest messaging — one calm place, updated in real time.', to: '/owner-portal' },
  { eyebrow: 'Operations Hub', name: 'HostPilot Ops',   tagline: 'The internal system your team lives in.',       description: 'Bookings, tasks, statements, payroll, bills, sub-management ledgers. Everything an ops team touches, in one console.',       to: '/ops-hub' },
  { eyebrow: 'Guest Portal',   name: 'HostPilot Guest', tagline: 'The experience your guests actually remember.', description: 'Property guides, add-ons, tours, transport, and in-stay assistance — a branded companion that turns stays into revenue.',    to: '/guest-portal' },
];

const FEATURES = [
  { icon: FileText,       title: 'Owner statements',      description: 'Monthly earnings, VAT-clean, exportable. Owners stop asking for spreadsheets.' },
  { icon: Sparkles,       title: 'Guest reviews AI',      description: 'Every Airbnb, Booking, and VRBO review synced and summarised — strengths, weaknesses, one glance.' },
  { icon: ClipboardCheck, title: 'Inspection scheduling', description: 'Owners schedule their own villa inspections. No group chat, no back-and-forth.' },
  { icon: Megaphone,      title: 'Marketing Boost',       description: 'Spark, Glow, Beam, Always-On packages. Owners choose the visibility they want.' },
  { icon: Receipt,        title: 'Bill scanner',          description: 'AI parses supplier bills into the ledger — the ops team stops typing invoices.' },
  { icon: Camera,         title: 'Inventory AI parser',   description: 'Photograph a room; the inventory list writes itself. Onboarding new villas gets fast.' },
];

const NUMBERS = [
  { n: '33',     label: 'Team members' },
  { n: '85',     label: 'Villas managed' },
  { n: '4,700+', label: 'Reviews synced' },
  { n: '100%',   label: 'Financial transparency' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="pt-16 md:pt-24 pb-20 md:pb-24">
        <div className="container-editorial">
          <div className="max-w-4xl">
            <div className="eyebrow mb-6 reveal">The complete villa management platform</div>
            <h1 className="text-5xl md:text-7xl leading-[1.05] text-ink reveal">
              Effortless villa <span className="gradient-text">management.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed reveal">
              Owner portal, operations hub, and guest experience — one system, three doorways. Built as Hostaway plugins. Subscribe to any of them individually, or run the full suite.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 reveal">
              <Link to="/demo" className="btn-primary">Request a demo <ArrowUpRight size={16} /></Link>
              <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ghost">See the products</button>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="products" className="py-20 md:py-28 bg-white border-y border-slate-200">
        <div className="container-editorial">
          <div className="max-w-2xl mb-12 reveal">
            <div className="eyebrow mb-3">Our solutions</div>
            <h2 className="text-4xl md:text-5xl text-ink leading-tight">
              Four ways to buy.<br />One connected platform.
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              Start with a single Hostaway plugin, or bundle the Full Suite from day one. Every solution shares the same data model — nothing gets re-entered when you add another.
            </p>
          </div>

          {/* Full Suite featured card */}
          <Link
            to="/full-suite"
            className="reveal group block relative overflow-hidden bg-brand-gradient text-white rounded-2xl p-8 md:p-12 mb-6 md:mb-8 transition-all hover:-translate-y-0.5 hover:shadow-card-lift"
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs uppercase tracking-[0.14em] font-semibold text-white/85">Full Suite</span>
                  <span className="text-[10px] uppercase tracking-widest bg-white/25 text-white px-2 py-0.5 rounded font-semibold">Recommended</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-white">
                  All three plugins. <span className="text-white/85">One villa platform.</span>
                </h3>
                <p className="text-white/90 leading-relaxed max-w-xl">
                  Owner Portal + Ops Hub + Guest Portal, bundled. Shared data, shared brand, shared logins. One contract, volume pricing.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-white text-sm font-semibold border-b-2 border-white/50 pb-1 group-hover:gap-2.5 transition-all">
                Explore the Full Suite <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {PRODUCTS.map((p, i) => (
              <div key={p.name} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <ProductCard {...p} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MPS PROOF */}
      <section className="py-24 md:py-32">
        <div className="container-editorial grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal">
            <div className="eyebrow mb-4">Who's on it</div>
            <h2 className="text-4xl md:text-5xl text-ink leading-tight mb-6">
              First customer.<br />Reference deployment.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Mr Property Siam manages 85 luxury villas in Koh Samui — the entire portfolio runs on HostPilotPro Suite in production, every day.
            </p>
            <a href="https://www.mrpropertysiam.com" target="_blank" rel="noreferrer" className="link-arrow">
              Visit Mr Property Siam <ArrowUpRight size={14} />
            </a>
          </div>
          <figure className="reveal card border border-slate-200">
            <blockquote className="text-xl md:text-2xl leading-snug text-ink font-medium">
              “We stopped stitching spreadsheets, WhatsApp threads and Hostaway together. Owners see their villas, the team runs the ops, guests get a real product. It's the one system we ship every process into.”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-lg">J</div>
              <div>
                <div className="font-semibold text-ink">Jordi</div>
                <div className="text-sm text-muted">CEO · Mr Property Siam</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 md:py-24 bg-white border-y border-slate-200">
        <div className="container-editorial">
          <div className="max-w-2xl mb-14 reveal">
            <div className="eyebrow mb-3">Key features</div>
            <h2 className="text-4xl md:text-5xl text-ink leading-tight">
              Every part shipped. Nothing in a roadmap.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {FEATURES.map((f) => <FeatureItem key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* PREVIEW STRIP */}
      <section className="py-20 md:py-24">
        <div className="container-editorial reveal">
          <ScreenMock variant="owner" />
        </div>
      </section>

      {/* NUMBERS */}
      <section className="py-20 md:py-24 bg-slate-900 text-white">
        <div className="container-editorial">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {NUMBERS.map((n) => (
              <div key={n.label} className="reveal">
                <div className="text-4xl md:text-5xl font-bold gradient-text leading-none mb-3">{n.n}</div>
                <div className="text-xs uppercase tracking-[0.14em] font-semibold text-slate-400">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-24 md:py-32">
        <div className="container-editorial reveal">
          <div className="bg-brand-gradient rounded-2xl p-12 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-5xl leading-tight text-white max-w-3xl mx-auto font-bold">
              Ready to run your villa portfolio like a pro?
            </h2>
            <p className="mt-5 text-white/90 max-w-xl mx-auto leading-relaxed">
              Book a 30-minute call. We'll walk through the three products with your portfolio in mind.
            </p>
            <div className="mt-8">
              <Link to="/demo" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-sky font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-btn transition-all">
                Request a demo <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
