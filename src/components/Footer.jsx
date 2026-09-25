import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import CompatNote from './CompatNote.jsx';

const cols = [
  {
    title: 'Built for',
    links: [
      ['/ops', 'Property management companies'],
      ['/owner', 'Owners'],
      ['/guest', 'Guests'],
      ['/field', 'HostPilot Field'],
      ['/full-suite', 'Full suite'],
    ],
  },
  {
    title: 'See it',
    links: [
      ['/tour', 'PDF walkthroughs'],
      ['/pricing', 'Pricing'],
      ['/demo', 'Book a call'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['/about', 'About the operator'],
      ['/proof', 'Mr Property Siam showcase'],
      ['/blog', 'Field notes'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-hp-lineSoft bg-hp-surface">
      <div className="shell-wide grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link to="/" className="text-hp-text">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-[15px] text-hp-text3">
            The operating system underneath a villa management company. Built and run daily on Koh Samui by
            Mr Property Siam.
          </p>
          <CompatNote variant="line" className="mt-4 max-w-xs" />
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="eyebrow">{c.title}</div>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-[15px] text-hp-text2 transition hover:text-hp-goldInk">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="shell-wide flex flex-col gap-2 border-t border-hp-lineSoft py-6 text-[13.5px] text-hp-text3 sm:flex-row sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} HostPilot Pro · a Mr Property Siam product · Koh Samui, Thailand</div>
        <div>
          Selected owner screen: MPS demonstration guide. Interactive replicas: fictional demo data.
        </div>
      </div>
    </footer>
  );
}
