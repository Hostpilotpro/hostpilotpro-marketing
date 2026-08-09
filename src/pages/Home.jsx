import { Link } from 'react-router-dom';
import { ArrowRight, Play, Building2, Users, Smartphone, Monitor, Check, Info } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { SectionHead, Eyebrow, Tilt, BrowserFrame, PrimaryLink } from '../components/ui.jsx';
import OpsConsole from '../tour/OpsConsole.jsx';
import demo from '../data/demo.js';

const surfaces = [
  {
    to: '/owner',
    name: 'HostPilot Owner',
    icon: Users,
    line: 'The owner portal, and the reason the rest exists.',
    body:
      'Monthly statements owners can actually read, every line expandable down to the invoice. Payout history, forward pipeline, rate approvals, and an assistant that answers questions from their own numbers.',
    proof: 'Statement lines expand to a plain-English verdict.',
  },
  {
    to: '/ops',
    name: 'HostPilot Ops',
    icon: Monitor,
    line: 'The staff console the whole operation runs on.',
    body:
      'Villas, owners, reservations, tasks, inspections, statements, petty cash and payroll inputs in one place, with a command palette that reaches any record in two keystrokes.',
    proof: 'Press ⌘K in the tour and jump to any villa.',
  },
  {
    to: '/guest',
    name: 'HostPilot Guest',
    icon: Smartphone,
    line: 'The stay app that sells things while you sleep.',
    body:
      'Door code, Wi-Fi, house manual, arrival status and a paid add-on list in the guest’s pocket. Transfers, chefs, charters, massage, breakfast — booked without a WhatsApp thread.',
    proof: '฿24,950 of add-ons on one seven-night demo stay.',
  },
  {
    to: '/field',
    name: 'HostPilot Field',
    icon: Building2,
    line: 'The app your cleaners and pool techs actually open.',
    body:
      'Clock in, claim jobs, log work already done, photograph a receipt, check pay. Built for a phone held in one hand outdoors, in English, Thai or Burmese.',
    proof: 'Switch language in the tour and watch it re-label.',
  },
];

export default function Home() {
  useSeo({
    title: 'HostPilot Pro — your owners can see everything',
    description:
      'HostPilot Pro is the operating system underneath a villa management company: a staff console, an owner portal, a guest app and a field app on one database. Click through it without talking to anyone.',
    path: '/',
  });

  return (
    <div>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <img
          src="/img/samui-coast.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.42]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,12,10,0.72)_0%,rgba(13,12,10,0.86)_55%,#0D0C0A_100%)]" />
        <div className="grain absolute inset-0" />
        <div className="shell relative pb-14 pt-28 sm:pb-20 sm:pt-36">
          <div className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-hp-pos" /> Built and run daily on Koh Samui
          </div>
          <h1 className="h-hero mt-6 max-w-[16ch] font-medium">
            Your owners can <span className="serif-em">see everything.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] leading-[1.7] text-hp-text2 sm:text-[19px]">
            HostPilot Pro is the operating system underneath a villa management company — a staff console, an owner
            portal, a guest app and a field app, on one database. It sits on top of your channel manager rather than
            replacing it.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/tour" className="btn btn-gold">
              <Play size={15} className="fill-current" /> Open the live tour
            </Link>
            <Link to="/demo" className="btn btn-quiet">
              Book a call <ArrowRight size={15} />
            </Link>
          </div>
          <p className="mt-4 text-[14px] text-hp-text3">
            No email gate. No signup. The tour is the product, filled with demo data.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- product on page */}
      <section className="border-t border-hp-lineSoft bg-hp-bg py-14 sm:py-20">
        <div className="shell-wide">
          <div className="reveal flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-2xl">
              <Eyebrow>The ops console, live below</Eyebrow>
              <h2 className="h-sec mt-3">
                This is not a screenshot. <span className="serif-em text-hp-text2">Use it.</span>
              </h2>
              <p className="mt-4 text-[17px] text-hp-text2">
                Press ⌘K and search a villa. Click one to open its dossier. Open Operations for the task board. Same
                code as the tour, same fictional portfolio.
              </p>
            </div>
            <PrimaryLink to="/tour">Open the full tour</PrimaryLink>
          </div>

          <div className="reveal mt-9">
            <Tilt max={2}>
              <BrowserFrame host="ops.hostpilotpro.com" note="Live replica · demo data">
                <div className="max-h-[720px] overflow-hidden">
                  <OpsConsole />
                </div>
              </BrowserFrame>
            </Tilt>
          </div>
          <div className="reveal mt-4 flex items-center gap-2 text-[12.5px] text-hp-text3">
            <Info size={13} className="text-hp-goldDeep" />
            Sample portfolio. Azure Coast Villas is a fictional 24-villa operator — every figure shown is demo data.
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- operator proof */}
      <section className="band py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHead
              eyebrow="Why this exists"
              title={
                <>
                  Built by an operator, <span className="serif-em text-hp-text2">not a software company.</span>
                </>
              }
              lede="Mr Property Siam manages villas on Koh Samui. Every screen in HostPilot Pro was built because something in that operation was broken — a statement an owner did not trust, a clean nobody logged, a pool bill nobody could find. The company runs on this software daily. When something is wrong, the person who fixes it is the person who needs it fixed."
            />
            <div className="reveal mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ['One database', 'Owners, guests, staff and the office read the same records. Nothing is re-keyed.'],
                ['On top of Hostaway', 'Your channel manager keeps doing distribution. We do everything after the booking.'],
                ['Three languages in the field', 'English, Thai and Burmese, because that is who does the work.'],
                ['Support from the operator', 'The most common complaint about every competitor we reviewed was support. We are a small team that answers.'],
              ].map(([t, b]) => (
                <div key={t} className="hp-card p-5">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-hp-gold" />
                    <div className="text-[15px] font-semibold text-hp-text">{t}</div>
                  </div>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-hp-text2">{b}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="overflow-hidden rounded-2xl border border-hp-line shadow-frame">
              <img src="/img/villa-sapphire-hero.jpg" alt="A managed villa at dusk on Koh Samui" className="w-full" />
            </div>
            <p className="mt-4 text-[13.5px] text-hp-text3">
              Koh Samui, Thailand. The software was written between check-outs.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- four surfaces */}
      <section className="py-16 sm:py-24">
        <div className="shell">
          <SectionHead
            eyebrow="Four surfaces, one system"
            title="Everyone gets their own door."
            lede="Most platforms give the office a good tool and everybody else a PDF. HostPilot Pro gives each audience a real interface, and they all read from the same records."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {surfaces.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.to} to={s.to} className="reveal hp-card group p-6 transition hover:border-hp-gold/40">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-hp-line bg-[rgba(227,200,155,0.08)] text-hp-gold">
                        <Icon size={17} />
                      </span>
                      <div>
                        <div className="font-display text-[20px] text-hp-text">{s.name}</div>
                        <div className="text-[13px] text-hp-text3">{s.line}</div>
                      </div>
                    </div>
                    <ArrowRight
                      size={17}
                      className="mt-2 shrink-0 text-hp-text3 transition group-hover:translate-x-1 group-hover:text-hp-gold"
                    />
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-hp-text2">{s.body}</p>
                  <div className="mt-4 border-t border-hp-lineSoft pt-3 text-[13px] text-hp-goldDeep">{s.proof}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- the owner statement */}
      <section className="band py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHead
              eyebrow="The thing owners judge you on"
              title="A statement that survives being read closely."
              lede="One number an owner cannot explain costs more trust than a whole quarter of good performance. Every line of a HostPilot statement expands into what it is, where it came from and why it is that size — including the maintenance nobody asked about."
            />
            <div className="reveal mt-7">
              <PrimaryLink to="/owner">See HostPilot Owner</PrimaryLink>
            </div>
          </div>
          <div className="reveal hp-card overflow-hidden">
            <div className="border-b border-hp-lineSoft px-5 py-3.5 text-[13px] text-hp-text3">
              {demo.owner_statement.villa} · {demo.owner_statement.period} · demo data
            </div>
            <div className="divide-y divide-[color:var(--hp-line-soft)]">
              {demo.owner_statement.lines.map((l) => (
                <div key={l.label} className="flex items-center gap-3 px-5 py-2.5">
                  <span
                    className={`flex-1 text-[14px] ${
                      l.kind === 'total' ? 'font-semibold text-hp-text' : 'text-hp-text2'
                    }`}
                  >
                    {l.label}
                  </span>
                  <span
                    className="tnum text-[14px]"
                    style={{
                      color:
                        l.kind === 'total'
                          ? 'var(--hp-gold)'
                          : l.value_thb < 0
                          ? 'var(--hp-neg)'
                          : 'var(--hp-text)',
                    }}
                  >
                    {l.value_thb < 0 ? '−' : ''}฿{Math.abs(l.value_thb).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- closing */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="grain absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_120%,rgba(227,200,155,0.14),transparent_65%)]" />
        <div className="shell relative text-center">
          <Eyebrow className="!text-hp-goldDeep">Next step</Eyebrow>
          <h2 className="h-sec mx-auto mt-4 max-w-[22ch]">
            Look at it first. <span className="serif-em text-hp-text2">Talk to us second.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] text-hp-text2">
            Open the tour and form your own opinion. If it fits your portfolio, tell us how many villas you run and we
            will send a number the same day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/tour" className="btn btn-gold">
              <Play size={15} className="fill-current" /> Open the live tour
            </Link>
            <Link to="/pricing" className="btn btn-quiet">
              How pricing works <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
