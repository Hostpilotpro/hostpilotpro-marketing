import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import asset from '../lib/asset.js';
import './ecosystem-spaces.css';

const spaces = [
  { title: 'Your office', label: 'OPS WORKSPACE', text: 'The management team’s place for conversations, reservations, tasks and financial review.', image: '/img/real-ops/01-real-ops-message-centre.jpg', alt: 'Actual anonymised Ops message centre', caption: 'Actual Ops screenshot', to: '/ops' },
  { title: 'Your owners', label: 'OWNER PORTAL', text: 'Build owner confidence with clear statements, supporting records and approvals. Make your transparency visible.', image: '/img/hostpilot-owner-laptop.webp', alt: 'Illustrative owner using a property dashboard on a laptop', caption: 'Illustrative owner scene', to: '/owner' },
  { title: 'Your guests', label: 'GUEST PORTAL', text: 'Bring arrival information, villa essentials and available extras into the guest’s stay.', image: '/img/hostpilot-guest-phone.webp', alt: 'Illustrative guest using a stay app on a phone', caption: 'Illustrative guest scene', to: '/guest' },
  { title: 'Your team', label: 'FIELD WORKSPACE', text: 'Stop relying on scattered updates. Give your team clear jobs and a place to record the work behind your service.', image: '/img/real-ops/04-real-ops-payroll-walkthrough.jpg', alt: 'Actual anonymised staff pay-review workspace', caption: 'Actual Ops staff review screenshot', to: '/field' },
  { title: 'Your agents & partners', label: 'PARTNER WORKFLOWS', text: 'Bring service partners into the work. Explore supplier coordination and the scope of future agent access.', image: '/img/villa-day.jpg', alt: 'Villa terrace and swimming pool', caption: 'Property scene · explore supported scope', to: '/partners' },
];

export default function EcosystemSpaces() {
  return <section className="ecosystem-spaces" id="experiences" aria-labelledby="ecosystem-heading"><div className="cinema-shell"><div className="cinema-section-intro"><div><p className="cinema-eyebrow">BUILT FOR PROPERTY MANAGEMENT COMPANIES</p><h2 id="ecosystem-heading">Your people.<br /><em>A place for everyone.</em></h2></div><p>You run the management company. HostPilotPro connects the spaces you give your owners, guests, office, field team and service partners. Choose a space to explore its dedicated page.</p></div><nav className="ecosystem-space-grid" aria-label="Explore the spaces in your ecosystem">{spaces.map(space => <Link key={space.to} to={space.to} className="ecosystem-space-card"><figure><img src={asset(space.image)} alt={space.alt} width="800" height="550" loading="lazy" /><figcaption>{space.caption}</figcaption></figure><div><p>{space.label}</p><h3>{space.title}</h3><span>{space.text}</span><strong>Explore this space <ArrowRight size={16} /></strong></div></Link>)}</nav><p className="ecosystem-space-boundary">Portal access and connections are configured for each company. Supplier coordination includes a LINE pilot; separate agent and partner logins are planned. Owner camera scenes illustrate proposed connections.</p></div></section>;
}
