import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Play, Info } from 'lucide-react';
import { SectionHead, Eyebrow, BrowserFrame, PhoneFrame, Tilt } from './ui.jsx';
import CompatNote from './CompatNote.jsx';
import BeingBuilt from './BeingBuilt.jsx';
import AudienceLinks from './AudienceLinks.jsx';

/**
 * Shared layout for the four surface pages. Each page supplies its own copy,
 * its own live replica component and its own honest-limits list.
 */
export default function ProductPage({
  eyebrow,
  title,
  lede,
  bullets = [],
  replica,
  replicaKind = 'desktop',
  replicaTheme = 'dark',
  host,
  replicaCaption,
  sections = [],
  notFor = [],
  extra = null,
  roadmapIds = null,
  showcase = null,
  compactDetails = false,
}) {
  const {pathname}=useLocation();
  const surface=pathname==='/owner'?'owner':pathname==='/guest'?'guest':pathname==='/field'?'field':'ops';
  const tourTo=surface==='ops'?'/tour?story=messages':`/tour?surface=${surface}`;
  const ReplicaWrap=showcase?'details':'div';
  return (
    <div>
      <section className="relative overflow-hidden border-b border-hp-lineSoft">
        <div className="grain absolute inset-0 bg-[radial-gradient(110%_90%_at_15%_-20%,var(--hp-gold-tint),transparent_60%)]" />
        <div className="shell relative pb-14 pt-28 sm:pb-16 sm:pt-32">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="h-sec mt-4 max-w-[22ch] font-medium">{title}</h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-hp-text2">{lede}</p>
          {bullets.length > 0 && (
            <ul className="mt-7 grid max-w-3xl gap-2.5 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-[15px] text-hp-text2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hp-gold" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          <CompatNote className="mt-7" />
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={tourTo} className="btn btn-gold">
              <Play size={15} className="fill-current" /> {surface==='ops'?'See the real Ops screens':'Try it in the tour'}
            </Link>
            <Link to="/demo" className="btn btn-quiet">
              Book a call <ArrowRight size={15} />
            </Link>
          </div>
          <AudienceLinks />
        </div>
      </section>

      {showcase && <section className="shell-wide py-12 sm:py-16">{showcase}</section>}
      {replica && <section className="py-12 sm:py-16">
        <div className="shell-wide">
          <ReplicaWrap className={showcase?'blend-more':''}>
          {showcase&&<summary>Explore the original portfolio console</summary>}
          {replicaKind === 'desktop' ? (
            <>
              <div className="reveal hidden md:block">
                <Tilt max={2}>
                  <BrowserFrame host={host} note="Live replica · demo data">
                    <div
                      className={`relative max-h-[760px] overflow-hidden ${
                        replicaTheme === 'light' ? 'replica-light' : 'replica-dark'
                      }`}
                    >
                      {replica}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 fade-down" />
                    </div>
                  </BrowserFrame>
                </Tilt>
              </div>
              <div
                className={`${showcase?'':'-mx-5'} overflow-hidden border-y border-hp-line md:hidden ${
                  replicaTheme === 'light' ? 'replica-light' : 'replica-dark'
                }`}
              >
                {replica}
              </div>
            </>
          ) : (
            <div className="reveal">
              <PhoneFrame label={host}>{replica}</PhoneFrame>
            </div>
          )}
          <div className="reveal mt-4 flex items-start gap-2 text-[12.5px] text-hp-text3">
            <Info size={13} className="mt-0.5 shrink-0 text-hp-goldDeep" />
            <span>
              {replicaCaption ||
                'Sample portfolio. Azure Coast Villas is a fictional 24-villa operator — every figure shown is demo data.'}
            </span>
          </div>
          </ReplicaWrap>
        </div>
      </section>}

      {compactDetails ? <section className="shell-wide pb-12"><SectionHead eyebrow="Go deeper" title="The working details." lede="Open the area that matters to your operation, from cash controls and pricing to the people doing the work."/><div className="mt-7">{sections.map(s=><details className="blend-more" key={s.title}><summary>{s.title}</summary><div className="blend-more-body"><p className="text-[15px] text-hp-text2 mb-5">{s.lede}</p><div className="blend-detail-grid">{s.items.map(([t,b])=><article key={t}><strong>{t}</strong><p>{b}</p></article>)}</div></div></details>)}</div></section> : sections.map((s, i) => (
        <section key={s.title} className={i % 2 === 0 ? 'band py-16 sm:py-20' : 'py-16 sm:py-20'}>
          <div className="shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <SectionHead eyebrow={s.eyebrow} title={s.title} lede={s.lede} />
            <div className="reveal grid gap-3">
              {s.items.map(([t, b]) => (
                <div key={t} className="hp-card p-5">
                  <div className="text-[15.5px] font-semibold text-hp-text">{t}</div>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-hp-text2">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {extra}

      {roadmapIds && <BeingBuilt only={roadmapIds} className="band" />}

      {notFor.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="shell">
            <SectionHead
              eyebrow="Straight answers"
              title="What this does not do."
              lede="Every platform in this category oversells. Here is where the line is, so you do not find out on week three."
            />
            <ul className="reveal mt-7 grid gap-2.5 sm:grid-cols-2">
              {notFor.map((n) => (
                <li key={n} className="flex gap-2.5 text-[15px] text-hp-text2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hp-neg" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="band py-16 text-center sm:py-20">
        <div className="shell">
          <h2 className="h-sub font-display">Judge it yourself before anyone calls you.</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to={tourTo} className="btn btn-gold">
              {surface==='ops'?'Open the screenshot tour':'Open the live tour'}
            </Link>
            <Link to="/pricing" className="btn btn-quiet">
              How pricing works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
