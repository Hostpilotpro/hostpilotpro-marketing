/**
 * The stack a boutique villa operator assembles today, and what it costs.
 *
 * HONESTY RULE (messaging-v2 §3): only figures published on the vendor's own
 * page may appear here, each one linked and dated. Where a vendor does not
 * publish a price, this file says so — it never estimates one.
 *
 * Checked: 9 August 2026.
 */

export const PRICES_CHECKED = '9 August 2026';

export const stack = [
  {
    job: 'Channel manager and synced inbox',
    example: 'Hostaway, Guesty',
    cost: 'Hostaway publishes no price at all. Guesty starts from $9 per listing per month — and only on its smallest tier.',
    links: [
      { label: 'Hostaway pricing', href: 'https://www.hostaway.com/pricing' },
      { label: 'Guesty pricing', href: 'https://www.guesty.com/pricing/' },
    ],
    keep: true,
  },
  {
    job: 'Housekeeping and field operations',
    example: 'Breezeway',
    cost: 'No public price — gated behind a sales call.',
    links: [{ label: 'Breezeway', href: 'https://www.breezeway.io/' }],
  },
  {
    job: 'Dynamic pricing',
    example: 'Wheelhouse',
    cost: '$19.99 per listing per month, falling to $16.99 between 10 and 49 listings.',
    links: [{ label: 'Wheelhouse pricing', href: 'https://www.usewheelhouse.com/pricing' }],
  },
  {
    job: 'Owner statements and trust accounting',
    example: 'Usually a spreadsheet',
    cost: 'No licence fee. It costs days of somebody senior every month instead, and it is the thing owners judge you on.',
    links: [],
  },
  {
    job: 'Guest experience app',
    example: 'A separate vendor',
    cost: 'Priced separately, usually per property per month. Another login for your team and another bill.',
    links: [],
  },
  {
    job: 'Tours, activities and transfers',
    example: 'An agency, or a spreadsheet of taxi rates',
    cost: 'Either you give the margin away to a local agency, or you run it on messages and a price list nobody trusts.',
    links: [],
  },
  {
    job: 'Accounting bolt-ons',
    example: 'A separate vendor',
    cost: 'Bought per module — owner billing, VAT handling, exports — on top of the accounting package itself.',
    links: [],
  },
  {
    job: 'Team chat',
    example: 'A separate vendor',
    cost: 'Free until you need history, roles and retention. Then it is per seat, for every cleaner you onboard.',
    links: [],
  },
];

/** What lands on the card instead. */
export const collapsed = [
  {
    line: 'Your channel manager',
    note: 'Unchanged. Keep the contract, keep the connections, keep the inbox. Nothing to migrate.',
  },
  {
    line: 'HostPilot Pro',
    note: 'Owner portal, ops console, guest app, field app, rate recommendations, ledgers and statements, owner reporting, tours and transfers, smart-tech catalogue.',
  },
];
