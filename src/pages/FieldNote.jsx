import { Link, useParams } from 'react-router-dom';
import { fieldNotes } from '../content/field-notes.js';
import useSeo from '../lib/seo.js';
import NotFound from './NotFound.jsx';

function Article({ note }) {
  useSeo({title:note.title, description:note.description, path:'/blog/'+note.slug});
  return <article className="cinematic-product-page replica-dark">
    <header className="shell max-w-4xl pb-12 pt-28 sm:pt-32">
      <Link to="/blog" className="inline-flex min-h-11 items-center text-hp-goldInk underline underline-offset-4">Field notes</Link>
      <p className="eyebrow mt-6">{note.tag}</p>
      <h1 className="sales-page-title mt-4">{note.title}</h1>
      <p className="mt-6 text-[17px] leading-relaxed text-hp-text2">{note.intro}</p>
    </header>
    <div className="shell max-w-4xl pb-16">
      {note.sections.map(([title,copy])=><section key={title} className="border-t border-hp-lineSoft py-8">
        <h2 className="font-display text-2xl text-hp-text">{title}</h2>
        <p className="mt-4 text-[16px] leading-[1.85] text-hp-text2">{copy}</p>
      </section>)}
      <nav aria-label="Related product guidance" className="flex flex-wrap gap-4 border-t border-hp-lineSoft pt-8">
        {note.related.map(([to,label])=><Link key={to} to={to} className="btn btn-quiet min-h-11">{label}</Link>)}
      </nav>
      <p className="mt-8 text-sm leading-relaxed text-hp-text3">Published 30 October 2026 by the HostPilot Pro team. Product guidance; no customer performance results are claimed.</p>
    </div>
  </article>;
}
export default function FieldNote() {
  const {slug}=useParams();
  const note=fieldNotes.find(row=>row.slug===slug);
  return note?<Article note={note}/>:<NotFound/>;
}
