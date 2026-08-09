import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { SectionHead, Eyebrow } from '../components/ui.jsx';

const PLANNED = [
  ['Owner relations', 'Building an owner portal that owners actually open', '8 min'],
  ['Operations', 'Replacing three WhatsApp groups with one task board', '6 min'],
  ['Finance', 'VAT-clean owner statements in Thailand: what belongs on the line', '10 min'],
  ['Field', 'Why the staff app had to be trilingual before anything else worked', '5 min'],
  ['Guest revenue', 'What a priced add-on list in a guest’s pocket actually converts', '7 min'],
  ['Onboarding', 'Onboarding a villa: the checklist we run before the first booking', '7 min'],
];

export default function Blog() {
  useSeo({
    title: 'Field notes — operations writing from a working villa company',
    description:
      'Notes on villa operations, owner reporting, Thai compliance and the software decisions behind HostPilot Pro. Not published yet — here is what is being written.',
    path: '/blog',
  });
  return (
    <div>
      <section className="border-b border-hp-lineSoft">
        <div className="shell pb-14 pt-28 sm:pt-32">
          <Eyebrow>Field notes</Eyebrow>
          <h1 className="h-sec mt-4 max-w-[24ch] font-medium">
            Operations writing, <span className="serif-em text-hp-text2">from inside the work.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-hp-text2">
            Nothing is published here yet, and we would rather say that than fill the page with generated filler. These
            are the six pieces being written, in order. Each one is about a decision that cost us something to learn.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="shell">
          <div className="reveal mb-8 flex items-center gap-2.5 rounded-xl border border-hp-gold/25 bg-[color:var(--hp-gold-wash)] px-4 py-3 text-[14.5px] text-hp-text2">
            <Clock size={15} className="text-hp-goldInk" />
            First piece scheduled for publication. Ask on a call if you want it emailed when it lands.
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {PLANNED.map(([tag, title, read]) => (
              <li key={title} className="reveal hp-card-flat p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="chip">{tag}</span>
                  <span className="text-[12.5px] text-hp-text3">{read}</span>
                </div>
                <div className="mt-4 font-display text-[19px] leading-snug text-hp-text2">{title}</div>
                <div className="mt-3 text-[13px] uppercase tracking-[0.14em] text-hp-text3">In draft</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band py-16 sm:py-20">
        <div className="shell max-w-3xl">
          <SectionHead
            eyebrow="Meanwhile"
            title="The product says more than the blog would."
            lede="If you came here to work out whether the people behind this understand villa operations, the tour will answer it faster than an article."
          />
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/tour" className="btn btn-gold">
              Open the live tour <ArrowRight size={15} />
            </Link>
            <Link to="/about" className="btn btn-quiet">
              How the product got built
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
