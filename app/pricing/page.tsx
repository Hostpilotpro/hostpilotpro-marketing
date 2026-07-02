import type { Metadata } from "next";
import { PricingClient } from "./PricingClient";
import { Reveal } from "@/components/Reveal";
import { faqs, includedInEveryPlan } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "HostPilot Pro pricing for property management companies and individual villa owners. Priced per portfolio, not per user — unlimited seats, uncapped AI, all three apps on every plan.",
  alternates: { canonical: "https://hostpilotpro.vercel.app/pricing" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="section pb-0">
        <div className="wrap max-w-3xl">
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-5 text-display font-semibold text-ink">
            One price for the whole company
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Priced per portfolio, not per user. Bring 5 admins or 50 — same price. Every plan
            includes all three apps, uncapped Claude Haiku 4.5, unlimited storage, and unlimited OTA
            channels.
          </p>
        </div>
      </section>

      <PricingClient />

      {/* Included in every plan */}
      <section className="section bg-surface">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Every plan, no exceptions</p>
            <h2 className="mt-4 text-display font-semibold text-ink">
              What&apos;s included in every plan
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {includedInEveryPlan.map((item) => (
              <li key={item} className="card flex items-start gap-3">
                <svg
                  className="mt-0.5 shrink-0 text-navy"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-sm leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison table */}
      <ComparisonTable />

      {/* FAQ */}
      <section className="section">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 text-display font-semibold text-ink">Questions, answered straight</h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <span className="font-display text-base font-medium text-ink">{f.q}</span>
                  <svg
                    className="shrink-0 text-muted transition-transform group-open:rotate-45"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function ComparisonTable() {
  const rows = [
    { feature: "All three apps (Owner Portal, Ops Hub, Guest Portal)", value: "Every plan" },
    { feature: "Team seats", value: "Unlimited" },
    { feature: "AI usage (Claude Haiku 4.5)", value: "Uncapped" },
    { feature: "Storage", value: "Unlimited" },
    { feature: "OTA channels", value: "Unlimited (Airbnb, Booking.com, Vrbo, direct)" },
    { feature: "Hostaway sync", value: "Every 15 minutes" },
    { feature: "Custom domain", value: "Growth and above" },
    { feature: "Data export on cancel (CSV + JSON)", value: "Every plan" },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Compare</p>
          <h2 className="mt-4 text-display font-semibold text-ink">
            What&apos;s the same across every tier
          </h2>
          <p className="mt-4 text-muted">
            The only thing that changes between tiers is how many units you manage. The capabilities
            don&apos;t.
          </p>
        </Reveal>
        <Reveal className="mt-10 overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left text-sm">
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.feature} className={i % 2 ? "bg-surface" : "bg-cream"}>
                  <th scope="row" className="w-1/2 px-5 py-4 font-medium text-ink">
                    {r.feature}
                  </th>
                  <td className="px-5 py-4 text-muted">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
