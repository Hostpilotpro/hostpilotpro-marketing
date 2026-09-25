import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, Languages, Scale, CreditCard } from 'lucide-react';

export default function InternationalRollout({ compact = false }) {
  if (compact) return <div className="mt-5 max-w-3xl rounded-xl border border-hp-line bg-[color:var(--hp-veil-1)] p-4 text-[13px] leading-relaxed text-hp-text2">
    <p>English, Thai and Burmese are the current setup for our first client, Mr Property Siam. International rollout will adapt languages, country-specific legal settings and payment integrations market by market; it is not yet available everywhere.</p>
    <Link className="mt-2 inline-flex items-center gap-2 text-hp-goldInk" to="/#international">See the international rollout plan <ArrowRight size={13} /></Link>
  </div>;

  return <section id="international" className="band py-14 sm:py-20 scroll-mt-24" aria-labelledby="international-title">
    <div className="shell">
      <div className="flex flex-wrap items-center gap-3">
        <span className="eyebrow inline-flex items-center gap-2"><Globe2 size={15} />International direction</span>
        <span className="chip !text-[12px]">Planned market-by-market rollout</span>
      </div>
      <h2 id="international-title" className="h-sec mt-4 max-w-3xl">Our first client is in Thailand.<br /><span className="serif-em text-hp-text2">Our ambition is international.</span></h2>
      <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-hp-text2">Mr Property Siam is the first client using HostPilot Pro. Its English, Thai and Burmese setup reflects its team, not a three-language limit on the product’s future. We plan to develop each market’s edition around the people, rules and payment methods that belong there.</p>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {[
          [Languages, 'Languages for the team', 'Planned editions for Spanish-speaking and French-speaking markets, the Philippines and Indonesia will adapt interface language and local terminology to each operator’s needs.'],
          [Scale, 'Country-specific settings', 'Legal, tax, payroll and document settings will be developed and reviewed for each country before release. Translating a screen is not the same as making it suitable for that jurisdiction.'],
          [CreditCard, 'Payments that fit the region', 'We intend to integrate payment providers and methods appropriate to each market. Thailand’s PromptPay is not the default answer for operators in other regions.'],
        ].map(([Icon, title, text]) => <article key={title} className="hp-card p-5">
          <Icon size={21} className="text-hp-goldInk" />
          <h3 className="mt-4 text-[17px] font-semibold text-hp-text">{title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-hp-text2">{text}</p>
        </article>)}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
        <p className="max-w-2xl text-[13px] leading-relaxed text-hp-text3">These are planned adaptations, not a claim of current worldwide language coverage, legal compliance or payment availability. Country scope, supported providers and launch readiness will be confirmed before onboarding.</p>
        <Link className="btn btn-quiet" to="/demo">Discuss your market <ArrowRight size={15} /></Link>
      </div>
    </div>
  </section>;
}
