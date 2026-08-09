import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { SectionHead, Eyebrow } from '../components/ui.jsx';

const timeline = [
  [
    'The spreadsheet years',
    'Mr Property Siam ran a growing villa portfolio on spreadsheets, WhatsApp groups and a channel manager. It worked until it did not: two people editing the same rota, an owner asking about a pool bill nobody could find, a clean that everyone assumed someone else had logged.',
  ],
  [
    'The statement problem',
    'The breaking point was owner reporting. Producing a monthly statement took days, and defending one took an afternoon. If the operational record is not the source of the statement, every month becomes an argument. So the operational record came first.',
  ],
  [
    'The field app',
    'The second thing built was the staff app, because none of the data upstream is real unless the person doing the work can close the job in thirty seconds, outdoors, in their own language. Everything office-facing is downstream of that.',
  ],
  [
    'The owner portal',
    'Once the records were trustworthy, owners could be given a door of their own — statements they can open line by line, a payout history, a forward pipeline, and rate changes they approve rather than discover.',
  ],
  [
    'The guest app',
    'Guests were the last surface, and the only one that pays for itself directly. A priced add-on list in the guest’s pocket turns concierge work from an inbox chore into revenue.',
  ],
  [
    'Now',
    'The four surfaces are one system on one database, and it runs the company every day. That is the whole pitch: this is not a product built to be sold, it is a product being used, which is now being sold.',
  ],
];

export default function About() {
  useSeo({
    title: 'About — built by an operator on Koh Samui, not a software company',
    description:
      'HostPilot Pro was built inside Mr Property Siam, a villa management company on Koh Samui, because the operation needed it. The company still runs on it daily.',
    path: '/about',
  });
  return (
    <div>
      <section className="relative overflow-hidden border-b border-hp-lineSoft">
        <img src="/img/samui-coast.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,12,10,0.78)_0%,rgba(13,12,10,0.9)_60%,#0D0C0A_100%)]" />
        <div className="grain absolute inset-0" />
        <div className="shell relative pb-16 pt-28 sm:pt-36">
          <Eyebrow>About</Eyebrow>
          <h1 className="h-sec mt-4 max-w-[24ch] font-medium">
            Built by an operator, <span className="serif-em text-hp-text2">not a software company.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-hp-text2">
            HostPilot Pro comes out of Mr Property Siam, a villa management company that looks after more than 80
            villas on Koh Samui. Every screen exists because something in that operation was breaking. The company
            runs on this software daily, which means the people who maintain it are the people who depend on it.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="shell">
          <SectionHead
            eyebrow="How it got built"
            title="In the order the problems arrived."
            lede="Nothing here was planned as a platform. It was built one broken process at a time, which is why the pieces fit."
          />
          <ol className="mt-10 grid gap-3 md:grid-cols-2">
            {timeline.map(([t, b], i) => (
              <li key={t} className="reveal hp-card p-6">
                <div className="tnum font-display text-[26px] leading-none text-hp-goldDim">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-3 font-display text-[19px] text-hp-text">{t}</div>
                <p className="mt-2 text-[15px] leading-relaxed text-hp-text2">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHead
              eyebrow="Koh Samui"
              title="Why the island shaped the product."
              lede="Samui is a specific operating environment, and it made the software opinionated in ways a generic PMS is not."
            />
            <ul className="reveal mt-7 space-y-3.5 text-[15.5px] text-hp-text2">
              {[
                'Staff teams are commonly Thai and Burmese, so the field app is trilingual rather than English with a translation toggle.',
                'Owners are usually overseas and asleep when things happen, so the portal has to answer questions without a human awake.',
                'Villas are individual buildings with individual pumps, gardens and meters, so maintenance and recoveries are first-class, not an expense category.',
                'Thai compliance is real work: TM30 filing and VAT on services are part of the flow, not an afterthought.',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hp-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal overflow-hidden rounded-2xl border border-hp-line shadow-frame">
            <img src="/img/villa-day.jpg" alt="A villa terrace on Koh Samui in the morning" className="w-full" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="shell max-w-3xl">
          <SectionHead
            eyebrow="What we are not claiming"
            title="The honest version."
            lede="This category is full of numbers that cannot be checked. Here is what we will not say."
          />
          <ul className="reveal mt-7 space-y-3 text-[15.5px] text-hp-text2">
            {[
              'We are not publishing a customer count. The product is used daily by the company that built it and is now being offered to other operators.',
              'We are not publishing a revenue-uplift percentage. Any figure we quoted would come from one operation and would not transfer to yours.',
              'We have no review-site score to show, because we have not been on review sites long enough to have an honest one.',
              'We are not the biggest, the first, or the only. We are the one you can click through before anyone phones you.',
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hp-neg" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/tour" className="btn btn-gold">
              Open the live tour <ArrowRight size={15} />
            </Link>
            <Link to="/demo" className="btn btn-quiet">
              Talk to the operator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
