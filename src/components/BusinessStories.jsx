import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Wallet, Users, Gauge, Search, Home, Monitor, RotateCcw, Check, ShieldCheck, Trophy, ChevronDown } from 'lucide-react';
import OpsConsole from '../tour/OpsConsole.jsx';
import asset from '../lib/asset.js';
import './business-stories.css';

export const businessStories = [
  { key:'messages', label:'Message centre', icon:MessageSquare, title:'A conversation becomes part of the operation.', text:'Bring supported office and guest channels together with contacts, lead context and clear staff ownership. AI helps prepare the reply; a person stays in control.', try:'Select a conversation, polish the example draft, then save it as a demo lead.' },
  { key:'finance', label:'Owner money', icon:Wallet, title:'The manager is not the end of the money.', text:'Sometimes you collect and pay the owner. Sometimes the owner collects and owes you. Keep the statement, invoice, ledger and payment evidence connected in both directions.', try:'Switch who collects, then follow the sample through review and verification.' },
  { key:'people', label:'People & payday', icon:Users, title:'From the first application to a clearer payday.', text:'Careers, staff documents, overtime, allowances, commissions and rewards belong in the same employment journey. Make the person processing payroll confident about what to pay and why.', try:'Open the travel calculation and review the three fictional employees. Review is not payment.' },
  { key:'pricing', label:'RatePilot', icon:Gauge, title:'Market context. Owner intent. Human judgement.', text:'Review recommendations alongside comparable villas and the owner’s pricing boundaries. Separate the opportunity to improve revenue from permission to change a rate.', try:'Review the sample recommendation against the agreed floor. No rate leaves this demo.' },
  { key:'listings', label:'Listing tools', icon:Search, title:'A stronger listing, without starting from a blank page.', text:'Audit the presentation, find gaps and prepare channel-specific improvements. Keep the listing-optimizer depth already in the product, without claiming to know an OTA’s ranking algorithm.', try:'Switch channels and compare the original example with a suggested rewrite.' },
  { key:'care', label:'Property care', icon:Home, title:'An issue should have a route into action.', text:'Connect onboarding and property records to inspections, maintenance and evidence. Turn guest feedback into something the right person can review and resolve.', try:'Review the sample air-conditioning finding and prepare an inspection. A manager confirms the next step.' },
  { key:'portfolio', label:'Portfolio console', icon:Monitor, title:'The original portfolio demo, still here.', text:'Search a villa, open its dossier and explore the existing operations console. The familiar charts, property views and task board remain part of the story.', try:'Use the search button to find a villa. The portfolio is fictional and no changes are saved.' },
];

const money = (n) => `THB ${n.toLocaleString('en-US')}`;
function Chip({ children }) { return <span className="blend-chip">{children}</span>; }
function ScreenHead({ label, note = 'Fictional sample records' }) { return <div className="blend-screen-head"><strong>HostPilot Pro <span>/ {label}</span></strong><Chip>{note}</Chip></div>; }
function StepStrip({ steps, active }) { return <div className="blend-step-strip">{steps.map((s,i)=><span key={s} className={i===active?'is-current':i<active?'is-done':''}><small>0{i+1}</small>{s}</span>)}</div>; }

const conversations = [
  { name:'Alex Morgan', source:'Website', subject:'A family villa enquiry', staff:'Maya', text:'Hi, can you help us find a villa for six people in December?', draft:'Hi Alex, thanks for asking. What dates do you need?', polished:'Hi Alex, thank you for getting in touch. I’d be happy to help find a villa for your family. Which December dates are you considering?', stage:'Booking enquiry' },
  { name:'Tobias Lindqvist', source:'PMS', subject:'An arrival question', staff:'Leo', text:'Our flight lands at 16:30. Can we arrange an airport transfer?', draft:'Yes, please send the flight number and how many bags.', polished:'Absolutely, Tobias. Please share your flight number and the number of bags, and our team will check the transfer arrangements for your arrival.', stage:'Existing reservation' },
  { name:'Coast Transfers', source:'Office WhatsApp', subject:'Supplier coordination', staff:'Sara', text:'Please confirm the collection time for tomorrow’s airport run.', draft:'Thanks, we will check the flight and come back to you.', polished:'Thank you. We’re checking the flight details with the guest and will confirm the collection time once the arrangements are reviewed.', stage:'Supplier contact' },
];
function Messages() {
  const [person,setPerson]=useState(0),[polished,setPolished]=useState(false),[drafted,setDrafted]=useState(false),[lead,setLead]=useState(false),[routed,setRouted]=useState(false);
  const c=conversations[person];
  return <div className="blend-screen replica-dark"><ScreenHead label="Message centre" note="Workflow illustration" />
    <div className="blend-channel-row">{['PMS','Office WhatsApp','Email & forms','Social rollout'].map(t=><span key={t}>{t}</span>)}</div>
    <div className="blend-inbox">
      <div className="blend-contact-list">{conversations.map((v,i)=><button key={v.name} aria-pressed={i===person} onClick={()=>{setPerson(i);setPolished(false);setDrafted(false);setLead(false);setRouted(false);}}><strong>{v.name}</strong><span>{v.subject}</span><small>{v.source}</small></button>)}</div>
      <div className="blend-thread">
        <div className="blend-person"><div><strong>{c.name}</strong><span>{c.source} · {c.stage}</span></div><Chip>{routed?'Assigned: Ben':`Assigned: ${c.staff}`}</Chip></div>
        <div className="blend-message"><span>Incoming · sample conversation</span>{c.text}</div>
        <div className="blend-message blend-reply"><span>{c.staff} · {drafted?'full reply example':'example draft'}, not sent</span>{drafted?[`Hello Alex, thank you for considering a family stay with us. Please send your preferred December dates and any must-haves, such as a private pool or step-free access. Our team can then check suitable options before preparing a proposal.`,`Hello Tobias, we can help coordinate your airport transfer. Please send the flight number, passenger count and luggage details. Our office will check the arrangements and confirm availability and pricing before anything is booked.`,`Hello, thank you for checking. We are confirming the guest’s flight details and will send the reviewed collection time. Please hold the request as pending until our office confirms the arrangements.`][person]:polished?c.polished:c.draft}</div>
        <div className="blend-inline-actions"><button onClick={()=>{setDrafted(false);setPolished(v=>!v);}}>{polished&&!drafted?'Show original':'Try example AI polish'}</button><button onClick={()=>{setDrafted(v=>!v);setPolished(false);}}>{drafted?'Restore staff draft':'Try full reply example'}</button><button onClick={()=>setRouted(v=>!v)}>{routed?`Return to ${c.staff}`:'Route example to Ben'}</button></div>
        <div className="blend-thread-record"><ShieldCheck size={15}/><span>Recorded authorship: {c.staff} owns this draft. Routing does not change its author.</span></div>
        {person===0 && <button className="blend-action" onClick={()=>setLead(v=>!v)}>{lead?<><Check size={15}/> Demo contact and lead saved</>:'Save as a demo lead'}<ArrowRight size={14}/></button>}
        {lead && <p className="blend-feedback" role="status">The demo lead is ready for staff booking review. No reservation has been created.</p>}
      </div>
    </div>
    <div className="blend-disclosure">Scripted example, not a live AI call. Channel access depends on configuration; social rollout does not imply two-way sending.</div>
  </div>;
}

function Finance() {
  const [collector,setCollector]=useState('manager'),[step,setStep]=useState(0);
  const inbound=collector==='owner';
  const amount=inbound?24200:75800;
  const steps=inbound?['Statement review','Invoice issued','Payment claimed','Finance verified']:['Statement review','Payout prepared','Transfer recorded'];
  const complete=step===steps.length-1;
  return <div className="blend-screen replica-light"><ScreenHead label="Owner finance" />
    <div className="blend-finance-switch" aria-label="Who collects the reservation income?">{[['manager','Manager collects'],['owner','Owner collects']].map(([key,label])=><button key={key} aria-pressed={collector===key} onClick={()=>{setCollector(key);setStep(0);}}>{label}</button>)}</div>
    <div className="blend-finance-body"><div className="blend-finance-title"><span className="blend-kicker">Villa Sunset Sapphire · example month</span><h3>{inbound?'The owner pays the manager.':'The manager pays the owner.'}</h3></div>
      <div className="blend-finance-grid">
        <div className="blend-ledger">{(inbound?[['Income collected by owner',100000],['Management services due',18000],['Owner costs due',6200]]:[['Reservation income',100000],['Management services',-18000],['Owner costs',-6200]]).map(([l,n])=><div key={l}><span>{l}</span><strong>{money(n)}</strong></div>)}<div className="blend-ledger-total"><span>{complete?(inbound?'Invoice settled in demo':'Payout recorded in demo'):inbound?'Invoice due to manager':'Balance due to owner'}</span><strong>{money(amount)}</strong></div><p>{inbound?'The income is context, not an invoiced item. The example invoice covers services and owner costs only. ':' '}Illustrative amounts excluding tax; not a real invoice.</p></div>
        <div className="blend-owner-card"><Wallet size={23}/><span className="blend-kicker">{complete?'Amount settled in example':'What the owner can follow'}</span><strong>{money(amount)}</strong><p>{complete?(inbound?'Payment verified in this example. Remaining due: THB 0.':'Transfer recorded in this example. Remaining payout: THB 0.'):inbound?'Services and costs owed to the manager.':'Income less the manager’s services and owner costs.'}</p><Chip>{steps[step]}</Chip><small>{inbound&&step===2?'Payment reported. Finance verification is still required.':complete?'Sample record complete. No real transfer or notification sent.':'One record for the office and a clear explanation for the owner.'}</small></div>
      </div><StepStrip steps={steps} active={step}/>
      <div className="blend-inline-actions"><button className="blend-action" onClick={()=>setStep(v=>Math.min(v+1,steps.length-1))} disabled={step===steps.length-1}>{step===steps.length-1?'Example complete':inbound?['Issue sample invoice','Add sample payment claim','Finance: verify sample'][step]:['Prepare sample payout','Record sample transfer'][step]}<ArrowRight size={14}/></button><button onClick={()=>setStep(0)}>Reset example</button></div>
    </div><div className="blend-disclosure">Sample workflow. A payment claim is not a verified payment. No money, invoice, email or bank instruction leaves this demo.</div>
  </div>;
}

const employees=[
  {name:'Maya S.',role:'Portfolio coordinator',salary:18000,hours:12,hourly:60,km:150,included:100,perKm:3,bonus:750,advance:1000},
  {name:'Nalin P.',role:'Housekeeping lead',salary:16500,hours:8,hourly:55,km:90,included:100,perKm:3,bonus:500,advance:0},
  {name:'Somchai R.',role:'Pool technician',salary:17000,hours:10,hourly:60,km:180,included:100,perKm:3,bonus:600,advance:500},
];
function People() {
  const [idx,setIdx]=useState(0),[reviewed,setReviewed]=useState([]),[travel,setTravel]=useState(false),[tab,setTab]=useState('payday');
  const e=employees[idx],excess=Math.max(0,e.km-e.included),allowance=excess*e.perKm,total=e.salary+e.hours*e.hourly+allowance+e.bonus-e.advance;
  return <div className="blend-screen replica-light"><ScreenHead label="People & payroll" note="Sample company policy"/>
    <div className="blend-channel-row">{[['payday','Payday walkthrough'],['goals','Goals & recognition'],['journey','Recruitment to renewal']].map(([key,l])=><button key={key} aria-pressed={tab===key} onClick={()=>setTab(key)}>{l}</button>)}</div>
    {tab==='payday'?<div className="blend-payroll"><div className="blend-person"><div><span className="blend-kicker">Employee {idx+1} of 3</span><strong>{e.name}</strong><span>{e.role}</span></div><Chip>{reviewed.length}/3 reviewed</Chip></div>
      <div className="blend-payroll-grid"><div className="blend-ledger">{[['Salary',e.salary],['Approved overtime',e.hours*e.hourly],['Travel allowance',allowance],['Approved bonus',e.bonus],['Advance already received',-e.advance]].map(([l,n])=><div key={l}><span>{l}</span><strong>{money(n)}</strong></div>)}<button className="blend-calculation" aria-expanded={travel} onClick={()=>setTravel(v=>!v)}>How is travel calculated?<ChevronDown size={14}/></button>{travel&&<p className="blend-calculation-detail">Example policy: {e.km} km logged − {e.included} km included = {excess} excess km. {excess} × THB {e.perKm} = {money(allowance)}. The included distance is not paid twice. This is an illustrative policy, not an MPS rate.</p>}</div>
      <div className="blend-pay-total"><span className="blend-kicker">Net to review</span><strong>{money(total)}</strong><p>Salary, approved extras and previous advances, explained together.</p><Chip>{reviewed.includes(idx)?'Reviewed in demo':'Awaiting review'}</Chip><button className="blend-action" disabled={reviewed.includes(idx)} onClick={()=>setReviewed(v=>[...v,idx])}>{reviewed.includes(idx)?'Reviewed':'Mark example reviewed'}<Check size={15}/></button></div></div>
      <div className="blend-inline-actions"><button disabled={idx===0} onClick={()=>{setIdx(v=>v-1);setTravel(false);}}>Previous employee</button><button disabled={idx===2} onClick={()=>{setIdx(v=>v+1);setTravel(false);}}>Next employee <ArrowRight size={14}/></button><button onClick={()=>{setIdx(0);setReviewed([]);setTravel(false);}}>Reset run</button></div>
    </div>:tab==='goals'?<div className="blend-goals"><div><Trophy size={28}/><span className="blend-kicker">Recognition with a record</span><h3>Make good work visible.</h3><p>Show the team’s goals and recognition alongside the work that earned them. Approved compensation belongs in payroll; a league position alone is not a payment instruction.</p><p><Chip>Team member of the month · example</Chip></p></div><div className="blend-league">{[['01','Nalin P.','Quality & consistency','420'],['02','Somchai R.','Helpful initiative','395'],['03','Maya S.','Team contribution','360']].map(([n,name,label,points])=><div key={name}><span>{n}</span><section><strong>{name}</strong><small>{label}</small></section><b>{points}<small>sample points</small></b></div>)}<p>Illustrative standings. Bonus rules and payment approval remain separate.</p></div></div>:<div className="blend-hr-journey"><h3>The employee record outlives the application.</h3><div>{[['Careers','Applications, CVs and hiring context'],['Employment','Contract documents and staff details'],['Work','Responsibilities, overtime and allowances'],['Renewals','Passport, visa, work-permit and licence dates, with follow-up visibility']].map(([title,text])=><article key={title}><span>{title}</span><p>{text}</p></article>)}</div><p>Reminder recipients and delivery depend on the configured workflow. Date tracking is not proof that an external reminder has been delivered.</p></div>}
    <div className="blend-disclosure">Fictional employees and calculations. Review does not mark a salary paid. No statutory payroll-compliance or processing-time guarantee is implied.</div>
  </div>;
}

function Pricing() {
  const [rate,setRate]=useState(9500),[review,setReview]=useState(false);
  const valid=rate>=10000&&rate<=18000;
  return <div className="blend-screen replica-dark"><ScreenHead label="RatePilot" note="Pricing-policy example"/><div className="blend-pricing">
    <div className="blend-person"><div><strong>Villa Sunset Sapphire</strong><span>Owner-agreed example range</span></div><Chip>Human review</Chip></div>
    <div className="blend-rate-range"><div><span>Floor</span><strong>THB 10,000</strong></div><div className="blend-rate-center"><span>Recommendation</span><strong>{money(rate)}</strong></div><div><span>Ceiling</span><strong>THB 18,000</strong></div></div>
    <div className={`blend-policy-result ${valid?'valid':''}`}><ShieldCheck size={21}/><div><strong>{valid?'Within the example owner range':'Below the agreed floor'}</strong><p>{valid?'Still requires the appropriate approval before a channel update.':'Review the recommendation or discuss a revised strategy with the owner.'}</p></div></div>
    <div className="blend-market"><div><span>Comparable villas</span><strong>3 selected</strong><small>Fictional comparison set</small></div><div><span>Booking pace</span><strong>Needs review</strong><small>Context, not a guarantee</small></div><div><span>Owner policy</span><strong>Approval required</strong><small>Example Balanced strategy</small></div></div>
    <div className="blend-inline-actions"><button onClick={()=>{setRate(v=>v===9500?11500:9500);setReview(false);}}>Try {rate===9500?'THB 11,500':'THB 9,500'}</button><button disabled={!valid} onClick={()=>setReview(true)}>Prepare approval example</button></div>{review&&<p className="blend-feedback" role="status">Example prepared for review. No owner notification or Hostaway price change was sent.</p>}
  </div><div className="blend-disclosure">Illustrates an owner-policy check. It does not demonstrate a live alert, market feed or automatic channel update.</div></div>;
}

const listingSamples={
  Airbnb:{before:'Nice villa with pool',after:'Private-pool villa with sea views and space for six',detail:'Lead with the property’s differentiating features. Keep the title specific and the description consistent with verified amenities.'},
  'Booking.com':{before:'Our property offers everything for your holiday.',after:'A three-bedroom villa with a private pool, kitchen and sea-view terrace.',detail:'Replace generic claims with a clear property description. Channel fields and publishing capabilities must be reviewed separately.'},
  Vrbo:{before:'Beautiful vacation home',after:'Family villa with a private pool, outdoor dining and three bedrooms',detail:'Give the travelling group a concrete picture of the stay. Review room configuration and amenities before approving the copy.'},
};
function Listings() {
  const [channel,setChannel]=useState('Airbnb'),[after,setAfter]=useState(false);
  const s=listingSamples[channel];
  return <div className="blend-screen replica-light"><ScreenHead label="Listing Optimizer"/><div className="blend-listing">
    <img src={asset('/img/villa-sapphire-hero.jpg')} alt="Villa used in the fictional listing example"/>
    <div className="blend-channel-row">{Object.keys(listingSamples).map(c=><button key={c} aria-pressed={channel===c} onClick={()=>{setChannel(c);setAfter(false);}}>{c}</button>)}</div>
    <div className="blend-listing-copy"><span className="blend-kicker">{channel} · {after?'Example rewrite':'Original example'}</span><h3>{after?s.after:s.before}</h3><p>{s.detail}</p><div className="blend-listing-signals"><Chip>Title clarity</Chip><Chip>Amenity coverage</Chip><Chip>Photo order</Chip></div><button className="blend-action" onClick={()=>setAfter(v=>!v)}>{after?'Compare with original':'Review example rewrite'}<ArrowRight size={15}/></button></div>
  </div><div className="blend-disclosure">Sample copy, not a new scan. No channel is updated. Audit scores are internal quality indicators, not an OTA’s ranking algorithm.</div></div>;
}

function Care() {
  const [step,setStep]=useState(0);
  return <div className="blend-screen replica-light"><ScreenHead label="Property care"/><div className="blend-care">
    <div className="blend-care-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(24,22,18,.85),rgba(24,22,18,.12)),url(${asset('/img/villa-day.jpg')})`}}><span>Fictional property example</span><h3>Villa Sunset Sapphire</h3></div>
    <StepStrip steps={['Guest signal','Manager review','Inspection prepared']} active={step}/>
    <div className="blend-finding"><span className="blend-kicker">Review finding · air conditioning</span><h3>“The bedroom aircon struggled to cool.”</h3><p>A useful operational signal, not a diagnosis. Give the manager the guest’s words, property context and an appropriate inspection action.</p></div>
    {step>0&&<div className="blend-inspection"><ShieldCheck size={22}/><div><strong>{step===1?'Suggested inspection for manager review':'Example inspection prepared'}</strong><p>Check bedroom air-conditioning performance. Suggested department: Maintenance. Include findings and photo evidence after the inspection.</p></div></div>}
    <div className="blend-inline-actions"><button className="blend-action" disabled={step===2} onClick={()=>setStep(v=>Math.min(v+1,2))}>{['Review the sample finding','Confirm example inspection','Example prepared'][step]}<ArrowRight size={15}/></button><button onClick={()=>setStep(0)}>Reset example</button></div>
    <p className="blend-feedback">No real task has been assigned. This scene deliberately preserves manager review.</p>
  </div><div className="blend-disclosure">Onboarding, documents and equipment provide context; inspections and completed-work evidence close the loop.</div></div>;
}

export default function BusinessStories({initial='messages',inTour=false,onStoryChange}) {
  const [active,setActive]=useState(businessStories.some(s=>s.key===initial)?initial:'messages');
  const [reset,setReset]=useState(0);
  const id=useId();
  useEffect(()=>{setActive(businessStories.some(s=>s.key===initial)?initial:'messages');},[initial]);
  const s=businessStories.find(v=>v.key===active);
  const choose=(key)=>{setActive(key);onStoryChange?.(key);};
  const onKey=(e,i)=>{let next;if(e.key==='ArrowRight')next=(i+1)%businessStories.length;if(e.key==='ArrowLeft')next=(i+businessStories.length-1)%businessStories.length;if(e.key==='Home')next=0;if(e.key==='End')next=businessStories.length-1;if(next===undefined)return;e.preventDefault();choose(businessStories[next].key);document.getElementById(`${id}-${businessStories[next].key}`)?.focus();};
  return <div className="blend-stories">
    <div className="blend-story-tabs" role="tablist" aria-label="Explore the business workflows">{businessStories.map((story,i)=>{const Icon=story.icon;return <button id={`${id}-${story.key}`} role="tab" key={story.key} aria-controls={`${id}-panel`} aria-selected={active===story.key} tabIndex={active===story.key?0:-1} onKeyDown={e=>onKey(e,i)} onClick={()=>choose(story.key)}><Icon size={15}/>{story.label}</button>;})}</div>
    <div className="blend-story-grid" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${active}`}>
      <div className="blend-story-copy"><div className="eyebrow">{s.label}</div><h3>{s.title}</h3><p>{s.text}</p><div className="blend-try"><span>Try the example</span>{s.try}</div><button className="blend-reset" onClick={()=>setReset(v=>v+1)}><RotateCcw size={13}/>Reset this scene</button>{!inTour&&<Link className="blend-tour-link" to={`/tour?story=${active}`}>Open in the walkthrough <ArrowRight size={14}/></Link>}</div>
      <div key={`${active}-${reset}`} className="blend-stage">
        {active==='messages'&&<Messages/>}{active==='finance'&&<Finance/>}{active==='people'&&<People/>}{active==='pricing'&&<Pricing/>}{active==='listings'&&<Listings/>}{active==='care'&&<Care/>}{active==='portfolio'&&<div className="blend-portfolio"><OpsConsole/></div>}
      </div>
    </div>
    <p className="blend-global-disclosure">Illustrative workflow demos, not a live account or an exact replica of every current product screen. Sample data only; nothing sends, charges or changes production records.</p>
  </div>;
}
