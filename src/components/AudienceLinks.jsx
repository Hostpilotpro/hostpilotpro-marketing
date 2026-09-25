import { NavLink } from 'react-router-dom';
import { Building2, Users, Smartphone } from 'lucide-react';
import './business-stories.css';

export default function AudienceLinks() {
  return <nav className="blend-audience-links" aria-label="Explore HostPilot Pro by audience">{[
    ['/ops','Property management companies','Run the business',Building2],
    ['/owner','Owners','See the property and the numbers',Users],
    ['/guest','Guests','A simpler stay',Smartphone],
  ].map(([to,label,sub,Icon])=><NavLink to={to} key={to}><Icon size={20}/><span>{label}<small>{sub}</small></span></NavLink>)}</nav>;
}
