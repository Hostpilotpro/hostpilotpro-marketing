import useSeo from '../lib/seo.js';
import ProductPage from '../components/ProductPage.jsx';
import GuestApp from '../tour/GuestApp.jsx';

export default function Guest() {
  useSeo({
    title: 'HostPilot Guest — the stay app that sells add-ons while you sleep',
    description:
      'Door code, Wi-Fi, arrival status and a paid add-on list in the guest’s pocket. Transfers, chefs, charters and massage booked without a WhatsApp thread.',
    path: '/guest',
  });
  return (
    <ProductPage
      eyebrow="HostPilot Guest"
      title={
        <>
          The stay app that sells things <span className="serif-em text-hp-text2">while you sleep.</span>
        </>
      }
      lede="Guests ask the same eleven questions on every stay, and they ask them at midnight. Answer them once, in a link they already have, and the same screen can sell an airport transfer, a chef and a boat day without anyone typing a reply."
      bullets={[
        'Arrival countdown, door code and Wi-Fi released on the morning of check-in',
        'Verification status visible to the guest — passports, TM30 filed',
        'House manual, directions and villa rules in one place',
        'Paid add-on catalogue with a running total',
        'Everything the guest books appears instantly in the ops task board',
        'No app store download — it opens from a link',
      ]}
      replica={<GuestApp />}
      replicaKind="phone"
      host="stay.hostpilotpro.com"
      sections={[
        {
          eyebrow: 'The commercial case',
          title: '฿24,950 on one seven-night stay.',
          lede:
            'That figure is from the demo portfolio, not a customer average — we will not publish an uplift percentage we cannot show you on screen. But the mechanism is plain: a priced list in a guest’s pocket converts better than the same list inside an email they read on the plane.',
          items: [
            ['Add-ons priced and visible', 'Transfer ฿1,400 · chef ฿4,800 an evening · charter ฿18,500 · massage ฿1,200 an hour.'],
            ['One tap, no negotiation', 'The guest adds it; the office sees a task and a charge, not a message to answer.'],
            ['Charged to the villa account', 'Settled at checkout rather than chased in cash.'],
            ['Concierge margin is yours', 'The catalogue, the suppliers and the markup are set by you, per villa.'],
          ],
        },
        {
          eyebrow: 'Arrival',
          title: 'The two hours that set the tone.',
          lede:
            'Most bad reviews are written about the first evening — a code that did not work, a gate nobody explained, an aircon remote in Thai.',
          items: [
            ['Timed access', 'Door codes appear when they should and expire when the stay ends.'],
            ['Status, not silence', 'The guest can see that their passports are verified and TM30 has been filed.'],
            ['Directions that survive Samui', 'Pinned location, gate instructions and the manager’s name and number.'],
            ['One thread if they need a human', 'Messages route to whoever is on duty, inside the same system as the tasks.'],
          ],
        },
      ]}
      notFor={[
        'It is not a booking engine — guests arrive with a reservation already made.',
        'It does not take card payments by itself; add-ons are settled through your existing payment flow at checkout.',
        'It is a web app, not a native app. That is deliberate: nobody downloads software for one week.',
      ]}
    />
  );
}
