import Link from "next/link";
import { LogoMark } from "./Logo";

const cols = [
  {
    title: "Product",
    links: [
      { href: "/how-it-works", label: "How it works", external: false },
      { href: "/pricing", label: "Pricing", external: false },
      { href: "https://join.mrpropertysiam.com", label: "Start free trial", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About MPS", external: false },
      { href: "https://www.mrpropertysiam.com/for-owners/", label: "Owner case study", external: true },
      { href: "/contact", label: "Contact", external: false },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/contact", label: "Data export & no lock-in", external: false },
      { href: "/pricing", label: "Fair-use policy", external: false },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:info@mrpropertysiam.com", label: "info@mrpropertysiam.com", external: true },
      { href: "tel:+66815154578", label: "+66 81 515 4578", external: true },
      { href: "https://www.mrpropertysiam.com", label: "Bo Phut, Koh Samui", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="wrap py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <LogoMark className="text-ink" size={24} />
              <span className="font-display text-base font-medium text-ink">
                HostPilot <span className="text-gold">Pro</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              One AI that knows everything. Three tightly-integrated apps, one Supabase. Built by
              operators at Mr Property Siam, Koh Samui.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-ink">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) =>
                  l.external ? (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-muted transition-colors hover:text-ink"
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                        {l.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mr Property Siam Co., Ltd. HostPilot Pro. All rights reserved.</p>
          <p>Vacation rental operations software, built on Koh Samui.</p>
        </div>
      </div>
    </footer>
  );
}
