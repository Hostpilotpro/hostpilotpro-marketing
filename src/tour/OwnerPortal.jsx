import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Sparkles,
  Send,
  Check,
  X,
  Gauge,
  FileText,
  CalendarDays,
  Wallet,
  Home,
  Radio,
} from 'lucide-react';
import demo from '../data/demo.js';
import { baht, signedBaht, AreaChart } from '../components/ui.jsx';
import asset from '../lib/asset.js';
import SmartSystems from './SmartSystems.jsx';

/* Plain-language explanations for the verdict drawer. */
const verdicts = {
  'Gross rental revenue':
    'Every confirmed reservation night that fell inside July, at the rate the guest actually paid. 26 nights sold of 31 available, average ฿14,200. Pulled from the channel manager, not typed in by hand.',
  'Channel commission (Airbnb, Booking.com)':
    'What the booking platforms kept. Airbnb took 3% host fee on six reservations; Booking.com took 15% on two. Direct bookings carry no commission, which is why this line falls as direct share grows.',
  'Net rental revenue': 'Gross revenue minus platform commission. This is the figure the management fee is calculated on.',
  'Management fee (18%)':
    '18% of net rental revenue — ฿327,400 × 0.18 = ฿58,932. Charged on net, never on gross, so you are not paying a fee on money the channel kept.',
  'Cleaning & laundry':
    'Seven departure cleans and one mid-stay refresh, plus linen. Each one has a completed task in Ops with photo proof and a timestamp you can open.',
  'Pool & garden service':
    'Contracted weekly pool service and fortnightly garden maintenance, billed at the rate in your management agreement.',
  'Electricity recovered from guests':
    'Guests are billed for consumption above the included allowance. This lands as income to you, not to the manager. Meter photos are on the Documents tab.',
  'Maintenance — pump seal replacement':
    'Pool pump seal failed on 19 July, replaced same day. ฿3,450, inside your standing maintenance allowance, so no approval was required. Invoice and photos attached.',
  'VAT on services (7%)': 'Thai VAT on the service lines above. Not charged on the rental revenue itself.',
  'Net to you':
    'The amount transferred. ฿369,200 − ฿41,800 − ฿58,932 − ฿14,600 − ฿9,800 − ฿3,450 − ฿5,834 + ฿11,240 = ฿246,024. Sent 5 August by Wise, reference ACV-STMT-2607-004.',
};

function useTypewriter(text, active, speed = 9) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) {
      setOut('');
      setDone(false);
      return;
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setOut(text);
      setDone(true);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 5;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return { out, done };
}

function Concierge() {
  const [asked, setAsked] = useState(false);
  const { out, done } = useTypewriter(demo.owner_concierge.answer, asked);
  return (
    <div className="hp-card-flat p-5">
      <div className="flex items-center gap-2">
        <Sparkles size={15} className="text-hp-goldInk" />
        <h4 className="font-display text-[18px] text-hp-text">Ask about your villa</h4>
      </div>
      <p className="mt-1.5 text-[12.5px] text-hp-text3">
        Answers come from your own statements, reservations and task records — not from a generic knowledge base.
      </p>

      <button
        onClick={() => setAsked(true)}
        disabled={asked}
        className={`mt-4 flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-[13.5px] transition ${
          asked
            ? 'border-hp-lineSoft bg-[color:var(--hp-veil-1)] text-hp-text2'
            : 'border-hp-gold/40 bg-[color:var(--hp-gold-wash)] text-hp-text hover:bg-[color:var(--hp-gold-wash-3)]'
        }`}
      >
        <span className="flex-1">{demo.owner_concierge.question}</span>
        {!asked && <Send size={14} className="mt-0.5 shrink-0 text-hp-goldInk" />}
      </button>

      {asked && (
        <div className="mt-3 rounded-xl border border-hp-lineSoft bg-[color:var(--hp-veil-1)] p-4">
          <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-hp-goldDeep">
            <Sparkles size={11} /> HostPilot concierge
          </div>
          <div
            className={`whitespace-pre-wrap text-[13.8px] leading-[1.62] text-hp-text2 ${
              done ? '' : 'typing-caret'
            }`}
          >
            {out}
          </div>
          {done && (
            <button
              onClick={() => setAsked(false)}
              className="mt-3 text-[12px] text-hp-text3 underline decoration-hp-line underline-offset-4 hover:text-hp-goldInk"
            >
              Ask again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function RatePilotCard() {
  const r = demo.ratepilot_approval;
  const [choice, setChoice] = useState(null);
  const confirmation = {
    Approve: `Approved. ฿${r.suggested_thb.toLocaleString()} is live on all channels for ${r.window}. Nothing changed in this demo.`,
    'Approve with cap': `Approved with a ฿15,000 ceiling. RatePilot will move rates up to the cap and no further. Nothing changed in this demo.`,
    Decline: `Declined. The rate stays at ฿${r.current_thb.toLocaleString()} and RatePilot will not ask again for this window. Nothing changed in this demo.`,
  };
  return (
    <div className="hp-card-flat overflow-hidden">
      <div className="flex items-center justify-between border-b border-hp-lineSoft px-5 py-3">
        <div className="flex items-center gap-2">
          <Gauge size={15} className="text-hp-goldInk" />
          <span className="text-[13.5px] font-medium text-hp-text">RatePilot needs your approval</span>
        </div>
        <span className="chip !text-[11px]">{r.strategy} strategy</span>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-end gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-hp-text3">Current rate</div>
            <div className="tnum mt-1 font-display text-[24px] text-hp-text2 line-through decoration-hp-neg/70">
              {baht(r.current_thb)}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-hp-text3">Suggested</div>
            <div className="tnum mt-1 font-display text-[30px] leading-none text-hp-goldInk">
              {baht(r.suggested_thb)}
            </div>
          </div>
          <div className="rounded-full border border-hp-pos/40 bg-[color:var(--hp-pos-wash)] px-3 py-1 text-[12.5px] font-semibold text-hp-pos">
            +{r.delta_pct}%
          </div>
          <div className="ml-auto text-right text-[12px] text-hp-text3">
            {r.villa}
            <br />
            {r.window}
          </div>
        </div>
        <p className="mt-4 text-[13.5px] leading-relaxed text-hp-text2">{r.rationale}</p>
        {!choice ? (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {r.actions.map((a, i) => (
              <button
                key={a}
                onClick={() => setChoice(a)}
                className={`rounded-full px-4 py-2 text-[13.5px] font-semibold transition ${
                  i === 0
                    ? 'border border-hp-gold/70 gold-fill'
                    : 'border border-hp-line text-hp-text hover:border-hp-gold/40'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-hp-pos/30 bg-[color:var(--hp-pos-wash)] p-3.5">
            {choice === 'Decline' ? (
              <X size={15} className="mt-0.5 shrink-0 text-hp-neg" />
            ) : (
              <Check size={15} className="mt-0.5 shrink-0 text-hp-pos" />
            )}
            <div className="flex-1 text-[13px] text-hp-text2">{confirmation[choice]}</div>
            <button onClick={() => setChoice(null)} className="text-[12px] text-hp-text3 hover:text-hp-goldInk">
              Undo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Statement({ highlight = null, flashKey = 0, onBack = null }) {
  const s = demo.owner_statement;
  const [open, setOpen] = useState(null);

  /* A jump from the Smart systems meter card opens and flashes its own line. */
  useEffect(() => {
    if (highlight) setOpen(highlight);
  }, [highlight, flashKey]);

  return (
    <div className="hp-card-flat overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hp-lineSoft px-5 py-4">
        <div>
          <h4 className="font-display text-[19px] text-hp-text">Statement · {s.period}</h4>
          <div className="mt-1 text-[12px] text-hp-text3">
            {s.villa} · {s.nights_sold} of {s.nights_available} nights sold · {s.occupancy_pct}% occupancy ·{' '}
            {baht(s.adr_thb)} ADR
          </div>
        </div>
        <span className="chip !text-[11.5px]" style={{ color: 'var(--hp-pos)' }}>
          {s.status}
        </span>
      </div>
      {highlight && onBack && (
        <div
          className="flex flex-wrap items-center gap-2 border-b border-hp-lineSoft px-5 py-2.5 text-[12px]"
          style={{ background: 'var(--hp-gold-wash)' }}
        >
          <Radio size={12} className="text-hp-goldInk" />
          <span className="text-hp-text2">
            Jumped from Smart systems — this is the line the electricity meter produced.
          </span>
          <button onClick={onBack} className="ml-auto text-hp-goldInk underline decoration-hp-gold/50 underline-offset-4">
            Back to Smart systems
          </button>
        </div>
      )}
      <div className="px-2 py-2 sm:px-3">
        {s.lines.map((l) => {
          const isOpen = open === l.label;
          const strong = l.kind === 'total' || l.kind === 'subtotal';
          const lit = highlight === l.label;
          return (
            <div
              key={`${l.label}-${lit ? flashKey : 'x'}`}
              className={`${strong ? 'border-t border-hp-line' : ''} ${lit ? 'stmt-flash' : ''}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : l.label)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-[color:var(--hp-veil-3)]"
                aria-expanded={isOpen}
              >
                <ChevronDown
                  size={13}
                  className={`shrink-0 text-hp-text3 transition ${isOpen ? 'rotate-180 text-hp-goldInk' : ''}`}
                />
                <span
                  className={`flex-1 text-[13.5px] ${
                    strong ? 'font-semibold text-hp-text' : 'text-hp-text2'
                  }`}
                >
                  {l.label}
                </span>
                <span
                  className={`tnum shrink-0 text-[14px] ${strong ? 'font-semibold' : ''}`}
                  style={{
                    color:
                      l.kind === 'total'
                        ? 'var(--hp-gold)'
                        : l.value_thb < 0
                        ? 'var(--hp-neg)'
                        : 'var(--hp-text)',
                  }}
                >
                  {signedBaht(l.value_thb)}
                </span>
              </button>
              {isOpen && (
                <div className="mx-3 mb-3 rounded-xl border border-hp-gold/25 bg-[color:var(--hp-gold-wash)] p-3.5">
                  <div className="text-[10.5px] uppercase tracking-[0.14em] text-hp-goldDeep">Verdict</div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-hp-text2">{verdicts[l.label]}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hp-lineSoft bg-[color:var(--hp-veil-1)] px-5 py-3.5 text-[12.5px] text-hp-text3">
        <span>
          Paid {s.payout.sent} · {s.payout.method} · ref {s.payout.reference}
        </span>
        <span className="tnum text-hp-text2">
          {baht(s.payout.amount_thb)} · approx ${s.payout.amount_usd.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

const ownerNav = [
  { icon: Home, label: 'Overview' },
  { icon: FileText, label: 'Statements' },
  { icon: CalendarDays, label: 'Calendar' },
  { icon: Wallet, label: 'Payouts' },
  { icon: Gauge, label: 'Approvals' },
  { icon: Radio, label: 'Smart systems' },
];

export default function OwnerPortal() {
  const d = demo.owner_dashboard;
  const [nav, setNav] = useState('Overview');
  const [highlight, setHighlight] = useState(null);
  const [flashKey, setFlashKey] = useState(0);
  const stRef = useRef(null);

  /* Cross-tab jump: the electricity meter on Smart systems produces the
     "Electricity recovered from guests" income line, so clicking it lands on
     that line with the verdict already open. */
  const openStatementLine = (label) => {
    setNav('Statements');
    setHighlight(label);
    setFlashKey((n) => n + 1);
    setTimeout(() => stRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  };

  return (
    <div className="replica-light bg-hp-bg">
      <div className="flex items-center gap-3 border-b border-hp-lineSoft bg-[color:var(--hp-panel-bar)] px-4 py-2.5">
        <div className="font-display text-[13.5px] text-hp-text">Azure Coast Villas</div>
        <span className="hidden text-[11px] uppercase tracking-[0.14em] text-hp-text3 sm:inline">
          Owner portal
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden text-[12px] text-hp-text2 sm:inline">{demo.owner.name}</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-hp-goldDeep text-[10.5px] font-semibold text-[color:var(--hp-on-gold)]">
            {demo.owner.initials}
          </span>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-hp-lineSoft px-3 py-2">
        {ownerNav.map((n) => {
          const Icon = n.icon;
          const active = nav === n.label;
          return (
            <button
              key={n.label}
              onClick={() => {
                setNav(n.label);
                if (n.label !== 'Statements') setHighlight(null);
                if (n.label === 'Statements')
                  setTimeout(
                    () => stRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
                    60
                  );
              }}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] transition ${
                active
                  ? 'border border-hp-gold/40 bg-[color:var(--hp-gold-wash-2)] text-hp-goldInk'
                  : 'text-hp-text3 hover:text-hp-text2'
              }`}
            >
              <Icon size={13} /> {n.label}
            </button>
          );
        })}
      </div>

      {nav === 'Smart systems' ? (
        <div className="p-3 sm:p-4">
          <SmartSystems onOpenStatement={() => openStatementLine('Electricity recovered from guests')} />
        </div>
      ) : (
      <div className="space-y-3.5 p-3 sm:p-4">
        <div className="grain relative overflow-hidden rounded-2xl border border-hp-line">
          <img src={asset('/img/villa-day.jpg')} alt="" className="h-[150px] w-full object-cover sm:h-[180px]" loading="lazy" />
          <div className="absolute inset-0 scrim-d" />
          <div className="absolute inset-0 flex flex-col justify-center p-5 sm:p-7">
            <div className="eyebrow">{demo.owner.greeting}</div>
            <h3 className="mt-2 max-w-[80%] font-display text-[clamp(1.2rem,1rem+1.6vw,2.05rem)] font-medium leading-tight text-hp-text">
              {d.hero_line}
            </h3>
            <p className="mt-2 text-[13px] text-hp-text2">
              Owner since {demo.owner.owner_since} · {demo.owner.based_in}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {d.tiles.map((t) => (
            <div key={t.label} className="hp-card-flat p-4">
              <div className="text-[11px] uppercase tracking-[0.09em] text-hp-text3">{t.label}</div>
              <div className="tnum mt-2 font-display text-[clamp(1.25rem,1rem+0.9vw,1.7rem)] leading-none text-hp-text">
                {t.value}
              </div>
              <div className="mt-1.5 text-[11.5px] text-hp-text3">{t.delta || t.sub}</div>
            </div>
          ))}
        </div>

        <div ref={stRef}>
          <Statement
            highlight={highlight}
            flashKey={flashKey}
            onBack={() => setNav('Smart systems')}
          />
        </div>

        <div className="grid gap-3.5 lg:grid-cols-2">
          <div className="hp-card-flat p-5">
            <h4 className="font-display text-[18px] text-hp-text">Next payout</h4>
            <div className="mt-3 flex items-end gap-3">
              <div className="tnum font-display text-[28px] leading-none text-hp-goldInk">
                {baht(d.upcoming_payout.estimate_thb)}
              </div>
              <div className="text-[12px] text-hp-text3">expected {d.upcoming_payout.expected}</div>
            </div>
            <div className="mt-2 text-[12.5px] text-hp-text3">{d.upcoming_payout.confidence}</div>
            <div className="mt-4 border-t border-hp-lineSoft pt-4">
              <div className="text-[11px] uppercase tracking-[0.1em] text-hp-text3">
                Confirmed pipeline · next 90 days
              </div>
              <div className="tnum mt-1.5 font-display text-[22px] text-hp-text">
                {baht(d.pipeline_next_90d_thb)}
              </div>
              <div className="mt-3">
                <AreaChart series={[41, 48, 52, 58, 61, 66, 71, 69, 74, 78, 82, 79]} height={80} id="own-pipe" />
              </div>
            </div>
          </div>
          <RatePilotCard />
        </div>

        <Concierge />
      </div>
      )}
    </div>
  );
}
