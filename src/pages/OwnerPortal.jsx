import ProductPage from '../components/ProductPage.jsx';

export default function OwnerPortal() {
  return (
    <ProductPage
      eyebrow="HostPilot Owner · Owner Portal"
      title="The portal your owners"
      italic="actually open."
      subhead="Villa owners see earnings, statements, inspections, reviews, marketing, inventory, and guest messaging — all connected, all live. The end of monthly PDFs and WhatsApp screenshots."
      mockVariant="owner"
      audienceLabel="What owners see"
      features={[
        'Owner earnings statements — monthly, VAT-clean, exportable',
        'Payouts calendar — never guess when the money moves',
        'Guest bookings with revenue projection',
        'Villa marketing boost — Spark, Glow, Beam, Always-On',
        'Inspections — owners schedule their own villa visits',
        'Inventory — AI photo scan generates the list',
        'Guest reviews — AI strengths & weaknesses summary',
        'Maintenance log — every fix, every date, every cost',
        'Feedback channel to management, in-app',
        'WhatsApp & email preferences per owner',
        'Documents vault — contracts, tax forms, agreements',
        'Service credits — top-ups and balance visibility',
      ]}
      gallery={[
        { variant: 'owner', caption: 'Owner dashboard — earnings, occupancy, next payout' },
        { variant: 'guest', caption: 'Villa detail — reviews, gallery, marketing status' },
      ]}
    />
  );
}
