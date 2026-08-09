/**
 * Smart systems — the demo state behind the Owner portal's Smart systems tab.
 *
 * FRAMING IS BINDING: HostPilot Pro does not sell smart tech. It connects the
 * smart tech already installed at a villa to the property, the reservation and
 * the statement. Every string below is written from that position.
 *
 * HONESTY: this is designed-state demo data for Villa Sunset Sapphire, a
 * fictional villa in the Azure Coast Villas sample portfolio. Device
 * connections are in pilot — the single guardrail line lives in the tour's
 * existing "What this demo does not do" panel, not on these cards.
 */

export const smartStatus = {
  connected: 8,
  headline: '8 systems connected · all online · last sync 2 minutes ago',
  attention: 'Water tank 38% — refill scheduled Tuesday',
};

export const cameras = [
  {
    id: 'entrance',
    name: 'Entrance',
    img: 'camera.jpg',
    alt: 'Weatherproof camera covering the entrance path of a Koh Samui pool villa',
    brand: 'Reolink RLC-811A',
    stamp: '09 Aug 2026 · 18:42',
    detail: 'Arrival gate and front door. Motion clips kept 7 days.',
  },
  {
    id: 'terrace',
    name: 'Pool terrace',
    img: 'lighting.jpg',
    alt: 'Lit pool terrace of a villa at dusk',
    brand: 'Reolink RLC-811A',
    stamp: '09 Aug 2026 · 18:42',
    detail: 'Terrace and pool edge. Shared with the owner, never with staff.',
  },
  {
    id: 'driveway',
    name: 'Driveway and gate',
    img: 'gate.jpg',
    alt: 'Automated sliding gate at a villa driveway',
    brand: 'Reolink + gate controller',
    stamp: '09 Aug 2026 · 18:41',
    detail: 'Gate opens are logged against the reservation that triggered them.',
  },
  {
    id: 'carport',
    name: 'Car port',
    img: 'ev-charger.jpg',
    alt: 'EV charger mounted in a villa car port',
    brand: 'Reolink RLC-510A',
    stamp: '09 Aug 2026 · 18:42',
    detail: 'Covers the charger and the parked vehicles.',
  },
];

export const lock = {
  brand: 'Yale keypad lock · main door',
  img: 'lock.png',
  alt: 'Yale keypad lock fitted to the main door of a villa',
  battery: 'Battery 84%',
  note: 'Codes are generated from the booking. No one types a code into a spreadsheet.',
  codes: [
    {
      id: 'guest',
      role: 'Guest code',
      who: 'Tobias Lindqvist · SAPPHIRE-7741',
      code: '4 4 8 1',
      window: 'Valid 9–16 Aug',
      kind: 'guest',
    },
    {
      id: 'housekeeping',
      role: 'Housekeeping code',
      who: 'Nalin P. · housekeeping lead',
      code: '2 0 6 3',
      window: 'Valid daily 09:00–14:00',
      kind: 'staff',
    },
    {
      id: 'owner',
      role: 'Owner code',
      who: 'Alexander Reid',
      code: '7 1 5 9',
      window: 'Permanent',
      kind: 'owner',
    },
  ],
};

export const meter = {
  brand: 'Shelly 3EM · main distribution board',
  img: 'meter.png',
  alt: 'Shelly energy meter installed in a villa distribution board',
  reading: '48,214 kWh',
  stay: { kwh: '312 kWh', thb: '฿2,184', label: "This stay · Tobias Lindqvist, 9–16 Aug" },
  month: { kwh: '1,604 kWh', thb: '฿11,228', label: 'Month to date · August' },
  tariff: 'Billed at ฿7.00 per kWh above the 250 kWh nightly-rate allowance.',
  recovered_thb: '฿11,240',
  statement_line: 'Electricity recovered from guests',
  statement_period: 'July 2026',
};

export const systems = [
  {
    id: 'water',
    name: 'Water tank monitor',
    brand: 'Shelly float sensor',
    img: 'water.png',
    alt: 'Water tank level sensor at a villa',
    state: '38% · 1,900 L remaining',
    sub: 'Refill scheduled Tuesday — task already on the ops board',
    tone: 'warn',
  },
  {
    id: 'leak',
    name: 'Leak sensors',
    brand: 'Aqara · 3 sensors',
    img: 'leak.jpg',
    alt: 'Water leak sensor placed beside villa plumbing',
    state: 'Dry · all 3',
    sub: 'Pump room, kitchen, upstairs bathroom',
    tone: 'pos',
  },
  {
    id: 'smoke',
    name: 'Smoke and CO alarm',
    brand: 'Netatmo',
    img: 'smoke.jpg',
    alt: 'Smoke and carbon monoxide alarm on a villa ceiling',
    state: 'OK · tested 4 Aug',
    sub: 'Monthly test raises a field task automatically',
    tone: 'pos',
  },
  {
    id: 'solar',
    name: 'Solar generation',
    brand: 'Huawei inverter',
    img: 'solar.jpg',
    alt: 'Solar panels on the roof of a Koh Samui villa',
    state: '14.2 kWh generated today',
    sub: 'Offsets the meter reading before guest billing',
    tone: 'pos',
  },
  {
    id: 'ev',
    name: 'EV charger',
    brand: 'Autel MaxiCharger 7 kW',
    img: 'ev-charger.jpg',
    alt: 'EV charger in a villa car port',
    state: 'Idle · last session 7 Aug',
    sub: 'Sessions bill to the stay, not to the owner',
    tone: 'idle',
  },
  {
    id: 'irrigation',
    name: 'Garden irrigation',
    brand: 'Rain Bird controller',
    img: 'irrigation.jpg',
    alt: 'Irrigation sprinkler running in a villa garden',
    state: 'Next cycle 06:00',
    sub: 'Paused automatically while housekeeping is on site',
    tone: 'idle',
  },
];

export default { smartStatus, cameras, lock, meter, systems };
