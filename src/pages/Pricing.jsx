import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check, ArrowUpRight, Rocket, DollarSign, Building2, User,
  Sparkles, Shield, Zap, Award, Info,
} from 'lucide-react';

// ================= PROPERTY-MANAGEMENT TIERS (primary market) =================
const PM_TIERS = [
  {
    name: 'Starter',
    subtitle: 'Up to 10 villas',
    monthly: 399,
    annual: 319,
    tagline: 'For boutique operators finding product-market fit.',
    highlights: [
      'Full suite (Owner + Ops + Guest)',
      'Unlimited team seats, owners, guests',
      'Hostaway two-way sync',
      'AI concierge (Claude Haiku 4.5)',
      'Weekly product updates',
    ],
  },
  {
    name: 'Growth',
    subtitle: 'Up to 30 villas',
    monthly: 899,
    annual: 719,
    tagline: 'For operators serious about owner retention.',
    featured: true,
    badge: 'Most Popular',
    inherits: 'Everything in Starter, plus:',
    highlights: [
      'Custom AI persona images (your team as advisors)',
      'Custom knowledge module (your SOPs, VAT, house rules)',
      'Priority support',
    ],
  },
  {
    name: 'Professional',
    subtitle: 'Up to 75 villas',
    monthly: 1899,
    annual: 1519,
    tagline: 'For serious portfolio operators.',
    inherits: 'Everything in Growth, plus:',
    highlights: [
      'Dedicated Slack channel',
      'White-label branding',
      'API access',
      'Optional Sonnet-5 upgrade',
    ],
  },
  {
    name: 'Enterprise',
    subtitle: 'Up to 200 villas',
    monthly: 3499,
    annual: 2799,
    tagline: 'For multi-market management groups.',
    inherits: 'Everything in Professional, plus:',
    highlights: [
      'SSO / SAML',
      'Custom SLA',
      'Dedicated account manager',
      'Quarterly business review',
    ],
  },
];

const PM_CUSTOM = {
  name: 'Custom · White-label · Franchise',
  subtitle: '200+ villas or multi-brand',
  price: 'From $4,999',
  per: '/mo',
  tagline: 'Custom infrastructure, franchise territories, private-cloud deployment. Talk to us.',
  bullets: [
    'Multi-tenant private deployment',
    'Franchise / territory licensing',
    'Custom feature builds',
    'Full white-label + custom domain',
  ],
};

// ================= INDIVIDUAL OWNER TIERS =================
const OWNER_TIERS = [
  {
    name: 'Solo',
    subtitle: '1–2 villas',
    monthly: 149,
    annual: 119,
    tagline: 'For self-managing owners of one or two homes.',
    highlights: [
      'Owner Portal + Ops Hub + Guest Portal',
      'AI concierge with your live data',
      'Hostaway two-way sync',
      'Passport OCR, birthday cards, competitor tracking',
      'Statement generation & payout tracking',
    ],
  },
  {
    name: 'Small Portfolio',
    subtitle: '3–5 villas',
    monthly: 299,
    annual: 239,
    featured: true,
    tagline: 'For hands-on owners running a small collection.',
    highlights: [
      'Everything in Solo',
      'Co-owner management',
      'Portfolio aggregates & privacy wall',
      'Priority support',
    ],
  },
];

// ================= INCLUDED IN ALL PLANS =================
const INCLUDED = [
  { icon: Sparkles, title: 'The full suite',            body: 'Owner Portal + Ops Hub + Guest Portal — one Supabase, one login, one AI.' },
  { icon: Zap,      title: 'AI concierge',              body: 'Claude Haiku 4.5 with Samui + MPS knowledge + your live data. Nine personas.' },
  { icon: Building2,title: 'Unlimited everything',      body: 'Team seats, owners, guests, and channels. No per-seat billing games.' },
  { icon: Shield,   title: 'Honest math',               body: '6-month forecast with disclosed method. Portfolio aggregates behind a privacy wall.' },
  { icon: Award,    title: 'Every feature, shipped',    body: 'Passport OCR, birthday-card automation, competitor tracking, agentic actions.' },
  { icon: Info,     title: 'Channels + Hostaway sync',  body: 'Two-way Hostaway sync, direct bookings, plus Airbnb, Booking.com, Vrbo support.' },
];

// ================= ADD-ONS =================
const ADDONS = [
  { name: 'Sonnet-5 AI upgrade',              price: '+$99/mo' },
  { name: 'Voice / video AI birthday greetings', price: '+$4 / owner / greeting' },
  { name: 'WhatsApp Business integration',    price: '+$49/mo' },
  { name: 'Custom domain + full white-label', price: '+$199/mo' },
  { name: 'Migration from another PMS',       price: 'One-time $2,500' },
  { name: 'Live launch onboarding (2 hrs)',   price: 'One-time $499 · included Pro+' },
];

// ================= COMPONENT =================
export default function Pricing() {
  const [market, setMarket] = useState('pm');       // 'pm' | 'owner'
  const [billing, setBilling] = useState('annual'); // 'monthly' | 'annual'

  return (
    <>
      {/* HERO */}
      <section className="pt-16 md:pt-24 pb-8 text-center">
        <div className="container-editorial max-w-3xl">
          <div className="eyebrow mb-6 reveal">Pricing</div>
          <h1 className="text-5xl md:text-7xl leading-[1.05] reveal">
            Pricing That <span className="text-sky">Scales</span>{' '}
            <span className="text-slate-700">With</span>{' '}
            <span className="text-orange">You</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto reveal">
            The full HostPilotPro suite in every plan — Owner Portal, Ops Hub, Guest Portal, and the AI concierge. Priced per portfolio for managers, or per-owner for self-managing hosts.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm reveal">
            <span className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5">
              <Check size={13} className="text-sky" /> 14-day free trial
            </span>
            <span className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5">
              <Check size={13} className="text-sky" /> No credit card
            </span>
            <span className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5">
              <Check size={13} className="text-sky" /> 30-day money-back
            </span>
          </div>
        </div>
      </section>

      {/* MARKET + BILLING TOGGLES */}
      <section className="pb-10">
        <div className="container-editorial flex flex-col items-center gap-5 reveal">
          {/* Market toggle */}
          <div className="inline-flex items-center bg-white border-2 border-slate-200 rounded-full p-1 shadow-card">
            <button
              onClick={() => setMarket('pm')}
              className={`flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                market === 'pm' ? 'bg-brand-gradient text-white shadow-btn' : 'text-slate-600 hover:text-sky'
              }`}
            >
              <Building2 size={16} /> Property Managers
            </button>
            <button
              onClick={() => setMarket('owner')}
              className={`flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                market === 'owner' ? 'bg-brand-gradient text-white shadow-btn' : 'text-slate-600 hover:text-sky'
              }`}
            >
              <User size={16} /> Individual Owners
            </button>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center gap-3 text-sm">
            <span className={`font-semibold ${billing === 'monthly' ? 'text-ink' : 'text-muted'}`}>Monthly</span>
            <button
              onClick={() => setBilling(billing === 'annual' ? 'monthly' : 'annual')}
              className="relative w-14 h-7 rounded-full bg-slate-200 transition-colors"
              aria-label="Toggle billing"
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-brand-gradient shadow-btn transition-all duration-300 ${
                  billing === 'annual' ? 'left-[30px]' : 'left-0.5'
                }`}
              />
            </button>
            <span className={`font-semibold ${billing === 'annual' ? 'text-ink' : 'text-muted'}`}>
              Annual
              <span className="ml-2 text-[10px] uppercase tracking-widest bg-brand-gradient text-white px-2 py-0.5 rounded-full font-semibold">Save 20%</span>
            </span>
          </div>

          <p className="text-xs text-muted max-w-md text-center">
            {market === 'pm'
              ? 'Priced per portfolio. All PM plans include the full suite, unlimited team seats, and unlimited owners.'
              : 'Priced per-owner for self-managing hosts running 1–5 villas.'}
          </p>
        </div>
      </section>

      {/* ===== PROPERTY MANAGER TIERS ===== */}
      {market === 'pm' && (
        <>
          <section className="pb-8">
            <div className="container-editorial">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {PM_TIERS.map((t) => (
                  <TierCard key={t.name} tier={t} billing={billing} />
                ))}
              </div>
            </div>
          </section>

          {/* Custom tier */}
          <section className="pb-16 md:pb-20">
            <div className="container-editorial reveal">
              <div className="rounded-2xl border-2 border-slate-900 bg-slate-900 text-white p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 md:items-center">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs uppercase tracking-[0.14em] font-semibold gradient-text">{PM_CUSTOM.subtitle}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{PM_CUSTOM.name}</h3>
                  <p className="text-slate-300 leading-relaxed mb-4 max-w-2xl">{PM_CUSTOM.tagline}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
                    {PM_CUSTOM.bullets.map((b) => (
                      <span key={b} className="flex items-center gap-1.5">
                        <Check size={13} className="text-sky" /> {b}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-3">
                  <div>
                    <span className="text-3xl md:text-4xl font-bold gradient-text">{PM_CUSTOM.price}</span>
                    <span className="text-sm text-slate-400 font-medium ml-1">{PM_CUSTOM.per}</span>
                  </div>
                  <Link to="/demo" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-white font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-btn transition-all whitespace-nowrap">
                    Talk to sales <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== INDIVIDUAL OWNER TIERS ===== */}
      {market === 'owner' && (
        <section className="pb-16 md:pb-20">
          <div className="container-editorial">
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6">
              {OWNER_TIERS.map((t) => (
                <TierCard key={t.name} tier={t} billing={billing} />
              ))}
            </div>
            <div className="mt-10 text-center reveal">
              <p className="text-sm text-muted mb-3">
                Managing more than 5 villas? You're a property manager — switch to PM pricing for volume discounts.
              </p>
              <button
                onClick={() => setMarket('pm')}
                className="btn-ghost text-sm inline-flex"
              >
                See Property Manager pricing <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* INCLUDED IN ALL PLANS */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200">
        <div className="container-editorial">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <div className="eyebrow mb-3">Every plan</div>
            <h2 className="text-3xl md:text-4xl text-ink">Included at every tier</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              No feature is held back. The AI, the sync, the automations, the honest math — everyone gets the same product. Higher tiers unlock customization and support depth, not the core capability.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {INCLUDED.map((i) => {
              const Icon = i.icon;
              return (
                <div key={i.title} className="reveal card border border-slate-200">
                  <div className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center text-white mb-4 shadow-btn">
                    <Icon size={19} strokeWidth={2} />
                  </div>
                  <h4 className="font-bold text-ink text-lg mb-2">{i.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{i.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center reveal">
            <Link to="/features" className="link-arrow">
              See the full feature list <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <div className="max-w-2xl mb-10 reveal">
            <div className="eyebrow mb-3">Optional add-ons</div>
            <h2 className="text-3xl md:text-4xl text-ink">Extend the platform.</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Only pay for the parts you use. Every add-on is optional and can be turned on or off any month.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-3 reveal">
            {ADDONS.map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-sky/60 transition-colors"
              >
                <span className="text-sm text-slate-700 font-medium">{a.name}</span>
                <span className="text-sm font-bold gradient-text whitespace-nowrap ml-4">{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-200">
        <div className="container-editorial">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Guarantee icon={Rocket}    title="14-day free trial"    body="No credit card required. Test the full suite on a sample portfolio." />
            <Guarantee icon={Shield}    title="30-day money-back"    body="Not convinced in the first month? We refund your subscription, no questions." />
            <Guarantee icon={DollarSign} title="Annual saves 20%"     body="Pay upfront, ship faster with your team. Monthly billing is always available too." />
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="pb-24 md:pb-32 pt-16">
        <div className="container-editorial reveal">
          <div className="bg-slate-900 rounded-2xl p-12 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Simple. Scalable. <span className="gradient-text">Stress-Free.</span>
            </h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto leading-relaxed">
              Book a demo, or start a free 14-day trial. If you have 50+ villas, ask us for a custom onboarding plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link to="/demo" className="inline-flex items-center gap-2 px-7 py-3 bg-brand-gradient text-white font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-btn transition-all">
                <Rocket size={16} /> Book a Demo
              </Link>
              <Link to="/demo" className="inline-flex items-center gap-2 px-7 py-3 bg-white/10 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all">
                <DollarSign size={16} /> Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// -------- Tier card --------
function TierCard({ tier, billing }) {
  const price = billing === 'annual' ? tier.annual : tier.monthly;
  const monthlyEq = billing === 'annual' ? tier.monthly : null;
  return (
    <div
      className={`reveal relative bg-white rounded-2xl p-8 flex flex-col transition-all duration-300
        ${tier.featured
          ? 'border-2 border-sky lg:scale-[1.03] shadow-card-lift z-10'
          : 'border border-slate-200 shadow-card hover:-translate-y-2 hover:shadow-card-lift'
        }`}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gradient text-white text-xs font-semibold px-5 py-1.5 rounded-full shadow-btn whitespace-nowrap">
          {tier.badge || 'Most Popular'}
        </span>
      )}

      <h3 className="text-xl font-bold text-ink mb-1">{tier.name}</h3>
      <p className="text-sm text-muted mb-5">{tier.subtitle}</p>

      <div className="mb-1 flex items-baseline gap-1">
        <span className={`text-4xl font-bold ${tier.featured ? 'gradient-text' : 'text-ink'}`}>${price}</span>
        <span className="text-sm text-muted font-medium">/mo</span>
      </div>
      <div className="text-xs text-muted mb-5 h-4">
        {billing === 'annual' ? <>Billed annually · <span className="line-through">${monthlyEq}/mo</span></> : 'Billed monthly'}
      </div>

      <p className="text-sm text-slate-700 leading-relaxed mb-5">{tier.tagline}</p>

      {tier.inherits && (
        <div className="text-xs uppercase tracking-widest font-semibold text-sky mb-3">{tier.inherits}</div>
      )}
      <ul className="space-y-2.5 mb-8 flex-1">
        {tier.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 items-start text-sm">
            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-gradient flex items-center justify-center text-white">
              <Check size={11} strokeWidth={3} />
            </span>
            <span className="text-slate-700 leading-relaxed">{h}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/demo"
        className={
          tier.featured ? 'btn-primary justify-center w-full' : 'btn-ghost justify-center w-full'
        }
      >
        Start free trial
      </Link>
    </div>
  );
}

function Guarantee({ icon: Icon, title, body }) {
  return (
    <div className="reveal text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-btn">
        <Icon size={20} strokeWidth={2} />
      </div>
      <h4 className="font-bold text-ink mb-2">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}
