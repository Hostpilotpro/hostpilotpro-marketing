// Fictional dataset — Azure Coast Villas. The ONLY data permitted in any product visual.
// Source of truth: site-spec/demo-data.json. Do not substitute real operator data.
const demo = {
  "tenant": {
    "name": "Azure Coast Villas",
    "tagline": "Boutique villa management, Koh Samui",
    "villa_count": 24,
    "staff_count": 19,
    "owner_count": 17,
    "note": "A fictional 24-villa operator. Deliberately sized in the 20-49 unit band, which the competitor research identifies as the highest willingness-to-pay segment. Never show MPS's real 80-villa portfolio in marketing."
  },
  "owner": {
    "name": "Alexander Reid",
    "email": "alexander.reid@example-demo.com",
    "initials": "AR",
    "nationality": "British",
    "based_in": "London, UK",
    "owner_since": "March 2024",
    "villas": [
      "Villa Sunset Sapphire"
    ],
    "greeting": "Good evening, Alexander"
  },
  "second_owner": {
    "name": "Marie Dubois",
    "email": "marie.dubois@example-demo.com",
    "villas": [
      "Casa del Sol",
      "Villa Coral Bay"
    ],
    "note": "Use for multi-property owner screens and the portfolio switcher."
  },
  "hero_villa": {
    "name": "Villa Sunset Sapphire",
    "code": "ACV-004",
    "subtitle": "4-bedroom villa · Bophut · Koh Samui",
    "bedrooms": 4,
    "bathrooms": 4,
    "sleeps": 8,
    "pool": "12m infinity pool",
    "manager": "Nalin P.",
    "status_chips": [
      "Direct-managed",
      "Synced"
    ],
    "kpis": {
      "occupancy_mtd_pct": 82,
      "adr_thb": 14200,
      "guest_rating": 4.91,
      "review_count": 68,
      "open_items": 2,
      "revenue_mtd_thb": 349440
    }
  },
  "other_villas": [
    {
      "name": "Casa del Sol",
      "code": "ACV-011",
      "area": "Chaweng",
      "bedrooms": 2,
      "occupancy_pct": 74,
      "adr_thb": 7800,
      "rating": 4.83
    },
    {
      "name": "Villa Coral Bay",
      "code": "ACV-007",
      "area": "Choeng Mon",
      "bedrooms": 5,
      "occupancy_pct": 69,
      "adr_thb": 21500,
      "rating": 4.95
    },
    {
      "name": "Baan Lotus",
      "code": "ACV-002",
      "area": "Maenam",
      "bedrooms": 3,
      "occupancy_pct": 88,
      "adr_thb": 9400,
      "rating": 4.88
    },
    {
      "name": "Villa Andaman",
      "code": "ACV-015",
      "area": "Lamai",
      "bedrooms": 3,
      "occupancy_pct": 61,
      "adr_thb": 8900,
      "rating": 4.72
    },
    {
      "name": "The Frangipani",
      "code": "ACV-019",
      "area": "Bophut",
      "bedrooms": 6,
      "occupancy_pct": 77,
      "adr_thb": 26800,
      "rating": 4.97
    }
  ],
  "ops_dashboard": {
    "greeting": "Good afternoon, Operations",
    "context_line": "Your portfolio is running at 78% occupancy across 24 villas, with 9 turning over today.",
    "context_chips": [
      "Koh Samui · 29°C · sunset 18:41",
      "Tide rising · 1.2m",
      "Data live · updated 14:06"
    ],
    "tiles": [
      {
        "label": "House earnings · latest closed month",
        "value": "฿2.41M",
        "delta": "+18.4%",
        "sub": "vs June 2026"
      },
      {
        "label": "Occupancy · today",
        "value": "78%",
        "delta": "+6 pts",
        "sub": "24 villas"
      },
      {
        "label": "Open tasks · today & tomorrow",
        "value": "31",
        "sub": "Cleaning 22 · Maintenance 4 · Inspection 5"
      },
      {
        "label": "ADR · active reservations",
        "value": "฿12,480",
        "delta": "+9.2%",
        "sub": "Last mo ฿11,430"
      }
    ],
    "occupancy_series_30d": [
      61,
      64,
      63,
      68,
      71,
      74,
      72,
      70,
      73,
      77,
      79,
      81,
      80,
      78,
      76,
      79,
      83,
      86,
      88,
      87,
      84,
      82,
      80,
      78,
      77,
      79,
      81,
      83,
      80,
      78
    ],
    "profit_estimate": {
      "month": "August 2026",
      "house_mgmt_fee_thb": 361500,
      "total_service_income_thb": 214800,
      "total_mgmt_fee_gross_thb": 576300,
      "total_expenses_thb": 168200,
      "estimated_profit_thb": 408100,
      "service_breakdown": {
        "Laundry": 58200,
        "Cleaning": 71400,
        "Pool service": 49900,
        "Garden": 35300
      }
    }
  },
  "tasks_board": {
    "open_this_week": 47,
    "scheduled_today": 12,
    "unassigned": 3,
    "overdue": 4,
    "columns": [
      "To do",
      "Accepted",
      "In progress",
      "Done"
    ],
    "sample": [
      {
        "title": "Departure clean · Villa Sunset Sapphire",
        "dept": "Cleaning",
        "assignee": "Nalin P.",
        "due": "Today 11:00",
        "state": "In progress"
      },
      {
        "title": "Pool chemical balance · Casa del Sol",
        "dept": "Pool",
        "assignee": "Somchai R.",
        "due": "Today 15:00",
        "state": "Accepted"
      },
      {
        "title": "Aircon service · Villa Coral Bay",
        "dept": "Maintenance",
        "assignee": "Aung M.",
        "due": "Tomorrow 09:00",
        "state": "To do"
      },
      {
        "title": "Pre-arrival inspection · Baan Lotus",
        "dept": "Inspection",
        "assignee": "Ploy S.",
        "due": "Today 16:30",
        "state": "To do"
      },
      {
        "title": "Restock welcome hamper · The Frangipani",
        "dept": "Cleaning",
        "assignee": "Nalin P.",
        "due": "Today 13:00",
        "state": "Done"
      }
    ]
  },
  "arrivals_today": [
    {
      "villa": "Villa Sunset Sapphire",
      "guest": "T. Lindqvist",
      "nights": 7,
      "guests": 6,
      "value_thb": 99400,
      "status": "Arriving 15:00"
    },
    {
      "villa": "Baan Lotus",
      "guest": "M. Okafor",
      "nights": 4,
      "guests": 4,
      "value_thb": 37600,
      "status": "Arriving 17:30"
    },
    {
      "villa": "Villa Coral Bay",
      "guest": "H. Tanaka",
      "nights": 10,
      "guests": 9,
      "value_thb": 215000,
      "status": "In house"
    },
    {
      "villa": "Casa del Sol",
      "guest": "R. Moreau",
      "nights": 3,
      "guests": 2,
      "value_thb": 23400,
      "status": "Departing 11:00"
    }
  ],
  "owner_statement": {
    "owner": "Alexander Reid",
    "villa": "Villa Sunset Sapphire",
    "period": "July 2026",
    "status": "Closed · paid 5 Aug 2026",
    "nights_sold": 26,
    "nights_available": 31,
    "occupancy_pct": 84,
    "adr_thb": 14200,
    "lines": [
      {
        "label": "Gross rental revenue",
        "value_thb": 369200,
        "kind": "income"
      },
      {
        "label": "Channel commission (Airbnb, Booking.com)",
        "value_thb": -41800,
        "kind": "deduction"
      },
      {
        "label": "Net rental revenue",
        "value_thb": 327400,
        "kind": "subtotal"
      },
      {
        "label": "Management fee (18%)",
        "value_thb": -58932,
        "kind": "deduction"
      },
      {
        "label": "Cleaning & laundry",
        "value_thb": -14600,
        "kind": "deduction"
      },
      {
        "label": "Pool & garden service",
        "value_thb": -9800,
        "kind": "deduction"
      },
      {
        "label": "Electricity recovered from guests",
        "value_thb": 11240,
        "kind": "income"
      },
      {
        "label": "Maintenance — pump seal replacement",
        "value_thb": -3450,
        "kind": "deduction"
      },
      {
        "label": "VAT on services (7%)",
        "value_thb": -5834,
        "kind": "deduction"
      },
      {
        "label": "Net to you",
        "value_thb": 246024,
        "kind": "total"
      }
    ],
    "payout": {
      "amount_thb": 246024,
      "amount_usd": 7029,
      "method": "Bank transfer · Wise",
      "sent": "5 Aug 2026",
      "reference": "ACV-STMT-2607-004"
    },
    "_check": "369200 - 41800 = 327400. 327400 - 58932 - 14600 - 9800 - 3450 - 5834 + 11240 = 246024. Verified."
  },
  "owner_dashboard": {
    "hero_line": "Villa Sunset Sapphire earned ฿246,024 last month.",
    "tiles": [
      {
        "label": "Net to you · July",
        "value": "฿246,024",
        "delta": "+22.1% vs June"
      },
      {
        "label": "Confirmed balance held",
        "value": "฿0",
        "sub": "All settled"
      },
      {
        "label": "Occupancy · next 60 days",
        "value": "71%",
        "sub": "18 of 26 nights booked"
      },
      {
        "label": "Guest rating",
        "value": "4.91",
        "sub": "68 reviews"
      }
    ],
    "upcoming_payout": {
      "period": "August 2026",
      "estimate_thb": 268000,
      "expected": "5 Sep 2026",
      "confidence": "Estimate — August not yet closed"
    },
    "pipeline_next_90d_thb": 812400
  },
  "owner_concierge": {
    "question": "How did my villa perform last month, and why was the payout higher than June?",
    "answer": "July was your strongest month since you joined. Villa Sunset Sapphire sold 26 of 31 nights (84% occupancy) at an average ฿14,200 per night, against 21 nights at ฿12,900 in June.\n\nThe payout rose ฿44,600 for three reasons: two extra booked nights, a ฿1,300 higher nightly rate after the 14 June pricing approval you signed off, and ฿11,240 of guest-recovered electricity that lands as income to you rather than a cost.\n\nOne thing worth knowing: a ฿3,450 pool pump seal was replaced on 19 July. It is inside your maintenance allowance, so no approval was needed, and the photo proof is on the villa's Documents tab.\n\nIf you'd like the underlying reservation-by-reservation breakdown, open the July statement and use the verdict drawer on any line.",
    "note": "Answer is written to demonstrate: real numbers, a causal explanation, a proactive disclosure the owner did not ask for, and a pointer to the source. That combination is the differentiator — not the fact that a chatbot exists."
  },
  "ratepilot_approval": {
    "villa": "Villa Sunset Sapphire",
    "strategy": "Balanced",
    "window": "14–22 Nov 2026",
    "current_thb": 12800,
    "suggested_thb": 16400,
    "delta_pct": 28,
    "rationale": "Loi Krathong weekend. Six comparable Bophut 4-bed villas are already booked; the three still open average ฿17,900. You currently have 2 of 9 nights sold in this window.",
    "actions": [
      "Approve",
      "Approve with cap",
      "Decline"
    ]
  },
  "guest_stay": {
    "guest": "Tobias Lindqvist",
    "party": "6 guests",
    "villa": "Villa Sunset Sapphire",
    "dates": "9–16 August 2026",
    "nights": 7,
    "stay_code": "SAPPHIRE-7741",
    "checkin": {
      "time": "15:00",
      "door_code": "4-4-8-1",
      "wifi": "SunsetSapphire_5G",
      "status": "Passports verified · TM30 filed"
    },
    "addons": [
      {
        "name": "Airport transfer · minivan",
        "price_thb": 1400,
        "state": "Booked"
      },
      {
        "name": "Private chef · Thai tasting menu",
        "price_thb": 4800,
        "state": "Available",
        "sub": "per evening, up to 8"
      },
      {
        "name": "Ang Thong day charter",
        "price_thb": 18500,
        "state": "Available",
        "sub": "private longtail, 8 hrs"
      },
      {
        "name": "In-villa Thai massage",
        "price_thb": 1200,
        "state": "Available",
        "sub": "per 60 min"
      },
      {
        "name": "Daily breakfast service",
        "price_thb": 650,
        "state": "Booked",
        "sub": "per person per day"
      }
    ],
    "upsell_revenue_thb": 24950,
    "note": "Guest add-on revenue is the argument for the Guest product paying for itself. ฿24,950 on one 7-night stay."
  },
  "mobile_field": {
    "staff": "Nalin P.",
    "role": "Housekeeping lead",
    "tiles": [
      {
        "label": "Clock in / out",
        "sub": "6h 20m today"
      },
      {
        "label": "My jobs",
        "sub": "4 today"
      },
      {
        "label": "Log work",
        "sub": "Record a job you already finished"
      },
      {
        "label": "Ins & outs",
        "sub": "9 in · 7 out"
      },
      {
        "label": "My pay",
        "sub": "Salary, overtime, bonus"
      },
      {
        "label": "Team chat",
        "sub": "2 new",
        "badge": 2
      },
      {
        "label": "Hours & jobs",
        "sub": "142h this month"
      },
      {
        "label": "AI help",
        "sub": "Ask or scan anything"
      },
      {
        "label": "Bill scanner",
        "sub": "Photograph a receipt"
      }
    ],
    "languages": [
      "English",
      "ไทย",
      "မြန်မာ"
    ]
  }
};

/* ------------------------------------------------------------------ *
 * Ops Console dataset — additive extension, still Azure Coast Villas.
 *
 * Every figure below is fictional. Totals are computed from their own
 * line items at module load (never hand-typed twice), so a statement's
 * lines always sum to its net and every ledger always reconciles.
 * ------------------------------------------------------------------ */

const sum = (rows, key = 'value_thb') => rows.reduce((t, r) => t + (typeof r === 'number' ? r : r[key]), 0);
const r2 = (n) => Math.round(n);

demo.owners = [
  {
    name: 'Alexander Reid',
    email: 'alexander.reid@example-demo.com',
    initials: 'AR',
    based_in: 'London, UK',
    since: 'Mar 2024',
    villas: ['Villa Sunset Sapphire'],
    payout_method: 'Wise · GBP',
  },
  {
    name: 'Marie Dubois',
    email: 'marie.dubois@example-demo.com',
    initials: 'MD',
    based_in: 'Lyon, France',
    since: 'Nov 2023',
    villas: ['Casa del Sol', 'Villa Coral Bay'],
    payout_method: 'Wise · EUR',
  },
  {
    name: 'Henrik Sørensen',
    email: 'henrik.sorensen@example-demo.com',
    initials: 'HS',
    based_in: 'Aarhus, Denmark',
    since: 'Jul 2022',
    villas: ['Baan Lotus'],
    payout_method: 'Thai bank · SCB',
  },
  {
    name: 'Priya Nair',
    email: 'priya.nair@example-demo.com',
    initials: 'PN',
    based_in: 'Singapore',
    since: 'Feb 2025',
    villas: ['Villa Andaman'],
    payout_method: 'Thai bank · Kasikorn',
  },
  {
    name: 'Daniel & Ines Costa',
    email: 'costa.family@example-demo.com',
    initials: 'DC',
    based_in: 'Lisbon, Portugal',
    since: 'Sep 2021',
    villas: ['The Frangipani'],
    payout_method: 'Wise · EUR',
  },
];

/* ------------------------------------------------------------- statements */

function mkStatement(s) {
  const gross = sum(s.reservations, 'gross_thb');
  const lines = [
    { label: 'Gross rental revenue', value_thb: gross, cat: 'gross' },
    ...s.lines,
  ];
  const commission = sum(lines.filter((l) => l.cat === 'commission'));
  const expenses = sum(lines.filter((l) => l.cat === 'expense'));
  const other = sum(lines.filter((l) => l.cat === 'income'));
  const net = sum(lines);
  return {
    ...s,
    lines,
    gross_thb: gross,
    commission_thb: commission,
    expenses_thb: expenses,
    other_income_thb: other,
    net_thb: net,
    nights_sold: s.reservations.reduce((t, r) => t + r.nights, 0),
  };
}

demo.statements = [
  mkStatement({
    id: 'ACV-STMT-2607-004',
    period: 'July 2026',
    owner: 'Alexander Reid',
    villa: 'Villa Sunset Sapphire',
    code: 'ACV-004',
    status: 'Paid',
    issued: '2 Aug 2026',
    settled: 'Paid 5 Aug 2026 · Wise',
    nights_available: 31,
    reservations: [
      { ref: 'ACV-R-2433', guest: 'P. Novak', channel: 'Airbnb', dates: '1–8 Jul', nights: 7, gross_thb: 92400 },
      { ref: 'ACV-R-2411', guest: 'T. Lindqvist', channel: 'Direct', dates: '9–16 Jul', nights: 7, gross_thb: 99400 },
      { ref: 'ACV-R-2418', guest: 'H. Mueller', channel: 'Booking.com', dates: '17–22 Jul', nights: 5, gross_thb: 71000 },
      { ref: 'ACV-R-2426', guest: 'S. Yamamoto', channel: 'Direct', dates: '23–30 Jul', nights: 7, gross_thb: 106400 },
    ],
    lines: [
      { label: 'Channel commission · Airbnb, Booking.com', value_thb: -41800, cat: 'commission' },
      { label: 'Management fee · 18% of net rental', value_thb: -58932, cat: 'expense' },
      { label: 'Cleaning & laundry · 4 turnovers', value_thb: -14600, cat: 'expense' },
      { label: 'Pool & garden service · monthly contract', value_thb: -9800, cat: 'expense' },
      { label: 'Maintenance · pool pump seal replacement', value_thb: -3450, cat: 'expense' },
      { label: 'Electricity recovered from guests', value_thb: 11240, cat: 'income' },
      { label: 'VAT on services · 7%', value_thb: -5834, cat: 'expense' },
    ],
  }),
  mkStatement({
    id: 'ACV-STMT-2607-011',
    period: 'July 2026',
    owner: 'Marie Dubois',
    villa: 'Casa del Sol',
    code: 'ACV-011',
    status: 'Issued',
    issued: '2 Aug 2026',
    settled: 'Awaiting payout run · 5 Sep 2026',
    nights_available: 31,
    reservations: [
      { ref: 'ACV-R-2401', guest: 'J. Whitcombe', channel: 'Airbnb', dates: '2–8 Jul', nights: 6, gross_thb: 46800 },
      { ref: 'ACV-R-2409', guest: 'L. Ferrari', channel: 'Booking.com', dates: '10–15 Jul', nights: 5, gross_thb: 39000 },
      { ref: 'ACV-R-2421', guest: 'D. Owusu', channel: 'Direct', dates: '17–21 Jul', nights: 4, gross_thb: 31200 },
      { ref: 'ACV-R-2430', guest: 'A. Bergström', channel: 'Airbnb', dates: '24–31 Jul', nights: 7, gross_thb: 54600 },
    ],
    lines: [
      { label: 'Channel commission · Airbnb, Booking.com', value_thb: -19300, cat: 'commission' },
      { label: 'Management fee · 18% of net rental', value_thb: -27414, cat: 'expense' },
      { label: 'Cleaning & laundry · 4 turnovers', value_thb: -8900, cat: 'expense' },
      { label: 'Pool & garden service · monthly contract', value_thb: -6400, cat: 'expense' },
      { label: 'Electricity recovered from guests', value_thb: 5120, cat: 'income' },
      { label: 'VAT on services · 7%', value_thb: -2990, cat: 'expense' },
    ],
  }),
  mkStatement({
    id: 'ACV-STMT-2607-007',
    period: 'July 2026',
    owner: 'Marie Dubois',
    villa: 'Villa Coral Bay',
    code: 'ACV-007',
    status: 'Issued',
    issued: '2 Aug 2026',
    settled: 'Awaiting payout run · 5 Sep 2026',
    nights_available: 31,
    reservations: [
      { ref: 'ACV-R-2404', guest: 'H. Tanaka', channel: 'Direct', dates: '3–13 Jul', nights: 10, gross_thb: 215000 },
      { ref: 'ACV-R-2415', guest: 'C. Almeida', channel: 'Booking.com', dates: '15–21 Jul', nights: 6, gross_thb: 129000 },
      { ref: 'ACV-R-2429', guest: 'N. Petrov', channel: 'Airbnb', dates: '25–29 Jul', nights: 4, gross_thb: 86000 },
    ],
    lines: [
      { label: 'Channel commission · Airbnb, Booking.com', value_thb: -37400, cat: 'commission' },
      { label: 'Management fee · 18% of net rental', value_thb: -70668, cat: 'expense' },
      { label: 'Cleaning & laundry · 3 turnovers', value_thb: -21300, cat: 'expense' },
      { label: 'Pool & garden service · monthly contract', value_thb: -12400, cat: 'expense' },
      { label: 'Maintenance · chiller service, 2 units', value_thb: -8900, cat: 'expense' },
      { label: 'Electricity recovered from guests', value_thb: 18600, cat: 'income' },
      { label: 'VAT on services · 7%', value_thb: -7306, cat: 'expense' },
    ],
  }),
  mkStatement({
    id: 'ACV-STMT-2607-002',
    period: 'July 2026',
    owner: 'Henrik Sørensen',
    villa: 'Baan Lotus',
    code: 'ACV-002',
    status: 'Issued',
    issued: '2 Aug 2026',
    settled: 'Payout scheduled 5 Sep 2026',
    nights_available: 31,
    reservations: [
      { ref: 'ACV-R-2402', guest: 'M. Okafor', channel: 'Airbnb', dates: '1–8 Jul', nights: 7, gross_thb: 65800 },
      { ref: 'ACV-R-2413', guest: 'S. Kaur', channel: 'Booking.com', dates: '9–14 Jul', nights: 5, gross_thb: 47000 },
      { ref: 'ACV-R-2422', guest: 'F. Lindberg', channel: 'Direct', dates: '15–24 Jul', nights: 9, gross_thb: 84600 },
      { ref: 'ACV-R-2435', guest: 'B. Haddad', channel: 'Airbnb', dates: '26–30 Jul', nights: 4, gross_thb: 37600 },
    ],
    lines: [
      { label: 'Channel commission · Airbnb, Booking.com', value_thb: -24900, cat: 'commission' },
      { label: 'Management fee · 18% of net rental', value_thb: -37818, cat: 'expense' },
      { label: 'Cleaning & laundry · 4 turnovers', value_thb: -11200, cat: 'expense' },
      { label: 'Pool & garden service · monthly contract', value_thb: -7600, cat: 'expense' },
      { label: 'Electricity recovered from guests', value_thb: 7940, cat: 'income' },
      { label: 'VAT on services · 7%', value_thb: -3963, cat: 'expense' },
    ],
  }),
  mkStatement({
    id: 'ACV-STMT-2607-015',
    period: 'July 2026',
    owner: 'Priya Nair',
    villa: 'Villa Andaman',
    code: 'ACV-015',
    status: 'Overdue',
    issued: '2 Aug 2026',
    settled: 'Payout held — owner bank details under review',
    nights_available: 31,
    reservations: [
      { ref: 'ACV-R-2407', guest: 'G. Fontaine', channel: 'Airbnb', dates: '4–11 Jul', nights: 7, gross_thb: 62300 },
      { ref: 'ACV-R-2419', guest: 'W. Chen', channel: 'Booking.com', dates: '14–19 Jul', nights: 5, gross_thb: 44500 },
      { ref: 'ACV-R-2431', guest: 'K. Adeyemi', channel: 'Direct', dates: '27–30 Jul', nights: 3, gross_thb: 26700 },
    ],
    lines: [
      { label: 'Channel commission · Airbnb, Booking.com', value_thb: -14100, cat: 'commission' },
      { label: 'Management fee · 18% of net rental', value_thb: -21492, cat: 'expense' },
      { label: 'Cleaning & laundry · 3 turnovers', value_thb: -7400, cat: 'expense' },
      { label: 'Pool & garden service · monthly contract', value_thb: -6100, cat: 'expense' },
      { label: 'Maintenance · bedroom 2 aircon compressor', value_thb: -4200, cat: 'expense' },
      { label: 'Electricity recovered from guests', value_thb: 4380, cat: 'income' },
      { label: 'VAT on services · 7%', value_thb: -2449, cat: 'expense' },
    ],
  }),
  mkStatement({
    id: 'ACV-STMT-2607-019',
    period: 'July 2026',
    owner: 'Daniel & Ines Costa',
    villa: 'The Frangipani',
    code: 'ACV-019',
    status: 'Issued',
    issued: '2 Aug 2026',
    settled: 'Payout scheduled 5 Sep 2026',
    nights_available: 31,
    reservations: [
      { ref: 'ACV-R-2405', guest: 'R. Delacroix', channel: 'Direct', dates: '2–9 Jul', nights: 7, gross_thb: 187600 },
      { ref: 'ACV-R-2417', guest: 'V. Kowalski', channel: 'Booking.com', dates: '12–17 Jul', nights: 5, gross_thb: 134000 },
      { ref: 'ACV-R-2428', guest: 'E. Nakamura', channel: 'Airbnb', dates: '20–28 Jul', nights: 8, gross_thb: 214400 },
    ],
    lines: [
      { label: 'Channel commission · Airbnb, Booking.com', value_thb: -48300, cat: 'commission' },
      { label: 'Management fee · 18% of net rental', value_thb: -87786, cat: 'expense' },
      { label: 'Cleaning & laundry · 3 turnovers', value_thb: -26800, cat: 'expense' },
      { label: 'Pool & garden service · monthly contract', value_thb: -14900, cat: 'expense' },
      { label: 'Electricity recovered from guests', value_thb: 21300, cat: 'income' },
      { label: 'VAT on services · 7%', value_thb: -9064, cat: 'expense' },
    ],
  }),
  mkStatement({
    id: 'ACV-STMT-2606-004',
    period: 'June 2026',
    owner: 'Alexander Reid',
    villa: 'Villa Sunset Sapphire',
    code: 'ACV-004',
    status: 'Paid',
    issued: '2 Jul 2026',
    settled: 'Paid 5 Jul 2026 · Wise',
    nights_available: 30,
    reservations: [
      { ref: 'ACV-R-2338', guest: 'A. Marchetti', channel: 'Airbnb', dates: '3–10 Jun', nights: 7, gross_thb: 90300 },
      { ref: 'ACV-R-2344', guest: 'J. Rasmussen', channel: 'Booking.com', dates: '12–18 Jun', nights: 6, gross_thb: 77400 },
      { ref: 'ACV-R-2351', guest: 'L. Moreno', channel: 'Direct', dates: '22–30 Jun', nights: 8, gross_thb: 103200 },
    ],
    lines: [
      { label: 'Channel commission · Airbnb, Booking.com', value_thb: -32600, cat: 'commission' },
      { label: 'Management fee · 18% of net rental', value_thb: -42714, cat: 'expense' },
      { label: 'Cleaning & laundry · 3 turnovers', value_thb: -11400, cat: 'expense' },
      { label: 'Pool & garden service · monthly contract', value_thb: -9800, cat: 'expense' },
      { label: 'Electricity recovered from guests', value_thb: 9260, cat: 'income' },
      { label: 'VAT on services · 7%', value_thb: -4335, cat: 'expense' },
    ],
  }),
  mkStatement({
    id: 'ACV-STMT-2608-004',
    period: 'August 2026',
    owner: 'Alexander Reid',
    villa: 'Villa Sunset Sapphire',
    code: 'ACV-004',
    status: 'Draft',
    issued: 'Closes 1 Sep 2026',
    settled: 'Month in progress — 10 of 31 nights posted',
    nights_available: 31,
    reservations: [
      { ref: 'ACV-R-2441', guest: 'T. Lindqvist', channel: 'Direct', dates: '9–16 Aug', nights: 7, gross_thb: 99400 },
      { ref: 'ACV-R-2447', guest: 'C. Byrne', channel: 'Airbnb', dates: '1–4 Aug', nights: 3, gross_thb: 42600 },
    ],
    lines: [
      { label: 'Channel commission · Airbnb', value_thb: -6390, cat: 'commission' },
      { label: 'Management fee · 18% of net rental (accrued)', value_thb: -24422, cat: 'expense' },
      { label: 'Cleaning & laundry · 2 turnovers', value_thb: -7300, cat: 'expense' },
      { label: 'Electricity recovered from guests (to date)', value_thb: 3980, cat: 'income' },
    ],
  }),
];

/* --------------------------------------------------------- owner balances */

function mkBalance(b) {
  const closing = sum(b.aged, 'amount_thb');
  return { ...b, closing_thb: closing, paid_thb: b.opening_thb + b.credited_thb + b.adjust_thb - closing };
}

demo.owner_balances = [
  mkBalance({
    owner: 'Alexander Reid',
    villas: 'Villa Sunset Sapphire',
    opening_thb: 0,
    credited_thb: 246024,
    adjust_thb: 0,
    note: 'Settled in full on the 5 Aug run',
    aged: [
      { bucket: 'Current', amount_thb: 0 },
      { bucket: '31–60 days', amount_thb: 0 },
      { bucket: '61–90 days', amount_thb: 0 },
      { bucket: '90+ days', amount_thb: 0 },
    ],
  }),
  mkBalance({
    owner: 'Marie Dubois',
    villas: 'Casa del Sol · Villa Coral Bay',
    opening_thb: 42300,
    credited_thb: 402342,
    adjust_thb: -1200,
    note: 'Two villas rolled into one September payout',
    aged: [
      { bucket: 'Current', amount_thb: 402342 },
      { bucket: '31–60 days', amount_thb: 0 },
      { bucket: '61–90 days', amount_thb: 0 },
      { bucket: '90+ days', amount_thb: 0 },
    ],
  }),
  mkBalance({
    owner: 'Henrik Sørensen',
    villas: 'Baan Lotus',
    opening_thb: 0,
    credited_thb: 157459,
    adjust_thb: 0,
    note: 'Thai bank transfer, scheduled',
    aged: [
      { bucket: 'Current', amount_thb: 157459 },
      { bucket: '31–60 days', amount_thb: 0 },
      { bucket: '61–90 days', amount_thb: 0 },
      { bucket: '90+ days', amount_thb: 0 },
    ],
  }),
  mkBalance({
    owner: 'Priya Nair',
    villas: 'Villa Andaman',
    opening_thb: 18400,
    credited_thb: 82139,
    adjust_thb: 0,
    note: 'Held — bank details under review since 14 Jul',
    aged: [
      { bucket: 'Current', amount_thb: 82139 },
      { bucket: '31–60 days', amount_thb: 18400 },
      { bucket: '61–90 days', amount_thb: 0 },
      { bucket: '90+ days', amount_thb: 0 },
    ],
  }),
  mkBalance({
    owner: 'Daniel & Ines Costa',
    villas: 'The Frangipani',
    opening_thb: 0,
    credited_thb: 370450,
    adjust_thb: 0,
    note: 'Wise transfer, EUR, scheduled',
    aged: [
      { bucket: 'Current', amount_thb: 370450 },
      { bucket: '31–60 days', amount_thb: 0 },
      { bucket: '61–90 days', amount_thb: 0 },
      { bucket: '90+ days', amount_thb: 0 },
    ],
  }),
];

/* -------------------------------------------------------- payment queue */

demo.payment_queue = [
  {
    id: 'PQ-4821',
    payee: 'Samui Pool Care Co., Ltd.',
    villa: 'Villa Coral Bay',
    category: 'Pool service',
    amount_thb: 12400,
    raised_by: 'Somchai R.',
    raised: '2 days ago',
    doc: 'Invoice SPC-2608-114',
    note: 'Monthly contract + chiller filter set',
  },
  {
    id: 'PQ-4822',
    payee: 'Bophut Linen & Laundry',
    villa: 'Portfolio · 9 villas',
    category: 'Laundry',
    amount_thb: 28650,
    raised_by: 'Nalin P.',
    raised: '2 days ago',
    doc: 'Invoice BLL-0826',
    note: 'July turnover linen, 214 kg',
  },
  {
    id: 'PQ-4823',
    payee: 'Aung M. (staff reimbursement)',
    villa: 'Villa Sunset Sapphire',
    category: 'Maintenance parts',
    amount_thb: 3450,
    raised_by: 'Aung M.',
    raised: 'Yesterday',
    doc: 'Receipt photo attached',
    note: 'Pool pump seal — bought at Lamai hardware',
  },
  {
    id: 'PQ-4824',
    payee: 'Provincial Electricity Authority',
    villa: 'The Frangipani',
    category: 'Utilities',
    amount_thb: 21300,
    raised_by: 'System · bill scan',
    raised: 'Yesterday',
    doc: 'PEA 6608-77120',
    note: 'Recovered from guests on the July statement',
  },
  {
    id: 'PQ-4825',
    payee: 'Koh Samui Aircon Service',
    villa: 'Villa Andaman',
    category: 'Maintenance',
    amount_thb: 8900,
    raised_by: 'Ploy S.',
    raised: 'Today 09:12',
    doc: 'Quote KSA-4471',
    note: 'Compressor replacement — above ฿5,000 owner threshold',
  },
  {
    id: 'PQ-4826',
    payee: 'Baan Garden Landscaping',
    villa: 'Baan Lotus',
    category: 'Garden',
    amount_thb: 6800,
    raised_by: 'Somchai R.',
    raised: 'Today 11:40',
    doc: 'Invoice BGL-2608-31',
    note: 'Quarterly palm trim, 6 trees',
  },
];

/* ------------------------------------------------------------ petty cash */

demo.petty_cash = {
  drawer: 'Main office · Bophut',
  custodian: 'Ploy S.',
  float_thb: 20000,
  period: '1–10 August 2026',
  entries: [
    { date: '1 Aug', ref: 'PC-0801', label: 'Opening float carried forward', kind: 'Float', by: 'Ploy S.', amount_thb: 20000 },
    { date: '2 Aug', ref: 'PC-0802', label: 'Cleaning consumables · Big C Chaweng', kind: 'Spend', by: 'Nalin P.', amount_thb: -2480 },
    { date: '3 Aug', ref: 'PC-0803', label: 'Motorbike fuel · field team, 4 bikes', kind: 'Spend', by: 'Somchai R.', amount_thb: -960 },
    { date: '4 Aug', ref: 'PC-0804', label: 'Welcome hampers · 3 villas', kind: 'Spend', by: 'Nalin P.', amount_thb: -3150 },
    { date: '5 Aug', ref: 'PC-0805', label: 'Cash drop from office safe', kind: 'Drop', by: 'Ploy S.', amount_thb: 10000 },
    { date: '6 Aug', ref: 'PC-0806', label: 'Pool chlorine · 4 × 25 kg', kind: 'Spend', by: 'Somchai R.', amount_thb: -5600 },
    { date: '7 Aug', ref: 'PC-0807', label: 'Guest taxi refund · late transfer', kind: 'Spend', by: 'Ploy S.', amount_thb: -1200 },
    { date: '8 Aug', ref: 'PC-0808', label: 'Light bulbs & silicone · Baan Lotus', kind: 'Spend', by: 'Aung M.', amount_thb: -845 },
    { date: '9 Aug', ref: 'PC-0809', label: 'Cash drop from office safe', kind: 'Drop', by: 'Ploy S.', amount_thb: 5000 },
    { date: '10 Aug', ref: 'PC-0810', label: 'Staff lunch · turnover day, 7 crew', kind: 'Spend', by: 'Nalin P.', amount_thb: -1400 },
  ],
};

/* ----------------------------------------------------------------- bills */

demo.bills = [
  { id: 'BL-3301', supplier: 'Provincial Electricity Authority', category: 'Utilities', villa: 'Portfolio · 24 villas', issued: '28 Jul 2026', due: '12 Aug 2026', amount_thb: 184600, status: 'Due' },
  { id: 'BL-3302', supplier: 'Bophut Linen & Laundry', category: 'Laundry', villa: 'Portfolio · 9 villas', issued: '31 Jul 2026', due: '15 Aug 2026', amount_thb: 28650, status: 'Due' },
  { id: 'BL-3303', supplier: 'Samui Pool Care Co., Ltd.', category: 'Pool service', villa: 'Portfolio · 24 villas', issued: '1 Aug 2026', due: '16 Aug 2026', amount_thb: 96400, status: 'Due' },
  { id: 'BL-3304', supplier: 'Koh Samui Aircon Service', category: 'Maintenance', villa: 'Villa Andaman', issued: '18 Jul 2026', due: '1 Aug 2026', amount_thb: 8900, status: 'Overdue' },
  { id: 'BL-3305', supplier: 'Island Waste Management', category: 'Waste', villa: 'Portfolio · 24 villas', issued: '20 Jul 2026', due: '3 Aug 2026', amount_thb: 14200, status: 'Overdue' },
  { id: 'BL-3306', supplier: 'Baan Garden Landscaping', category: 'Garden', villa: 'Portfolio · 11 villas', issued: '1 Jul 2026', due: '15 Jul 2026', amount_thb: 42800, status: 'Paid' },
  { id: 'BL-3307', supplier: 'Samui Water Supply', category: 'Utilities', villa: 'Portfolio · 24 villas', issued: '1 Jul 2026', due: '14 Jul 2026', amount_thb: 31500, status: 'Paid' },
  { id: 'BL-3308', supplier: 'Chaweng Security Systems', category: 'Security', villa: 'Portfolio · 6 villas', issued: '5 Jul 2026', due: '19 Jul 2026', amount_thb: 18900, status: 'Paid' },
  { id: 'BL-3309', supplier: 'Lamai Hardware & Tools', category: 'Maintenance parts', villa: 'Portfolio', issued: '4 Aug 2026', due: '18 Aug 2026', amount_thb: 6740, status: 'Due' },
];

/* --------------------------------------------------------------- payouts */

demo.payouts = [
  { batch: 'PO-2608-A', date: '5 Aug 2026', owner: 'Alexander Reid', villa: 'Villa Sunset Sapphire', period: 'July 2026', method: 'Wise · GBP', amount_thb: 246024, fx: '£5,412 received', status: 'Sent', ref: 'ACV-STMT-2607-004' },
  { batch: 'PO-2608-A', date: '5 Aug 2026', owner: 'Marie Dubois', villa: 'Casa del Sol', period: 'June 2026', method: 'Wise · EUR', amount_thb: 96800, fx: '€2,460 received', status: 'Sent', ref: 'ACV-STMT-2606-011' },
  { batch: 'PO-2608-A', date: '5 Aug 2026', owner: 'Henrik Sørensen', villa: 'Baan Lotus', period: 'June 2026', method: 'Thai bank · SCB', amount_thb: 134900, fx: '฿134,900 credited', status: 'Sent', ref: 'ACV-STMT-2606-002' },
  { batch: 'PO-2609-A', date: '5 Sep 2026', owner: 'Marie Dubois', villa: 'Casa del Sol · Villa Coral Bay', period: 'July 2026', method: 'Wise · EUR', amount_thb: 402342, fx: 'Rate locked at close', status: 'Scheduled', ref: 'ACV-STMT-2607-011 / 007' },
  { batch: 'PO-2609-A', date: '5 Sep 2026', owner: 'Henrik Sørensen', villa: 'Baan Lotus', period: 'July 2026', method: 'Thai bank · SCB', amount_thb: 157459, fx: 'No FX', status: 'Scheduled', ref: 'ACV-STMT-2607-002' },
  { batch: 'PO-2609-A', date: '5 Sep 2026', owner: 'Daniel & Ines Costa', villa: 'The Frangipani', period: 'July 2026', method: 'Wise · EUR', amount_thb: 370450, fx: 'Rate locked at close', status: 'Scheduled', ref: 'ACV-STMT-2607-019' },
  { batch: 'PO-2609-A', date: '5 Sep 2026', owner: 'Priya Nair', villa: 'Villa Andaman', period: 'July 2026', method: 'Thai bank · Kasikorn', amount_thb: 100539, fx: 'No FX', status: 'Held', ref: 'ACV-STMT-2607-015' },
];

/* ------------------------------------------------------------ finance hub */

demo.finance_hub = {
  month: 'August 2026 · month to date',
  monthly: [
    { m: 'Jan', in_thb: 1842000, out_thb: 1214000 },
    { m: 'Feb', in_thb: 2106000, out_thb: 1288000 },
    { m: 'Mar', in_thb: 2394000, out_thb: 1341000 },
    { m: 'Apr', in_thb: 1988000, out_thb: 1272000 },
    { m: 'May', in_thb: 1746000, out_thb: 1198000 },
    { m: 'Jun', in_thb: 2037000, out_thb: 1246000 },
    { m: 'Jul', in_thb: 2411000, out_thb: 1394000 },
    { m: 'Aug', in_thb: 964000, out_thb: 548000 },
  ],
  notes: [
    'August is 10 days in — the bar is deliberately short.',
    'Money in is gross collected across all channels; money out is owner payouts, supplier bills and payroll.',
  ],
};

/* ------------------------------------------------------------- RatePilot */

function mkRate(r) {
  const delta = r.suggested_thb - r.current_thb;
  return { ...r, delta_thb: delta, delta_pct: r2((delta / r.current_thb) * 100) };
}

demo.ratepilot = {
  strategy: 'Balanced',
  strategies: ['Occupancy', 'Balanced', 'Rate'],
  horizon: 'Next 90 nights',
  accepted_ytd_pct: 84,
  uplift_note: 'Owner-approved rate changes have added ฿1.28M of booked revenue since January.',
  recommendations: [
    mkRate({
      id: 'RP-9101',
      villa: 'Villa Sunset Sapphire',
      code: 'ACV-004',
      window: '14–22 Nov 2026',
      nights: 9,
      current_thb: 12800,
      suggested_thb: 16400,
      pace: '2 of 9 nights sold',
      comp: 'Comp set open average ฿17,900',
      confidence: 'High',
      reason:
        'Loi Krathong weekend. Six comparable Bophut 4-bed villas are already booked; the three still open average ฿17,900.',
    }),
    mkRate({
      id: 'RP-9102',
      villa: 'The Frangipani',
      code: 'ACV-019',
      window: '20 Dec 2026 – 3 Jan 2027',
      nights: 15,
      current_thb: 26800,
      suggested_thb: 38900,
      pace: '11 of 15 nights sold',
      comp: 'Comp set open average ฿41,200',
      confidence: 'High',
      reason:
        'Peak festive window is 73% sold 4 months out, three weeks ahead of last year. The remaining four nights are scarce inventory in a 6-bed segment with only two open competitors.',
    }),
    mkRate({
      id: 'RP-9103',
      villa: 'Villa Andaman',
      code: 'ACV-015',
      window: '3–19 Sep 2026',
      nights: 17,
      current_thb: 8900,
      suggested_thb: 7300,
      pace: '2 of 17 nights sold',
      comp: 'Comp set open average ฿7,650',
      confidence: 'Medium',
      reason:
        'Low season and the villa is pacing 22 points behind the Lamai comp set. A ฿1,600 cut brings it under the ฿7,500 search filter used by 61% of September traffic.',
    }),
    mkRate({
      id: 'RP-9104',
      villa: 'Villa Coral Bay',
      code: 'ACV-007',
      window: '28 Oct – 6 Nov 2026',
      nights: 10,
      current_thb: 21500,
      suggested_thb: 24200,
      pace: '6 of 10 nights sold',
      comp: 'Comp set open average ฿25,400',
      confidence: 'High',
      reason:
        'Two 5-bed Choeng Mon competitors closed out this week. Pace is 14 points ahead of the same week last year with 10 weeks still to sell.',
    }),
    mkRate({
      id: 'RP-9105',
      villa: 'Baan Lotus',
      code: 'ACV-002',
      window: '12–18 Oct 2026',
      nights: 7,
      current_thb: 9400,
      suggested_thb: 10300,
      pace: '5 of 7 nights sold',
      comp: 'Comp set open average ฿10,700',
      confidence: 'Medium',
      reason:
        'Maenam is 88% occupied for the week and this villa is the cheapest 3-bed still open. A modest lift protects margin without risking the two remaining nights.',
    }),
    mkRate({
      id: 'RP-9106',
      villa: 'Casa del Sol',
      code: 'ACV-011',
      window: '9–15 Sep 2026',
      nights: 7,
      current_thb: 7800,
      suggested_thb: 7100,
      pace: '1 of 7 nights sold',
      comp: 'Comp set open average ฿7,400',
      confidence: 'Medium',
      reason:
        'Softest week of the shoulder season. A 9% trim plus a 3-night minimum has historically converted this week within 12 days.',
    }),
  ],
};

/* --------------------------------------------------------- rate calendar */

demo.rate_calendar = {
  villa: 'Villa Sunset Sapphire',
  code: 'ACV-004',
  month: 'November 2026',
  first_weekday: 0, // Sunday
  days: 30,
  legend: [
    { season: 'Peak', tone: 'peak' },
    { season: 'High', tone: 'high' },
    { season: 'Shoulder', tone: 'shoulder' },
    { season: 'Low', tone: 'low' },
  ],
  // rate, season, state per night (1–30 Nov 2026)
  nights: [
    [12800, 'shoulder', 'booked'], [12800, 'shoulder', 'booked'], [12800, 'shoulder', 'open'],
    [12800, 'shoulder', 'open'], [13400, 'shoulder', 'open'], [14200, 'high', 'booked'],
    [14200, 'high', 'booked'], [13400, 'shoulder', 'booked'], [12800, 'shoulder', 'open'],
    [12800, 'shoulder', 'open'], [13400, 'shoulder', 'open'], [14200, 'high', 'booked'],
    [14200, 'high', 'booked'], [16400, 'peak', 'open'], [16400, 'peak', 'open'],
    [16400, 'peak', 'booked'], [16400, 'peak', 'booked'], [16400, 'peak', 'open'],
    [16400, 'peak', 'open'], [16400, 'peak', 'open'], [16400, 'peak', 'open'],
    [16400, 'peak', 'open'], [13900, 'high', 'booked'], [13900, 'high', 'booked'],
    [13900, 'high', 'booked'], [13400, 'shoulder', 'open'], [14200, 'high', 'booked'],
    [14200, 'high', 'booked'], [14900, 'high', 'booked'], [14900, 'high', 'open'],
  ],
  note: 'Nightly rates as they would push to Airbnb, Booking.com and the direct site. Peak block is the Loi Krathong recommendation awaiting owner approval.',
};

/* --------------------------------------------------------------- comp set */

demo.comp_set = {
  market: 'Bophut & Choeng Mon · 4–5 bedroom',
  window: 'Trailing 90 nights',
  portfolio: { label: 'Azure Coast portfolio', adr_thb: 12480, occupancy_pct: 78 },
  rows: [
    { name: 'Comp A · 4-bed, Bophut hillside', beds: 4, adr_thb: 15900, occupancy_pct: 71, channel: 'Airbnb + direct', note: 'Newer build, no beach access' },
    { name: 'Comp B · 4-bed, Bophut beachfront', beds: 4, adr_thb: 18400, occupancy_pct: 66, channel: 'Booking.com', note: 'Beachfront premium, weaker pace' },
    { name: 'Comp C · 5-bed, Choeng Mon', beds: 5, adr_thb: 22100, occupancy_pct: 63, channel: 'Airbnb', note: 'Closest match to Villa Coral Bay' },
    { name: 'Comp D · 4-bed, Bophut village', beds: 4, adr_thb: 11800, occupancy_pct: 84, channel: 'Airbnb', note: 'Undercutting the market on rate' },
    { name: 'Comp E · 5-bed, Plai Laem', beds: 5, adr_thb: 19700, occupancy_pct: 69, channel: 'Direct + Agoda', note: 'Sells long stays, 5-night minimum' },
    { name: 'Comp F · 4-bed, Maenam', beds: 4, adr_thb: 10400, occupancy_pct: 81, channel: 'Airbnb', note: 'Different micro-market, watched for pace' },
  ],
};

/* -------------------------------------------------------- concierge sales */

function mkConcierge(rows) {
  return rows.map((r) => ({ ...r, revenue_thb: r.units * r.price_thb, margin_thb: r2(r.units * r.price_thb * r.margin_pct / 100) }));
}

demo.concierge_sales = {
  period: 'July 2026',
  lines: mkConcierge([
    { item: 'Airport transfer · minivan', category: 'Transfers', units: 41, price_thb: 1400, margin_pct: 32, attach_pct: 68 },
    { item: 'Airport transfer · private car', category: 'Transfers', units: 18, price_thb: 1100, margin_pct: 30, attach_pct: 22 },
    { item: 'Private chef · Thai tasting menu', category: 'Chef', units: 23, price_thb: 4800, margin_pct: 28, attach_pct: 31 },
    { item: 'Daily breakfast service', category: 'Chef', units: 62, price_thb: 650, margin_pct: 35, attach_pct: 44 },
    { item: 'Ang Thong day charter', category: 'Tours', units: 9, price_thb: 18500, margin_pct: 22, attach_pct: 12 },
    { item: 'Island tour · private driver, 8 hrs', category: 'Tours', units: 14, price_thb: 3200, margin_pct: 34, attach_pct: 19 },
    { item: 'In-villa Thai massage · 60 min', category: 'Wellness', units: 37, price_thb: 1200, margin_pct: 40, attach_pct: 27 },
    { item: 'Grocery pre-stock', category: 'Wellness', units: 26, price_thb: 900, margin_pct: 18, attach_pct: 33 },
  ]),
  note: 'Attach rate is the share of eligible stays that bought the item at least once.',
};

/* --------------------------------------------------------------- reviews */

demo.reviews = [
  { guest: 'T. Lindqvist', villa: 'Villa Sunset Sapphire', channel: 'Direct', rating: 5.0, date: '4 Aug 2026', sentiment: 'Positive', responded: true, text: 'Nalin met us at the gate with cold towels. The infinity pool at sunset is exactly what the photos promise. Door code worked first time.' },
  { guest: 'H. Tanaka', villa: 'Villa Coral Bay', channel: 'Booking.com', rating: 4.8, date: '2 Aug 2026', sentiment: 'Positive', responded: true, text: 'Ten nights and everything ran quietly in the background. Aircon in bedroom four was slow the first evening and fixed the next morning.' },
  { guest: 'M. Okafor', villa: 'Baan Lotus', channel: 'Airbnb', rating: 5.0, date: '31 Jul 2026', sentiment: 'Positive', responded: true, text: 'Spotless. The welcome hamper and the handwritten note from the team made the arrival feel personal rather than transactional.' },
  { guest: 'G. Fontaine', villa: 'Villa Andaman', channel: 'Airbnb', rating: 3.6, date: '28 Jul 2026', sentiment: 'Mixed', responded: false, text: 'Lovely villa and a great location, but the bedroom two aircon struggled for two nights before an engineer came. Communication was good throughout.' },
  { guest: 'R. Delacroix', villa: 'The Frangipani', channel: 'Direct', rating: 5.0, date: '26 Jul 2026', sentiment: 'Positive', responded: true, text: 'Six bedrooms, eleven of us, and not one logistical problem. The private chef evening was the highlight of the week.' },
  { guest: 'J. Whitcombe', villa: 'Casa del Sol', channel: 'Airbnb', rating: 4.4, date: '22 Jul 2026', sentiment: 'Positive', responded: true, text: 'Great value for Chaweng. Road noise in the mornings is real but the villa itself is immaculate.' },
  { guest: 'W. Chen', villa: 'Villa Andaman', channel: 'Booking.com', rating: 4.0, date: '20 Jul 2026', sentiment: 'Mixed', responded: true, text: 'Check-in was smooth and the pool was clean. Wi-Fi dropped a few times which mattered because we were working.' },
  { guest: 'S. Yamamoto', villa: 'Villa Sunset Sapphire', channel: 'Direct', rating: 4.9, date: '30 Jul 2026', sentiment: 'Positive', responded: true, text: 'Second stay this year. Booked direct because the team answers within minutes, every time.' },
];

/* ----------------------------------------------------- upsell catalogue */

demo.upsell_catalogue = [
  { item: 'Airport transfer · minivan (up to 8)', category: 'Transfers', price_thb: 1400, attach_pct: 68, sold_90d: 118, status: 'Live' },
  { item: 'Private chef · Thai tasting menu', category: 'Chef', price_thb: 4800, attach_pct: 31, sold_90d: 64, status: 'Live' },
  { item: 'Daily breakfast service · per person', category: 'Chef', price_thb: 650, attach_pct: 44, sold_90d: 183, status: 'Live' },
  { item: 'Ang Thong day charter · private longtail', category: 'Tours', price_thb: 18500, attach_pct: 12, sold_90d: 24, status: 'Live' },
  { item: 'In-villa Thai massage · 60 min', category: 'Wellness', price_thb: 1200, attach_pct: 27, sold_90d: 96, status: 'Live' },
  { item: 'Grocery pre-stock · standard basket', category: 'Wellness', price_thb: 900, attach_pct: 33, sold_90d: 74, status: 'Live' },
  { item: 'Late checkout · until 18:00', category: 'Stay', price_thb: 2500, attach_pct: 16, sold_90d: 41, status: 'Live' },
  { item: 'Baby kit · cot, high chair, monitor', category: 'Stay', price_thb: 0, attach_pct: 9, sold_90d: 22, status: 'Complimentary' },
  { item: 'Yacht day charter · 12 guests', category: 'Tours', price_thb: 62000, attach_pct: 2, sold_90d: 3, status: 'Draft' },
];

/* ------------------------------------------------------------ admin data */

demo.users_roles = [
  { name: 'Kanya T.', email: 'kanya.t@example-demo.com', role: 'Owner / Admin', last_active: '3 minutes ago', mfa: true, villas: 'All 24' },
  { name: 'Ploy S.', email: 'ploy.s@example-demo.com', role: 'Operations manager', last_active: '11 minutes ago', mfa: true, villas: 'All 24' },
  { name: 'Nalin P.', email: 'nalin.p@example-demo.com', role: 'Housekeeping lead', last_active: '26 minutes ago', mfa: false, villas: '9 assigned' },
  { name: 'Somchai R.', email: 'somchai.r@example-demo.com', role: 'Pool & garden', last_active: '1 hour ago', mfa: false, villas: '24 assigned' },
  { name: 'Aung M.', email: 'aung.m@example-demo.com', role: 'Maintenance', last_active: '2 hours ago', mfa: false, villas: '24 assigned' },
  { name: 'Warunee K.', email: 'warunee.k@example-demo.com', role: 'Finance', last_active: 'Yesterday 17:40', mfa: true, villas: 'Read-only' },
  { name: 'Alexander Reid', email: 'alexander.reid@example-demo.com', role: 'Owner (portal)', last_active: 'Yesterday 21:02', mfa: true, villas: 'Villa Sunset Sapphire' },
  { name: 'Marie Dubois', email: 'marie.dubois@example-demo.com', role: 'Owner (portal)', last_active: '3 days ago', mfa: false, villas: '2 villas' },
];

demo.staff_directory = [
  { name: 'Ploy S.', role: 'Operations manager', villas: 'Portfolio-wide', phone: '+66 8 0000 0101', languages: 'ไทย · English', shift: 'Mon–Sat 08:00–17:00' },
  { name: 'Nalin P.', role: 'Housekeeping lead', villas: 'Sunset Sapphire · Baan Lotus · Frangipani +6', phone: '+66 8 0000 0102', languages: 'ไทย · English', shift: 'Mon–Sat 07:00–16:00' },
  { name: 'Somchai R.', role: 'Pool & garden technician', villas: 'All 24 · route-based', phone: '+66 8 0000 0103', languages: 'ไทย', shift: 'Mon–Sat 06:30–15:30' },
  { name: 'Aung M.', role: 'Maintenance technician', villas: 'All 24 · on call', phone: '+66 8 0000 0104', languages: 'ไทย · မြန်မာ', shift: 'Tue–Sun 08:00–17:00' },
  { name: 'Malee W.', role: 'Housekeeper', villas: 'Casa del Sol · Villa Andaman +3', phone: '+66 8 0000 0105', languages: 'ไทย', shift: 'Mon–Fri 08:00–16:00' },
  { name: 'Thida C.', role: 'Housekeeper', villas: 'Villa Coral Bay +4', phone: '+66 8 0000 0106', languages: 'ไทย', shift: 'Wed–Mon 08:00–16:00' },
  { name: 'Warunee K.', role: 'Finance officer', villas: 'Office', phone: '+66 8 0000 0107', languages: 'ไทย · English', shift: 'Mon–Fri 09:00–18:00' },
  { name: 'Chaiwat P.', role: 'Driver / guest transfers', villas: 'Portfolio-wide', phone: '+66 8 0000 0108', languages: 'ไทย · English', shift: 'Rotating' },
];

function mkPayroll(rows) {
  return rows.map((r) => ({
    ...r,
    regular_thb: r2(r.regular_hrs * r.rate_thb),
    ot_thb: r2(r.ot_hrs * r.rate_thb * 1.5),
    gross_thb: r2(r.regular_hrs * r.rate_thb + r.ot_hrs * r.rate_thb * 1.5 + r.allowance_thb),
  }));
}

demo.payroll_inputs = {
  period: '1–15 August 2026 · half-month run',
  cutoff: 'Locks 16 Aug 2026 18:00',
  rows: mkPayroll([
    { name: 'Ploy S.', role: 'Operations manager', shifts: 13, regular_hrs: 104, ot_hrs: 6, rate_thb: 185, allowance_thb: 3000 },
    { name: 'Nalin P.', role: 'Housekeeping lead', shifts: 13, regular_hrs: 104, ot_hrs: 11, rate_thb: 145, allowance_thb: 2000 },
    { name: 'Somchai R.', role: 'Pool & garden', shifts: 12, regular_hrs: 96, ot_hrs: 4, rate_thb: 130, allowance_thb: 1500 },
    { name: 'Aung M.', role: 'Maintenance', shifts: 12, regular_hrs: 96, ot_hrs: 9, rate_thb: 135, allowance_thb: 1500 },
    { name: 'Malee W.', role: 'Housekeeper', shifts: 11, regular_hrs: 88, ot_hrs: 3, rate_thb: 115, allowance_thb: 900 },
    { name: 'Thida C.', role: 'Housekeeper', shifts: 12, regular_hrs: 96, ot_hrs: 5, rate_thb: 115, allowance_thb: 900 },
    { name: 'Chaiwat P.', role: 'Driver', shifts: 10, regular_hrs: 80, ot_hrs: 8, rate_thb: 120, allowance_thb: 1200 },
  ]),
};

demo.hostaway_sync = {
  account: 'Azure Coast Villas · Hostaway #ACV-4471',
  mode: 'Two-way · webhooks + 15-minute reconcile',
  entities: [
    { entity: 'Properties', last: '14:02 · 4 minutes ago', records: 24, changed: 0, status: 'Healthy', detail: 'Listing content, amenities, photos' },
    { entity: 'Reservations', last: '14:05 · 1 minute ago', records: 318, changed: 3, status: 'Healthy', detail: '3 new bookings pulled since 13:00' },
    { entity: 'Calendar & rates', last: '14:05 · 1 minute ago', records: 8760, changed: 41, status: 'Healthy', detail: 'Nightly rates pushed for 41 dates' },
    { entity: 'Reviews', last: '13:30 · 36 minutes ago', records: 612, changed: 2, status: 'Healthy', detail: 'Airbnb and Booking.com reviews' },
    { entity: 'Guest messages', last: '14:06 · now', records: 1904, changed: 7, status: 'Healthy', detail: 'Unified inbox threads' },
    { entity: 'Financial fields', last: '11:48 · 2 hours ago', records: 318, changed: 0, status: 'Degraded', detail: 'Channel fee fields lag on Agoda — reconciled nightly' },
  ],
};

demo.audit_log = [
  { when: '10 Aug 14:04', actor: 'Ploy S.', action: 'Approved payment', target: 'PQ-4826 · ฿6,800 · Baan Garden Landscaping', ip: '203.0.113.24' },
  { when: '10 Aug 13:41', actor: 'System · RatePilot', action: 'Pushed rate change', target: 'Villa Coral Bay · 28 Oct – 6 Nov · ฿21,500 → ฿24,200', ip: '—' },
  { when: '10 Aug 12:18', actor: 'Warunee K.', action: 'Issued statement', target: 'ACV-STMT-2607-019 · The Frangipani', ip: '203.0.113.24' },
  { when: '10 Aug 11:52', actor: 'Nalin P.', action: 'Completed task with photo proof', target: 'Departure clean · Villa Sunset Sapphire', ip: '198.51.100.77' },
  { when: '10 Aug 09:12', actor: 'Ploy S.', action: 'Raised payment request', target: 'PQ-4825 · ฿8,900 · Koh Samui Aircon Service', ip: '203.0.113.24' },
  { when: '9 Aug 21:02', actor: 'Alexander Reid', action: 'Signed in to owner portal', target: 'Villa Sunset Sapphire', ip: '81.2.69.142' },
  { when: '9 Aug 18:30', actor: 'Kanya T.', action: 'Changed role', target: 'Warunee K. · Operations → Finance', ip: '203.0.113.24' },
  { when: '9 Aug 16:14', actor: 'System · Hostaway', action: 'Reconciled reservations', target: '318 records · 0 conflicts', ip: '—' },
  { when: '9 Aug 10:47', actor: 'Aung M.', action: 'Uploaded receipt', target: '฿3,450 · pool pump seal · Villa Sunset Sapphire', ip: '198.51.100.91' },
  { when: '8 Aug 15:22', actor: 'Marie Dubois', action: 'Approved rate recommendation', target: 'Casa del Sol · 9–15 Sep · ฿7,800 → ฿7,100', ip: '92.184.100.5' },
];

demo.settings = {
  groups: [
    {
      label: 'Organisation',
      fields: [
        { label: 'Legal entity', value: 'Azure Coast Villas Co., Ltd.', kind: 'text' },
        { label: 'Registered address', value: '112/8 Moo 1, Bophut, Koh Samui 84320', kind: 'text' },
        { label: 'Tax ID', value: '0-0000-00000-00-0', kind: 'text' },
        { label: 'Base currency', value: 'THB (฿)', kind: 'select' },
      ],
    },
    {
      label: 'Finance defaults',
      fields: [
        { label: 'Management fee', value: '18% of net rental', kind: 'select' },
        { label: 'VAT on services', value: '7%', kind: 'select' },
        { label: 'Statement close day', value: '1st of the following month', kind: 'select' },
        { label: 'Owner payout day', value: '5th of the following month', kind: 'select' },
        { label: 'Owner approval threshold', value: '฿5,000', kind: 'text' },
      ],
    },
    {
      label: 'Operations',
      fields: [
        { label: 'Default check-in / check-out', value: '15:00 / 11:00', kind: 'text' },
        { label: 'Photo proof required on cleans', value: 'On', kind: 'toggle', on: true },
        { label: 'TM30 auto-file on check-in', value: 'On', kind: 'toggle', on: true },
        { label: 'Field app languages', value: 'English · ไทย · Burmese', kind: 'text' },
      ],
    },
    {
      label: 'Notifications',
      fields: [
        { label: 'Daily ops digest · 07:00', value: 'On', kind: 'toggle', on: true },
        { label: 'Payment request alerts', value: 'On', kind: 'toggle', on: true },
        { label: 'Review below 4.0 alert', value: 'On', kind: 'toggle', on: true },
        { label: 'Weekly owner summary', value: 'Off', kind: 'toggle', on: false },
      ],
    },
  ],
};

/* ------------------------------------------------------- home extras */

demo.my_day = {
  staff: 'Ploy S.',
  role: 'Operations manager',
  date: 'Monday 10 August 2026',
  blocks: [
    { time: '08:00', title: 'Morning stand-up · field team', detail: '7 crew · 9 turnovers scheduled', tone: 'done' },
    { time: '09:30', title: 'Pre-arrival inspection · Villa Sunset Sapphire', detail: 'T. Lindqvist arriving 15:00, 6 guests', tone: 'done' },
    { time: '11:00', title: 'Approve payment queue', detail: '6 items · ฿81,500 total', tone: 'now' },
    { time: '13:00', title: 'Owner call · Priya Nair', detail: 'Bank details review, held payout', tone: 'next' },
    { time: '15:00', title: 'Guest arrival · Villa Sunset Sapphire', detail: 'Nalin meeting at the gate', tone: 'next' },
    { time: '16:30', title: 'Walk-through · Baan Lotus', detail: 'Palm trim sign-off with Baan Garden', tone: 'next' },
    { time: '17:30', title: 'Close the day · task board sweep', detail: 'Clear anything unassigned before tomorrow', tone: 'next' },
  ],
};

demo.inbox = [
  { from: 'T. Lindqvist', channel: 'Direct', villa: 'Villa Sunset Sapphire', when: '12 min', unread: true, subject: 'Arriving a little early?', preview: 'Our flight lands at 12:40 — is there any chance we could drop bags before 15:00?' },
  { from: 'Marie Dubois', channel: 'Owner portal', villa: 'Casa del Sol', when: '48 min', unread: true, subject: 'September rate cut', preview: 'Happy to approve the 9% trim, but can we hold ฿7,400 as the floor?' },
  { from: 'Bophut Linen & Laundry', channel: 'Email', villa: 'Portfolio', when: '2 hrs', unread: true, subject: 'July invoice BLL-0826', preview: 'Attached is the July linen invoice, 214 kg across nine villas.' },
  { from: 'H. Mueller', channel: 'Booking.com', villa: 'Villa Sunset Sapphire', when: '4 hrs', unread: false, subject: 'Thank you', preview: 'Everything was perfect. We have already recommended you to friends in Hamburg.' },
  { from: 'Priya Nair', channel: 'Owner portal', villa: 'Villa Andaman', when: 'Yesterday', unread: false, subject: 'New bank account', preview: 'I have switched banks — sending the new Kasikorn details for verification.' },
  { from: 'W. Chen', channel: 'Booking.com', villa: 'Villa Andaman', when: 'Yesterday', unread: false, subject: 'Wi-Fi during our stay', preview: 'The connection dropped a few times while we were working — worth a look.' },
];

demo.my_requests = [
  { id: 'RQ-1182', title: 'Replace bedroom 2 aircon compressor', villa: 'Villa Andaman', raised: '8 Aug', amount_thb: 8900, stage: 'Awaiting owner approval' },
  { id: 'RQ-1181', title: 'Additional housekeeper · Saturdays', villa: 'Portfolio', raised: '6 Aug', amount_thb: 0, stage: 'With the owner/admin' },
  { id: 'RQ-1179', title: 'Replace 6 sun loungers', villa: 'The Frangipani', raised: '4 Aug', amount_thb: 34800, stage: 'Approved · ordering' },
  { id: 'RQ-1174', title: 'Repaint pool deck', villa: 'Baan Lotus', raised: '28 Jul', amount_thb: 26500, stage: 'Scheduled for low season' },
  { id: 'RQ-1170', title: 'Pool pump seal replacement', villa: 'Villa Sunset Sapphire', raised: '19 Jul', amount_thb: 3450, stage: 'Completed · on July statement' },
];

demo.my_bills = [
  { id: 'MB-901', label: 'Pool chlorine · 4 × 25 kg', villa: 'Portfolio', date: '6 Aug', amount_thb: 5600, method: 'Petty cash', state: 'Submitted' },
  { id: 'MB-902', label: 'Welcome hampers · 3 villas', villa: 'Portfolio', date: '4 Aug', amount_thb: 3150, method: 'Petty cash', state: 'Approved' },
  { id: 'MB-903', label: 'Guest taxi refund', villa: 'Casa del Sol', date: '7 Aug', amount_thb: 1200, method: 'Petty cash', state: 'Approved' },
  { id: 'MB-904', label: 'Light bulbs & silicone', villa: 'Baan Lotus', date: '8 Aug', amount_thb: 845, method: 'Reimbursement', state: 'Submitted' },
  { id: 'MB-905', label: 'Motorbike fuel · field team', villa: 'Portfolio', date: '3 Aug', amount_thb: 960, method: 'Petty cash', state: 'Reimbursed' },
];

/* --------------------------------------------------- properties extras */

demo.property_drift = [
  { villa: 'Villa Sunset Sapphire', field: 'Nightly rate · 14–22 Nov', ours: '฿16,400', channel: '฿12,800 on Airbnb', since: '2 hours', severity: 'Action' },
  { villa: 'Casa del Sol', field: 'Maximum guests', ours: '4', channel: '6 on Booking.com', since: '3 days', severity: 'Action' },
  { villa: 'Villa Coral Bay', field: 'Check-in time', ours: '15:00', channel: '14:00 on Agoda', since: '6 days', severity: 'Watch' },
  { villa: 'Baan Lotus', field: 'Hero photo', ours: 'pool-dusk-01.jpg', channel: 'Older exterior shot on Airbnb', since: '11 days', severity: 'Watch' },
  { villa: 'The Frangipani', field: 'Cleaning fee', ours: '฿4,500', channel: '฿3,800 on Booking.com', since: '2 days', severity: 'Action' },
  { villa: 'Villa Andaman', field: 'Amenities · EV charger', ours: 'Yes', channel: 'Missing on all channels', since: '19 days', severity: 'Watch' },
];

demo.hero_photos = [
  { villa: 'Villa Sunset Sapphire', file: 'sapphire-pool-dusk.jpg', score: 94, ctr_pct: 6.2, updated: '11 Jun 2026', state: 'Live' },
  { villa: 'Villa Coral Bay', file: 'coral-terrace-wide.jpg', score: 91, ctr_pct: 5.8, updated: '2 May 2026', state: 'Live' },
  { villa: 'The Frangipani', file: 'frangipani-garden-aerial.jpg', score: 96, ctr_pct: 7.1, updated: '18 Jul 2026', state: 'Live' },
  { villa: 'Baan Lotus', file: 'lotus-pool-morning.jpg', score: 78, ctr_pct: 4.1, updated: '9 Jan 2026', state: 'Reshoot queued' },
  { villa: 'Casa del Sol', file: 'sol-living-open.jpg', score: 82, ctr_pct: 4.6, updated: '3 Mar 2026', state: 'Live' },
  { villa: 'Villa Andaman', file: 'andaman-deck-sunset.jpg', score: 71, ctr_pct: 3.4, updated: '22 Nov 2025', state: 'Reshoot queued' },
];

demo.portfolio_analytics = {
  window: 'Trailing 12 months',
  revpar_series: [4820, 5140, 6210, 7480, 6890, 5960, 5210, 4980, 5730, 6480, 7120, 7940],
  months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  channels: [
    { channel: 'Direct', share_pct: 34, adr_thb: 13900, commission_pct: 0 },
    { channel: 'Airbnb', share_pct: 31, adr_thb: 12100, commission_pct: 15 },
    { channel: 'Booking.com', share_pct: 24, adr_thb: 11800, commission_pct: 17 },
    { channel: 'Agoda', share_pct: 8, adr_thb: 10400, commission_pct: 18 },
    { channel: 'Repeat / referral', share_pct: 3, adr_thb: 14600, commission_pct: 0 },
  ],
};

demo.onboarding = [
  { villa: 'Villa Nam Jai', code: 'ACV-025', owner: 'Rungnapa S.', stage: 'Contract signed', progress: 20, steps: '3 of 15', eta: 'Live 1 Oct 2026' },
  { villa: 'Baan Talay Dao', code: 'ACV-026', owner: 'Oliver Grant', stage: 'Photography booked', progress: 47, steps: '7 of 15', eta: 'Live 15 Sep 2026' },
  { villa: 'Villa Similan', code: 'ACV-027', owner: 'Anya Voronova', stage: 'Channel listings drafted', progress: 73, steps: '11 of 15', eta: 'Live 28 Aug 2026' },
  { villa: 'The Orchid House', code: 'ACV-028', owner: 'Marcus Dwyer', stage: 'Final inventory check', progress: 93, steps: '14 of 15', eta: 'Live 18 Aug 2026' },
];

/* ---------------------------------------------------- operations extras */

demo.reservations_feed = [
  { ref: 'ACV-R-2451', villa: 'Villa Sunset Sapphire', guest: 'C. Byrne', channel: 'Airbnb', dates: '22–27 Aug', nights: 5, pax: 4, value_thb: 71000, state: 'New', when: '6 min ago' },
  { ref: 'ACV-R-2450', villa: 'The Frangipani', guest: 'V. Kowalski', channel: 'Direct', dates: '4–11 Sep', nights: 7, pax: 10, value_thb: 187600, state: 'New', when: '41 min ago' },
  { ref: 'ACV-R-2449', villa: 'Casa del Sol', guest: 'E. Rossi', channel: 'Booking.com', dates: '18–22 Aug', nights: 4, pax: 3, value_thb: 31200, state: 'Modified', when: '2 hrs ago' },
  { ref: 'ACV-R-2448', villa: 'Villa Coral Bay', guest: 'N. Petrov', channel: 'Airbnb', dates: '12–18 Sep', nights: 6, pax: 8, value_thb: 129000, state: 'Confirmed', when: '5 hrs ago' },
  { ref: 'ACV-R-2446', villa: 'Villa Andaman', guest: 'K. Adeyemi', channel: 'Agoda', dates: '30 Aug – 2 Sep', nights: 3, pax: 4, value_thb: 26700, state: 'Cancelled', when: 'Yesterday' },
  { ref: 'ACV-R-2445', villa: 'Baan Lotus', guest: 'F. Lindberg', channel: 'Direct', dates: '25 Aug – 3 Sep', nights: 9, pax: 5, value_thb: 84600, state: 'Confirmed', when: 'Yesterday' },
];

demo.inspections = [
  { villa: 'Villa Sunset Sapphire', type: 'Pre-arrival', inspector: 'Ploy S.', when: 'Today 09:30', score: 98, issues: 0, state: 'Passed' },
  { villa: 'Baan Lotus', type: 'Pre-arrival', inspector: 'Nalin P.', when: 'Today 10:15', score: 94, issues: 1, state: 'Passed with note' },
  { villa: 'Casa del Sol', type: 'Post-departure', inspector: 'Malee W.', when: 'Today 12:00', score: 88, issues: 2, state: 'Passed with note' },
  { villa: 'Villa Andaman', type: 'Quarterly deep', inspector: 'Aung M.', when: 'Tomorrow 08:00', score: null, issues: null, state: 'Scheduled' },
  { villa: 'Villa Coral Bay', type: 'Pre-arrival', inspector: 'Thida C.', when: 'Tomorrow 11:00', score: null, issues: null, state: 'Scheduled' },
  { villa: 'The Frangipani', type: 'Post-departure', inspector: 'Nalin P.', when: 'Yesterday 14:20', score: 76, issues: 4, state: 'Failed · re-clean ordered' },
];

demo.checkout = [
  { villa: 'Casa del Sol', guest: 'R. Moreau', out: '11:00', clean: 'Started 11:10', inventory: 'Clear', meter: 'Read · 412 kWh', deposit: 'Released', state: 'In progress' },
  { villa: 'Villa Coral Bay', guest: 'H. Tanaka', out: '11:00 (13 Aug)', clean: 'Scheduled', inventory: '—', meter: '—', deposit: 'Held ฿20,000', state: 'In house' },
  { villa: 'The Frangipani', guest: 'R. Delacroix', out: '10:00', clean: 'Complete · photos', inventory: '2 wine glasses', meter: 'Read · 986 kWh', deposit: 'Partial ฿1,200 charged', state: 'Closed' },
  { villa: 'Baan Lotus', guest: 'B. Haddad', out: '11:00', clean: 'Complete · photos', inventory: 'Clear', meter: 'Read · 288 kWh', deposit: 'Released', state: 'Closed' },
];

demo.service_schedule = [
  { service: 'Pool chemical balance', crew: 'Somchai R.', frequency: '3× weekly', villas: 24, next: 'Today 15:00', state: 'On track' },
  { service: 'Garden & palm maintenance', crew: 'Baan Garden Landscaping', frequency: 'Weekly', villas: 11, next: 'Tomorrow 07:30', state: 'On track' },
  { service: 'Departure cleans', crew: 'Housekeeping · 5 crew', frequency: 'Per turnover', villas: 24, next: 'Today · 9 turnovers', state: 'Peak load' },
  { service: 'Aircon filter service', crew: 'Aung M.', frequency: 'Monthly', villas: 24, next: '14 Aug 08:00', state: 'On track' },
  { service: 'Linen collection', crew: 'Bophut Linen & Laundry', frequency: '2× weekly', villas: 9, next: 'Tomorrow 06:00', state: 'On track' },
  { service: 'Pest control', crew: 'Island Pest Co.', frequency: 'Quarterly', villas: 24, next: '2 Sep 09:00', state: 'Scheduled' },
  { service: 'Deep clean · low season', crew: 'Housekeeping · 5 crew', frequency: 'Twice yearly', villas: 24, next: '15 Sep', state: 'Planning' },
];

demo.damage_claims = [
  { id: 'DC-771', villa: 'The Frangipani', guest: 'R. Delacroix', item: '2 wine glasses, 1 pool cushion', amount_thb: 1200, evidence: '4 photos', stage: 'Charged to deposit', when: '26 Jul' },
  { id: 'DC-772', villa: 'Villa Coral Bay', guest: 'C. Almeida', item: 'Sun lounger strap torn', amount_thb: 2800, evidence: '3 photos', stage: 'Claim submitted to channel', when: '22 Jul' },
  { id: 'DC-773', villa: 'Villa Sunset Sapphire', guest: 'H. Mueller', item: 'Scratched teak table', amount_thb: 4500, evidence: '5 photos · before/after', stage: 'Owner notified · waived', when: '23 Jul' },
  { id: 'DC-774', villa: 'Casa del Sol', guest: 'A. Bergström', item: 'Missing beach towel ×2', amount_thb: 900, evidence: 'Inventory sheet', stage: 'Recovered', when: '31 Jul' },
];

demo.tm30 = [
  { guest: 'T. Lindqvist', nationality: 'Swedish', villa: 'Villa Sunset Sapphire', arrival: '9 Aug 15:00', filed: '9 Aug 15:22', ref: 'TM30-2608-0441', state: 'Filed' },
  { guest: 'H. Tanaka', nationality: 'Japanese', villa: 'Villa Coral Bay', arrival: '3 Aug 16:40', filed: '3 Aug 17:05', ref: 'TM30-2608-0417', state: 'Filed' },
  { guest: 'M. Okafor', nationality: 'Nigerian', villa: 'Baan Lotus', arrival: '10 Aug 17:30', filed: 'Queued · auto-file on check-in', ref: '—', state: 'Pending' },
  { guest: 'R. Moreau', nationality: 'French', villa: 'Casa del Sol', arrival: '7 Aug 14:10', filed: '7 Aug 14:31', ref: 'TM30-2608-0433', state: 'Filed' },
  { guest: 'W. Chen', nationality: 'Singaporean', villa: 'Villa Andaman', arrival: '14 Jul 12:00', filed: '14 Jul 12:18', ref: 'TM30-2607-0388', state: 'Filed' },
];

/* -------------------------------------------------------- dossier extras */

demo.villa_detail = {
  bookings: [
    { ref: 'ACV-R-2441', guest: 'T. Lindqvist', channel: 'Direct', dates: '9–16 Aug 2026', nights: 7, pax: 6, value_thb: 99400, state: 'In house' },
    { ref: 'ACV-R-2451', guest: 'C. Byrne', channel: 'Airbnb', dates: '22–27 Aug 2026', nights: 5, pax: 4, value_thb: 71000, state: 'Confirmed' },
    { ref: 'ACV-R-2455', guest: 'D. Ferreira', channel: 'Booking.com', dates: '2–9 Sep 2026', nights: 7, pax: 5, value_thb: 92400, state: 'Confirmed' },
    { ref: 'ACV-R-2462', guest: 'M. Alvarez', channel: 'Direct', dates: '18–24 Sep 2026', nights: 6, pax: 6, value_thb: 81600, state: 'Confirmed' },
    { ref: 'ACV-R-2470', guest: 'Enquiry · K. Osei', channel: 'Direct', dates: '14–22 Nov 2026', nights: 8, pax: 8, value_thb: 131200, state: 'Enquiry' },
  ],
  house_manual: [
    { section: 'Arrival', items: ['Gate code 4481, changes with every booking', 'Parking for two cars inside the wall', 'Nalin P. meets every arrival at the gate'] },
    { section: 'Wi-Fi & tech', items: ['Network SunsetSapphire_5G', 'Sonos in the living room and pool deck', 'Smart lock codes expire at 11:00 on checkout day'] },
    { section: 'Pool & garden', items: ['12m infinity pool, cleaned Mon/Wed/Fri 07:00', 'Pool heating on request, ฿1,200 per day', 'Gardener on site Tuesday mornings'] },
    { section: 'House rules', items: ['No events or parties above 12 guests', 'Quiet hours 22:00–08:00', 'No smoking indoors'] },
    { section: 'Emergency', items: ['Ops line +66 8 0000 0101, 24 hours', 'Nearest clinic: Bophut, 6 minutes', 'Main water shut-off behind the utility door'] },
  ],
  photos: [
    { label: 'Pool at dusk', tag: 'Hero', file: 'sapphire-pool-dusk.jpg' },
    { label: 'Living pavilion', tag: 'Interior', file: 'sapphire-living.jpg' },
    { label: 'Master bedroom', tag: 'Interior', file: 'sapphire-master.jpg' },
    { label: 'Sea view terrace', tag: 'Exterior', file: 'sapphire-terrace.jpg' },
    { label: 'Kitchen & bar', tag: 'Interior', file: 'sapphire-kitchen.jpg' },
    { label: 'Garden path', tag: 'Exterior', file: 'sapphire-garden.jpg' },
  ],
  maintenance: [
    { title: 'Pool pump seal replacement', dept: 'Maintenance', who: 'Aung M.', when: '19 Jul 2026', cost_thb: 3450, state: 'Completed' },
    { title: 'Aircon filter service · 4 units', dept: 'Maintenance', who: 'Aung M.', when: '14 Aug 2026', cost_thb: 1800, state: 'Scheduled' },
    { title: 'Departure clean', dept: 'Cleaning', who: 'Nalin P.', when: 'Today 11:00', cost_thb: 3650, state: 'In progress' },
    { title: 'Repaint pool deck coping', dept: 'Maintenance', who: 'Contractor', when: 'Low season', cost_thb: 18500, state: 'Quoted' },
    { title: 'Annual generator service', dept: 'Maintenance', who: 'Samui Power Services', when: '3 Oct 2026', cost_thb: 6200, state: 'Scheduled' },
  ],
  devices: [
    { name: 'Front gate', kind: 'Access', state: 'Closed · armed', detail: 'Last opened 09:31 by Nalin P.' },
    { name: 'Front door smart lock', kind: 'Access', state: 'Locked', detail: 'Guest code active until 16 Aug 11:00' },
    { name: 'Electricity meter', kind: 'Utility', state: '412 kWh this stay', detail: 'Feeds the guest-recovered electricity line' },
    { name: 'Water meter', kind: 'Utility', state: '18.4 m³ this stay', detail: 'No leak alerts in 30 days' },
    { name: 'Pool pump', kind: 'Plant', state: 'Running · normal draw', detail: 'Seal replaced 19 Jul' },
    { name: 'Perimeter cameras ×4', kind: 'Security', state: 'Online', detail: 'Recording to local NVR, 14-day retention' },
  ],
  documents: [
    { name: 'Management agreement 2024–2027', kind: 'PDF', added: '4 Mar 2024', size: '412 KB' },
    { name: 'Villa inventory · signed', kind: 'PDF', added: '4 Mar 2024', size: '1.1 MB' },
    { name: 'Pool pump seal · receipt & photos', kind: 'PDF', added: '19 Jul 2026', size: '3.4 MB' },
    { name: 'Insurance certificate 2026', kind: 'PDF', added: '11 Jan 2026', size: '288 KB' },
    { name: 'Chanote copy', kind: 'PDF', added: '4 Mar 2024', size: '740 KB' },
  ],
};

export default demo;
