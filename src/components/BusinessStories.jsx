import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, MessageSquare, Wallet, Users, BarChart3 } from 'lucide-react';
import asset from '../lib/asset.js';
import './business-stories.css';
import './real-ops.css';

export const businessStories = [
  {
    key: 'messages', label: 'Message centre', icon: MessageSquare,
    title: 'More than an OTA inbox.',
    text: 'See the actual workspace for reservation conversations, website enquiries, office WhatsApp and social channels. Source labels, property context and assignment sit alongside the conversation.',
    image: '01-real-ops-message-centre.jpg',
    alt: 'Actual Ops inbox with conversation sources, property context and assignment columns. Private identities and messages are anonymised.',
    caption: 'All conversations view. The screenshot shows the current interface, not a demonstration that every channel is connected or supports two-way sending.',
  },
  {
    key: 'finance', label: 'Owner ledger', icon: Wallet,
    title: 'The money does not stop at the manager.',
    text: 'A dedicated owner ledger makes the two directions visible: funds held for owners, and amounts owners owe the management company. It is a different job from tracking booking revenue alone.',
    image: '03-real-ops-owner-ledger.jpg',
    alt: 'Actual Ops owner ledger showing who owes whom, portfolio summary cards and anonymised owner balances.',
    caption: 'Owner ledger overview. Owner identities and balances are masked; the original layout, explanatory text and balance bars are retained.',
  },
  {
    key: 'overview', label: 'Finance overview', icon: BarChart3,
    title: 'See the business behind the bookings.',
    text: 'Gross revenue, management commission and owner payouts have their own place in the finance workspace. The screen also explains which statement period the figures come from.',
    image: '02-real-ops-finance-hub.jpg',
    alt: 'Actual Ops finance overview with revenue, commission, revenue trajectory and owner payout cards. Financial values are masked.',
    caption: 'Finance hub. Financial values and percentages are hidden, not replaced with impressive sample numbers. The chart and period-status message are unchanged.',
  },
  {
    key: 'people', label: 'Payroll walkthrough', icon: Users,
    title: 'Payday, one person at a time.',
    text: 'The actual payroll walkthrough brings the person, pay components, transfer details and payment actions into one working view. Base pay, overtime, bonus and deductions remain clearly separated.',
    image: '04-real-ops-payroll-walkthrough.jpg',
    alt: 'Actual Ops payroll walkthrough with anonymised employee, hidden pay and bank details, and unchanged draft-period warning and controls.',
    caption: 'A real draft-period view, including its warning and disabled actions. Employee and property identities are anonymised; salary and banking details are masked. No payroll action was performed.',
  },
];

const validKey = key => businessStories.some(s => s.key === key) ? key : 'messages';

export default function BusinessStories({ initial = 'messages', inTour = false, onStoryChange }) {
  const [active, setActive] = useState(validKey(initial));
  const id = useId();
  useEffect(() => setActive(validKey(initial)), [initial]);
  const story = businessStories.find(s => s.key === active);
  const choose = key => { setActive(key); onStoryChange?.(key); };
  const onKey = (event, index) => {
    const next = event.key === 'ArrowRight' ? (index + 1) % businessStories.length
      : event.key === 'ArrowLeft' ? (index + businessStories.length - 1) % businessStories.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? businessStories.length - 1 : undefined;
    if (next === undefined) return;
    event.preventDefault();
    choose(businessStories[next].key);
    document.getElementById(`${id}-${businessStories[next].key}`)?.focus();
  };
  return <div className="blend-stories real-ops">
    <div className="blend-story-tabs" role="tablist" aria-label="Real Ops screenshots">
      {businessStories.map((s, index) => {
        const Icon = s.icon;
        return <button key={s.key} id={`${id}-${s.key}`} role="tab"
          aria-controls={`${id}-panel`} aria-selected={active === s.key}
          tabIndex={active === s.key ? 0 : -1}
          onKeyDown={event => onKey(event, index)} onClick={() => choose(s.key)}>
          <Icon size={15} />{s.label}
        </button>;
      })}
    </div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${active}`}>
      <div className="real-ops-heading">
        <div><div className="eyebrow">HostPilot Pro in use · Mr Property Siam</div><h3>{story.title}</h3></div>
        <div><p>{story.text}</p><a className="real-ops-open" href={asset(`/img/real-ops/${story.image}`)} target="_blank" rel="noopener noreferrer">Open screenshot at full size <ExternalLink size={14} /></a></div>
      </div>
      <figure className="real-ops-figure">
        <a href={asset(`/img/real-ops/${story.image}`)} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${story.label} screenshot`}>
          <img src={asset(`/img/real-ops/${story.image}`)} alt={story.alt} width="1356" height="847" loading="lazy" />
        </a>
        <figcaption>{story.caption}</figcaption>
      </figure>
    </div>
    <div className="real-ops-footer">
      <p>Actual Ops screenshots, captured 25 September 2026. Sensitive data only has been replaced or hidden. Branding, navigation, controls and visible statuses are preserved. These are images, not a live account.</p>
      {!inTour && <Link to={`/tour?story=${active}`}>View the screenshot tour <ArrowRight size={14} /></Link>}
    </div>
  </div>;
}
