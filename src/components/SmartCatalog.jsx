import { Link } from 'react-router-dom';
import { ArrowRight, KeyRound, MousePointerClick, Wrench, Zap } from 'lucide-react';
import { SectionHead } from './ui.jsx';
import asset from '../lib/asset.js';
import { smartItems, SMART_CATALOG_COUNT, SMART_CHECKED } from '../data/smart.js';

/**
 * Smart systems — the narrative section.
 *
 * BINDING FRAMING: we do not sell smart tech. The cameras, the lock, the meter
 * are already at the villa, sitting in five vendor apps that know nothing about
 * a booking. What HostPilot Pro adds is the connection to the property, the
 * reservation and the statement.
 *
 * The renders are context photography — what the kit looks like installed —
 * used large, inside the story. Installation is a real MPS service, so the full
 * list lives in a quieter strip lower down rather than as the headline.
 *
 * The honest boundary lives in one line in the tour's "What this demo does not
 * do" panel: device connections are in pilot. Do not re-scatter disclaimers here.
 */

const steps = [
  {
    icon: Zap,
    title: 'The meter meets the reservation',
    body:
      "A Shelly meter counts kWh. That is all a meter app can tell you. Connected to the property, the reading is split by stay, billed above the included allowance, and lands on the owner's statement as ฿11,240 of income — not as a note somebody has to remember to type.",
  },
  {
    icon: KeyRound,
    title: 'The door code knows the dates',
    body:
      'A code is generated from the booking, sent with the arrival message, and expires at checkout. Housekeeping gets a code valid 09:00–14:00. Nobody keeps a spreadsheet of PINs, and nobody drives a key across the island.',
  },
  {
    icon: MousePointerClick,
    title: 'One screen, not five apps',
    body:
      'Cameras, lock, tank level, leak sensors, solar and the charger appear next to the bookings and the payout, for the owner and the office. A low water tank raises a task on the ops board instead of an email nobody opens.',
  },
];

function InstallItem({ item }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-hp-lineSoft bg-[color:var(--hp-veil-1)] p-2.5">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-hp-lineSoft">
        <img
          src={asset(`/img/smart/${item.img}`)}
          alt={item.alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13.5px] font-medium text-hp-text">{item.name}</div>
        <div className="truncate text-[11.5px] text-hp-text3">{item.brand}</div>
      </div>
      <div className="tnum shrink-0 text-[12px] text-hp-text2">{item.install}</div>
    </div>
  );
}

export default function SmartCatalog() {
  return (
    <section id="smart" className="border-t border-hp-lineSoft py-16 sm:py-24">
      <div className="shell-wide">
        <SectionHead
          eyebrow="Smart systems"
          title={
            <>
              The tech at your villa, <span className="serif-em text-hp-text2">in the same app as the money.</span>
            </>
          }
          lede="Most villas already have it: cameras at the gate, a keypad lock on the main door, a meter in the board, maybe solar and a charger. It lives in five different vendor apps, and not one of them knows what a booking is. HostPilot Pro connects what is already installed to the property, the reservation and the statement."
        />

        {/* ------------------------------------------- large context image + story */}
        <div className="reveal mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-8">
          <div className="relative overflow-hidden rounded-2xl border border-hp-line">
            <img
              src={asset('/img/smart/lighting.jpg')}
              alt="A Koh Samui pool villa at dusk with its terrace lighting on"
              loading="lazy"
              className="h-full min-h-[280px] w-full object-cover sm:min-h-[380px]"
            />
            <div className="pointer-events-none absolute inset-0 caption-scrim" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="text-[11px] uppercase tracking-[0.14em] text-hp-goldDeep">Already installed</div>
              <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-hp-text">
                Nothing on this terrace was bought from us. The lighting, the cameras and the meter were here before
                the villa joined the portfolio.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="flex gap-4">
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'var(--hp-gold-wash)', border: '1px solid var(--hp-gold-rule)' }}
                  >
                    <Icon size={16} className="text-hp-goldInk" />
                  </span>
                  <div>
                    <h3 className="font-display text-[19px] text-hp-text">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-hp-text2">{s.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --------------------------------------------- second large context image */}
        <div className="reveal mt-6 grid gap-6 md:grid-cols-2">
          <figure className="relative overflow-hidden rounded-2xl border border-hp-line">
            <img
              src={asset('/img/smart/meter.png')}
              alt="A Shelly energy meter wired into a villa distribution board"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 caption-scrim" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <div className="text-[11px] uppercase tracking-[0.14em] text-hp-goldDeep">The loop that pays</div>
              <p className="mt-1.5 text-[15px] leading-relaxed text-hp-text">
                1,604 kWh in the board becomes{' '}
                <span className="font-semibold">฿11,240 of owner income</span> on the July statement, with the
                reading attached to the line.
              </p>
            </figcaption>
          </figure>

          <figure className="relative overflow-hidden rounded-2xl border border-hp-line">
            <img
              src={asset('/img/smart/gate.jpg')}
              alt="An automated gate at the driveway of a managed villa"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 caption-scrim" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <div className="text-[11px] uppercase tracking-[0.14em] text-hp-goldDeep">The loop that saves a drive</div>
              <p className="mt-1.5 text-[15px] leading-relaxed text-hp-text">
                Gate and door open on codes the reservation created, and close them again the hour the guest leaves.
              </p>
            </figcaption>
          </figure>
        </div>

        {/* ------------------------------------------------------- into the product */}
        <div
          className="reveal mt-6 flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:p-6"
          style={{ border: '1px solid var(--hp-gold-rule)', background: 'var(--hp-gold-wash-grad)' }}
        >
          <div className="flex-1">
            <div className="font-display text-[19px] text-hp-text">See the screen, not the sales pitch.</div>
            <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-hp-text2">
              The Smart systems tab is live in the interactive tour: four cameras, the lock with its three codes, and
              the meter card that jumps to the statement line it produces. Click it rather than read about it.
            </p>
          </div>
          <Link to="/tour?surface=owner" className="btn btn-gold shrink-0 !py-2.5 !text-[14.5px]">
            Open it in the tour <ArrowRight size={15} />
          </Link>
        </div>

        {/* ---------------------------------------------------- what we can install */}
        <div className="reveal mt-12 border-t border-hp-lineSoft pt-8">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Wrench size={15} className="text-hp-goldInk" />
            <h3 className="font-display text-[20px] text-hp-text">What we can install, if it is not there yet</h3>
            <span className="text-[13px] text-hp-text3">
              {SMART_CATALOG_COUNT} items · quoted per villa by the team that manages it
            </span>
          </div>
          <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-hp-text2">
            Fitting the hardware is a real Mr Property Siam service, and owners request it from inside the portal. It
            is simply not the headline — connecting what is already on the wall is.
          </p>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {smartItems.map((item) => (
              <InstallItem key={item.name} item={item} />
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-hp-text3">
            Catalogue read from the live product on {SMART_CHECKED}. Every job is quoted per villa — wiring, distance
            and access decide the number, so there is no useful list price. Fitting is handled by the team that manages
            the property. Device connections into the portal are in pilot: hardware is installed at villas today, live
            portal status is not switched on for every property yet.
          </p>
        </div>
      </div>
    </section>
  );
}
