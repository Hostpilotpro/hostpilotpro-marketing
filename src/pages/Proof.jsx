import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { SectionHead, Eyebrow } from '../components/ui.jsx';

const claims = [
  [
    'See working software and clearly labelled demonstrations.',
    'The Ops tour shows actual anonymised screenshots. Owner, Guest and Field use fictional records to demonstrate selected interactions. A tour is a starting point; your required live workflows are reviewed before rollout.',
    '/tour',
    'Check it in the tour',
  ],
  [
    'It is built by an operator who runs villas.',
    'Mr Property Siam is a villa management company on Koh Samui. Ask on a call to see the live system on real records, including the parts that are still rough.',
    '/about',
    'Read how it was built',
  ],
  [
    'The owner statement reconciles.',
    'The demo statement is arithmetically closed: ฿369,200 − ฿41,800 − ฿58,932 − ฿14,600 − ฿9,800 − ฿3,450 − ฿5,834 + ฿11,240 = ฿246,024. Expand any line in the tour to see what it is.',
    '/tour?surface=owner',
    'Expand the statement',
  ],
  [
    'You will not be charged a percentage of bookings.',
    'The five commitments on the pricing page are published so they can be held against us in writing.',
    '/pricing',
    'See the commitments',
  ],
];

const reviewPoints = [
  ['Your booking connection', 'Hostaway is the current operating connection. Guesty and Lodgify adapters are planned and require testing before availability.'],
  ['Your financial workflow', 'Ask to see the source records, statement review and publication steps for the workflows your company needs. Demo arithmetic alone does not verify your accounting setup.'],
  ['Your country and team', 'Confirm local documents, supported payment workflows, languages and team access during rollout. Thailand examples do not establish support for another country.'],
];

export default function Proof() {
  useSeo({
    title: 'Proof — what we claim and how you can check it',
    description:
      'Inspect actual Ops screenshots, fictional portal demonstrations and the workflows to review for your own business before rollout.',
    path: '/proof',
  });
  return (
    <div className="cinematic-product-page replica-dark proof-launch-page">
      <section className="relative overflow-hidden border-b border-hp-lineSoft">
        <div className="grain absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_-20%,var(--hp-gold-tint),transparent_60%)]" />
        <div className="shell relative pb-14 pt-28 sm:pt-32">
          <Eyebrow>Proof</Eyebrow>
          <h1 className="sales-page-title mt-4 max-w-[26ch]">
            See the work.<br /><span className="serif-em">Check the details.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-hp-text2">
            Explore the real Ops interface, try the sample portals and bring your own requirements to the conversation.
            We show which screens come from the current operation and which experiences use fictional records.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="shell">
          <SectionHead eyebrow="Claims" title="Four claims, four ways to check them." />
          <div className="mt-9 grid gap-3">
            {claims.map(([c, how, to, cta]) => (
              <div key={c} className="reveal hp-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <div className="font-display text-[19px] text-hp-text">{c}</div>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-hp-text2">{how}</p>
                </div>
                <Link to={to} className="btn btn-quiet shrink-0 !text-[14px]">
                  {cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band py-16 sm:py-20">
        <div className="shell">
          <SectionHead
            eyebrow="Before your rollout"
            title="Make the demonstration relevant to you."
            lede="A useful product review follows your business. These are the details to confirm together."
          />
          <div className="mt-9 grid gap-3 md:grid-cols-2">
            {reviewPoints.map(([title, detail]) => (
              <div key={title} className="reveal hp-card p-6">
                <div className="font-display text-[18px] leading-snug text-hp-text">{title}</div>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-hp-text2">{detail}</p>
              </div>
            ))}
          </div>
          <p className="reveal mt-7 max-w-2xl text-[14px] text-hp-text3">
            Camera and smart-device views are illustrative proposed connections. They are separate from the live
            operational workflows we can demonstrate.
          </p>
        </div>
      </section>

      <section className="py-16 text-center sm:py-20">
        <div className="shell">
          <h2 className="h-sub font-display">The tour is the testimonial.</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/tour" className="btn btn-gold">
              Open the live tour
            </Link>
            <Link to="/demo" className="btn btn-quiet">
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
