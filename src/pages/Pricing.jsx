import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Clock } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { SectionHead, Eyebrow } from '../components/ui.jsx';

const included = [
  'All four surfaces — Ops, Owner, Guest and Field',
  'Unlimited staff seats',
  'Unlimited owner logins',
  'Unlimited guest access',
  'Hostaway sync',
  'AI concierge for owners and staff',
  'Every product update, at no extra tier',
  'Data export whenever you ask for it',
];

const never = [
  'No per-booking percentage fee.',
  'No guest-service fee added later.',
  'No charge for extra staff seats or extra owner logins.',
  'No annual lock-in — monthly terms.',
  'No onboarding fee for portfolios under 50 villas.',
];

const shapes = [
  {
    name: 'SaaS subscription',
    who: 'You run the villas, we run the software.',
    body:
      'Per villa per month, billed monthly. The price per villa falls as the portfolio grows. Your data, your branding on the owner and guest surfaces.',
  },
  {
    name: 'Branch / licensing partner',
    who: 'You want the operating model, not just the tool.',
    body:
      'The platform plus the operating playbook underneath it — statement structure, task templates, staff roles, owner reporting cadence. Priced as a licence, discussed case by case.',
  },
  {
    name: 'Channel partner',
    who: 'You already sell to villa operators.',
    body:
      'Referral or reseller terms for agencies, accountants and consultants working with villa management companies in the region.',
  },
];

export default function Pricing() {
  useSeo({
    title: 'Pricing — how HostPilot Pro charges, and what we will never charge for',
    description:
      'Per villa per month, billed monthly, price falls as the portfolio grows. No per-booking percentage, no guest-service fee, no seat charges, no annual lock-in. Tell us your portfolio size for a number the same day.',
    path: '/pricing',
  });
  return (
    <div>
      <section className="relative overflow-hidden border-b border-hp-lineSoft">
        <div className="grain absolute inset-0 bg-[radial-gradient(110%_90%_at_20%_-20%,rgba(227,200,155,0.13),transparent_60%)]" />
        <div className="shell relative pb-14 pt-28 sm:pt-32">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="h-sec mt-4 max-w-[26ch] font-medium">
            The shape of the deal, <span className="serif-em text-hp-text2">without the number.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-hp-text2">
            We do not publish a rate yet. We do publish exactly how you are charged, what is included, and the five
            things we will never bill you for — because a page that says only “contact us” tells you nothing, and
            pricing opacity is the most common complaint in this category.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/demo" className="btn btn-gold">
              Tell us your portfolio size <ArrowRight size={15} />
            </Link>
            <Link to="/tour" className="btn btn-quiet">
              See the product first
            </Link>
          </div>
        </div>
      </section>

      {/* how you are charged */}
      <section className="py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHead
            eyebrow="How you are charged"
            title="Per villa, per month."
            lede="One line on one invoice. The per-villa rate falls as your portfolio grows, and it is the same rate for every villa in a band — not a low headline number with the useful features priced above it."
          />
          <div className="reveal grid gap-3">
            {[
              ['Billed monthly', 'Monthly terms, cancel with a month’s notice. No annual commitment to get a sane rate.'],
              ['Volume bands', 'The rate steps down as villa count rises. We will tell you every band on the call, not just the one you are in.'],
              ['One currency, one invoice', 'THB or USD. No per-module add-ons and no usage meter to watch.'],
              ['Nothing core is upsold', 'The owner portal is not a premium tier. It is the point of the product.'],
            ].map(([t, b]) => (
              <div key={t} className="hp-card p-5">
                <div className="text-[15.5px] font-semibold text-hp-text">{t}</div>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-hp-text2">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* included / never */}
      <section className="band py-16 sm:py-20">
        <div className="shell grid gap-6 lg:grid-cols-2">
          <div className="reveal hp-card p-6 sm:p-8">
            <Eyebrow>Included at every size</Eyebrow>
            <h2 className="h-sub mt-3 font-display">Everything, at every tier.</h2>
            <ul className="mt-6 space-y-2.5">
              {included.map((i) => (
                <li key={i} className="flex gap-3 text-[15px] text-hp-text2">
                  <Check size={16} className="mt-1 shrink-0 text-hp-pos" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal hp-card p-6 sm:p-8">
            <Eyebrow>Commitments</Eyebrow>
            <h2 className="h-sub mt-3 font-display">What we will never do.</h2>
            <ul className="mt-6 space-y-3.5">
              {never.map((i) => (
                <li key={i} className="flex gap-3 text-[15.5px] text-hp-text">
                  <X size={16} className="mt-1 shrink-0 text-hp-neg" />
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] text-hp-text3">
              Each of those five is a real, repeated complaint made about a named competitor in the reviews we read
              while researching this market. They are on this page so you can hold us to them.
            </p>
          </div>
        </div>
      </section>

      {/* relationship shapes */}
      <section className="py-16 sm:py-20">
        <div className="shell">
          <SectionHead
            eyebrow="Three shapes of relationship"
            title="Not everyone wants to buy software."
            lede="Some operators want the tool. Some want the operating model that comes with it. Some want to sell it to their own clients. All three are available; none of them have a published price."
          />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {shapes.map((s) => (
              <div key={s.name} className="reveal hp-card p-6">
                <div className="font-display text-[20px] text-hp-text">{s.name}</div>
                <div className="mt-1.5 text-[13.5px] text-hp-goldDeep">{s.who}</div>
                <p className="mt-4 text-[14.5px] leading-relaxed text-hp-text2">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why no price */}
      <section className="band py-16 sm:py-20">
        <div className="shell max-w-3xl">
          <SectionHead
            eyebrow="Straight answer"
            title="Why we don’t list a price yet."
            lede="Because we would have to guess, and a guess published on a website becomes a promise we might have to break."
          />
          <div className="reveal mt-6 space-y-4 text-[16px] leading-[1.7] text-hp-text2">
            <p>
              HostPilot Pro grew inside a working villa company rather than out of a pricing study. We know what it
              costs us to run and support a portfolio, because we support one. What we do not have yet is enough
              external customers at enough different portfolio sizes to publish a ladder we would still be honest
              about in six months.
            </p>
            <p>
              So the deal is this: you tell us how many villas you manage and which channel manager you use, and we
              send a number the same working day — plus the bands above and below yours, so you can see where it goes
              as you grow. If we ever publish a rate card, it will match the numbers we have been quoting privately.
            </p>
          </div>
          <div className="reveal mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-hp-gold/25 bg-[rgba(227,200,155,0.07)] p-5">
            <Clock size={18} className="text-hp-gold" />
            <div className="flex-1 text-[15px] text-hp-text2">
              Tell us your portfolio size and we will send a number the same working day. If we cannot, we will tell
              you why within that day rather than going quiet.
            </div>
            <Link to="/demo" className="btn btn-gold">
              Ask for a number
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
