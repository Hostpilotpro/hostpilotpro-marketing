import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://hostpilotpro.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HostPilot Pro — Vacation rental operations software, built by operators",
    template: "%s — HostPilot Pro",
  },
  description:
    "One AI that knows everything, three tightly-integrated apps synced through one Supabase. Built for property managers and villa owners, priced per portfolio — not per user.",
  keywords: [
    "vacation rental software",
    "property management software",
    "villa management",
    "Hostaway front-end",
    "owner portal",
    "short-term rental operations",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "HostPilot Pro",
    title: "HostPilot Pro — Vacation rental operations software, built by operators",
    description:
      "One AI, three apps, one database. Priced per portfolio, not per user. Built by Mr Property Siam on Koh Samui.",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "HostPilot Pro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HostPilot Pro",
    description:
      "One AI, three apps, one database. Priced per portfolio, not per user.",
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: SITE_URL },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HostPilot Pro",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    "Vacation rental operations software: one AI, three integrated apps, one Supabase. Built by Mr Property Siam.",
  email: "info@mrpropertysiam.com",
  telephone: "+66815154578",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bo Phut, Koh Samui",
    addressCountry: "TH",
  },
  sameAs: ["https://www.mrpropertysiam.com"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
