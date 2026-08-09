import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { SectionHead, Eyebrow } from '../components/ui.jsx';

const claims = [
  [
    'The product is real and complete enough to use.',
    'Open the tour. Four surfaces, working interactions, real interface code. If a screen looked good but did nothing, you would find out in about ten seconds.',
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
    '/tour',
    'Expand the statement',
  ],
  [
    'You will not be charged a percentage of bookings.',
    'The five commitments on the pricing page are published so they can be held against us in writing.',
    '/pricing',
    'See the commitments',
  ],
];

const research = [
  {
    finding: 'Not one of eight major vendors offers a self-serve interactive demo.',
    detail:
      'Guesty, Hostaway, Lodgify, Hostfully, Uplisting, Smoobu, Breezeway and Wheelhouse all gate real product exposure behind a sales call or a trial signup.',
    links: [
      ['Guesty', 'https://www.guesty.com/'],
      ['Hostaway', 'https://www.hostaway.com/'],
      ['Hostfully', 'https://www.hostfully.com/'],
      ['Breezeway', 'https://www.breezeway.io/'],
    ],
  },
  {
    finding: 'Owner-portal-first positioning is open ground in the small-to-mid segment.',
    detail:
      'Every mainstream vendor leads with channel management, AI or breadth. The only vendor found leading with owner trust and financial transparency is Track Hospitality, an enterprise-tier platform.',
    links: [['Track Hospitality', 'https://trackhospitality.com/']],
  },
  {
    finding: 'Pricing opacity is one of the most-cited complaints in the category.',
    detail:
      'Hostaway and Hostfully publish no pricing at all. Guesty publishes only its 1–3 listing Lite tier, from $9 per listing per month, with Pro and Enterprise quote-gated.',
    links: [
      ['Hostaway pricing', 'https://www.hostaway.com/pricing'],
      ['Guesty pricing', 'https://www.guesty.com/pricing/'],
    ],
  },
  {
    finding: 'Support quality is the single most consistent complaint across vendors.',
    detail:
      'Slow responses, bot-first support and unanswered tickets recur across G2 and Capterra reviews for Guesty, Hostaway, Hostfully, Uplisting, Smoobu and Wheelhouse.',
    links: [
      ['Guesty on G2', 'https://www.g2.com/products/guesty/reviews'],
      ['Guesty on Capterra', 'https://www.capterra.com/p/159377/Guesty/reviews/'],
    ],
  },
];

export default function Proof() {
  useSeo({
    title: 'Proof — what we claim and how you can check it',
    description:
      'No testimonials we cannot evidence and no review scores we have not earned. Every claim HostPilot Pro makes, with the place you can verify it, plus the competitor research behind our positioning.',
    path: '/proof',
  });
  return (
    <div>
      <section className="relative overflow-hidden border-b border-hp-lineSoft">
        <div className="grain absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_-20%,rgba(227,200,155,0.12),transparent_60%)]" />
        <div className="shell relative pb-14 pt-28 sm:pt-32">
          <Eyebrow>Proof</Eyebrow>
          <h1 className="h-sec mt-4 max-w-[26ch] font-medium">
            No stars, no logos, <span className="serif-em text-hp-text2">no numbers we cannot show you.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-hp-text2">
            This page used to hold testimonials. They have been removed, because we cannot evidence them to the
            standard a sceptical property manager should demand. What is left is every claim the site makes and the
            exact place you can check it.
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
            eyebrow="The research behind the positioning"
            title="Why we lead with the owner portal."
            lede="These are findings from a review of eight vendors’ marketing sites, pricing pages and public reviews. Each is linked so you can disagree with us using the same sources."
          />
          <div className="mt-9 grid gap-3 md:grid-cols-2">
            {research.map((r) => (
              <div key={r.finding} className="reveal hp-card p-6">
                <div className="font-display text-[18px] leading-snug text-hp-text">{r.finding}</div>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-hp-text2">{r.detail}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.links.map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chip !text-[12px] transition hover:border-hp-gold/50 hover:text-hp-gold"
                    >
                      {label} <ExternalLink size={11} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="reveal mt-7 max-w-2xl text-[14px] text-hp-text3">
            Vendor pricing and review scores change. These reflect what those pages showed when we read them; check
            the links before quoting them back to us.
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
