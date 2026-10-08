import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './buyer-questions.css';

const questions = [
  ['Who buys HostPilotPro?', 'Property management companies. Your company runs the operation and gives its owners, guests and team the spaces they need. Service-partner workflows connect through the office; separate agent and partner logins are planned.'],
  ['Do we have to replace our booking system?', 'HostPilotPro sits around your channel manager. Hostaway is supported in the current operation. Guesty and Lodgify adapters are planned and need API testing before availability. Your company’s own connection is configured and validated during rollout.'],
  ['Can the portals carry our company branding?', 'Company branding is part of the rollout discussion for owner and guest experiences. A custom domain is a premium rollout option; domain ownership, configuration and availability must be confirmed before activation. Your proposal will separate core portal access from branding and domain scope.'],
  ['Can you support our country?', 'Tell us where you operate. We agree currencies, supported payment providers, languages and local document/reporting requirements before rollout. The current Thailand workflows include TM30; selecting another country does not automatically activate its legal or reporting requirements.'],
  ['How do we get started?', 'Start with a demonstration and a portfolio proposal. We review your booking system, team roles and required workflows, then agree connection testing and onboarding. Public self-service signup and subscription checkout are being developed separately from this website launch.'],
  ['How long does setup take?', 'The timeline depends on your portfolio, required connections and country scope. We agree it after reviewing your setup. A configured Hostaway rollout and a new adapter or local workflow have different requirements.'],
  ['What can we check before deciding?', 'Explore actual anonymised Ops screenshots and fictional Owner, Guest and Field demonstrations in the tour. On a call, ask us to demonstrate the specific live workflows your company needs and confirm what is available, in pilot or planned.'],
];

export default function BuyerQuestions() {
  return <section className="buyer-questions shell" aria-labelledby="buyer-questions-heading"><div><p className="eyebrow">BEFORE YOUR NEXT CHAPTER</p><h2 id="buyer-questions-heading">Clear answers.<br /><em>A confident next step.</em></h2><p>Choose software around the way your company works. Here are the questions to start with.</p><Link to="/demo" className="btn btn-gold">Discuss your portfolio <ArrowRight size={16} /></Link></div><div className="buyer-question-list">{questions.map(([question,answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>;
}
