import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import useSeo from '../lib/seo.js';
import asset from '../lib/asset.js';
import AudienceExplorer from '../components/AudienceExplorer.jsx';
import { Eyebrow } from '../components/ui.jsx';

export default function Home() {
  useSeo({title:'HostPilot Pro | Property management, owner and guest software',description:'One connected operation. Discover HostPilot Pro for property management companies, owners and guests. Core functions, concise PDF walkthroughs and the Mr Property Siam client showcase.',path:'/'});
  return <div>
    <section className="relative overflow-hidden">
      <img src={asset('/img/samui-coast.jpg')} alt="" className="hero-img absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 hero-scrim" /><div className="grain absolute inset-0" />
      <div className="shell-wide relative pb-12 pt-28 sm:pb-16 sm:pt-36">
        <Eyebrow>Property management software, built from the operation</Eyebrow>
        <h1 className="h-hero mt-6 max-w-[19ch] font-medium">One connected operation.<br /><span className="serif-em">A better view for everyone.</span></h1>
        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-hp-text2">The workspace for your management company. The visibility your owners need. The experience your guests remember. HostPilot Pro brings them together, alongside your existing channel manager.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a className="btn btn-gold" href="#discover">Discover your view <ArrowRight size={16} /></a><Link className="btn btn-quiet" to="/tour"><FileText size={16} /> Read the PDF walkthroughs</Link></div>
        <p className="mt-5 text-[13px] text-hp-text3">Hostaway integration today · Mr Property Siam, founding client</p>
      </div>
    </section>
    <AudienceExplorer />
    <section className="band py-12 sm:py-20">
      <div className="shell-wide grid gap-10 lg:grid-cols-2 lg:items-center">
        <div><Eyebrow>The client showcase</Eyebrow><h2 className="h-sec mt-4">HostPilot Pro is the software.<br /><span className="serif-em text-hp-text2">Mr Property Siam puts it to work.</span></h2><p className="mt-5 text-[17px] leading-relaxed text-hp-text2">MPS runs a property management business on Koh Samui. Its office, owner portal and guest experience show how these three perspectives fit into one real operation.</p><p className="mt-4 text-[15px] leading-relaxed text-hp-text3">Built by the operator using it. Presented here as the founding client example, not an independent testimonial or a made-up performance claim.</p><Link to="/proof" className="btn btn-quiet mt-7">Explore the MPS showcase <ArrowRight size={15} /></Link></div>
        <div className="connection-story"><div className="eyebrow">HostPilot Pro</div><h3 className="font-display text-[30px] mt-3">The right view.<br />For the right person.</h3>{[['Management company','Coordinate the work and keep control.'],['Owner','Understand the property and the numbers.'],['Guest','Find the information and services for the stay.']].map(([t,b],i)=><div className="connection-row" key={t}><span>0{i+1}</span><div><h4>{t}</h4><p>{b}</p></div></div>)}<div className="mt-6 text-[13px] text-hp-text3">Client deployment shown: Mr Property Siam</div></div>
      </div>
    </section>
    <section className="shell-wide py-12 sm:py-16 grid gap-8 md:grid-cols-2">
      <div><Eyebrow>Keep the channel manager</Eyebrow><h2 className="h-sec mt-3">Focus on what happens<br /><span className="serif-em text-hp-text2">after the booking.</span></h2></div>
      <div><p className="text-[17px] leading-relaxed text-hp-text2">HostPilot Pro is not a promise to replace every system. It brings the operational work, owner visibility and guest experience together. Hostaway is the current integration; discuss your stack with us before planning a switch.</p><Link to="/pricing" className="inline-flex items-center gap-2 text-hp-goldInk mt-5">How pricing works <ArrowRight size={15} /></Link></div>
    </section>
    <section className="band py-12 sm:py-16"><div className="shell-wide flex flex-wrap items-center justify-between gap-8"><div><Eyebrow>Your operation, next</Eyebrow><h2 className="h-sec mt-3">See whether it fits your business.</h2><p className="text-hp-text2 mt-4">Bring your portfolio, current tools and the problems you want to solve.</p></div><Link to="/demo" className="btn btn-gold">Book a call <ArrowRight size={16} /></Link></div></section>
  </div>;
}
