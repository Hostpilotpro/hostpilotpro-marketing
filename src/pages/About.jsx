import { Link } from 'react-router-dom';
import { ArrowUpRight, Building2, Users2, MapPin, Rocket, Layers, Plug, Bot, HeartHandshake } from 'lucide-react';

const TIMELINE = [
  { year: '2012', title: 'Mr Property Siam opens in Koh Samui', body: 'A boutique property manager starts caring for a handful of luxury villas on the island.' },
  { year: '2018', title: 'The portfolio hits 30 villas',        body: 'Spreadsheets, WhatsApp threads and Hostaway stop scaling. Owners, staff and guests are all on different tools.' },
  { year: '2023', title: 'The first internal build',            body: 'We start building our own internal app to replace the mess — owner statements, task boards, guest guides.' },
  { year: '2025', title: 'HostPilotPro is born',                body: 'The internal tool is battle-tested across 85 villas. We split it into three Hostaway plugins and open it up for other managers.' },
  { year: '2026', title: 'The Suite launches',                  body: 'Owner Portal, Ops Hub and Guest Portal go public — one connected system for the villa industry.' },
];

const PILLARS = [
  { icon: Layers, title: 'One platform, three doorways', body: 'Owner, ops and guest experiences share the same data model. Villas are defined once — everyone sees a consistent view.' },
  { icon: Plug,   title: 'Built for Hostaway',           body: 'Each product ships as a Hostaway plugin. Reservations, guests, listings and payouts sync automatically.' },
  { icon: Bot,    title: 'AI where it earns its keep',   body: 'Inventory parsers, bill scanners, review summarisers. AI is used where it saves real hours, not for headlines.' },
  { icon: HeartHandshake, title: 'Built with an operator', body: 'Every feature exists because MPS staff or owners needed it. We ship products, not roadmaps.' },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="container-editorial max-w-4xl">
          <div className="eyebrow mb-6 reveal">About HostPilotPro</div>
          <h1 className="text-5xl md:text-7xl leading-[1.05] text-ink reveal">
            Built by villa managers. <span className="gradient-text">Powered by AI.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed reveal">
            HostPilotPro wasn't drawn on a whiteboard by a startup. It was written line by line to solve real problems inside Mr Property Siam — 85 luxury villas, 33 staff, 4,700+ reviews. Every module ships to our own team first before it goes public.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20 md:py-24 bg-white border-y border-slate-200">
        <div className="container-editorial grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="reveal">
            <div className="eyebrow mb-3">The story</div>
            <h2 className="text-4xl md:text-5xl text-ink leading-tight mb-6">
              We built the tool<br />
              <span className="gradient-text">we couldn't buy.</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              For 13 years, Mr Property Siam has managed luxury villas on Koh Samui. Housekeeping, maintenance, guest experience, financial reporting to owners — the full stack of running someone else's home for someone else's holiday.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Every year the operation grew — more villas, more staff, more owners, more platforms. And every year the software gap widened. Hostaway handled channel management beautifully, but owners still received PDF statements, guests still Googled the wifi password, and the ops team still lived inside three separate WhatsApp groups.
            </p>
            <p className="text-slate-600 leading-relaxed">
              So we built our own layer on top. First it was one internal dashboard. Then a portal for owners. Then a companion for guests. Three years later, that layer became HostPilotPro — a platform we're now offering to other villa managers who are drowning in the same mess we were.
            </p>
          </div>

          <div className="reveal">
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={Building2} n="85"      label="Villas managed live" />
              <StatCard icon={Users2}    n="33"      label="Team members using it daily" />
              <StatCard icon={MapPin}    n="1"       label="Reference deployment (MPS)" />
              <StatCard icon={Rocket}    n="4,700+"  label="Guest reviews synced" />
            </div>
            <div className="mt-6 card border border-slate-200">
              <blockquote className="text-lg text-ink font-medium leading-snug">
                “We stopped stitching spreadsheets, WhatsApp threads and Hostaway together. Owners see their villas, the team runs the ops, guests get a real product. It's the one system we ship every process into.”
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold">J</div>
                <div>
                  <div className="font-semibold text-ink text-sm">Jordi</div>
                  <div className="text-xs text-muted">CEO · Mr Property Siam · Founder, HostPilotPro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 md:py-24">
        <div className="container-editorial">
          <div className="max-w-2xl mb-12 reveal">
            <div className="eyebrow mb-3">The journey</div>
            <h2 className="text-4xl md:text-5xl text-ink leading-tight">
              From one villa portfolio<br />to a platform.
            </h2>
          </div>
          <div className="relative border-l-2 border-slate-200 pl-8 md:pl-12 space-y-10">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="reveal relative" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="absolute -left-[45px] md:-left-[57px] top-1 w-6 h-6 rounded-full bg-brand-gradient border-4 border-slate-50" />
                <div className="text-sm font-bold text-sky mb-1">{t.year}</div>
                <h3 className="text-xl font-bold text-ink mb-2">{t.title}</h3>
                <p className="text-slate-600 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS: how the product works */}
      <section className="py-20 md:py-24 bg-white border-y border-slate-200">
        <div className="container-editorial">
          <div className="max-w-2xl mb-14 reveal">
            <div className="eyebrow mb-3">How the product works</div>
            <h2 className="text-4xl md:text-5xl text-ink leading-tight">
              Four principles.<br />
              <span className="gradient-text">Every module.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="reveal flex gap-5">
                  <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-btn">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <div>
                    <h4 className="text-lg font-bold text-ink mb-2">{p.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHERE WE ARE */}
      <section className="py-20 md:py-24">
        <div className="container-editorial grid md:grid-cols-[1fr_1.3fr] gap-12 items-center">
          <div className="reveal">
            <div className="eyebrow mb-3">Where we are</div>
            <h2 className="text-4xl md:text-5xl text-ink leading-tight mb-6">
              Koh Samui, Thailand.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We work where our customers work. HostPilotPro is designed on the same island where our first 85 villas live — same climate, same tax rules, same monsoon-season maintenance backlog.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We're expanding to Phuket, Bali and beyond — but we'll always ship the product from an operator's chair.
            </p>
          </div>
          <div className="reveal card border border-slate-200 h-72 md:h-96 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-gradient opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center flex-col text-white text-center p-6">
              <MapPin size={40} strokeWidth={1.8} className="mb-4" />
              <div className="text-2xl font-bold">Koh Samui · Surat Thani</div>
              <div className="text-sm text-white/85 mt-1">Thailand · GMT+7</div>
              <div className="mt-6 text-xs uppercase tracking-widest font-semibold text-white/90">
                Mr Property Siam · HQ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container-editorial reveal">
          <div className="bg-brand-gradient rounded-2xl p-12 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Run your villa portfolio like we run ours.
            </h2>
            <p className="mt-5 text-white/90 max-w-xl mx-auto leading-relaxed">
              Book a demo. We'll show you the same tools 33 people at Mr Property Siam use every day.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link to="/demo" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-sky font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-btn transition-all">
                Request a demo <ArrowUpRight size={16} />
              </Link>
              <Link to="/full-suite" className="inline-flex items-center gap-2 px-7 py-3 bg-white/10 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all">
                See the Full Suite
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ icon: Icon, n, label }) {
  return (
    <div className="card border border-slate-200">
      <Icon size={20} className="text-sky mb-3" />
      <div className="text-3xl font-bold gradient-text mb-1">{n}</div>
      <div className="text-xs text-muted leading-snug">{label}</div>
    </div>
  );
}
