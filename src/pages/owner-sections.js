/**
 * The newly-surfaced Owner Portal capabilities, written to messaging-v2 §8.
 *
 *   SHIP IT — owner PDF reports (financial, performance, annual summary);
 *             ROI / investment tracker (real, but adoption is young).
 *   SOFT    — accounting and VAT-aware reporting (no VAT invoice has ever been
 *             issued: never say "VAT invoicing" or imply tax filing);
 *             AI manager avatars (the handoff opens a SEPARATE thread — it is
 *             not a live takeover of the AI conversation).
 */

export const ownerDepth = [
  {
    eyebrow: 'Reports',
    title: 'PDFs an owner can forward to their accountant.',
    lede:
      'Not a screenshot of a dashboard. Three real documents, generated from the same records the statement came from.',
    items: [
      ['Financial report', 'Revenue, commission, fees, recoveries and costs for the period, line by line.'],
      ['Performance report', 'Occupancy, rate and channel mix, per property and per month.'],
      ['Annual summary', 'A year in one document, for the conversation an owner has with their accountant each spring.'],
      [
        'In real use',
        'Hundreds of statements with stored PDFs in our own operation. The annual summary is a convenience summary for that conversation — it is not a tax filing or an official tax document.',
      ],
    ],
  },
  {
    eyebrow: 'Accounting',
    title: 'VAT-aware owner reporting, and exports your accountant accepts.',
    lede:
      'Thailand makes the tax treatment of villa income a real question. The portal handles the arithmetic and hands off cleanly — it does not pretend to be your tax agent.',
    items: [
      ['Owner bills captured', 'Supplier bills and proof of payment uploaded against the villa, not emailed around.'],
      ['Tax profiles per owner', 'Different owners are structured differently, and the calculations follow the profile.'],
      ['Accountant exports', 'The ledger and the reports come out in a shape a bookkeeper can work with.'],
      [
        'Precisely what it is not',
        'VAT-aware reporting and an annual summary. Not VAT invoicing, not statutory filing, and not a substitute for an accountant. No VAT invoice has been issued from this system, and we are not going to imply otherwise.',
      ],
    ],
  },
  {
    eyebrow: 'Return',
    title: 'The ROI tracker: what the villa actually returned.',
    lede:
      'Owners do not think in occupancy. They think in what they paid for the villa and what it has given back since.',
    items: [
      ['Their own acquisition numbers', 'Purchase or lease, acquisition date, purchase price, capex and holding costs — entered by the owner.'],
      ['Yield against cost, not against a guess', 'Net income measured against what they actually spent, rather than an agent’s valuation.'],
      ['Private by default', 'It is the owner’s figure. They decide whether the management company sees it.'],
      [
        'Young, and we say so',
        'The feature works and the numbers are real, but only a handful of owners have filled in a profile so far. We are not claiming portfolio-wide adoption, appraised valuations or return forecasts.',
      ],
    ],
  },
  {
    eyebrow: 'The concierge',
    title: 'An assistant in your manager’s voice — and one tap to the manager.',
    lede:
      'Each villa has an assigned manager. The assistant answers in that person’s persona, using the owner’s own portal records, and it never pretends to be the person.',
    items: [
      ['Tied to a real manager', 'Every conversation carries the persona of the human who actually looks after that villa.'],
      ['Answers from the owner’s data', 'Their statements, reservations, tasks and documents — nobody else’s.'],
      [
        'The human is one tap away',
        'Talk to the real person opens a Messages thread with the team. It is a handoff to a separate thread, not a live takeover of the AI conversation — the manager does not appear inside the chat you were already having.',
      ],
      [
        'The AI can be paused',
        'While a manager is handling an issue, the assistant stands down rather than talking over them.',
      ],
    ],
  },
];
