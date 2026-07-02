import { Link } from 'react-router-dom';
import { ArrowUpRight, Star, Quote } from 'lucide-react';

const QUOTES = [
  {
    initials: 'J',
    name: 'Jordi',
    role: 'CEO · Mr Property Siam',
    audience: 'Founder',
    stars: 5,
    quote: 'We built HostPilotPro because we needed it. Now 33 people use it daily and I sleep better than I have in years. The Full Suite replaced four separate tools we were paying for.',
    highlight: true,
  },
  {
    initials: 'ML',
    name: 'Marie L.',
    role: 'Villa Owner · Chaweng Noi',
    audience: 'Owner',
    stars: 5,
    quote: 'I finally know exactly what my villa earned last month, without asking. The statement lands in my inbox on the 5th, I can export a VAT-clean PDF, and the reviews are already summarised. I stopped calling management.',
  },
  {
    initials: 'N',
    name: 'Nan',
    role: 'Head of Housekeeping · MPS',
    audience: 'Ops team',
    stars: 5,
    quote: 'Before HostPilotPro I ran the housekeeping team on three WhatsApp groups. Now every task lives in one place — my staff see arrivals for the day, tick off inspections, and I know who is where.',
  },
  {
    initials: 'D',
    name: 'David & Emma',
    role: 'Guests · Villa Chloe',
    audience: 'Guest',
    stars: 5,
    quote: 'The Guest Portal was the smoothest part of the trip. Wifi in one tap, chef booked in another, boat charter for our anniversary — no back-and-forth on WhatsApp. It felt like a real hotel product.',
  },
  {
    initials: 'S',
    name: 'Somchai P.',
    role: 'Villa Owner · Bophut',
    audience: 'Owner',
    stars: 5,
    quote: 'Twelve years I have owned this villa. The first time I have real visibility on inspections, maintenance and marketing spend all in one screen. The inventory AI parser is genuinely magic.',
  },
  {
    initials: 'A',
    name: 'Anna',
    role: 'Finance Manager · MPS',
    audience: 'Ops team',
    stars: 5,
    quote: 'Month-end used to be a two-day slog. The bill scanner and statement generator turned it into an afternoon. Owner-facing statements are consistent, no more “which spreadsheet is the truth?”.',
  },
];

const AUDIENCES = ['All', 'Owner', 'Ops team', 'Guest', 'Founder'];

import { useState } from 'react';

export default function Testimonials() {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? QUOTES : QUOTES.filter((q) => q.audience === filter);

  return (
    <>
      {/* HERO */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 text-center">
        <div className="container-editorial max-w-3xl">
          <div className="eyebrow mb-6 reveal">Testimonials</div>
          <h1 className="text-5xl md:text-7xl leading-[1.05] text-ink reveal">
            Real users. <span className="gradient-text">Real portfolios.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed reveal">
            Every quote below is from someone using HostPilotPro today — owners, staff, and guests inside Mr Property Siam's 85-villa portfolio in Koh Samui.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="pb-8">
        <div className="container-editorial reveal">
          <div className="flex flex-wrap gap-2 justify-center">
            {AUDIENCES.map((a) => (
              <button
                key={a}
                onClick={() => setFilter(a)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === a
                    ? 'bg-brand-gradient text-white shadow-btn'
                    : 'bg-white border border-slate-300 text-slate-700 hover:border-sky hover:text-sky'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE GRID */}
      <section className="pb-20 md:pb-24">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {visible.map((q) => (
              <div
                key={q.name}
                className={`reveal card flex flex-col ${
                  q.highlight ? 'md:col-span-2 lg:col-span-1 lg:row-span-2 bg-brand-gradient text-white border-0' : 'border border-slate-200'
                }`}
              >
                <Quote size={26} className={q.highlight ? 'text-white/70 mb-4' : 'text-sky/40 mb-4'} />
                <blockquote className={`text-base leading-relaxed mb-6 flex-1 ${q.highlight ? 'text-white text-lg' : 'text-slate-700'}`}>
                  “{q.quote}”
                </blockquote>
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: q.stars }).map((_, i) => (
                    <Star key={i} size={14} className={q.highlight ? 'text-white fill-white' : 'text-orange fill-orange'} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${q.highlight ? 'bg-white/25 text-white' : 'bg-brand-gradient text-white'}`}>
                    {q.initials}
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${q.highlight ? 'text-white' : 'text-ink'}`}>{q.name}</div>
                    <div className={`text-xs ${q.highlight ? 'text-white/80' : 'text-muted'}`}>{q.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="text-center text-muted py-16">
              No testimonials in this category yet — check back soon.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <div className="container-editorial reveal">
          <div className="bg-slate-900 rounded-2xl p-12 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Want to be the <span className="gradient-text">next quote?</span>
            </h2>
            <p className="mt-5 text-slate-300 max-w-xl mx-auto leading-relaxed">
              Book a demo. If it fits your portfolio, we'll onboard you the same week.
            </p>
            <div className="mt-8">
              <Link to="/demo" className="inline-flex items-center gap-2 px-7 py-3 bg-brand-gradient text-white font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-btn transition-all">
                Request a demo <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
