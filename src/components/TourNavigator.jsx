import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Home, Smartphone, ClipboardCheck } from 'lucide-react';
import asset from '../lib/asset.js';
import './tour-navigator.css';

const experiences = [
  { key: 'ops', name: 'The control room', audience: 'OPS · YOUR MANAGEMENT TEAM', icon: Monitor, image: '/img/real-ops/01-real-ops-message-centre.jpg', alt: 'Actual anonymised Ops message centre', label: 'Actual Ops screenshots', text: 'Conversations, owner balances, finance and payroll. See the working interface behind the operation.' },
  { key: 'owner', name: 'Confidence from anywhere', audience: 'OWNER · YOUR PROPERTY INVESTORS', icon: Home, image: '/img/hostpilot-owner-laptop.webp', alt: 'Illustrative owner viewing a property dashboard on a laptop', label: 'Illustrative scene · sample portal', text: 'Explore statements, line-by-line explanations and approvals in a fictional owner account.' },
  { key: 'guest', name: 'A stay in their pocket', audience: 'GUEST · YOUR VISITORS', icon: Smartphone, image: '/img/hostpilot-guest-phone.webp', alt: 'Illustrative guest using a phone beside a villa pool', label: 'Illustrative scene · sample app', text: 'Arrival details, Wi-Fi and optional extras. Try the guest experience before the first check-in.' },
  { key: 'field', name: 'The next job, made clear', audience: 'FIELD · YOUR ON-SITE TEAM', icon: ClipboardCheck, image: '/img/hostpilot-bill-scanner.webp', alt: 'Illustrative staff member capturing a receipt with a phone', label: 'Illustrative scene · sample app', text: 'Try the language switch and claim a sample job. Explore how staff use the mobile workspace.' },
];

export default function TourNavigator({ active }) {
  const openWorkspace = () => requestAnimationFrame(() => document.getElementById('tour-workspace')?.scrollIntoView({ block: 'start', behavior: 'auto' }));
  return <section className="tour-navigator shell-wide" aria-labelledby="tour-navigator-title">
    <div className="tour-navigator-heading"><div><p className="eyebrow">CHOOSE YOUR PERSPECTIVE</p><h2 id="tour-navigator-title">One operation.<br /><em>Four ways in.</em></h2></div><p>Start with the people who matter to your business. Ops shows actual anonymised screens; the other areas are interactive demonstrations with fictional records.</p></div>
    <nav className="tour-experience-grid" aria-label="Choose a product walkthrough">
      {experiences.map(({ key, name, audience, icon: Icon, image, alt, label, text }) => <Link key={key} to={`/tour?surface=${key}#tour-workspace`} onClick={openWorkspace} aria-current={active === key ? 'page' : undefined} className="tour-experience-card">
        <div className={`tour-experience-art tour-experience-art-${key}`}><img src={asset(image)} alt={alt} width="800" height="550" loading="lazy" /><span>{label}</span></div>
        <div className="tour-experience-copy"><p><Icon size={14} />{audience}</p><h3>{name}</h3><span>{text}</span><strong>{active === key ? 'Continue this walkthrough' : 'Explore this walkthrough'}<ArrowRight size={16} /></strong></div>
      </Link>)}
    </nav>
    <div className="tour-operation-flow" aria-labelledby="tour-flow-title"><div><p className="eyebrow">HOW THE ROLES FIT TOGETHER</p><h3 id="tour-flow-title">One stay. A whole team behind it.</h3><p>A simple example of the roles each workspace supports. Your connected workflows are agreed during rollout.</p></div><ol><li><span>01 · OPS</span><strong>Coordinate the stay</strong><p>The office handles reservation context and conversations.</p></li><li><span>02 · FIELD</span><strong>Prepare the property</strong><p>The on-site team sees jobs and takes responsibility for the work.</p></li><li><span>03 · GUEST</span><strong>Welcome the visitor</strong><p>The guest finds arrival information and explores available extras.</p></li><li><span>04 · OWNER</span><strong>Explain the numbers</strong><p>The owner reviews statement lines and relevant approvals.</p></li></ol></div>
    <p className="tour-navigator-boundary">Camera and smart-device scenes illustrate proposed connections. They are separate from the live workflows demonstrated here.</p>
  </section>;
}
