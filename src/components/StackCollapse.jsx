import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Receipt, Check } from 'lucide-react';
import { SectionHead } from './ui.jsx';
import { stack, collapsed, PRICES_CHECKED } from '../data/stack.js';

/**
 * The consolidation argument, and the centrepiece of the homepage.
 *
 * Left: the stack an operator assembles today, deliberately rendered as eight
 * separate, slightly-misaligned cards, each carrying its own bill.
 * Right: two lines.
 *
 * Every figure here comes from the vendor's own published page and is linked.
 * Where a vendor publishes nothing, the card says that instead of guessing.
 */
export default function StackCollapse({ compact = false }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="grain absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,var(--hp-gold-tint),transparent_62%)]" />
      <div className="shell-wide relative">
        <SectionHead
          eyebrow="The arithmetic"
          title={
            <>
              Two subscriptions, <span className="serif-em text-hp-text2">not seven.</span>
            </>
          }
          lede="Nobody re-platforms forty villas mid-season, so we do not ask you to. Keep the channel manager you already trust for distribution and the inbox. Everything else on this list is what HostPilot Pro replaces — one subscription, one login, one database."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ------------------------------------------------- the stack today */}
          <div>
            <div className="reveal flex items-baseline justify-between gap-4 border-b border-hp-line pb-3">
              <h3 className="font-display text-[19px] text-hp-text">What a villa operator buys today</h3>
              <span className="tnum text-[12.5px] uppercase tracking-[0.14em] text-hp-text3">
                {stack.length} vendors
              </span>
            </div>

            <ul className="mt-6 space-y-3.5">
              {stack.map((s, i) => (
                <li
                  key={s.job}
                  className="reveal hp-card relative p-5"
                  style={{
                    transform: `rotate(${i % 2 === 0 ? -0.45 : 0.5}deg) translateX(${
                      i % 3 === 0 ? 0 : i % 3 === 1 ? 10 : 4
                    }px)`,
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div className="min-w-0">
                      <div className="text-[15.5px] font-semibold text-hp-text">{s.job}</div>
                      <div className="mt-0.5 text-[13px] text-hp-text3">{s.example}</div>
                    </div>
                    <span
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]"
                      style={{
                        border: '1px solid var(--hp-line)',
                        background: 'var(--hp-veil-2)',
                        color: 'var(--hp-text-3)',
                      }}
                    >
                      <Receipt size={12} />
                      {s.keep ? 'You keep this' : 'Own bill'}
                    </span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-hp-text2">{s.cost}</p>
                  {s.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                      {s.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="link-gold !text-[13px]"
                        >
                          {l.label} <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <p className="reveal mt-5 text-[13px] leading-relaxed text-hp-text3">
              Figures are quoted from each vendor’s own published pricing page and checked on {PRICES_CHECKED}. Where a
              vendor does not publish a price — Hostaway and Breezeway do not — this page says so rather than
              estimating one. Prices change; check the links.
            </p>
          </div>

          {/* --------------------------------------------------- the two lines */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="reveal flex items-baseline justify-between gap-4 border-b border-hp-line pb-3">
              <h3 className="font-display text-[19px] text-hp-text">What lands on the card instead</h3>
              <span className="tnum text-[12.5px] uppercase tracking-[0.14em] text-hp-goldInk">2 lines</span>
            </div>

            <div className="mt-6 space-y-4">
              {collapsed.map((c, i) => (
                <div
                  key={c.line}
                  className="reveal hp-card relative overflow-hidden p-6"
                  style={{ borderColor: i === 1 ? 'var(--hp-gold-rule)' : 'var(--hp-card-border)' }}
                >
                  {i === 1 && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{ background: 'var(--hp-gold-wash-grad)' }}
                    />
                  )}
                  <div className="relative flex items-start gap-4">
                    <span className="tnum font-display text-[30px] leading-none text-hp-goldDim">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="font-display text-[22px] leading-tight text-hp-text">{c.line}</div>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-hp-text2">{c.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal hp-card-flat mt-4 p-5">
              <div className="eyebrow">The part people miss</div>
              <p className="mt-3 text-[15px] leading-relaxed text-hp-text2">
                A channel manager, a booking website and a synced inbox. That is maybe a fifth of running a villa
                business. Guesty, Hostify, Lodgify and Hostaway are genuinely good at that fifth — we ran on all four.
                The other four-fifths is what this is.
              </p>
              {!compact && (
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link to="/full-suite" className="btn btn-quiet !py-2.5 !text-[14.5px]">
                    See what it replaces <ArrowRight size={14} />
                  </Link>
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-hp-text3">
                    <Check size={13} className="text-hp-goldInk" /> Hostaway supported today
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
