import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { SectionHead, Eyebrow } from '../components/ui.jsx';
import StackCollapse from '../components/StackCollapse.jsx';
import BeingBuilt from '../components/BeingBuilt.jsx';
import CompatNote from '../components/CompatNote.jsx';

const flow = [
  {
    step: 'A booking lands',
    body:
      'Hostaway syncs the reservation. HostPilot creates the stay, the guest record, the turnover tasks and the revenue line in one write.',
    surfaces: ['Ops', 'Guest'],
  },
  {
    step: 'The guest gets a link',
    body:
      'Stay details, arrival countdown, door code timing and the add-on catalogue for that villa. Anything they book becomes a task and a charge.',
    surfaces: ['Guest', 'Ops'],
  },
  {
    step: 'The work is assigned',
    body:
      'Departure clean, pool chemistry, pre-arrival inspection. Each lands on a department board and on one person’s phone.',
    surfaces: ['Ops', 'Field'],
  },
  {
    step: 'The work is closed in the field',
    body:
      'Clock-in, photos, completion time, receipts. This is the evidence layer everything downstream depends on.',
    surfaces: ['Field'],
  },
  {
    step: 'The month closes',
    body:
      'Reservations, recoveries, service costs and maintenance assemble into a statement. Nothing is re-typed, so nothing can silently disagree.',
    surfaces: ['Ops', 'Owner'],
  },
  {
    step: 'The owner reads it',
    body:
      'Every line expandable to the invoice or the closed task behind it, plus an assistant that explains movement and volunteers what went wrong.',
    surfaces: ['Owner'],
  },
];

export default function FullSuite() {
  useSeo({
    title: 'The full suite — four surfaces on one database',
    description:
      'How HostPilot Ops, Owner, Guest and Field share a single data model: a booking becomes tasks, tasks become evidence, evidence becomes an owner statement.',
    path: '/full-suite',
  });
  return (
    <div>
      <section className="relative overflow-hidden border-b border-hp-lineSoft">
        <div className="grain absolute inset-0 bg-[radial-gradient(110%_90%_at_80%_-20%,var(--hp-gold-tint),transparent_60%)]" />
        <div className="shell relative pb-14 pt-28 sm:pt-32">
          <Eyebrow>The full suite</Eyebrow>
          <h1 className="h-sec mt-4 max-w-[24ch] font-medium">
            One database, <span className="serif-em text-hp-text2">four ways in.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-hp-text2">
            The reason an owner statement can be trusted is that it is assembled from the same records the cleaner
            closed on her phone that morning. Buying the four surfaces separately would not produce that. They are one
            system with four front doors.
          </p>
          <CompatNote className="mt-7" />
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/tour" className="btn btn-gold">
              <Play size={15} className="fill-current" /> Walk all four in the tour
            </Link>
            <Link to="/pricing" className="btn btn-quiet">
              How pricing works <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <StackCollapse compact />

      <section className="py-16 sm:py-20">
        <div className="shell">
          <SectionHead
            eyebrow="One booking, end to end"
            title="Follow a single reservation through the system."
            lede="Six steps. No export, no re-keying, no reconciliation between two tools that half-agree."
          />
          <ol className="mt-10 space-y-3">
            {flow.map((f, i) => (
              <li key={f.step} className="reveal hp-card flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
                <span className="tnum shrink-0 font-display text-[30px] leading-none text-hp-goldDim">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="font-display text-[19px] text-hp-text">{f.step}</div>
                  <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-hp-text2">{f.body}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-1.5">
                  {f.surfaces.map((s) => (
                    <span key={s} className="chip !text-[11.5px]">
                      {s}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band py-16 sm:py-20">
        <div className="shell">
          <SectionHead
            eyebrow="Where we sit"
            title="On top of your channel manager, not instead of it."
            lede="Replacing distribution is a migration nobody wants and a risk nobody needs. HostPilot syncs with Hostaway and takes over everything that happens after the booking is confirmed."
          />
          <div className="mt-9 grid gap-3 md:grid-cols-3">
            {[
              ['Your channel manager keeps', 'Channel connections, OTA rates and content, inventory sync, the booking itself. Hostaway is the one we sync with today.'],
              ['HostPilot takes', 'Tasks, staff, field work, guest experience, tours and transfers, add-on revenue, ledgers and statements, owner reporting, cash.'],
              ['You keep', 'Your existing website, payment provider, accountant and any pricing tool you already trust.'],
            ].map(([t, b]) => (
              <div key={t} className="reveal hp-card p-5">
                <div className="eyebrow">{t}</div>
                <p className="mt-3 text-[15px] leading-relaxed text-hp-text2">{b}</p>
              </div>
            ))}
          </div>
          <p className="reveal mt-7 max-w-2xl text-[14.5px] text-hp-text3">
            Being straight about this: Hostaway is the only channel manager HostPilot syncs with today. Guesty and
            Lodgify connectors are being built — they are adapters rather than rewrites, but they are not finished, so
            if you run on either one you cannot subscribe and connect this week. Tell us on the call and we will tell you
            where the queue is.
          </p>
        </div>
      </section>

      <BeingBuilt />

      <section className="band py-16 text-center sm:py-20">
        <div className="shell">
          <h2 className="h-sub font-display">Four surfaces. One tour. No signup.</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/tour" className="btn btn-gold">
              Open the live tour
            </Link>
            <Link to="/demo" className="btn btn-quiet">
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
