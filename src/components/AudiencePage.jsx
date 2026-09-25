import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, Download, Check } from 'lucide-react';
import { audienceFor, audiences } from '../data/audiences.js';
import { sales } from '../data/sales.js';
import { Eyebrow } from './ui.jsx';
import Logo from './Logo.jsx';
import asset from '../lib/asset.js';
import useSeo from '../lib/seo.js';

export default function AudiencePage({ audience }) {
  const a = audienceFor(audience);
  const s = sales[a.key];
  useSeo({title:`HostPilot Pro for ${a.label} | ${a.product}`, description:s.intro, path:a.to});
  return (
    <div className="pt-16">
      <section className="shell-wide py-10 sm:py-16">
        <nav aria-label="Product audiences" className="product-audience-links mb-8">
          {audiences.map((item) => <NavLink key={item.key} to={item.to} className={({isActive}) => isActive ? 'is-active' : ''}>{item.label}</NavLink>)}
        </nav>
        <Eyebrow>HostPilot Pro for {a.label.toLowerCase()}</Eyebrow>
        <h1 className="h-sec max-w-4xl mt-4">{s.headline}</h1>
        <p className="mt-6 max-w-3xl text-[18px] leading-relaxed text-hp-text2">{s.intro}</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link to="/demo" className="btn btn-gold">See it for your business <ArrowRight size={16} /></Link>
          <a href={asset(s.pdf)} target="_blank" rel="noreferrer" className="btn btn-quiet"><Download size={16} /> Read the PDF walkthrough</a>
        </div>
      </section>
      <section className="band py-12 sm:py-16">
        <div className="shell-wide">
          <Eyebrow>The core functions</Eyebrow>
          <h2 className="h-sec mt-3 max-w-3xl">What it does.<br /><span className="serif-em text-hp-text2">Why it matters.</span></h2>
          <div className="core-functions mt-8">
            {s.functions.map(([title, body, benefit], i) => <article key={title}>
              <span className="text-[13px] text-hp-goldInk">0{i + 1}</span>
              <div><h3 className="font-display text-[24px]">{title}</h3><p className="mt-2 text-[16px] text-hp-text2 leading-relaxed">{body}</p></div>
              <p className="text-[14px] text-hp-text3 flex gap-2 leading-relaxed"><Check size={16} className="text-hp-goldInk shrink-0 mt-1" />{benefit}</p>
            </article>)}
          </div>
        </div>
      </section>
      <section className="shell-wide py-12 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <div><Eyebrow>A closer look</Eyebrow><h2 className="h-sec mt-3">{a.product},<br /><span className="serif-em text-hp-text2">in context.</span></h2><p className="mt-5 text-[17px] text-hp-text2 leading-relaxed">{s.promise}</p><p className="mt-4 text-[14px] text-hp-text3">One selected view, not a screen-by-screen manual. A guided demonstration can focus on the workflows that matter to your business.</p></div>
          <figure className={`audience-screen audience-screen-${a.key}`}>
            <div className="audience-screen-label"><Logo /><span className="text-hp-goldInk">{a.product}</span></div>
            <img src={asset(s.image)} alt={`${a.product} selected product view`} loading="lazy" />
            <figcaption className="audience-screen-note">{s.caption}</figcaption>
          </figure>
        </div>
      </section>
      <section className="band py-12 sm:py-16">
        <div className="shell-wide grid gap-8 md:grid-cols-2">
          <div><Eyebrow>The client example</Eyebrow><h2 className="h-sec mt-3">Mr Property Siam.</h2><p className="mt-5 text-[16px] text-hp-text2 leading-relaxed">The property management company using HostPilot Pro in its own operation. The software is the product; MPS is the founding client example.</p><Link to="/proof" className="mt-5 inline-flex gap-2 items-center text-hp-goldInk">See the MPS showcase <ArrowRight size={15} /></Link></div>
          <div><Eyebrow>Know the scope</Eyebrow><ul className="space-y-4 mt-5">{s.limits.map((t) => <li className="text-[14px] leading-relaxed text-hp-text2 border-b border-hp-lineSoft pb-4" key={t}>{t}</li>)}</ul></div>
        </div>
      </section>
      <section className="shell-wide py-12 sm:py-16 flex flex-wrap items-center justify-between gap-6">
        <div><h2 className="font-display text-[30px]">See the fit before making the move.</h2><p className="mt-3 text-hp-text2">Read the short sales guide, then bring your own workflows to a call.</p></div>
        <div className="flex flex-wrap gap-3"><a className="btn btn-quiet" href={asset(s.pdf)} download><Download size={15} /> Download the guide</a><Link className="btn btn-gold" to="/demo">Book a call <ArrowRight size={15} /></Link></div>
      </section>
    </div>
  );
}
