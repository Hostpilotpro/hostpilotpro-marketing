import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { apps } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Three apps — Owner Portal, Ops Hub, and Guest Portal — all reading and writing the same Supabase. See how HostPilot Pro's one-database architecture keeps owners, ops, and guests in sync.",
  alternates: { canonical: "https://hostpilotpro.vercel.app/how-it-works" },
};

const appDetails: Record<string, { points: string[]; tone: string }> = {
  "Owner Portal": {
    tone: "navy",
    points: [
      "Live payouts and a 90-day True Net forecast",
      "Per-booking P&L and statement waterfall drill-down",
      "Chat with Yankee, the AI property manager persona",
      "Villa Health Score and guest sentiment at a glance",
    ],
  },
  "Ops Hub": {
    tone: "ink",
    points: [
      "Hostaway + OTA sync every 15 minutes",
      "Season-aware pricing intelligence and ADR bands",
      "Seasonal year-on-year performance matrices",
      "Admin, writing, and dashboards for the whole team",
    ],
  },
  "Guest Portal": {
    tone: "gold",
    points: [
      "Digital check-in with identity capture",
      "Add-ons and tipping, self-serve",
      "Concierge AI for the questions that fill your evenings",
      "Same database — no re-keying guest details",
    ],
  },
};

function AppVisual({ name }: { name: string }) {
  const tone = appDetails[name].tone;
  const bg =
    tone === "navy" ? "bg-navy" : tone === "gold" ? "bg-gold/15" : "bg-ink";
  const fg = tone === "gold" ? "text-ink" : "text-cream";
  const sub = tone === "gold" ? "text-ink/60" : "text-cream/60";
  return (
    <div className={`flex aspect-[4/3] flex-col justify-between rounded-2xl ${bg} p-8`}>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium uppercase tracking-[0.16em] ${sub}`}>
          {name}
        </span>
        <span className={`h-2.5 w-2.5 rounded-full ${tone === "gold" ? "bg-gold" : "bg-cream/50"}`} />
      </div>
      {/* Abstract UI motif — bars/lines, no product screenshot */}
      <div className="space-y-3">
        <div className={`h-2 w-1/3 rounded-full ${tone === "gold" ? "bg-ink/25" : "bg-cream/25"}`} />
        <div className={`h-2 w-2/3 rounded-full ${tone === "gold" ? "bg-ink/15" : "bg-cream/15"}`} />
        <div className="flex gap-2 pt-2">
          {[40, 65, 30, 80, 55].map((h, i) => (
            <div
              key={i}
              className={`w-full rounded-t-sm ${tone === "gold" ? "bg-ink/20" : "bg-cream/20"}`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
      <span className={`num text-xs ${sub}`}>
        {name === "Guest Portal" ? "In build" : `${name.toLowerCase().replace(" ", "-")} · live`}
      </span>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <section className="section pb-0">
        <div className="wrap max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h1 className="mt-5 text-display font-semibold text-ink">
            Three apps. One Supabase. Zero sync jobs.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Most competitors bolt a guest app onto a PMS with a nightly sync. HostPilot Pro is one
            database that three apps read and write. When ops logs a cleaning cost at 3pm, the owner
            sees it in their True Net forecast at 3pm — not the next morning.
          </p>
        </div>
      </section>

      {/* One-database diagram */}
      <section className="section pb-0">
        <div className="wrap">
          <Reveal className="rounded-2xl border border-line bg-surface p-8 sm:p-12">
            <div className="grid items-center gap-8 md:grid-cols-3">
              {apps.map((a) => (
                <div key={a.name} className="text-center">
                  <div className="mx-auto flex h-12 items-center justify-center rounded-lg border border-line bg-cream px-4 text-sm font-medium text-ink">
                    {a.name}
                  </div>
                  <div className="mx-auto mt-3 h-8 w-px bg-line" aria-hidden="true" />
                </div>
              ))}
            </div>
            <div className="mx-auto max-w-md rounded-xl bg-ink px-6 py-4 text-center">
              <span className="num text-sm font-medium text-cream">One Supabase (Postgres)</span>
              <p className="mt-1 text-xs text-cream/60">
                Row-level security · multi-tenant · same row, every app
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Each app */}
      {apps.map((app, i) => (
        <section key={app.name} className="section">
          <div className="wrap">
            <Reveal
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="num font-display text-lg font-semibold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="eyebrow">{app.audience}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      app.status === "Live" ? "bg-navy/10 text-navy" : "bg-gold/15 text-gold"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <h2 className="mt-4 text-title font-semibold text-ink">{app.name}</h2>
                <p className="mt-4 max-w-prose leading-relaxed text-muted">{app.summary}</p>
                <ul className="mt-6 space-y-3">
                  {appDetails[app.name].points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-ink">
                      <svg
                        className="mt-0.5 shrink-0 text-navy"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <p className="num mt-6 text-xs text-muted">{app.url}</p>
              </div>
              <AppVisual name={app.name} />
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
