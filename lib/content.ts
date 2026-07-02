export const apps = [
  {
    name: "Owner Portal",
    audience: "For villa owners",
    url: "mps-owner-portal.vercel.app",
    status: "Live",
    summary:
      "Where owners see live payouts, True Net forecasts, per-booking P&L, statements with waterfall drill-down, guest sentiment, villa health scores, AI briefings, and chat with Yankee — the AI property manager persona.",
  },
  {
    name: "Ops Hub",
    audience: "For the PM team",
    url: "mps-ops-hub.vercel.app",
    status: "Live",
    summary:
      "The brain. Writes, syncs (Hostaway, OTA channels), admin, pricing intelligence, dashboards, and seasonal year-on-year matrices. Everything the operations team touches, in one place.",
  },
  {
    name: "Guest Portal",
    audience: "For guests",
    url: "In build",
    status: "In build",
    summary:
      "Digital check-in, add-ons, tips, and a concierge AI — so guests self-serve the moments that used to eat your team's evenings.",
  },
];

export const pillars = [
  {
    title: "Built by operators, not consultants",
    body:
      "MPS runs 90+ villas on the same product. If it doesn't work for us, it doesn't ship.",
  },
  {
    title: "One database, three apps",
    body:
      "Most competitors bolt a \u201Cguest app\u201D onto their PMS with a nightly sync. HostPilot Pro is one Supabase — the owner sees the payout the moment ops books the cleaning cost.",
  },
  {
    title: "Priced per portfolio, not per user",
    body: "Bring 5 admins or 50 — same price. Unlimited team seats on every plan.",
  },
  {
    title: "AI included, no meter running",
    body:
      "Yankee, briefings, sentiment, pricing suggestions — all uncapped. Claude Haiku 4.5 costs sit on our side of the ledger.",
  },
];

export const portfolioStats = [
  { value: "78%", label: "Average occupancy" },
  { value: "2.4\u00D7", label: "Revenue uplift vs self-managed single-channel" },
  { value: "92%", label: "Owner retention" },
  { value: "4.83", label: "Guest rating" },
  { value: "90+", label: "Villas managed" },
];

export const caseStudy = {
  intro:
    "A 4-bed Bophut villa, year one with us. A real owner, anonymised numbers. Took the villa over from a previous manager in late 2024. Same property, same furniture, mostly the same photos. The shift was operational.",
  metrics: [
    { label: "Occupancy", value: "52% \u2192 71%", note: "+19 points" },
    { label: "ADR", value: "$185 \u2192 $232", note: "+25%" },
    { label: "Gross revenue", value: "+62%", note: "year-on-year" },
    { label: "Reviews", value: "4.6 \u2192 4.91", note: "across all OTAs" },
  ],
  outro:
    "Three things changed: we replaced the old photo set with a new shoot showing the villa at golden hour, we re-priced for actual demand instead of static seasonality, and every guest got a real welcome at the door rather than a code on a lockbox. None of it was magic \u2014 it was just operations.",
  sourceUrl: "https://www.mrpropertysiam.com/for-owners/",
};

export const featureGroups = [
  {
    title: "Financial clarity",
    features: [
      { name: "True Net forecast", body: "90-day rolling forecast after OTA fees, cleaning, laundry, mgmt fee, VAT and bills." },
      { name: "Per-booking P&L", body: "Every reservation broken down to net-to-owner." },
      { name: "Statement waterfall drill-down", body: "\u201C82% of gross reaches your bank\u201D with an itemized breakdown." },
      { name: "Recurring bills & annual-spread costs", body: "Insurance amortized monthly, pool service auto-charged." },
      { name: "Villa services breakdown", body: "Clear who-pays-for-what between manager and owner." },
      { name: "Payout pipeline", body: "See money in transit before it lands." },
    ],
  },
  {
    title: "AI & intelligence",
    features: [
      { name: "Yankee AI Property Manager", body: "A persona-driven concierge that knows every booking, statement, and villa detail. Owners chat in three display modes and history persists." },
      { name: "AI Owner Briefing", body: "Auto-generated weekly summary of what happened at your villa, refreshable, with a rule-based fallback for quiet weeks." },
      { name: "Guest sentiment extraction", body: "Claude Haiku reads every review and surfaces \u201Cwhat guests love\u201D and \u201Cworth improving.\u201D" },
      { name: "Villa Health Score", body: "5-dimension scoring (0\u2013100) across listing quality, pricing, reviews, revenue, and operations, with drill-down." },
      { name: "Ambient Notice Board", body: "Dismissible insight cards \u2014 \u201Cbooking momentum up 40%\u201D, \u201Cphoto age approaching 18 months.\u201D" },
      { name: "Assistance style choice", body: "Yankee (warm), Cortex (robot), Simple (plain chat), or Off. Chat history preserved across switches." },
    ],
  },
  {
    title: "Pricing & performance",
    features: [
      { name: "Season-aware pricing suggestions", body: "Six Koh Samui-style seasons; suggested ADR bands with confidence badges, derived from actual bookings not scraped comps." },
      { name: "Portfolio Pulse benchmarking", body: "Percentile ranking against comparable properties (feature-flag)." },
      { name: "Weather + booking pace", body: "\u201CRainy week, 29\u00B0C; 4 arrivals in next 2 weeks, 100% booked.\u201D" },
    ],
  },
  {
    title: "Operations",
    features: [
      { name: "Passport & identity capture", body: "Owners upload passport, Claude Haiku parses fields, editable review panel." },
      { name: "Co-owners management", body: "Spouse, partner, business partner \u2014 with per-role permissions." },
      { name: "Competitors to watch", body: "Up to 5 competitor Airbnb / Booking URLs auto-tracked." },
      { name: "Facilities & Ideas board", body: "A pipeline of improvement ideas per villa with status (idea / planning / done) and estimated revenue lift." },
    ],
  },
  {
    title: "Under the hood",
    features: [
      { name: "One database", body: "All three apps read/write the same Supabase. No data sync jobs, no eventual consistency, no CSV imports between tools." },
      { name: "Multi-tenant from day one", body: "Every PM company gets isolated data. Custom domains supported." },
      { name: "Hostaway integration", body: "Bookings, listings, guests, and messaging pulled every 15 minutes." },
      { name: "OTA channels", body: "Airbnb, Booking.com, Vrbo, and direct." },
      { name: "Claude Haiku 4.5", body: "Powers every AI feature. Costs included in your subscription \u2014 no per-token billing surprises." },
      { name: "Passport-grade security", body: "Private buckets, RLS everywhere, session tokens, no PII in logs." },
    ],
  },
];

export const pmTiers = [
  { tier: "Starter", units: "Up to 10 units", monthly: "$399", annual: "$319" },
  { tier: "Growth", units: "Up to 30 units", monthly: "$899", annual: "$719" },
  { tier: "Scale", units: "Up to 75 units", monthly: "$1,899", annual: "$1,519" },
  { tier: "Enterprise", units: "Up to 200 units", monthly: "$3,499", annual: "$2,799" },
  { tier: "Custom", units: "200+ units", monthly: "Contact us", annual: "Contact us" },
];

export const ownerTiers = [
  { tier: "Solo", villas: "1\u20133 villas", monthly: "$149" },
  { tier: "Portfolio", villas: "4\u201310 villas", monthly: "$299" },
];

export const includedInEveryPlan = [
  "All three apps \u2014 Owner Portal, Ops Hub, Guest Portal",
  "Priced per portfolio, not per user \u2014 unlimited team seats",
  "Unlimited AI usage (Claude Haiku 4.5)",
  "Unlimited storage",
  "Unlimited OTA channels",
];

export const faqs = [
  {
    q: "Do I have to migrate my data to use HostPilot Pro?",
    a: "No. HostPilot Pro is a Hostaway front-end. If you already run Hostaway (or Guesty, coming soon), we pull bookings, listings, and guests every 15 minutes. If you don't, we help you get onto Hostaway during onboarding \u2014 that's a one-time thing, not our monthly fee.",
  },
  {
    q: "Is the AI extra?",
    a: "No. Every plan includes uncapped Claude Haiku 4.5 usage across Yankee, AI briefings, review sentiment, and pricing suggestions. If your usage exceeds a plan's fair-use ceiling (10\u00D7 the median customer for that tier), we'll get in touch \u2014 nobody has hit that yet.",
  },
  {
    q: "What's the difference between per-portfolio and per-user pricing?",
    a: "Most competitors charge $30\u201360 per admin seat per month. If you have 8 people on your team, that's $240\u2013480/month before any features. HostPilot Pro is one price for the whole company. Add every cleaner, every accountant, every co-owner as a seat.",
  },
  {
    q: "Can my owners log in without me setting them up manually?",
    a: "Yes. Owners get emailed a magic-link when their first booking lands. They set their own preferences (assistance style, language, avatar mood), see their own passport/identity area, and self-serve everything a normal owner-manager conversation used to cover.",
  },
  {
    q: "What OTA channels do you support?",
    a: "Airbnb, Booking.com, Vrbo, direct bookings, and anything else Hostaway supports (30+ channels).",
  },
  {
    q: "Do I have to run this on Koh Samui / does it work outside Thailand?",
    a: "It works anywhere. We built the seasonal pricing intelligence around Koh Samui first because that's our home portfolio, but the season editor is per-tenant \u2014 you can define your own high/shoulder/low windows for the Rockies, the Amalfi coast, or Byron Bay.",
  },
  {
    q: "How does the \u201Cone database\u201D architecture actually help me?",
    a: "When your ops team logs a cleaning cost at 3pm, your owner sees it in their True Net forecast at 3pm \u2014 not the next morning. No sync jobs. No \u201Ceventual consistency\u201D. No CSV imports between tools. Every number the guest sees, the owner sees, the ops team sees comes from the same row in the same Postgres table.",
  },
  {
    q: "Is my owners' data private from other tenants?",
    a: "Yes. Row-level security is enforced in the database. Even the app can't cross tenants. This is checked in every code review.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes on Growth and above. Owner Portal, Guest Portal, and your marketing site can all be aliased to subdomains of your primary domain.",
  },
  {
    q: "What happens if I cancel?",
    a: "You keep an export of everything: bookings, statements, owner records, guest history \u2014 as CSV and JSON. No lock-in. No data hostage.",
  },
];
