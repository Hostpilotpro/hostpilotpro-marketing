import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { SectionHead, Eyebrow } from '../components/ui.jsx';
import CompatNote from '../components/CompatNote.jsx';
import asset from '../lib/asset.js';

/**
 * The founder story, first person, from messaging-v2 §4.
 *
 * Tone toward competitors is fixed by messaging-v2 §2: generous, then specific.
 * Credit Guesty, Hostify, Lodgify and Hostaway for channel management, the
 * booking site and the synced inbox — then widen the frame. No insults, no
 * scoring tables, no "why we beat X". Nothing about a competitor being
 * outdated, bloated, overpriced or uncaring may appear on this page.
 */

/** The four platforms, in the order they were actually run. */
const platforms = [
  { name: 'Guesty', note: 'First. Taught me what a real channel manager does.' },
  { name: 'Hostify', note: 'Then this. Cleaner in places, same shape of job.' },
  { name: 'Lodgify', note: 'Then this, mostly for the booking site.' },
  { name: 'Hostaway', note: 'And this. Still on it. It is what we sync with today.' },
];

export default function About() {
  useSeo({
    title: 'About — I run 80+ villas on Koh Samui. I built this because I needed it',
    description:
      'Hotel school in the Netherlands, eight years in hotels, ten in property management, 80+ villas on Koh Samui today. I ran Guesty, Hostify, Lodgify and Hostaway. HostPilot Pro is the other four-fifths of the job.',
    path: '/about',
  });

  return (
    <div>
      {/* --------------------------------------------------------------- opening */}
      <section className="relative overflow-hidden border-b border-hp-lineSoft">
        <img
          src={asset('/img/samui-coast.jpg')}
          alt=""
          className="hero-img-soft absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-scrim-strong" />
        <div className="grain absolute inset-0" />
        <div className="shell relative pb-16 pt-28 sm:pt-36">
          <Eyebrow>About</Eyebrow>
          <h1 className="h-sec mt-4 max-w-[26ch] font-medium">
            I manage villas for a living. <span className="serif-em text-hp-text2">This is the software I needed.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-[1.7] text-hp-text2">
            My name is Jordi. I run Mr Property Siam on Koh Samui — more than 80 villas, today, this morning, with real
            owners waiting on real statements. HostPilot Pro is not a product I imagined for other people. It is the
            system my own company runs on, and I am now offering it to operators with the same problems.
          </p>
          <CompatNote variant="line" className="mt-6 max-w-2xl" />
        </div>
      </section>

      {/* ------------------------------------------------------------ the story */}
      <section className="py-16 sm:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="max-w-[62ch]">
            <Eyebrow>How I got here</Eyebrow>
            <div className="rule-gold mt-5 w-24" />

            <div className="mt-7 space-y-5 text-[17px] leading-[1.75] text-hp-text2">
              <p>
                I studied hotel and event management at one of the top hotel schools in the Netherlands. Then eight years
                in hotels. Then ten years in property management. On paper that is a straight line.
              </p>
              <p className="text-[19px] leading-[1.6] text-hp-text">
                Almost nothing school taught me helped in practice. Building this did.
              </p>
              <p>
                I do not say that to be clever about education. I say it because it is the honest description of the last
                decade. The curriculum covered revenue theory and service standards. It did not cover what to do when a
                pool pump seal fails on a Saturday, the owner is in another timezone, the cleaner closed the job in
                Burmese, and the statement goes out on Tuesday. I learned that by getting it wrong for years, and then by
                writing software until it stopped going wrong.
              </p>
              <p>
                Somewhere in there I stopped being a manager who used software and became a manager who wrote it. Not
                because I wanted a software company. Because I kept needing a screen that did not exist.
              </p>
            </div>

            <h2 className="h-sub mt-14 font-display">The four platforms I ran, in order.</h2>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {platforms.map((p, i) => (
                <div key={p.name} className="reveal hp-card-flat p-4">
                  <div className="flex items-baseline gap-2.5">
                    <span className="tnum font-display text-[15px] text-hp-goldDim">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[15.5px] font-semibold text-hp-text">{p.name}</span>
                  </div>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-hp-text2">{p.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-hp-text2">
              <p>
                I want to be careful here, because this is where most software companies start throwing punches. Guesty,
                Hostify, Lodgify, Hostaway — I ran on all of them, and they are good at what they are built for.
                Channel management is genuinely hard, and they do it. A booking site that works. A synced inbox that
                pulls Airbnb, Booking.com and email into one place. I do not have a bad word to say about any of that,
                and I am not trying to take it from them. We still sit on Hostaway.
              </p>
              <p className="text-[19px] leading-[1.6] text-hp-text">
                But a channel manager, a booking website and a synced inbox — that is maybe a fifth of running a villa
                business.
              </p>
              <p>
                The other four-fifths is where my week actually goes. Owner statements that survive being read closely.
                Somebody physically doing the clean, and proving it. Petty cash. Staff documents. A pool bill nobody can
                find. Villa maintenance that has to be disclosed before it is asked about. Rate changes an owner agreed
                to rather than discovered. Tours, transfers and everything a guest wants at 11pm. Every one of those, I
                went looking for in the platform I was paying for, and it was never there — or it was a text field where
                a workflow should have been.
              </p>
              <p>
                So I built it. Not as a plan for a platform: one broken process at a time, in the order the problems
                arrived, while running the operation the software runs.
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------------ facts */}
          <aside className="lg:sticky lg:top-24">
            <div className="reveal overflow-hidden rounded-2xl border border-hp-line shadow-frame">
              <img
                src={asset('/img/villa-day.jpg')}
                alt="A managed villa terrace on Koh Samui in the morning"
                className="w-full"
              />
            </div>
            <div className="reveal hp-card mt-4 p-6">
              <div className="eyebrow">The short version</div>
              <dl className="mt-4 space-y-3.5">
                {[
                  ['Hotel and event management', 'One of the top hotel schools in the Netherlands'],
                  ['8 years', 'In hotels'],
                  ['10 years', 'In property management'],
                  ['80+ villas', 'Under management on Koh Samui today, as Mr Property Siam'],
                  ['4 platforms run', 'Guesty, Hostify, Lodgify, Hostaway — kept the last one'],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-hp-lineSoft pb-3 last:border-0 last:pb-0">
                    <dt className="text-[15px] font-semibold text-hp-text">{k}</dt>
                    <dd className="mt-0.5 text-[14px] leading-relaxed text-hp-text2">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[13.5px] leading-relaxed text-hp-text3">
                Which is the whole answer to “why trust a villa manager from Thailand over a funded software company.”
                Because I am the customer, and I am still running the operation.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* --------------------------------------------------- what the island did */}
      <section className="band py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHead
              eyebrow="Koh Samui"
              title="Why the island shaped it."
              lede="Samui is a specific place to operate, and it made the software opinionated in ways a general-purpose PMS is not."
            />
            <ul className="reveal mt-7 space-y-3.5 text-[15.5px] text-hp-text2">
              {[
                'My teams are Thai and Burmese, so the field app is trilingual rather than English with a translate button bolted on.',
                'My owners are overseas and asleep when things break, so the portal has to answer them without waking anybody up.',
                'Every villa is its own building with its own pump, garden and meter, so maintenance and recoveries are first-class records, not an expense category.',
                'Thai compliance is real work. TM30 and VAT-aware reporting are part of the flow, not a report you export once a year.',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hp-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal overflow-hidden rounded-2xl border border-hp-line shadow-frame">
            <img
              src={asset('/img/villa-sapphire-hero.jpg')}
              alt="A villa on Koh Samui at dusk"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- honest limits */}
      <section className="py-16 sm:py-20">
        <div className="shell max-w-3xl">
          <SectionHead
            eyebrow="What I am not claiming"
            title="The honest version."
            lede="This category is full of numbers nobody can check. Here is what I will not say to you."
          />
          <ul className="reveal mt-7 space-y-3 text-[15.5px] text-hp-text2">
            {[
              'I am not publishing a customer count. The product is used daily by the company that built it and is now being offered to other operators.',
              'I am not publishing a revenue-uplift percentage. Any figure I quoted would come from one operation on one island and would not transfer to yours.',
              'I have no review-site score to show, because I have not been on review sites long enough to have an honest one.',
              'I am not going to tell you your current platform is bad. It is probably fine at the fifth of the job it was built for.',
              'Hostaway is the only channel manager we sync with today. If you are on Guesty or Lodgify, that connector is still being built and I will tell you where the queue is.',
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
              Talk to me directly
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
