import { Hammer } from 'lucide-react';
import { roadmap } from '../data/roadmap.js';

/**
 * "Being built now" — roadmap only.
 *
 * Deliberately drawn unlike every other block on the site: dashed outlines, a
 * hatched ground, no gold fill, no imagery, no CTA. If a visitor skims, the
 * block still has to read as unfinished. Nothing shipped may ever be described
 * in here, and nothing in here may be described anywhere else as shipped.
 */
export default function BeingBuilt({ only, className = '' }) {
  const items = only ? roadmap.filter((r) => only.includes(r.id)) : roadmap;
  if (items.length === 0) return null;

  return (
    <section className={`py-16 sm:py-20 ${className}`} aria-labelledby="being-built">
      <div className="shell">
        <div
          className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
          style={{
            border: '1px dashed var(--hp-line)',
            background: 'var(--hp-veil-1)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              background:
                'repeating-linear-gradient(135deg, var(--hp-veil-2) 0 10px, transparent 10px 20px)',
            }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{
                  border: '1px dashed var(--hp-text-3)',
                  color: 'var(--hp-text-3)',
                }}
              >
                <Hammer size={12} /> Not shipped yet
              </span>
              <span className="text-[13px] text-hp-text3">Nothing below this line works today.</span>
            </div>

            <h2 id="being-built" className="h-sub mt-4 font-display">
              Being built now.
            </h2>
            <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-hp-text2">
              Every platform in this category quietly markets its roadmap as its product. Here is ours, kept separate on
              purpose. If you need one of these three things to sign, do not sign yet.
            </p>

            <ul
              className={`mt-7 grid gap-3 ${
                items.length === 1 ? 'md:grid-cols-1 md:max-w-xl' : items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
              }`}
            >
              {items.map((r) => (
                <li
                  key={r.id}
                  className="rounded-xl p-5"
                  style={{ border: '1px dashed var(--hp-line)', background: 'var(--hp-veil-1)' }}
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-hp-text3">{r.state}</div>
                  <div className="mt-2.5 text-[15.5px] font-semibold text-hp-text">{r.title}</div>
                  <p className="mt-2 text-[14px] leading-relaxed text-hp-text2">{r.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
