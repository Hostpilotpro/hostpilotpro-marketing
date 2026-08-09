import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import { SectionHead } from './ui.jsx';
import asset from '../lib/asset.js';
import { smartItems, SMART_CATALOG_COUNT, SMART_CHECKED } from '../data/smart.js';

/**
 * The smart-tech catalogue.
 *
 * BINDING FRAMING (messaging-v2 §8): a catalogue and a quote-request surface.
 * Zero connected devices, no lock integration. The copy in here describes the
 * hardware an owner orders and the install that follows — never live feeds,
 * remote unlocking, or readings arriving in the portal. The limits card is not
 * optional decoration; it is the reason this section is allowed to exist.
 */

function Price({ item }) {
  return (
    <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-hp-lineSoft pt-3">
      <span className="tnum text-[13.5px] text-hp-text">
        <span className="text-[11.5px] uppercase tracking-[0.12em] text-hp-text3">Install </span>
        {item.install}
      </span>
      {item.monthly && (
        <span className="tnum text-[13.5px] text-hp-text2">
          <span className="text-[11.5px] uppercase tracking-[0.12em] text-hp-text3">Monthly </span>
          {item.monthly}
        </span>
      )}
    </div>
  );
}

export default function SmartCatalog() {
  const features = smartItems.filter((i) => i.feature);
  const rest = smartItems.filter((i) => !i.feature);

  return (
    <section id="smart" className="border-t border-hp-lineSoft py-16 sm:py-24">
      <div className="shell-wide">
        <SectionHead
          eyebrow="Smart tech"
          title={
            <>
              Specify and order smart tech <span className="serif-em text-hp-text2">for your villa.</span>
            </>
          }
          lede={`Owners open a catalogue inside their portal, look at ${SMART_CATALOG_COUNT} things they could put in their villa, and ask us to install one. Cameras, locks, meters, EV chargers, leak sensors, gates. The photography is ours, the install is ours, and the quote comes back from the same people who manage the property.`}
        />

        {/* ------------------------------------------------- the honest boundary */}
        <div
          className="reveal mt-9 rounded-2xl p-5 sm:p-6"
          style={{
            border: '1px solid var(--hp-gold-rule)',
            background: 'var(--hp-gold-wash-grad)',
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-hp-goldInk" />
            <div>
              <div className="font-display text-[18px] text-hp-text">
                What this is, precisely: a catalogue and a quote request.
              </div>
              <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-hp-text2">
                Nothing here is connected to the portal today. No live camera feeds, no unlocking a door from your
                dashboard, no meter readings streaming onto a statement. Not one device is connected yet. What works is
                the part before that: an owner browses, requests, and we quote and install. Bringing installed hardware
                into the portal is on the roadmap below, and it has not started.
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------- feature cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item, i) => (
            <article
              key={item.name}
              className={`reveal hp-card group relative overflow-hidden ${
                i === 0 ? 'md:col-span-2 xl:col-span-2' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <img
                  src={asset(`/img/smart/${item.img}`)}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 scrim-v opacity-70" />
                <span
                  className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{
                    background: 'var(--hp-scrim-panel)',
                    border: '1px solid var(--hp-line)',
                    color: 'var(--hp-text-2)',
                  }}
                >
                  {item.brand}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-[20px] text-hp-text">{item.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-hp-text2">{item.body}</p>
                <Price item={item} />
              </div>
            </article>
          ))}
        </div>

        {/* --------------------------------------------------------- the long tail */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((item) => (
            <article key={item.name} className="reveal hp-card group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={asset(`/img/smart/${item.img}`)}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 scrim-v opacity-60" />
              </div>
              <div className="p-4">
                <div className="text-[11.5px] uppercase tracking-[0.12em] text-hp-text3">{item.brand}</div>
                <h3 className="mt-1 font-display text-[17px] leading-snug text-hp-text">{item.name}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-hp-text2">{item.body}</p>
                <Price item={item} />
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[13px] leading-relaxed text-hp-text3">
            Catalogue read from the live product on {SMART_CHECKED}: {SMART_CATALOG_COUNT} active items. Install figures
            are the catalogue’s own indicative prices in Thai baht and every job is re-quoted per villa — wiring,
            distance and access decide the real number. Photography is the catalogue’s own staged villa imagery.
          </p>
          <Link to="/demo" className="btn btn-quiet shrink-0 !py-2.5 !text-[14.5px]">
            <FileText size={14} /> Ask for a villa quote <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
