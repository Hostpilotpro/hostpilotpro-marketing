import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSeo from '../lib/seo.js';
import '../components/sales-pages.css';

export default function Partners() {
  useSeo({ title: 'Agents & partners | The management company ecosystem', description: 'Explore service-partner coordination, the LINE supplier pilot and planned agent and partner access in the HostPilotPro ecosystem.', path: '/partners' });
  return <div className="cinematic-product-page replica-dark pt-28 pb-20"><section className="shell"><p className="eyebrow">YOUR MANAGEMENT COMPANY · YOUR PARTNER NETWORK</p><h1 className="sales-page-title mt-4">The people around your business.<br /><span className="serif-em">Part of the bigger picture.</span></h1><p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-hp-text2">Your operation depends on more than the office. Suppliers, service providers and referral partners all have a role. HostPilotPro brings supported partner workflows into your management team’s operation, with separate partner access developed as the ecosystem grows.</p><div className="mt-10 grid gap-5 md:grid-cols-3">{[
    ['Service coordination', 'Existing workflow', 'Guest service requests, operational tasks, supplier costs and supporting records help your team coordinate work with providers. A guest request and supplier confirmation remain separate stages.'],
    ['LINE supplier connection', 'Pilot · participant activation required', 'The supplier pilot covers orders and delivery/payment evidence where configured. Scope, participants and provider access need validation during rollout.'],
    ['Agent & partner space', 'Planned access', 'Dedicated external agent and partner logins are part of the ecosystem direction. A separate portal, referral tracking and commission dashboard are not presented as available today.'],
  ].map(([title,status,text]) => <article key={title} className="hp-card p-6"><p className="eyebrow">{status}</p><h2 className="mt-4 font-display text-[25px]">{title}</h2><p className="mt-4 text-[14px] leading-relaxed text-hp-text2">{text}</p></article>)}</div><div className="mt-10 flex flex-wrap gap-4"><Link to="/capabilities" className="btn btn-gold">Explore supported connections <ArrowRight size={16} /></Link><Link to="/demo?interest=The%20full%20suite" className="btn btn-quiet">Discuss your partner network <ArrowRight size={16} /></Link></div></section></div>;
}
