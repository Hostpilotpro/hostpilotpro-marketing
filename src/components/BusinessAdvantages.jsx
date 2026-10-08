import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './business-advantages.css';

const advantages = [
  ['Earn your owners’ confidence.', 'Every owner wants to know how their property is performing and where the money goes. Give them readable statements, supporting documents and approval requests in their own portal. Let transparency become a reason to stay with your agency.', '/owner'],
  ['Create stays worth recommending.', 'A good review begins before check-in. Put arrival details, Wi-Fi, house information and available services within reach. Give guests a clear route to your team, and give your team the context to help.', '/guest'],
  ['Run a team that knows the plan.', 'Growing a portfolio should not mean spending every day chasing updates. Bring jobs, responsibility, photos and completion evidence together so your office can see what needs attention and your field team knows what comes next.', '/field'],
  ['Explain the money with confidence.', 'Bills, service costs, owner balances and payouts affect your reputation as much as the stay itself. Bring source records and financial review into the operation so your team can explain the numbers instead of searching for them.', '/ops'],
  ['Give your villas more opportunity.', 'Turn available stay windows into campaign ideas, social content and newsletters. Offer useful guest extras and keep marketing budgets and publishing approvals in view. Connect the tools that support your growth.', '/capabilities#ops-features'],
  ['Keep your partner network in the picture.', 'Your service depends on suppliers and outside providers too. Coordinate requests, costs and supporting evidence through your office. Explore supported supplier workflows and the next steps for dedicated agent and partner access.', '/partners'],
];

export default function BusinessAdvantages() {
  return <section className="business-advantages cinema-shell" aria-labelledby="business-advantages-title"><div className="business-advantages-intro"><div><p className="cinema-eyebrow">MAKE TRUST YOUR COMPETITIVE ADVANTAGE</p><h2 id="business-advantages-title">Build the agency<br /><em>people recommend.</em></h2></div><p>You are the management company. You have multiple owners to satisfy, guests to impress and a team to lead. When everyone is asking for answers, your reputation depends on how clearly you deliver them. HostPilotPro gives you the backbone to make excellent service and financial transparency part of the way you work.</p></div><div className="business-advantages-grid">{advantages.map(([title,body,to],index) => <article key={title}><span>{String(index+1).padStart(2,'0')}</span><h3>{title}</h3><p>{body}</p><Link to={to}>See how it works <ArrowRight size={16} /></Link></article>)}</div><div className="business-advantages-close"><p>Build a name for clear numbers, responsive service and a team that follows through. Give owners a reason to trust you—and guests a reason to recommend you.</p><Link to="/demo?interest=The%20full%20suite" className="cinema-button cinema-button-gold">Build your next chapter <ArrowRight size={17} /></Link></div></section>;
}
