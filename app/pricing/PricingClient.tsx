"use client";

import { useState } from "react";
import { pmTiers, ownerTiers } from "@/lib/content";

export function PricingClient() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="pt-12">
      <div className="wrap">
        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${!annual ? "text-ink" : "text-muted"}`}>Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            onClick={() => setAnnual((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              annual ? "bg-navy" : "bg-ink/20"
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                annual ? "translate-x-[22px]" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className={`text-sm ${annual ? "text-ink" : "text-muted"}`}>
            Annual <span className="text-gold">-20%</span>
          </span>
        </div>

        {/* PM tiers (primary) */}
        <div className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-lg font-semibold text-ink">
              For property management companies
            </h2>
            <span className="text-sm text-muted">Primary — small-to-mid PM shops, 10–200 rentals</span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {pmTiers.map((t) => {
              const price = annual ? t.annual : t.monthly;
              const isContact = price === "Contact us";
              return (
                <div
                  key={t.tier}
                  className={`flex flex-col rounded-xl border p-6 ${
                    t.tier === "Growth"
                      ? "border-navy bg-navy text-white"
                      : "border-line bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-display text-base font-semibold ${
                        t.tier === "Growth" ? "text-white" : "text-ink"
                      }`}
                    >
                      {t.tier}
                    </h3>
                    {t.tier === "Growth" && (
                      <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-medium text-ink">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className={`mt-1 text-sm ${t.tier === "Growth" ? "text-white/70" : "text-muted"}`}>
                    {t.units}
                  </p>
                  <div className="mt-5">
                    <span
                      className={`num font-display text-2xl font-semibold ${
                        t.tier === "Growth" ? "text-white" : "text-ink"
                      }`}
                    >
                      {price}
                    </span>
                    {!isContact && (
                      <span
                        className={`text-sm ${t.tier === "Growth" ? "text-white/60" : "text-muted"}`}
                      >
                        /mo
                      </span>
                    )}
                  </div>
                  {annual && !isContact && (
                    <p className={`mt-1 text-xs ${t.tier === "Growth" ? "text-white/60" : "text-muted"}`}>
                      billed annually
                    </p>
                  )}
                  <a
                    href={
                      isContact
                        ? "mailto:info@mrpropertysiam.com"
                        : "https://join.mrpropertysiam.com"
                    }
                    target={isContact ? undefined : "_blank"}
                    rel={isContact ? undefined : "noopener noreferrer"}
                    className={`mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      t.tier === "Growth"
                        ? "bg-cream text-ink hover:bg-white"
                        : "bg-navy text-white hover:bg-navy-hover"
                    }`}
                  >
                    {isContact ? "Contact us" : "Start free trial"}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Owner tiers (secondary) */}
        <div className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-lg font-semibold text-ink">
              For individual villa owners
            </h2>
            <span className="text-sm text-muted">Secondary — sophisticated owners self-managing 1–10 properties</span>
          </div>
          <div className="mt-6 grid max-w-2xl gap-5 sm:grid-cols-2">
            {ownerTiers.map((t) => (
              <div key={t.tier} className="flex flex-col rounded-xl border border-line bg-surface p-6">
                <h3 className="font-display text-base font-semibold text-ink">{t.tier}</h3>
                <p className="mt-1 text-sm text-muted">{t.villas}</p>
                <div className="mt-5">
                  <span className="num font-display text-2xl font-semibold text-ink">{t.monthly}</span>
                  <span className="text-sm text-muted">/mo</span>
                </div>
                <a
                  href="https://join.mrpropertysiam.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-hover"
                >
                  Start free trial
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
