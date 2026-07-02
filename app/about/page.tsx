import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";
import { portfolioStats } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "HostPilot Pro is built by Mr Property Siam, a 90+ villa management company founded in 2021 on Koh Samui by Jordi Ricardo Schulte and Kara Chalisa Ricardo Van der Vliet. We are Customer #1.",
  alternates: { canonical: "https://hostpilotpro.vercel.app/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="section pb-0">
        <div className="wrap max-w-3xl">
          <p className="eyebrow">About</p>
          <h1 className="mt-5 text-display font-semibold text-ink">
            Built by operators, not consultants
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            HostPilot Pro is made by Mr Property Siam (MPS) — a villa management company on Koh
            Samui. We are Customer #1: we run the product we built across our own portfolio every
            day. If it doesn&apos;t work for us, it doesn&apos;t ship.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="section">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal>
              <h2 className="text-title font-semibold text-ink">Where it started</h2>
              <div className="mt-5 space-y-4 text-muted">
                <p className="max-w-prose leading-relaxed">
                  Mr Property Siam was founded in 2021 on Koh Samui by Jordi Ricardo Schulte and Kara
                  Chalisa Ricardo Van der Vliet. What began as hands-on management of a handful of
                  villas grew into a 90+ property operation — and, along the way, a hard-won view of
                  what vacation rental software actually needs to do.
                </p>
                <p className="max-w-prose leading-relaxed">
                  The tools we tried treated owners, ops, and guests as separate products stitched
                  together with nightly syncs and CSV exports. Numbers disagreed. Owners called
                  asking why their statement didn&apos;t match the dashboard. So we built the thing we
                  wished existed: one database, three apps, one source of truth.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-2xl border border-line bg-surface p-8">
                <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-ink">
                  The portfolio, in numbers
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
                  {portfolioStats.map((s, i) => (
                    <Stat key={s.label} value={s.value} label={s.label} accent={i === 1} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why we built this */}
      <section className="section bg-ink text-cream">
        <div className="wrap max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
            Why we built this
          </p>
          <h2 className="mt-4 text-title font-semibold text-cream">
            Software that survives contact with a real portfolio
          </h2>
          <div className="mt-6 space-y-4 text-cream/75">
            <p className="max-w-prose leading-relaxed">
              Every feature in HostPilot Pro earned its place by solving a problem we hit while
              managing villas. True Net forecasts exist because owners kept asking what they&apos;d
              actually bank. Season-aware pricing exists because static seasonality left money on the
              table. Yankee exists because owner-manager conversations don&apos;t scale past a few
              dozen villas.
            </p>
            <p className="max-w-prose leading-relaxed">
              We price per portfolio because per-seat pricing punishes you for having a team. We
              include the AI because metering it would make you ration the thing that makes the
              product useful. And we hand back an export of everything if you leave — no lock-in, no
              data hostage.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">The team</p>
            <h2 className="mt-4 text-title font-semibold text-ink">
              A small operator with a builder&apos;s habit
            </h2>
            <p className="mt-5 max-w-prose leading-relaxed text-muted">
              MPS is run by the people answering owner calls and greeting guests at the door — the
              same people who decide what ships next. Founders Jordi Ricardo Schulte and Kara Chalisa
              Ricardo Van der Vliet keep the roadmap tied to the day-to-day reality of running 90+
              villas, not a whiteboard of hypothetical features.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <div className="rounded-2xl border border-line bg-surface p-8">
              <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-ink">Contact</h3>
              <dl className="mt-5 grid gap-6 sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-muted">Email</dt>
                  <dd className="mt-1">
                    <a
                      href="mailto:info@mrpropertysiam.com"
                      className="text-sm font-medium text-navy hover:text-navy-hover"
                    >
                      info@mrpropertysiam.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Phone</dt>
                  <dd className="num mt-1 text-sm font-medium text-ink">+66 81 515 4578</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Where</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">Bo Phut, Koh Samui, Thailand</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
