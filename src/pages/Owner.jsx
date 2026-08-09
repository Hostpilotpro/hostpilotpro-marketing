import useSeo from '../lib/seo.js';
import ProductPage from '../components/ProductPage.jsx';
import OwnerPortal from '../tour/OwnerPortal.jsx';
import { ownerDepth } from './owner-sections.js';
import SmartCatalog from '../components/SmartCatalog.jsx';

export default function Owner() {
  useSeo({
    title: 'HostPilot Owner — the owner portal your owners will actually open',
    description:
      'Monthly statements owners can read line by line, payout history, forward pipeline, rate approvals and an assistant that answers questions from their own numbers.',
    path: '/owner',
  });
  return (
    <ProductPage
      eyebrow="HostPilot Owner"
      title={
        <>
          The owner portal, <span className="serif-em text-hp-text2">and the reason the rest exists.</span>
        </>
      }
      lede="Owners do not churn because occupancy dipped. They churn because a statement did not make sense and nobody could explain it quickly. HostPilot Owner is built around that single problem: every figure an owner sees can be opened until it reaches the invoice, the meter photo or the completed task behind it."
      bullets={[
        'Monthly statements with every line expandable to a plain-English verdict',
        'Payout history, references and the transfer method on the record',
        'Forward booking pipeline and an estimate for the month still open',
        'Rate approvals the owner grants or refuses, with the reasoning attached',
        'Proactive disclosure — maintenance is surfaced before it is asked about',
        'An assistant that answers from the owner’s own data, with a pointer to the source',
        'Financial, performance and annual summary PDFs, downloadable any time',
        'An ROI tracker fed by the owner’s own purchase price and costs',
        'VAT-aware reporting and exports an accountant will accept',
        'A smart-tech catalogue: browse hardware for the villa and request a quote',
      ]}
      replica={<OwnerPortal />}
      replicaTheme="light"
      host="owner.hostpilotpro.com"
      sections={[
        {
          eyebrow: 'The statement',
          title: 'Written to be interrogated.',
          lede:
            'Most owner reports are a PDF export of an accounting screen. This is a document designed for a sceptical reader with a phone in their hand at 11pm in another timezone.',
          items: [
            [
              'Fees charged on net, not gross',
              'The management fee is calculated after channel commission, so the owner is never paying a percentage on money the platform kept. The verdict drawer shows the arithmetic.',
            ],
            [
              'Recoveries land as income',
              'Electricity billed to guests above the included allowance is income to the owner, not to the manager. Meter photos attach to the line.',
            ],
            [
              'Maintenance with proof',
              'Every repair carries an invoice and photos. Anything inside the standing allowance is disclosed rather than hidden; anything above it needs approval first.',
            ],
            [
              'It reconciles',
              'The statement is generated from reservations and task records, not typed. If a number moves, the record it came from moved.',
            ],
          ],
        },
        {
          eyebrow: 'The assistant',
          title: 'A question answered in one paragraph, not a dashboard.',
          lede:
            'The differentiator is not that a chatbot exists. It is that the answer contains real figures, a causal explanation, a disclosure the owner did not ask for, and a pointer to where to check it.',
          items: [
            ['Reads the owner’s own records', 'Statements, reservations, tasks and documents for their villas only.'],
            ['Explains movement', 'Not “revenue was ฿369,200” but why it was higher than the month before.'],
            ['Volunteers bad news', 'A ฿3,450 pump seal gets mentioned even though nobody asked.'],
            ['Always cites', 'Every answer ends with where to verify it inside the portal.'],
          ],
        },
        {
          eyebrow: 'Rate approvals',
          title: 'Dynamic pricing owners consent to.',
          lede:
            'Automated rate changes are the fastest way to lose an owner’s trust. HostPilot asks, shows the comparable set, and records the decision.',
          items: [
            ['Approve, cap or decline', 'A cap lets an owner say yes to upward moves only up to a ceiling they set.'],
            ['Reasoning attached', 'Comparable villas, nights already sold and the event driving the window.'],
            ['An audit trail', 'Six months later, both sides can see who agreed to what and when.'],
          ],
        },
        ...ownerDepth,
      ]}
      extra={<SmartCatalog />}
      roadmapIds={['trust', 'devices']}
      notFor={[
        'It is not trust accounting certified to any particular jurisdiction — statements are operational, and your accountant still files.',
        'Owners cannot block a confirmed booking from the portal. Calendar control stays with the office.',
        'We do not pay owners from inside the product. Payouts are recorded here and sent by your bank or Wise.',
        'The annual tax summary is a convenience document for your accountant. It is not a VAT invoice and not a tax filing.',
        'Smart systems are shown as designed. Device connections are in pilot — cameras, locks and meters are installed at villas today, but live portal status is not switched on for every property yet.',
        '“Talk to the real person” opens a separate message thread with the team. A human does not take over the AI conversation you were in.',
      ]}
    />
  );
}
