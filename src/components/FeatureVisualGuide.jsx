import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import asset from '../lib/asset.js';
import './feature-visual-guide.css';
const visuals = [
  { title:'The finance workspace', body:'Owner ledgers, invoices, supplier costs and recorded payouts, in context.', image:'/img/real-ops/02-real-ops-finance-hub.jpg', label:'Actual Ops interface · anonymised', to:'/ops', screen:true },
  { title:'The bill scanner', body:'Capture a receipt, review the extracted details and keep the evidence attached.', image:'/img/hostpilot-bill-scanner.webp', label:'Illustrative capture workflow', to:'/ops', screen:false },
  { title:'The owner experience', body:'Statements, supporting documents and financial updates, built around their property.', image:'/img/hostpilot-owner-laptop.webp', label:'Illustrative scene · cameras are a concept', to:'/owner', screen:false },
  { title:'The guest experience', body:'Arrival essentials, villa guidance, service requests and configured payments.', image:'/img/hostpilot-guest-phone.webp', label:'Illustrative guest experience', to:'/guest', screen:false },
  { title:'The conversation workspace', body:'Supported conversations with source labels, property context and team assignment.', image:'/img/real-ops/01-real-ops-message-centre.jpg', label:'Actual Ops interface · anonymised', to:'/capabilities#ops-features', screen:true },
  { title:'The field connection', body:'Visible jobs, recorded work, hours and receipt capture for your villa team.', image:'/img/hostpilot-bill-scanner.webp', label:'Illustrative field receipt capture', to:'/field', screen:false },
];
export default function FeatureVisualGuide() {
  return <section className="feature-visual-guide" aria-labelledby="visual-guide-title"><div className="shell-wide"><p className="feature-guide-eyebrow">SEE THE SOFTWARE IN CONTEXT</p><h2 id="visual-guide-title">A connected business.<br /><em>A view for every moment.</em></h2><p className="feature-guide-lede">Explore the experience, then open the working details. Actual screenshots and illustrative scenes are labelled so you can see exactly what you are looking at.</p><div className="feature-visual-grid">{visuals.map(item => <Link key={item.title} to={item.to} className="feature-visual-card"><div className={item.screen ? 'feature-guide-image feature-guide-screen' : 'feature-guide-image'}><img src={asset(item.image)} alt={`${item.title}: ${item.label}`} loading="lazy" width={item.screen ? 1356 : 1448} height={item.screen ? 847 : 1086} /><span>{item.label}</span></div><div className="feature-guide-card-copy"><h3>{item.title}</h3><p>{item.body}</p><span>Explore this experience <ArrowRight size={15} /></span></div></Link>)}</div></div></section>;
}
