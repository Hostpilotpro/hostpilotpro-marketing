import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { audiences } from '../data/audiences.js';
import { Eyebrow } from './ui.jsx';
import asset from '../lib/asset.js';
import { sales } from '../data/sales.js';

export default function AudienceExplorer() {
  const [active, setActive] = useState('ops');
  const a = audiences.find((item) => item.key === active);
  const selectByKey = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % audiences.length;
    if (event.key === 'ArrowLeft') next = (index + audiences.length - 1) % audiences.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = audiences.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActive(audiences[next].key);
    document.getElementById(`audience-tab-${audiences[next].key}`)?.focus();
  };
  return (
    <section id="discover" className="audience-section border-y border-hp-lineSoft py-12 sm:py-20">
      <div className="shell-wide">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><Eyebrow>One platform. Three perspectives.</Eyebrow><h2 className="h-sec mt-3">What does HostPilot Pro do <span className="serif-em text-hp-text2">for you?</span></h2></div>
          <span className="text-[13px] text-hp-text3">Choose your view. See the difference.</span>
        </div>
        <div role="tablist" aria-label="Discover HostPilot Pro by audience" className="audience-tabs mt-8">
          {audiences.map((item, index) => <button key={item.key} role="tab" id={`audience-tab-${item.key}`} aria-controls={`audience-panel-${item.key}`} aria-selected={active === item.key} tabIndex={active === item.key ? 0 : -1} onKeyDown={(e) => selectByKey(e, index)} onClick={() => setActive(item.key)}>
            <span className="audience-number">0{index + 1}</span><span>{item.label}<small>{item.product}</small></span>
          </button>)}
        </div>
        <div role="tabpanel" id={`audience-panel-${a.key}`} aria-labelledby={`audience-tab-${a.key}`} tabIndex={0} className="audience-panel">
          <div className="audience-copy">
            <p className="eyebrow">{a.kicker}</p>
            <h3 className="font-display text-[clamp(1.7rem,2.5vw,2.6rem)] leading-[1.12] mt-4">{a.title}</h3>
            <p className="mt-5 text-[16px] leading-relaxed text-hp-text2">{a.body}</p>
            <ul className="mt-6 space-y-3">{a.outcomes.map((text) => <li key={text} className="flex gap-2 text-[14px] text-hp-text2"><Check size={17} className="shrink-0 text-hp-goldInk" />{text}</li>)}</ul>
            <Link className="btn btn-gold mt-7" to={a.to}>{a.cta}<ArrowRight size={15} /></Link>
            <a className="mt-4 flex items-center gap-2 text-[14px] text-hp-goldInk" href={asset(sales[a.key].pdf)} target="_blank" rel="noreferrer">Read the PDF walkthrough<ArrowRight size={15} /></a>
          </div>
          <Link to={a.to} className={`audience-screen audience-screen-${a.key}`} aria-label={`Explore the ${a.product.toLowerCase()}`}>
            <div className="audience-screen-label"><span>HostPilot Pro <span className="text-hp-text3">/ {a.product}</span></span><span className="text-hp-goldInk">Explore ↗</span></div>
            <img key={a.key} src={asset(sales[a.key].image)} alt={`Selected ${a.product.toLowerCase()} view`} width={a.key === 'guest' ? 430 : 1360} height={a.key === 'guest' ? 850 : 900} loading="lazy" />
            <span className="audience-screen-note">{sales[a.key].caption}</span>
          </Link>
        </div>
        <div className="client-strip">
          <span className="eyebrow">In daily use</span><span className="font-display text-[21px]">Mr Property Siam</span>
          <p>A property management client using HostPilot Pro. Real operation, separate from the fictional demo portfolio.</p>
          <Link to="/proof" className="shrink-0 text-[14px] text-hp-goldInk flex items-center gap-2">Meet the showcase client <ArrowRight size={14} /></Link>
        </div>
      </div>
    </section>
  );
}
