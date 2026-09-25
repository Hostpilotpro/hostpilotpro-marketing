import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Info, Command, MousePointerClick, ArrowRight, PhoneCall } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { BrowserFrame, PhoneFrame, Eyebrow } from '../components/ui.jsx';
import OwnerPortal from '../tour/OwnerPortal.jsx';
import GuestApp from '../tour/GuestApp.jsx';
import FieldApp from '../tour/FieldApp.jsx';
import BusinessStories from '../components/BusinessStories.jsx';

const surfaces = [
  {
    key: 'ops',
    label: 'Ops console',
    kind: 'desktop',
    host: 'ops.hostpilotpro.com',
    persona: 'Signed in as the main office of Azure Coast Villas',
    hints: [
      // Third element marks a hint as desktop-only: a phone has no ⌘K.
      ['Press ⌘K (or Ctrl+K) and type a villa name', Command, true],
      ['Tap any villa to open its dossier', MousePointerClick],
      ['Open Operations in the left rail for the task board', MousePointerClick],
    ],
  },
  {
    key: 'owner',
    label: 'Owner portal',
    kind: 'desktop',
    host: 'owner.hostpilotpro.com',
    persona: 'Signed in as Alexander Reid, owner of Villa Sunset Sapphire',
    hints: [
      ['Expand any statement line for the plain-English verdict', MousePointerClick],
      ['Ask the concierge the question at the bottom', MousePointerClick],
      ['Answer the RatePilot approval three different ways', MousePointerClick],
      ['Open Smart systems — follow the meter to the statement line it produces', MousePointerClick],
    ],
  },
  {
    key: 'guest',
    label: 'Guest app',
    kind: 'phone',
    host: 'stay.hostpilotpro.com',
    persona: 'Tobias Lindqvist, arriving today at Villa Sunset Sapphire',
    hints: [
      ['Tap add-ons to build the running total', MousePointerClick],
      ['Door code and Wi-Fi appear the morning of arrival', Info],
    ],
  },
  {
    key: 'field',
    label: 'Field app',
    kind: 'phone',
    host: 'field.hostpilotpro.com',
    persona: 'Nalin P., housekeeping lead',
    hints: [
      ['Tap the language chip — the whole app re-labels', MousePointerClick],
      ['Open My jobs and claim an unassigned job', MousePointerClick],
    ],
  },
];

const DISCLOSURE =
  'Sample portfolio. Azure Coast Villas is a fictional 24-villa operator — every figure on this page is demo data.';

function FrameChrome({ children, host, kind, persona }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-hp-text3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-hp-gold/30 bg-[color:var(--hp-gold-wash)] px-2.5 py-1 text-hp-goldDeep">
          <Info size={11} /> {DISCLOSURE}
        </span>
        <span>{persona}</span>
      </div>
      {kind === 'desktop' ? (
        <>
          {/* Desktop replica inside browser chrome from md up; full-bleed below. */}
          <div className="hidden md:block">
            <BrowserFrame host={host} note="Live replica · not a screenshot">
              {children}
            </BrowserFrame>
          </div>
          <div className="-mx-5 overflow-hidden border-y border-hp-line md:hidden">{children}</div>
        </>
      ) : (
        <>
          <div className="hidden sm:block">
            <PhoneFrame label={host}>{children}</PhoneFrame>
          </div>
          <div className="-mx-5 overflow-hidden border-y border-hp-line sm:hidden">{children}</div>
        </>
      )}
    </div>
  );
}

export default function Tour() {
  useSeo({
    title: 'HostPilot Pro | Real Ops screenshots and product demonstrations',
    description:
      'See actual Ops screenshots from Mr Property Siam, with sensitive data masked. Explore the separate Owner, Guest and Field demonstrations. No signup.',
    path: '/tour',
  });
  /* /tour?surface=owner lands straight on the owner portal — the marketing
     smart-systems section links in that way. */
  const [params,setParams]=useSearchParams();
  const wanted = params.get('surface');
  const showStories = !wanted || wanted === 'ops' || !surfaces.some(x=>x.key===wanted);
  const active=surfaces.some(x=>x.key===wanted)?wanted:'ops';
  const setActive=key=>setParams({surface:key});
  const s = surfaces.find((x) => x.key === active);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  /* The fixed Book-a-call pill sat on top of the intro copy and the demo-data
     disclosure on a phone, where there is no spare gutter to hold it. Hold it
     back until the reader is into the replica, then keep it for the rest of
     the page. */
  const [showCta, setShowCta] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowCta(window.scrollY > 620);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // pb-20 keeps the last section clear of the fixed Book-a-call pill on phones.
    <div className="pb-20 pt-16 sm:pb-0">
      {/* header */}
      <section className="relative overflow-hidden border-b border-hp-lineSoft">
        <div className="grain absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_-10%,var(--hp-gold-tint),transparent_60%)]" />
        <div className="shell relative py-12 sm:py-16">
          <Eyebrow>The HostPilot Pro walkthrough</Eyebrow>
          <h1 className="h-sec mt-4 max-w-3xl">
            {showStories?'The real Ops workspace.':'Explore the product replicas.'} <span className="serif-em text-hp-text2">No signup.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] text-hp-text2">
            {showStories?'Actual screenshots from Mr Property Siam using HostPilot Pro. Explore the message centre, owner ledger, finance overview and payroll walkthrough without opening a live account.':'The Owner, Guest and Field demonstrations use fictional data and illustrate selected interactions. They are separate from the actual Ops screenshots.'}
          </p>
          <p className="mt-4 max-w-2xl text-[14.5px] text-hp-text3">
            {showStories?'Only sensitive data has been replaced or hidden. The application layout, branding, controls and visible statuses are unchanged.':'Nothing here connects to a live account. Sample messages, amounts and records reset when you reload.'}
          </p>
          {!showStories&&<Link to="/tour" className="btn btn-quiet mt-6">See real Ops screenshots <ArrowRight size={15}/></Link>}
        </div>
      </section>

      {showStories&&<section className="shell-wide py-10 sm:py-14"><BusinessStories initial={params.get('story')||'messages'} inTour onStoryChange={story=>setParams({story})}/><div className="blend-preserved-banner"><p>Explore the separate product demonstrations:</p><div className="mt-4 flex flex-wrap gap-3">{surfaces.filter(x=>x.key!=='ops').map(x=><Link key={x.key} className="btn btn-quiet !text-[13px] !py-2" to={`/tour?surface=${x.key}`}>{x.label}<ArrowRight size={13}/></Link>)}</div></div></section>}
      {!showStories&&<>
      {/* segmented control */}
      {/* Not sticky below sm: stacked under the site header it took roughly a
         third of a 375px viewport and clipped the replica behind it. On a phone
         you scroll back up to change surface. */}
      <div className="z-40 border-b border-hp-lineSoft bg-[color:var(--hp-sticky)] backdrop-blur-xl sm:sticky sm:top-16">
        <div className="shell-wide flex items-center gap-3 py-2.5 sm:py-3">
          <div className="flex flex-1 gap-1 overflow-x-auto no-scrollbar rounded-full border border-hp-line bg-[color:var(--hp-veil-2)] p-1">
            {surfaces.map((x) => (
              <button
                key={x.key}
                onClick={() => setActive(x.key)}
                aria-current={active === x.key}
                className={`shrink-0 rounded-full px-4 py-2 text-[13.5px] font-medium transition ${
                  active === x.key
                    ? 'gold-fill'
                    : 'text-hp-text2 hover:text-hp-text'
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* stage */}
      <section className="shell-wide py-8 sm:py-12">
        <div className="mb-5 flex flex-wrap gap-2">
          {s.hints.map(([h, Icon, desktopOnly]) => (
            <span
              key={h}
              className={`chip !text-[12px] ${desktopOnly ? 'hidden sm:inline-flex' : ''}`}
            >
              <Icon size={12} className="text-hp-goldInk" /> {h}
            </span>
          ))}
        </div>

        <FrameChrome host={s.host} kind={s.kind} persona={s.persona}>
          {active === 'owner' && <OwnerPortal />}
          {active === 'guest' && <GuestApp />}
          {active === 'field' && <FieldApp />}
        </FrameChrome>

        {/* the other three, as jump cards */}
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {surfaces
            .filter((x) => x.key !== active)
            .map((x) => (
              <button
                key={x.key}
                onClick={() => {
                  setActive(x.key);
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                className="hp-card-flat p-4 text-left transition hover:border-hp-gold/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-[17px] text-hp-text">{x.label}</span>
                  <ArrowRight size={15} className="text-hp-goldInk" />
                </div>
                <div className="mt-1.5 text-[12.5px] text-hp-text3">{x.persona}</div>
              </button>
            ))}
        </div>

        <div className="mt-12 rounded-2xl border border-hp-line bg-[color:var(--hp-veil-1)] p-6 sm:p-8">
          <h2 className="font-display text-[22px] text-hp-text">What this demo does not do</h2>
          <ul className="mt-4 grid gap-2.5 text-[15px] text-hp-text2 sm:grid-cols-2">
            {[
              'Nothing you click is saved. Reload and it resets.',
              'Nothing pushes anywhere. Approving a rate or a payment here changes no production record and sends no bank instruction.',
              'Every villa, owner, guest, staff member and figure is invented for this demo.',
              'Smart-device screens illustrate planned connections, not a demonstrated live integration. Hardware installation, catalogue access and connected device control are separate capabilities.',
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hp-goldDim" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl text-[15px] text-hp-text3">
            These replicas cover selected interactions. For a decision about your business, ask us to demonstrate
            the specific live workflows, integration status and limitations that matter to you.
          </p>
          <Link to="/demo" className="btn btn-gold mt-6">
            Book a call <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      </>}

      {/* Floating CTA. On a phone it sat directly on top of page content at every
         scroll position, so below sm it shrinks to a labelled pill with a tighter
         inset and the page carries bottom padding so nothing ends up permanently
         hidden behind it. */}
      {!showStories&&<Link
        to="/demo"
        aria-hidden={!showCta}
        tabIndex={showCta ? 0 : -1}
        className={`fixed bottom-4 right-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-hp-gold/60 gold-fill px-3 py-2 text-[13px] font-semibold text-[color:var(--hp-on-gold)] shadow-goldGlow transition-opacity duration-300 sm:bottom-5 sm:right-5 sm:gap-2 sm:px-4 sm:py-3 sm:text-[14px] ${
          showCta ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <PhoneCall size={14} className="sm:hidden" />
        <PhoneCall size={15} className="hidden sm:block" /> Book a call
      </Link>}
    </div>
  );
}
