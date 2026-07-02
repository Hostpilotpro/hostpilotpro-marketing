import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, User, Wrench, Sparkles, Bot, Database, Cog } from 'lucide-react';

const OWNER = [
  'AI concierge that quotes real numbers from statements (per-service cost breakdown: cleaning, laundry, pool, welcome pack, garbage, internet, etc.)',
  'Per-property monthly performance — revenue, arrivals, occupied nights, ADR, 12 months history',
  'Channel performance breakdown — Airbnb / Booking.com / Agoda / Vrbo / Marriott / Direct with revenue share, ADR, lead time',
  '6-month honest revenue forecast (same-month-last-year × trailing YoY multiplier, method disclosed)',
  'Portfolio aggregates with a hard privacy wall (market context, never other owners\' individual numbers)',
  'Weather + season card with honest booking-pace math',
  'Three-layer AI knowledge: MPS internal + Samui local expertise + owner\'s live data',
  '9 selectable AI personas (Yankee, Captain Cortex, plus 7 team members with 7 expression states each)',
  'Passport upload + Claude Vision OCR (extracts birthday, nationality, last-4 only)',
  'Co-owner management',
  'Competitor tracking (up to 5 Airbnb/Booking listings watched weekly)',
  'Facilities & improvement ideas board (wellness / entertainment / family / outdoor / tech / comfort)',
  'News feed — Samui + Thailand via Google News, plus curated MPS Articles',
  'Statement waterfall drill-down with True Net forecast',
  'Recurring bill toggles',
  'Owner statements + payout tracking',
  'Villa detail pages with inventory + maintenance history',
  'Yankee AI widget (compact / card / room display modes)',
  'Resource library (handbooks, templates, team pages)',
  'Owner holiday-block request — agentic flow ("block my villa Aug 5–12" → auto-creates PM task)',
  'Daily birthday-card cron: AI-generated Samui palm/beach/cake image with owner\'s first name — emailed + displayed in portal',
  'Multi-language support (EN, TH, DE base)',
  'Dark mode',
];

const OPS = [
  'Hostaway nightly sync',
  'Monthly payout draft automation (10th of every month)',
  'Revenue targets — weekly watcher with alerts',
  'Task board + unified inbox (all owner AI conversations visible to PMs, with "take over as human" button)',
  'Property Manager assignment (auto-syncs to owner portal)',
  'VAT-compliant statement generation',
  'Salary and payslip PDF generation with Sarabun font (Thai + Latin support)',
  'Owner request queue — holiday blocks, maintenance, ad-hoc',
  'Birthday calendar (upcoming birthdays across the whole tenant)',
  'Portfolio-wide dashboards',
];

const GUEST = [
  'Digital check-in flow',
  'Add-ons and upsells — transfers, tours, concierge extras',
  'Assistance tips (local recommendations by neighborhood)',
  'Guest-facing concierge AI',
];

const INFRA = [
  { icon: Database, title: 'One Supabase database',        body: 'Single source of truth for all three apps. Owner, ops and guest views read from the same data model.' },
  { icon: Bot,      title: 'Claude Haiku 4.5 (upgradeable)', body: 'Base AI model on every plan. Upgrade to Sonnet 5 for deeper reasoning on Professional+ tiers.' },
  { icon: Cog,      title: 'Scheduled crons, live',        body: 'Birthday cards daily. Hostaway sync nightly. Payouts monthly. Revenue watcher weekly.' },
];

const PRODUCTS = [
  { icon: User,     name: 'HostPilot Owner', to: '/owner-portal', tag: 'Owner Portal',   items: OWNER },
  { icon: Wrench,   name: 'HostPilot Ops',   to: '/ops-hub',      tag: 'Operations Hub', items: OPS },
  { icon: Sparkles, name: 'HostPilot Guest', to: '/guest-portal', tag: 'Guest Portal',   items: GUEST },
];

export default function Features() {
  return (
    <>
      {/* HERO */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20 text-center">
        <div className="container-editorial max-w-3xl">
          <div className="eyebrow mb-6 reveal">Features</div>
          <h1 className="text-5xl md:text-7xl leading-[1.05] text-ink reveal">
            Every part <span className="gradient-text">shipped.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed reveal">
            Three tightly-integrated apps, one AI that knows everything, honest math, real Samui expertise, agentic actions. Nothing on this page is a roadmap — every capability runs in production at Mr Property Siam today.
          </p>
        </div>
      </section>

      {/* PRODUCT-BY-PRODUCT */}
      {PRODUCTS.map((p) => {
        const Icon = p.icon;
        return (
          <section key={p.name} className="py-16 md:py-20 border-t border-slate-200 first-of-type:border-t-0 bg-white odd:bg-slate-50">
            <div className="container-editorial">
              <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-16 items-start">
                <div className="reveal md:sticky md:top-28">
                  <span className="inline-flex w-14 h-14 rounded-xl bg-brand-gradient items-center justify-center text-white shadow-btn mb-5">
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <div className="eyebrow mb-2">{p.tag}</div>
                  <h2 className="text-3xl md:text-4xl text-ink font-bold leading-tight mb-4">{p.name}</h2>
                  <p className="text-sm text-slate-600 mb-4">
                    <span className="font-bold text-ink">{p.items.length}</span> features shipped
                  </p>
                  <Link to={p.to} className="link-arrow">
                    Deep-dive <ArrowUpRight size={14} />
                  </Link>
                </div>
                <div className="reveal grid gap-y-2">
                  {p.items.map((item) => (
                    <div key={item} className="flex gap-3 items-start py-2.5 border-b border-slate-200/70">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-gradient flex items-center justify-center text-white">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* SHARED INFRASTRUCTURE */}
      <section className="py-20 md:py-24 bg-slate-900 text-white border-t border-slate-800">
        <div className="container-editorial">
          <div className="max-w-2xl mb-14 reveal">
            <div className="text-xs uppercase tracking-[0.14em] font-semibold gradient-text mb-3">Shared infrastructure</div>
            <h2 className="text-4xl md:text-5xl text-white leading-tight font-bold">
              Three apps.<br /><span className="gradient-text">One brain.</span>
            </h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              Everything is wired to the same database and the same AI. Which means the concierge in the Owner Portal already knows what the housekeeper marked done in the Ops Hub this morning.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {INFRA.map((i) => {
              const Icon = i.icon;
              return (
                <div key={i.title} className="reveal card bg-slate-800 border border-slate-700">
                  <div className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center text-white mb-4 shadow-btn">
                    <Icon size={19} strokeWidth={2} />
                  </div>
                  <h4 className="font-bold text-white mb-2">{i.title}</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">{i.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container-editorial reveal">
          <div className="bg-brand-gradient rounded-2xl p-12 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold text-white">Ready to see all of it live?</h2>
            <p className="mt-5 text-white/90 max-w-xl mx-auto leading-relaxed">
              30 minutes, real screens, your portfolio in the demo. No slides.
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
