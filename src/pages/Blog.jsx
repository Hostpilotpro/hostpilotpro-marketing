import { Link } from 'react-router-dom';
import useSeo from '../lib/seo.js';
import { fieldNotes } from '../content/field-notes.js';

export default function Blog() {
  useSeo({title:'Villa operations and owner portal guides',description:'Practical guides to evaluating villa operations software, owner reporting portals and guest changeover workflows from HostPilot Pro.',path:'/blog'});
  return <div className="cinematic-product-page replica-dark">
    <section className="border-b border-hp-lineSoft"><div className="shell pb-14 pt-28 sm:pt-32">
      <p className="eyebrow">Field notes</p>
      <h1 className="sales-page-title mt-4 max-w-[24ch]">Practical guides for villa management teams.</h1>
      <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-hp-text2">Use these checklists to review your operations, owner reporting and field handovers. Explore the product demonstrations alongside the guidance, then confirm your own requirements before rollout.</p>
    </div></section>
    <section className="shell grid gap-5 py-14 md:grid-cols-3" aria-label="Published guides">
      {fieldNotes.map(note=><article key={note.slug} className="hp-card-flat p-6">
        <p className="chip">{note.tag}</p><h2 className="mt-5 font-display text-2xl"><Link to={'/blog/'+note.slug} className="text-hp-text underline-offset-4 hover:underline">{note.title}</Link></h2>
        <p className="mt-4 leading-relaxed text-hp-text2">{note.description}</p>
        <Link className="btn btn-quiet mt-6 min-h-11" to={'/blog/'+note.slug}>Read the guide</Link>
      </article>)}
    </section>
  </div>;
}
