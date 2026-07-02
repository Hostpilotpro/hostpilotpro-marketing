import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Get started",
  description:
    "Get started with HostPilot Pro. Begin onboarding at join.mrpropertysiam.com, or reach the Mr Property Siam team by email or phone from Koh Samui.",
  alternates: { canonical: "https://hostpilotpro.vercel.app/contact" },
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Get started</p>
            <h1 className="mt-5 text-display font-semibold text-ink">
              Ready when you are
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">
              The fastest path is our onboarding site — it walks you through connecting Hostaway and
              spinning up your portfolio. Prefer to talk first? Email or call the team. We&apos;re
              operators, so you&apos;ll reach someone who actually runs villas.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://join.mrpropertysiam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Start free trial
              </a>
              <a href="mailto:info@mrpropertysiam.com" className="btn-secondary">
                Talk to us
              </a>
            </div>

            <p className="mt-6 text-sm text-muted">
              No migration required if you already run Hostaway — we pull your bookings, listings,
              and guests every 15 minutes.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl border border-line bg-surface p-8">
              <h2 className="font-display text-lg font-semibold text-ink">Contact details</h2>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="text-sm text-muted">Onboarding</dt>
                  <dd className="mt-1">
                    <a
                      href="https://join.mrpropertysiam.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-navy hover:text-navy-hover"
                    >
                      join.mrpropertysiam.com
                    </a>
                  </dd>
                </div>
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
                  <dd className="mt-1">
                    <a
                      href="tel:+66815154578"
                      className="num text-sm font-medium text-ink hover:text-navy"
                    >
                      +66 81 515 4578
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Office</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">
                    Mr Property Siam — Bo Phut, Koh Samui, Thailand
                  </dd>
                </div>
              </dl>

              <div className="mt-8 rounded-xl bg-cream p-5">
                <p className="text-sm leading-relaxed text-muted">
                  Every plan includes all three apps, unlimited team seats, and uncapped Claude Haiku
                  4.5 — priced per portfolio, not per user.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
