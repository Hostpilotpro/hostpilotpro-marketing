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
export default demo;
