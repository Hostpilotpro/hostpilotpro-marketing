import useSeo from '../lib/seo.js';
import ProductPage from '../components/ProductPage.jsx';
import FieldApp from '../tour/FieldApp.jsx';

export default function Field() {
  useSeo({
    title: 'HostPilot Field — the staff mobile app for cleaners, pool techs and drivers',
    description:
      'Clock in, claim jobs, log work already done, photograph a receipt, check pay. Built for a phone held in one hand outdoors, in English, Thai or Burmese.',
    path: '/field',
  });
  return (
    <ProductPage
      eyebrow="HostPilot Field"
      title={
        <>
          The app your cleaners and pool techs <span className="serif-em text-hp-text2">actually open.</span>
        </>
      }
      lede="Operations software fails in the field, not in the office. If the housekeeping lead cannot clock in, find her four jobs and close them with photos while standing in a driveway, none of the data upstream is real. Field is nine tiles, large type, three languages and nothing else."
      bullets={[
        'Clock in and out, with hours visible to the person working them',
        'My jobs — today’s list, claimable if unassigned',
        'Log work already finished, for the jobs that happen off-plan',
        'Ins and outs for the day across the portfolio',
        'My pay: salary, overtime and bonus, no asking the office',
        'Team chat, AI help and a receipt scanner that files to finance',
      ]}
      replica={<FieldApp />}
      replicaKind="phone"
      replicaTheme="light"
      host="field.hostpilotpro.com"
      replicaCaption="Sample portfolio — Nalin P. is a fictional staff member at the fictional Azure Coast Villas. Field ships in the product’s light theme because it is used outdoors in direct sunlight."
      sections={[
        {
          eyebrow: 'Language',
          title: 'English, Thai and Burmese — because that is who does the work.',
          lede:
            'On Samui a housekeeping team is commonly Thai and Burmese. An English-only ops app quietly forces a supervisor to become a translation layer, and the data degrades every time.',
          items: [
            ['One tap re-labels everything', 'Not a settings page buried three levels down — a chip in the header.'],
            ['Per-person, not per-company', 'Each staff member keeps their own language; the office still reads English.'],
            ['Job titles too', 'Task names and departments are translated, not just the chrome.'],
            ['Try it in the tour', 'Tap the language chip on the demo phone and watch the nine tiles change.'],
          ],
        },
        {
          eyebrow: 'Trust',
          title: 'Staff can see their own numbers.',
          lede:
            'Pay disputes eat a manager’s week. Giving the person doing the work visibility of their own hours, jobs and pay removes most of them before they start.',
          items: [
            ['Hours as recorded', 'Clock-ins are the source for payroll inputs — the same record both sides look at.'],
            ['Jobs completed this month', 'Bonus schemes stop being an argument when the count is visible.'],
            ['Receipts photographed on the spot', 'No envelope of paper arriving at the office on Friday.'],
            ['Built for one hand outdoors', 'Large tiles, high contrast, works on an old Android on 4G.'],
          ],
        },
      ]}
      notFor={[
        'It is not a scheduling optimiser. Humans assign work; the app makes assignment visible and closable.',
        'Offline support is partial — jobs load and photos queue, but a first login needs a connection.',
        'It is not a payroll system. It produces the inputs your payroll process consumes.',
      ]}
    />
  );
}
