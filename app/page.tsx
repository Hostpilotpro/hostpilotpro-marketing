import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";
import { apps, pillars, portfolioStats, caseStudy, featureGroups } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="section pb-0">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Vacation rental operations software</p>
            <h1 className="mt-5 text-hero font-semibold text-ink">
              One AI that knows everything. Three apps, one database.
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
              HostPilot Pro is one AI, three tightly-integrated apps synced through one Supabase.
              Built for property managers, priced per portfolio — not per user.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="https://join.mrpropertysiam.com"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start free trial
              </a>
              <a href="mailto:info@mrpropertysiam.com" className="btn-secondary">
                Talk to us
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">
              Built by Mr Property Siam on Koh Samui — a 90+ villa management company that runs on
              the product it sells.
            </p>
          </Reveal>
        </div>

        {/* Portfolio stats band */}
        <div className="wrap mt-16 sm:mt-20">
          <Reveal className="rounded-2xl border border-line bg-surface px-6 py-10 sm:px-10">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
              {portfolioStats.map((s, i) => (
                <Stat key={s.label} value={s.value} label={s.label} accent={i === 1} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Three apps */}
      <section className="section">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">The suite</p>
            <h2 className="mt-4 text-display font-semibold text-ink">Three apps, one Supabase</h2>
            <p className="mt-4 text-muted">
              Everyone works from the same data. No sync jobs, no CSV shuffling between tools — the
              owner sees the payout the moment ops books the cleaning cost.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {apps.map((app, i) => (
              <Reveal key={app.name} as="article" className="card flex flex-col" delay={i * 80}>
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{app.audience}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      app.status === "Live"
                        ? "bg-navy/10 text-navy"
                        : "bg-gold/15 text-gold"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{app.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{app.summary}</p>
                <p className="num mt-5 text-xs text-muted">{app.url}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <Link href="/how-it-works" className="text-sm font-medium text-navy hover:text-navy-hover">
              See how the three apps work together →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="section bg-ink text-cream">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Why us</p>
            <h2 className="mt-4 text-display font-semibold text-cream">
              Four things we won&apos;t compromise on
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} className="flex gap-5" delay={i * 60}>
                <span className="num shrink-0 font-display text-lg font-semibold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-cream">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="section">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">The proof</p>
              <h2 className="mt-4 text-display font-semibold text-ink">
                Same villa. <span className="text-gold">+62%</span> gross revenue.
              </h2>
              <p className="mt-6 max-w-prose leading-relaxed text-muted">{caseStudy.intro}</p>
              <p className="mt-5 max-w-prose leading-relaxed text-muted">{caseStudy.outro}</p>
              <a
                href={caseStudy.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-medium text-navy hover:text-navy-hover"
              >
                Read the full owner story on mrpropertysiam.com →
              </a>
            </Reveal>

            <Reveal className="grid grid-cols-2 gap-5" delay={80}>
              {caseStudy.metrics.map((m) => (
                <div key={m.label} className="card">
                  <div className="text-xs uppercase tracking-wide text-muted">{m.label}</div>
                  <div className="num mt-3 font-display text-lg font-semibold text-ink">
                    {m.value}
                  </div>
                  <div className="num mt-1 text-sm font-medium text-gold">{m.note}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Feature overview */}
      <section className="section bg-surface">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What you get</p>
            <h2 className="mt-4 text-display font-semibold text-ink">
              Every feature here is shipped and running
            </h2>
            <p className="mt-4 text-muted">
              Drawn from Phase 1 &amp; 2 of the Owner Portal — the same software MPS uses across 90+
              villas.
            </p>
          </Reveal>

          <div className="mt-14 space-y-14">
            {featureGroups.map((group) => (
              <Reveal key={group.title}>
                <div className="border-b border-line pb-3">
                  <h3 className="font-display text-lg font-semibold text-ink">{group.title}</h3>
                </div>
                <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.features.map((f) => (
                    <div key={f.name}>
                      <dt className="text-sm font-medium text-ink">{f.name}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBand />
    </>
  );
}
