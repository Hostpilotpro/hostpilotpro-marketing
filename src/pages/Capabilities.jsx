import { Link } from 'react-router-dom';
import useSeo from '../lib/seo.js';
import InternationalRollout from '../components/InternationalRollout.jsx';
import { connections, salesSections } from '../data/capabilities.js';
import FeatureVisualGuide from '../components/FeatureVisualGuide.jsx';

export default function Capabilities() {
  useSeo({ title: 'HostPilot Pro — features & connections', description: 'Marketing, operations, owner reporting and guest services: explore HostPilot Pro workflows and the connections behind them.', path: '/capabilities' });
  return <>
    <section className="shell pb-14 pt-28 sm:pt-32">
      <p className="eyebrow">Features & connections</p>
      <h1 className="h-sec mt-4 max-w-4xl">From the next booking to a better stay.<br /><span className="serif-em text-hp-text2">Give your whole business a shared view.</span></h1>
      <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-hp-text2">Plan marketing around available nights. Give staff the tools to run the property, guests a useful stay portal and owners a clear account of results, costs and decisions.</p>
      <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-hp-text3">These workflows are built around our first operation at Mr Property Siam. Features and provider connections are configured during onboarding; a new company account does not automatically activate every integration.</p>
      <div className="mt-7 flex flex-wrap gap-3">{[['ops','For your team'],['owner','For your owners'],['guest','For your guests']].map(([path,label]) => <Link className="btn btn-quiet" key={path} to={`/${path}`}>{label}</Link>)}</div>
    </section>
    <FeatureVisualGuide />
    {Object.entries(salesSections).map(([key, section]) => <section key={key} className="band py-14" aria-labelledby={`${key}-features`}>
      <div className="shell"><p className="eyebrow">{section.eyebrow}</p><h2 id={`${key}-features`} className="h-sec mt-4 max-w-3xl">{section.title}</h2><p className="mt-4 max-w-3xl text-hp-text2">{section.lede}</p>
        <div className="mt-7 grid gap-4 md:grid-cols-2">{section.items.map(([title,body]) => <article key={title} className="hp-card p-6"><h3 className="text-[18px] font-semibold">{title}</h3><p className="mt-3 text-[15px] leading-relaxed text-hp-text2">{body}</p></article>)}</div>
      </div>
    </section>)}
    <section className="shell py-14"><p className="eyebrow">Connection guide</p><h2 className="h-sec mt-4">Know what each connection does.</h2>
      <div className="mt-7 overflow-x-auto rounded-xl border border-hp-line"><table className="w-full min-w-[650px] text-left text-[14px]">
        <caption className="sr-only">Connection scope and activation requirements</caption><thead className="bg-[color:var(--hp-veil-3)]"><tr>{['Connection','Current scope','What to expect'].map(title => <th key={title} scope="col" className="p-4">{title}</th>)}</tr></thead>
        <tbody>{connections.map(([name,scope,detail]) => <tr key={name} className="border-t border-hp-line"><th scope="row" className="p-4 align-top font-medium">{name}</th><td className="p-4 align-top text-hp-text2">{scope}</td><td className="p-4 align-top text-hp-text2">{detail}</td></tr>)}</tbody>
      </table></div>
    </section>
    <InternationalRollout />
    <section className="shell py-14"><h2 className="h-sub">Start with your company, your properties and your country.</h2><p className="mt-4 max-w-3xl text-hp-text2">During onboarding, we agree the booking connection, payment methods, document workflows and local adaptations your business needs before activation.</p><Link to="/demo" className="btn btn-gold mt-6">Discuss your setup</Link></section>
  </>;
}
