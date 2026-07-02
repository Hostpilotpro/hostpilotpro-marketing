import ProductPage from '../components/ProductPage.jsx';

export default function GuestPortal() {
  return (
    <ProductPage
      eyebrow="HostPilot Guest · Guest Experience"
      title="The stay your guests"
      italic="actually remember."
      subhead="A branded companion for every reservation — property guides, add-ons, tours, transport, in-stay assistance. Turns silent stays into revenue and reviews."
      mockVariant="guest"
      audienceLabel="What guests experience"
      features={[
        'Personalised welcome — per reservation, per villa, per language',
        'Property guides — wifi, aircon, pool, appliances, quirks',
        'Add-on marketplace — chef, spa, grocery, decoration',
        'Tours & experiences — bookable, upsell-ready',
        'Transport — airport pickup, drivers, boat charters',
        'In-stay assistance — chat routed to the on-call team',
        'Local recommendations — curated by the ops team',
        'Check-in & check-out flow — TM30 & ID capture built in',
        'Review invitation — timed nudge to Airbnb / Booking / VRBO',
        'Feedback capture — before the public review lands',
        'Multi-language — English, Thai, Dutch out of the box',
        'Attribution — every guest-side sale attributed to the villa',
      ]}
      gallery={[
        { variant: 'guest', caption: 'Guest home — villa guide, wifi, add-ons' },
        { variant: 'owner', caption: 'Add-on marketplace — tours, chef, transport' },
      ]}
    />
  );
}
