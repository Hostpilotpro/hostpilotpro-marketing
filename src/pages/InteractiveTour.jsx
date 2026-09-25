import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, RotateCcw, Info, Play } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { audiences, audienceFor } from '../data/audiences.js';
import { Eyebrow } from '../components/ui.jsx';
import Logo from '../components/Logo.jsx';
import OpsConsole from '../tour/OpsConsole.jsx';
import OwnerPortal from '../tour/OwnerPortal.jsx';
import GuestApp from '../tour/GuestApp.jsx';
import FieldApp from '../tour/FieldApp.jsx';

export default function Tour() {
  const [params, setParams] = useSearchParams();
  const [restart, setRestart] = useState(0);
  const requested = params.get('surface');
  const active = requested === 'field' ? 'field' : audienceFor(requested).key;
  const a = audienceFor(active);
  const rawStep = Number(params.get('step') || 0);
  const step = Number.isInteger(rawStep) && rawStep >= 0 && rawStep < a.steps.length ? rawStep : 0;
  const s = a.steps[step];
  const isField = active === 'field';
  useSeo({
    title: `HostPilot Pro walkthrough | ${isField ? 'Field team' : a.label}`,
    description: 'Choose the property management, owner or guest perspective. Follow a guided, interactive demo using fictional data, with no signup or production access.',
    path: '/tour',
  });
  const choose = (surface, index = 0, replace = false) => setParams({ surface, step: String(index) }, { replace });
  const changeStep = (index) => {
    choose(active, index);
    document.getElementById('walkthrough-stage')?.scrollIntoView({ behavior: 'auto', block: 'start' });
  };
  const onTabKey = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % 3;
    if (event.key === 'ArrowLeft') next = (index + 2) % 3;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = 2;
    if (next === undefined) return;
    event.preventDefault();
    choose(audiences[next].key);
    document.getElementById(`tour-tab-${audiences[next].key}`)?.focus();
  };
  return (
    <div className="pt-16">
      <section className="border-b border-hp-lineSoft">
        <div className="shell-wide py-10 sm:py-14">
          <Eyebrow>The HostPilot Pro walkthrough</Eyebrow>
          <h1 className="h-sec mt-4 max-w-3xl">Three perspectives.<br /><span className="serif-em text-hp-text2">See how the work connects.</span></h1>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
            <p className="max-w-2xl text-[16px] leading-relaxed text-hp-text2">Choose who you are, then follow three short steps or explore the screens yourself. These are interactive replicas, not a connection to Mr Property Siam’s live operation.</p>
            <Link to="/tour" className="btn btn-quiet !text-[14px]">Read the PDF walkthroughs <ArrowRight size={14} /></Link>
          </div>
          <div role="tablist" aria-label="Walkthrough audience" className="audience-tabs mt-8">
            {audiences.map((item, index) => <button role="tab" key={item.key} id={`tour-tab-${item.key}`} aria-selected={!isField && active === item.key} aria-controls="walkthrough-panel" tabIndex={active === item.key || (isField && index === 0) ? 0 : -1} onKeyDown={(e) => onTabKey(e, index)} onClick={() => choose(item.key)}>
              <span className="audience-number">0{index + 1}</span><span>{item.label}<small>{item.product}</small></span>
            </button>)}
          </div>
          <div className="mt-4 flex flex-wrap justify-between gap-2 text-[13px] text-hp-text3">
            <span>Sample portfolio: Azure Coast Villas. Names, stays, amounts and access details are fictional.</span>
            <button onClick={() => choose(isField ? 'ops' : 'field')} className="text-hp-goldInk underline underline-offset-4">{isField ? 'Back to management company tour' : 'Also explore: the field team app'}</button>
          </div>
        </div>
      </section>
      <section id="walkthrough-stage" className="shell-wide py-8 sm:py-12">
        <div id="walkthrough-panel" role={isField ? 'region' : 'tabpanel'} aria-labelledby={isField ? 'field-heading' : `tour-tab-${active}`} className="walkthrough-layout">
          <aside className="walkthrough-guide">
            <Eyebrow>{isField ? 'For the team on the ground' : a.product}</Eyebrow>
            {isField ? <>
              <h2 id="field-heading" className="font-display text-[27px] mt-3">The operation, in their pocket.</h2>
              <p className="mt-4 text-[15px] text-hp-text2">Field staff are part of the management company experience. Try switching languages, opening My jobs and claiming a sample job.</p>
              <button className="btn btn-quiet mt-6" onClick={() => choose('ops')}>Back to operations <ArrowRight size={14} /></button>
            </> : <>
              <div className="mt-4 flex items-center justify-between text-[12px] text-hp-text3"><span>GUIDED WALKTHROUGH</span><span>0{step + 1} / 03</span></div>
              <div className="walkthrough-progress mt-3">{a.steps.map((item, i) => <button key={item.title} aria-label={`Step ${i + 1}: ${item.title}`} aria-current={i === step ? 'step' : undefined} onClick={() => changeStep(i)}><span /></button>)}</div>
              <div aria-live="polite" aria-atomic="true">
                <h2 className="font-display text-[29px] leading-tight mt-5">{s.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-hp-text2">{s.body}</p>
                <p className="mt-5 rounded-xl border border-hp-gold/25 bg-[color:var(--hp-gold-wash)] p-4 text-[14px] text-hp-goldInk">{s.action}</p>
              </div>
              <div className="flex gap-2 mt-6">
                <button className="btn btn-quiet !p-3 disabled:opacity-30" disabled={step === 0} onClick={() => changeStep(step - 1)} aria-label="Previous step"><ArrowLeft size={17} /></button>
                {step < 2 ? <button className="btn btn-gold flex-1" onClick={() => changeStep(step + 1)}>Next step <ArrowRight size={16} /></button> : <Link className="btn btn-gold flex-1" to={a.to}>Explore the benefits <ArrowRight size={16} /></Link>}
              </div>
              <button className="mt-4 flex items-center gap-2 text-[13px] text-hp-text3" onClick={() => { setRestart((n) => n + 1); choose(active, 0); document.getElementById('walkthrough-stage')?.scrollIntoView({ block: 'start' }); }}><RotateCcw size={13} /> Restart walkthrough</button>
            </>}
            <div className="mt-7 border-t border-hp-lineSoft pt-5 text-[13px] leading-relaxed text-hp-text3"><Info size={14} className="mb-2 text-hp-goldInk" />Explore safely. No real messages, bookings, payments or rate changes can be made here. Demo interactions reset when a step or audience changes.</div>
          </aside>
          <div className="min-w-0">
            <div className="tour-brand-bar"><Logo /><span>{isField ? 'Field team' : a.product}<small>INTERACTIVE DEMO · SAMPLE DATA</small></span></div>
            <div className={`tour-demo-stage ${active === 'guest' || isField ? 'tour-demo-phone' : ''}`} key={`${active}-${step}-${restart}`}>
              {active === 'ops' && <OpsConsole initialScreen={s.target} />}
              {active === 'owner' && <OwnerPortal initialScreen={s.target} />}
              {active === 'guest' && <GuestApp focus={s.target} />}
              {isField && <FieldApp />}
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-hp-text3">HostPilot Pro is the software. Azure Coast Villas is the fictional demo company. Mr Property Siam is our real client showcase, not the source of these sample records.</p>
          </div>
        </div>
      </section>
      <section className="shell-wide pb-12">
        <div className="client-strip">
          <div><p className="eyebrow">From demo to real operation</p><h2 className="font-display text-[24px] mt-2">Meet Mr Property Siam.</h2></div>
          <p>See how a property management company uses HostPilot Pro across the office, owners and guests. No client data is exposed in this public tour.</p>
          <Link to="/proof" className="btn btn-quiet">View the client showcase <ArrowRight size={15} /></Link>
        </div>
        <p className="mt-6 max-w-3xl text-[13px] text-hp-text3">Some exploratory screens illustrate planned functionality. In particular, smart-device connections are not demonstrated live here. Check each product page’s limitations or ask for a guided call before relying on a capability.</p>
      </section>
    </div>
  );
}
