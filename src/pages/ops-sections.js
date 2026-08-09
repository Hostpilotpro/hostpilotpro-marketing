/**
 * The newly-surfaced Ops capabilities, each written to its verdict in
 * messaging-v2 §8 (as amended 9 Aug 2026 for Siam Discoveries).
 *
 *   SHIP IT   — ledgers and statements; petty cash and cash drawer.
 *   SOFT      — RatePilot (recommendations, owner approval not production-proven);
 *               listing optimizer (audits, not autonomous optimisation);
 *               HR records and document expiry tracking (no reminder has
 *               demonstrably fired — never promise the reminder);
 *               team messaging (not a unified omnichannel inbox);
 *               Siam Discoveries (curation and per-villa visibility are real;
 *               no instant supplier confirmation, no commissions recorded in
 *               production, no external sync running).
 */

export const opsDepth = [
  {
    eyebrow: 'Pricing',
    title: 'RatePilot: recommendations, with a human in the way.',
    lede:
      'A pricing engine that changes your rates on its own is a fast way to lose an owner. RatePilot reads the calendar and proposes; staff decide; owners can be asked before anything moves.',
    items: [
      [
        'Recommendations across the calendar',
        'Thousands generated so far in our own portfolio, filterable by villa and window, with the reasoning attached to each one.',
      ],
      [
        'Pushes are guarded',
        'A recommendation only reaches Hostaway when someone accepts it, and strict mode never pushes at all.',
      ],
      [
        'Owner approval is built, not proven',
        'The approve-and-decline flow and the owner digest exist in the product. In our own data almost nothing has been pushed and no digest has gone out yet, so we call it rate recommendations with owner approval — not automated pricing running your portfolio.',
      ],
    ],
  },
  {
    eyebrow: 'The ledger',
    title: 'Operational ledgers and owner statements.',
    lede:
      'This is the oldest and most-used part of the system, because it is the part an owner reads. Statements are assembled from reservation and task records rather than typed into a template.',
    items: [
      [
        'Reservation-level ledger',
        'Every booking carries its own ledger lines — revenue, commission, fees, recoveries — so a statement line can always be traced back to a stay.',
      ],
      [
        'Statements with a pipeline',
        'Draft, review, close, issue. Hundreds of statements and thousands of line items in daily use inside our own operation, with stored PDFs.',
      ],
      [
        'Payout statements and CSV out',
        'Owner balances, payout records and exports your accountant can work from.',
      ],
      [
        'Called what it is',
        'An operational ledger and owner statements. Not double-entry general-ledger accounting, and not bank reconciliation.',
      ],
    ],
  },
  {
    eyebrow: 'Cash',
    title: 'Petty cash and the cash drawer.',
    lede:
      'Villa management runs on cash in envelopes, and that is where margin disappears quietly. This is the least glamorous screen in the product and one of the most used.',
    items: [
      ['Floats per person', 'Issue a float, see the balance, reconcile it. Every movement has a name on it.'],
      ['Receipts photographed in the field', 'The photo lands against the transaction, not in a WhatsApp thread.'],
      ['Drawer events and drop-offs', 'Opening, closing, staff advances and cash handed back to the office are all logged.'],
      ['Genuinely in use', 'Floats, hundreds of transactions, drop-offs and drawer events in our own live data.'],
    ],
  },
  {
    eyebrow: 'Listings',
    title: 'AI listing audits and rewrites.',
    lede:
      'Point it at a listing and it scores the title, the photos order and the description, then writes a better version you can accept or ignore.',
    items: [
      ['Audit per listing', 'Sourced from Airbnb or from Hostaway, saved so you can see what changed and when.'],
      ['Rewrites you approve', 'The suggested content is a draft. Pushing it to Hostaway is a deliberate action.'],
      ['Fleet view', 'The same audit across the portfolio, so you can see which villas are underdressed.'],
      [
        'Honest scale',
        'Dozens of audits saved so far, not thousands. It is AI listing audits and rewrites — not autonomous multi-channel optimisation.',
      ],
    ],
  },
  {
    eyebrow: 'People',
    title: 'Staff records and document expiry tracking.',
    lede:
      'Villa operations run on work permits, visas and immigration paperwork, and the cost of missing one is not a fine — it is a person who cannot work tomorrow.',
    items: [
      ['Staff records', 'Roles, departments, contracts and payroll inputs for the whole team.'],
      ['Documents with dates', 'Passport, visa, work permit and immigration documents stored with their expiry dates against each person.'],
      ['An expiry view you check', 'The console shows what is expiring and how soon.'],
      [
        'What we will not promise yet',
        'The notification code exists, but no expiry reminder has demonstrably fired in our production data. So this is document expiry tracking. We are not promising that we will email you before a work permit runs out until we can show you one that did.',
      ],
    ],
  },
  {
    eyebrow: 'Talking',
    title: 'Team messaging, built in.',
    lede:
      'Groups by department, notifications tied to records, and AI conversations reviewable by the office. It exists so a job, a photo and a conversation live in one place.',
    items: [
      ['Groups by department', 'Housekeeping, pool, garden, maintenance and office, with membership managed like any other record.'],
      ['Notifications against records', 'An alert points at the task, statement or villa it came from.'],
      [
        'Small on purpose, and small in practice',
        'Team messaging built in — that is the claim. It is not a unified omnichannel inbox across WhatsApp, email and the OTAs, and our own message volume is modest.',
      ],
    ],
  },
  {
    eyebrow: 'Siam Discoveries',
    title: 'A tours and transfers business, run from the console.',
    lede:
      'The guest-experience catalogue is not a bolt-on list — it is a product engine in the Growth hub, with editors, pricing and per-villa control over what each guest is shown.',
    items: [
      [
        'A visibility matrix, per villa',
        '55 active experiences, and a matrix that decides which of them appear at which villa. Across the portfolio that resolves to more than five thousand villa-and-experience combinations, with explicit per-villa overrides on top.',
      ],
      [
        'Transfer pricing per villa, per destination',
        '610 taxi rates across 10 destinations. A transfer from a villa in Bophut is not priced like the same trip from Taling Ngam, and the system knows.',
      ],
      [
        'Editors, orders, sales and insights',
        'Named editors maintain the catalogue and its photography; separate views cover orders, sales and insights. A commission-rules engine is in place.',
      ],
      [
        'Where the line is',
        'Guests request; the office confirms. There is no instant supplier confirmation, no commission history recorded in production yet, and no external sync running today.',
      ],
    ],
  },
];
