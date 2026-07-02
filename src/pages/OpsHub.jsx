import ProductPage from '../components/ProductPage.jsx';

export default function OpsHub() {
  return (
    <ProductPage
      eyebrow="HostPilot Ops · Operations Hub"
      title="The console your"
      italic="team lives in."
      subhead="Reservations, tasks, statements, payroll, bills, sub-management ledgers, prospects, TM30, company P&L — every process an ops team touches, in one place. Syncs with Hostaway."
      mockVariant="ops"
      audienceLabel="What the ops team gets"
      features={[
        'Hostaway sync — reservations, guests, listings, live',
        'Reservation ops — arrivals, departures, exceptions',
        'Task management — housekeeping, maintenance, inspections',
        'Payroll & commissions — per team member, per stay',
        'Bill scanner — AI parses supplier invoices to the ledger',
        'Statements & payouts — owner-side, generated monthly',
        'Sub-management ledgers — third-party villa accounting',
        'Prospects pipeline — owner leads with stage tracking',
        'Onboarding reviews — property intake, room by room',
        'Property inventory admin — synced with owner portal',
        'Guest review sync — 4,700+ from Airbnb, Booking, VRBO',
        'TM30 registry — Thai immigration filings, automated',
        'Company P&L — real numbers, not month-end guesses',
      ]}
      gallery={[
        { variant: 'ops',   caption: 'Reservation ops — today, tomorrow, exceptions' },
        { variant: 'owner', caption: 'Statement generator — one click per owner' },
      ]}
    />
  );
}
