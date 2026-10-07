import { salesSections } from '../data/capabilities.js';
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
      visualHero={{kind: 'guest', image: '/img/hostpilot-guest-phone.webp', width: 1448, height: 1086, alt: 'Illustrative guest using the villa stay app on a smartphone by the pool', notification: 'Airport transfer requested.', note: 'Your villa team reviews and confirms the request.', caption: 'THE VILLA EXPERIENCE. IN THEIR POCKET.', boundary: 'Lifestyle scene and screen are illustrative. Guest service requests need team confirmation; payment methods are enabled and verified during operator setup.'}}
      title={
        <>
          A remarkable stay.<br /><span className="serif-em text-hp-text2">At their fingertips.</span>
        </>
      }
      lede="Arrival details, house essentials and memorable extras, in a link guests can open on their phone. Help them find answers, request services and enjoy more of the stay — while your team keeps the operation connected."
      bullets={[
        'Arrival countdown, plus the door code and Wi-Fi your team set, shown on the morning of check-in',
        'Guest check-in progress and staff-recorded local reporting status',
        'House manual, directions and villa rules in one place',
        'Paid add-on catalogue with a running total',
        'Every add-on a guest requests appears in the ops task board straight away',
        'No app store download — it opens from a link',
        'Tours, activities and transfers, curated per villa by your own team',
        'Transfer prices set per villa, per destination — not one island-wide rate',
      ]}
      replica={<GuestApp />}
      replicaKind="phone"
      replicaTheme="light"
      host="stay.hostpilotpro.com"
      sections={[
        salesSections.guest,
        {
          eyebrow: 'The commercial case',
          title: '฿24,950 on one seven-night stay.',
          lede:
            'That figure is from the demo portfolio, not a customer average — we will not publish an uplift percentage we cannot show you on screen. Guests can browse prices and request services from their stay portal.',
          items: [
            ['Add-ons priced and visible', 'Transfer ฿1,400 · chef ฿4,800 an evening · charter ฿18,500 · massage ฿1,200 an hour.'],
            ['One tap instead of a thread', 'The guest requests it; the office sees a task and a charge to confirm, not a message to interpret.'],
            ['Charged to the villa account', 'Confirmed items are settled through your existing payment flow at checkout rather than chased in cash.'],
            ['Concierge margin is yours', 'The catalogue, the suppliers and the markup are set by you, per villa.'],
          ],
        },
        {
          eyebrow: 'Arrival',
          title: 'The two hours that set the tone.',
          lede:
            'Most bad reviews are written about the first evening — a code that did not work, a gate nobody explained, an aircon remote in Thai.',
          items: [
            ['Access details, timed', 'The code your team set is shown when the stay starts and hidden when it ends. The lock itself is not connected to this system — your team sets the code.'],
            ['Status, not silence', 'Guests can see check-in progress and staff-recorded reporting status. In Thailand, TM30 spreadsheet preparation supports the team’s filing workflow.'],
            ['Directions that survive Samui', 'Pinned location, gate instructions and the manager’s name and number.'],
            ['One thread if they need a human', 'Messages route to whoever is on duty, inside the same system as the tasks.'],
          ],
        },
        {
          eyebrow: 'Siam Discoveries',
          title: 'Tours, activities and transfers — curated per villa.',
          lede:
            'The experiences a guest sees are not a generic island list. Your team maintains the catalogue in the ops console and decides, villa by villa, what appears.',
          items: [
            [
              'A visibility matrix your office controls',
              'A per-villa visibility matrix controls which experiences each guest sees, with overrides for individual properties.',
            ],
            [
              'Transfers priced per villa, per destination',
              'Set transfer prices for each villa and destination, reflecting the route and service your team offers.',
            ],
            [
              'Run by named people',
              'Named editors maintain the experiences, their photography and their pricing. There are orders, sales and insight views behind it, and a commission-rules engine.',
            ],
            [
              'How a request actually completes',
              'A guest requests; your office confirms with the supplier and settles the charge. There is no instant supplier confirmation and no automatic payment confirmation — the last step is a human, on purpose.',
            ],
          ],
        },
      ]}
      roadmapIds={['devices']}
      notFor={[
        'It is not a booking engine — guests arrive with a reservation already made.',
        'Configured Stripe checkout supports card payments; Wise instructions and PromptPay evidence are available where enabled. Payment confirmation follows reconciliation or staff verification.',
        'It is a web app, not a native app. That is deliberate: nobody downloads software for one week.',
        'Add-on and transfer requests are not instantly confirmed with the supplier. Your team closes the loop.',
        'Door codes are issued and communicated by your team. No smart lock is connected to this system today.',
      ]}
    />
  );
}
