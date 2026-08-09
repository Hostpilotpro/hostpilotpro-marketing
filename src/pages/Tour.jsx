import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Command, MousePointerClick, ArrowRight, PhoneCall } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { BrowserFrame, PhoneFrame, Eyebrow } from '../components/ui.jsx';
import OpsConsole from '../tour/OpsConsole.jsx';
import OwnerPortal from '../tour/OwnerPortal.jsx';
import GuestApp from '../tour/GuestApp.jsx';
import FieldApp from '../tour/FieldApp.jsx';

const surfaces = [
  {
    key: 'ops',
    label: 'Ops console',
    kind: 'desktop',
    host: 'ops.hostpilotpro.com',
    persona: 'Signed in as the main office of Azure Coast Villas',
    hints: [
      ['Press ⌘K (or Ctrl+K) and type a villa name', Command],
      ['Click any villa to open its dossier', MousePointerClick],
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
    title: 'Interactive tour — click through HostPilot Pro without signing up',
    description:
      'A working replica of all four HostPilot Pro surfaces: the ops console, the owner portal, the guest app and the staff field app. No signup, no email gate, no sales call.',
    path: '/tour',
  });
  const [active, setActive] = useState('ops');
  const s = surfaces.find((x) => x.key === active);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="pt-16">
      {/* header */}
      <section className="relative overflow-hidden border-b border-hp-lineSoft">
        <div className="grain absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_-10%,var(--hp-gold-tint),transparent_60%)]" />
        <div className="shell relative py-12 sm:py-16">
          <Eyebrow>The live tour</Eyebrow>
          <h1 className="h-sec mt-4 max-w-3xl">
            Click through the whole product. <span className="serif-em text-hp-text2">No signup.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] text-hp-text2">
            Four surfaces, one database. These are not screenshots — they are the real interface rebuilt in your
            browser and filled with a fictional 24-villa portfolio. Break things. Nothing here can be saved.
          </p>
          <p className="mt-4 max-w-2xl text-[14.5px] text-hp-text3">
            Of the eight vacation-rental platforms we surveyed, none let you touch the product before a sales call.
            This page is our answer to that.
          </p>
        </div>
      </section>

      {/* segmented control */}
      <div className="sticky top-16 z-40 border-b border-hp-lineSoft bg-[color:var(--hp-sticky)] backdrop-blur-xl">
        <div className="shell-wide flex items-center gap-3 py-3">
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
          {s.hints.map(([h, Icon]) => (
            <span key={h} className="chip !text-[12px]">
              <Icon size={12} className="text-hp-goldInk" /> {h}
            </span>
          ))}
        </div>

        <FrameChrome host={s.host} kind={s.kind} persona={s.persona}>
          {active === 'ops' && <OpsConsole />}
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
              'The Hostaway sync, payouts and payroll are live in the product but stubbed here.',
              'Only three sections of the ops console are wired up: Home, Properties, Operations.',
              'Every villa, owner, guest, staff member and figure is invented for this demo.',
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hp-goldDim" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl text-[15px] text-hp-text3">
            If you want to see the parts that are stubbed here running on live data, we will screen-share the real
            system on a call — including the unglamorous bits.
          </p>
          <Link to="/demo" className="btn btn-gold mt-6">
            Book a call <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* floating CTA */}
      <Link
        to="/demo"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-hp-gold/60 gold-fill px-4 py-3 text-[14px] font-semibold text-[color:var(--hp-on-gold)] shadow-goldGlow"
      >
        <PhoneCall size={15} /> Book a call
      </Link>
    </div>
  );
}
