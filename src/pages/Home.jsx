import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Play, Monitor, Users, Smartphone, Building2, MessageSquare, Sparkles, Megaphone, Globe2, ShieldCheck, Layers } from 'lucide-react';
import useSeo from '../lib/seo.js';
import asset from '../lib/asset.js';
import BusinessStories from '../components/BusinessStories.jsx';
import VisualProductStories from '../components/VisualProductStories.jsx';
import MarketingVisualStory from '../components/MarketingVisualStory.jsx';
import EcosystemSpaces from '../components/EcosystemSpaces.jsx';
import './home-cinematic.css';

export default function Home() {
  useSeo({ title: 'HostPilot Pro | One ecosystem for property management companies', description: 'Property management software that connects your office, owners, guests, team and service-partner workflows in one ecosystem. Explore the dedicated portal pages.', path: '/' });
  return <div className="cinematic-home replica-dark">
    <section className="cinema-hero" aria-labelledby="cinema-title">
      <img className="cinema-hero-image" src={asset('/img/hostpilot-cinematic-hero.webp')} width="1536" height="1024" fetchPriority="high" alt="A contemporary tropical villa and infinity pool overlooking the ocean at dusk" />
      <div className="cinema-hero-shade" />
      <div className="cinema-shell cinema-hero-content"><p className="cinema-eyebrow"><span className="cinema-live-dot" /> BUILT FOR PROPERTY MANAGEMENT COMPANIES</p><h1 id="cinema-title">Your people.<br /><em>One ecosystem.</em></h1><p className="cinema-hero-description">Give your owners, guests and team their own space.<br />Connect your office and partner workflows around them. One management company. One ecosystem.</p><div className="cinema-actions"><Link to="/#experiences" className="cinema-button cinema-button-gold">Explore your ecosystem <ArrowRight size={18} /></Link><Link to="/tour" className="cinema-play-link"><span><Play size={15} fill="currentColor" /></span> See it in action</Link></div><div className="cinema-hero-proof"><ShieldCheck size={16} /><span>Built by a villa operator. Used in the real world.</span></div></div>
      <aside className="cinema-hero-device" aria-label="HostPilot Ops on a laptop"><span>YOUR OPERATION. ONE WORKING VIEW.</span><div className="cinema-hero-device-screen"><div><i /><i /><i /><small>HostPilot Ops · actual interface</small></div><img src={asset('/img/real-ops/02-real-ops-finance-hub.jpg')} alt="Actual HostPilot Ops finance interface with private data masked" width="1356" height="847" /></div><div className="cinema-hero-device-base" /><Link to="/tour">Explore the real workspace <ArrowRight size={13} /></Link></aside>
      <div className="cinema-hero-caption"><span>KOH SAMUI SPIRIT. A BIGGER VISION.</span><span>Original architectural visual</span></div>
      <div className="cinema-hero-bottom cinema-shell"><a href="#connected" className="cinema-scroll"><ArrowDown size={16} /> DISCOVER A DIFFERENT WAY</a><span>Keep your PMS. Elevate everything around it.</span></div>
    </section>

    <div className="cinema-signal-bar"><div className="cinema-shell"><p>ONE BUSINESS.<br /><strong>CONNECTED.</strong></p>{[['Operations', Monitor], ['Owners', Users], ['Guests', Smartphone], ['Field teams', Building2], ['Growth', Megaphone]].map(([label, Icon]) => <span key={label}><Icon size={18} />{label}</span>)}</div></div>

    <section className="cinema-manifesto cinema-shell" id="connected"><p className="cinema-eyebrow">BEYOND THE BOOKING CALENDAR</p><h2>You create incredible stays.<br /><span>We connect everything</span><br /><em>that makes them possible.</em></h2><div className="cinema-manifesto-bottom"><span className="cinema-number">01 — THE BIGGER PICTURE</span><p>Your management company is the centre. HostPilotPro connects the spaces you give your owners, guests and team, alongside your office and supported partner workflows. Everyone has a role in the same business.</p><Link to="/capabilities" className="cinema-round-link" aria-label="Explore features and connections"><ArrowRight size={26} /></Link></div></section>

    <EcosystemSpaces />

    <VisualProductStories />

    <section className="cinema-proof-section cinema-shell"><div className="cinema-section-intro"><div><p className="cinema-eyebrow"><span className="cinema-live-dot" /> BUILT IN A WORKING VILLA BUSINESS</p><h2>Real work.<br /><em>Real screens.</em></h2></div><p>Developed inside Mr Property Siam on Koh Samui. Explore the actual Ops interface below, with private information anonymised.</p></div><BusinessStories /></section>

    <MarketingVisualStory />

    <section className="cinema-growth"><div className="cinema-shell"><div className="cinema-section-intro"><div><p className="cinema-eyebrow">MORE THAN OPERATIONS</p><h2>Run the business.<br /><em>Grow the opportunity.</em></h2></div><Link to="/capabilities" className="cinema-text-link">All features & connections <ArrowRight size={17} /></Link></div><div className="cinema-growth-grid">{[
      { icon: Megaphone, number: '01', title: 'Make available nights work harder.', text: 'Prepare Google and Meta campaigns, social content and Mailchimp newsletters around real stay windows. Keep budgets and publishing approvals in view.', tags: ['Google & Meta', 'Social content', 'Mailchimp'] },
      { icon: MessageSquare, number: '02', title: 'Keep conversations in context.', text: 'Bring supported WhatsApp and incoming social conversations into the team’s workspace. Explore the LINE supplier pilot for orders and delivery evidence.', tags: ['WhatsApp', 'Social inbox', 'LINE pilot'] },
      { icon: Sparkles, number: '03', title: 'Make every stay more valuable.', text: 'Help guests discover transfers, chefs, experiences and useful extras. Give owners visibility into property decisions, marketing budgets and payouts.', tags: ['Guest services', 'Owner visibility', 'Configured payments'] },
    ].map(item => <article key={item.number}><div className="cinema-growth-card-top"><item.icon size={25} /><span>{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="cinema-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div><p className="cinema-fine-print">Connection availability depends on provider accounts, permissions and rollout. Publishing and payments require configuration.</p></div></section>

    <section className="cinema-operator cinema-shell"><div className="cinema-operator-image"><img src={asset('/img/villa-sapphire-hero.jpg')} alt="A managed tropical villa illuminated at dusk" loading="lazy" width="1200" height="800" /><span>FROM THE VILLA FLOOR TO THE OFFICE.</span></div><div className="cinema-operator-copy"><p className="cinema-eyebrow">BORN IN THE REAL WORLD</p><h2>Built where<br /><em>hospitality happens.</em></h2><p>A statement an owner needs to understand. A clean that needs recording. A guest who needs an answer. HostPilot Pro grew from the daily realities of managing villas — and the ambition to make them better.</p><Link to="/about" className="cinema-text-link">Meet the operation behind it <ArrowRight size={17} /></Link><div className="cinema-operator-signature"><span>MR PROPERTY SIAM</span><small>Koh Samui, Thailand · first operator</small></div></div></section>

    <section className="cinema-connections cinema-shell"><div><Layers size={30} /><p className="cinema-eyebrow">YOUR BACKBONE. OUR CONNECTED LAYER.</p><h2>Keep what works.<br /><em>Build what’s next.</em></h2><p>Hostaway is supported in the existing operation. Guesty and Lodgify adapters are planned and need testing before availability. New SaaS companies connect only after setup and validation.</p></div><div className="cinema-connection-list"><div><strong>Hostaway</strong><span className="cinema-status-live">Supported in current operation</span></div><div><strong>Guesty</strong><span>Planned adapter</span></div><div><strong>Lodgify</strong><span>Planned adapter</span></div><div className="cinema-country-note"><Globe2 size={21} /><p><strong>A vision beyond one market.</strong>Country-specific reporting, payment methods, languages and legal workflows will be adapted and validated market by market. Thailand’s TM30 workflow is specific to Thailand.</p></div></div></section>

    <section className="cinema-finale"><img src={asset('/img/hostpilot-cinematic-hero.webp')} alt="" loading="lazy" width="1536" height="1024" /><div className="cinema-finale-shade" /><div className="cinema-shell"><p className="cinema-eyebrow">YOUR NEXT CHAPTER</p><h2>A remarkable business<br />deserves <em>a remarkable view.</em></h2><p>Explore the platform. See the details. Imagine your operation.</p><div className="cinema-actions"><Link to="/tour" className="cinema-button cinema-button-gold">Take the live tour <ArrowRight size={18} /></Link><Link to="/demo" className="cinema-button cinema-button-outline">Talk about your portfolio <ArrowRight size={18} /></Link></div><span className="cinema-finale-footnote">No signup needed for the tour · Real Ops screenshots and illustrative portal demos</span></div></section>
  </div>;
}
