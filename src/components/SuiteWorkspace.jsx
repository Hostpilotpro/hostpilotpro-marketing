import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Home, Smartphone, ClipboardCheck, Check } from 'lucide-react';
import asset from '../lib/asset.js';
import './suite-workspace.css';

const perspectives = [
  { key: 'ops', label: 'Management', icon: Monitor, title: 'See the whole operation.', text: 'Bring reservation conversations, owner balances and operational finance into a workspace your office can use every day.', image: '/img/real-ops/02-real-ops-finance-hub.jpg', alt: 'Actual anonymised Ops finance hub', caption: 'Actual Ops screenshot · private financial values masked', points: ['Reservation and conversation context', 'Owner ledgers and statement review', 'Staff, payroll and operational work'], to: '/ops' },
  { key: 'owner', label: 'Owners', icon: Home, title: 'Make the numbers understandable.', text: 'Give owners their own view of statements, supporting records and approvals, with less chasing through separate messages.', image: '/img/hostpilot-owner-laptop.webp', alt: 'Illustrative owner working at a laptop overlooking a villa', caption: 'Illustrative owner scene · camera viewing is a proposed connection', points: ['Owner statements and line explanations', 'Supporting documents in the portal', 'Relevant approval requests'], to: '/owner' },
  { key: 'guest', label: 'Guests', icon: Smartphone, title: 'Keep the stay within reach.', text: 'A phone-friendly place for the guest to find arrival details, property information and the extras available for their stay.', image: '/img/hostpilot-guest-phone.webp', alt: 'Illustrative guest viewing stay information on a phone by a pool', caption: 'Illustrative guest scene · explore the fictional app in the tour', points: ['Arrival details and property information', 'Door-code timing and Wi-Fi details', 'Available add-ons for the villa'], to: '/guest' },
  { key: 'field', label: 'On-site team', icon: ClipboardCheck, title: 'Turn the plan into completed work.', text: 'Make the next job visible to the people at the property, with a mobile workspace and evidence that helps the office review the work.', image: '/img/hostpilot-bill-scanner.webp', alt: 'Illustrative receipt capture on a staff phone', caption: 'Illustrative field scene · extracted bills need review and approval', points: ['Department jobs and individual responsibility', 'Photos, receipts and completion records', 'Mobile language options'], to: '/field' },
];

export default function SuiteWorkspace() {
  const [active, setActive] = useState('ops');
  const id = useId();
  const selected = perspectives.find(item => item.key === active);
  const onKeyDown = (event, index) => {
    const next = event.key === 'ArrowRight' ? (index + 1) % perspectives.length : event.key === 'ArrowLeft' ? (index + perspectives.length - 1) % perspectives.length : event.key === 'Home' ? 0 : event.key === 'End' ? perspectives.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setActive(perspectives[next].key);
    document.getElementById(`${id}-${perspectives[next].key}`)?.focus();
  };
  return <section className="suite-workspace shell" aria-labelledby="suite-workspace-heading">
    <div className="suite-workspace-heading"><p className="eyebrow">THE RIGHT VIEW FOR EACH PERSON</p><h2 id="suite-workspace-heading">Your business.<br /><em>Connected by design.</em></h2><p>Explore the role each portal plays. The current operation provides the working foundation; each new company needs its own setup, access and validated connections.</p></div>
    <div className="suite-workspace-tabs" role="tablist" aria-label="Portal perspectives">{perspectives.map(({ key, label, icon: Icon }, index) => <button key={key} id={`${id}-${key}`} role="tab" type="button" aria-selected={active === key} aria-controls={`${id}-panel`} tabIndex={active === key ? 0 : -1} onClick={() => setActive(key)} onKeyDown={event => onKeyDown(event,index)}><Icon size={16} />{label}</button>)}</div>
    <div className="suite-workspace-panel" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${active}`} tabIndex={0}><figure className={`suite-workspace-art suite-workspace-art-${active}`}><img src={asset(selected.image)} alt={selected.alt} width="1000" height="700" loading="lazy" /><figcaption>{selected.caption}</figcaption></figure><div className="suite-workspace-copy"><p className="eyebrow">HOSTPILOT {active.toUpperCase()}</p><h3>{selected.title}</h3><p>{selected.text}</p><ul>{selected.points.map(point => <li key={point}><Check size={14} />{point}</li>)}</ul><Link to={selected.to}>Explore this portal<ArrowRight size={16} /></Link></div></div>
    <div className="suite-rollout"><div><p className="eyebrow">YOUR COMPANY’S ROLLOUT</p><h2>A clear path<br /><em>from interest to operation.</em></h2><p>We agree the setup before connecting your business. This is the rollout approach, rather than a promise that every integration activates at signup.</p></div><ol>{[
      ['Your company', 'Confirm your portfolio, country, team roles and the portals you need.'],
      ['Your connections', 'Validate booking-system API access, payment options and messaging accounts. Hostaway is the existing foundation; other adapters need testing.'],
      ['Your local setup', 'Agree currencies, documents and country requirements. TM30 is Thailand-specific; other markets require their own supported workflows.'],
      ['Your controlled launch', 'Review sample records and access with your team before starting. Discuss company branding and custom-domain scope as part of the rollout.'],
    ].map(([title,text], index) => <li key={title}><span>{String(index+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div>
    <div className="suite-workspace-cta"><span>Bring your portfolio. We’ll work through the setup together.</span><Link to="/demo?interest=The%20full%20suite" className="btn btn-gold">Discuss your rollout <ArrowRight size={16} /></Link></div>
  </section>;
}
