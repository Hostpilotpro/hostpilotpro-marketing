import { Link, useSearchParams } from 'react-router-dom';
import { Download, ArrowRight, FileText } from 'lucide-react';
import { audiences } from '../data/audiences.js';
import { sales } from '../data/sales.js';
import { Eyebrow } from '../components/ui.jsx';
import asset from '../lib/asset.js';
import useSeo from '../lib/seo.js';
import InteractiveTour from './InteractiveTour.jsx';

function WalkthroughLibrary() {
  useSeo({title:'HostPilot Pro | PDF sales walkthroughs', description:'Concise walkthroughs for property management companies, owners and guests. Understand the core functions without a screen-by-screen manual.',path:'/tour'});
  return <div className="pt-16">
    <section className="shell-wide py-12 sm:py-16"><Eyebrow>PDF walkthroughs</Eyebrow><h1 className="h-sec mt-4 max-w-3xl">The core functions.<br /><span className="serif-em text-hp-text2">The reason to use them.</span></h1><p className="max-w-3xl mt-5 text-[18px] leading-relaxed text-hp-text2">Three short sales guides, each written for a different perspective. Selected screens explain the product; the rest focuses on what the software helps you do.</p>
    <div className="grid gap-5 lg:grid-cols-3 mt-10">{audiences.map((a,i)=><article className="hp-card p-6 flex flex-col" key={a.key}><div className="flex items-center justify-between text-hp-goldInk"><FileText size={24} /><span className="text-[13px]">0{i+1} / PDF</span></div><p className="eyebrow mt-6">{a.label}</p><h2 className="font-display text-[28px] mt-3">{a.product}</h2><p className="text-[15px] text-hp-text2 leading-relaxed mt-4 flex-1">{sales[a.key].promise}</p><p className="text-[13px] text-hp-text3 mt-4">6 pages · Core functions · Selected visuals</p><a href={asset(sales[a.key].pdf)} target="_blank" rel="noreferrer" className="btn btn-gold mt-6">Read the PDF <ArrowRight size={15} /></a><a href={asset(sales[a.key].pdf)} download className="flex items-center justify-center gap-2 text-[14px] mt-4 text-hp-goldInk"><Download size={14} /> Download</a><Link to={a.to} className="text-center text-[13px] text-hp-text3 underline mt-5">Explore this audience on the website</Link></article>)}</div>
    </section>
    <section className="band py-12"><div className="shell-wide grid gap-8 md:grid-cols-2"><div><Eyebrow>How to read these guides</Eyebrow><h2 className="font-display text-[28px] mt-3">A product introduction, not a staff manual.</h2><p className="mt-4 text-[16px] text-hp-text2 leading-relaxed">The owner guide draws on the MPS client example. Operations and guest guides explain the core software use cases. MPS-specific terms and prices are not presented as universal product rules.</p></div><div><Eyebrow>Prefer to explore?</Eyebrow><p className="mt-4 text-[16px] text-hp-text2 leading-relaxed">The optional interactive replicas use fictional data and include illustrative screens. They are separate from MPS’s live operation and are not a guarantee that every view is ready for every deployment.</p><div className="mt-5 flex flex-wrap gap-4">{audiences.map((a)=><Link key={a.key} className="text-[14px] text-hp-goldInk underline underline-offset-4" to={`/tour?surface=${a.key}`}>{a.product} demo</Link>)}</div></div></div></section>
  </div>;
}

export default function Tour() {
  const [params] = useSearchParams();
  return params.has('surface') ? <InteractiveTour /> : <WalkthroughLibrary />;
}
