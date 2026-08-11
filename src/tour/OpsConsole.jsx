import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Home,
  Building2,
  ClipboardList,
  Wallet,
  TrendingUp,
  Settings,
  Search,
  Star,
  ArrowRight,
  ArrowLeft,
  Command,
  CircleDot,
} from 'lucide-react';
import demo from '../data/demo.js';
import { AreaChart, baht } from '../components/ui.jsx';
import asset from '../lib/asset.js';
import { ItemView, sectionLanding } from './ops/index.jsx';
import { dossierTabViews } from './ops/DossierTabs.jsx';

const rail = [
  { key: 'home', icon: Home, label: 'Home' },
  { key: 'properties', icon: Building2, label: 'Properties' },
  { key: 'operations', icon: ClipboardList, label: 'Operations' },
  { key: 'finance', icon: Wallet, label: 'Finance' },
  { key: 'growth', icon: TrendingUp, label: 'Growth' },
  { key: 'admin', icon: Settings, label: 'Admin' },
];

const sidebars = {
  home: {
    title: 'Home',
    sub: 'Personal & cross-cutting',
    groups: [
      { label: 'Today', items: ['Dashboard', 'My day', 'Arrivals & departures', 'Inbox'] },
      { label: 'Personal', items: ['My tasks', 'My requests', 'My bills'] },
    ],
  },
  properties: {
    title: 'Properties',
    sub: 'Villas, owners & onboarding',
    groups: [
      { label: 'Portfolio', items: ['All villas', 'Property drift', 'Hero photos', 'Portfolio analytics'] },
      { label: 'Owners', items: ['Owner directory', 'Owner statements', 'Onboarding'] },
    ],
  },
  operations: {
    title: 'Operations',
    sub: 'Daily field ops',
    groups: [
      { label: 'Today', items: ['Tasks', 'Reservations feed', 'Inspections', 'Checkout'] },
      { label: 'Field services', items: ['Service schedule', 'Damage claims', 'TM30'] },
    ],
  },
  finance: {
    title: 'Finance',
    sub: 'Money in · money out',
    groups: [
      { label: 'Statements', items: ['Finance hub', 'Statements', 'Owner balances', 'Payment queue'] },
      { label: 'Ledgers & cash', items: ['Petty cash', 'Bills', 'Payouts'] },
    ],
  },
  growth: {
    title: 'Growth',
    sub: 'Rates, reviews, concierge',
    groups: [
      { label: 'Revenue', items: ['RatePilot', 'Rate calendar', 'Comp set'] },
      { label: 'Guest', items: ['Concierge sales', 'Reviews', 'Upsell catalogue'] },
    ],
  },
  admin: {
    title: 'Admin',
    sub: 'People & settings',
    groups: [
      { label: 'People', items: ['Users & roles', 'Staff directory', 'Payroll inputs'] },
      { label: 'System', items: ['Hostaway sync', 'Audit log', 'Settings'] },
    ],
  },
};

const villas = [
  {
    name: demo.hero_villa.name,
    code: demo.hero_villa.code,
    area: 'Bophut',
    bedrooms: demo.hero_villa.bedrooms,
    occupancy_pct: demo.hero_villa.kpis.occupancy_mtd_pct,
    adr_thb: demo.hero_villa.kpis.adr_thb,
    rating: demo.hero_villa.kpis.guest_rating,
  },
  ...demo.other_villas,
];

/* ---------------------------------------------------------------- palette */

function CommandPalette({ open, onClose, onPick }) {
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return villas.filter((v) => !t || v.name.toLowerCase().includes(t) || v.code.toLowerCase().includes(t));
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ('');
      setI(0);
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setI((v) => Math.min(v + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setI((v) => Math.max(v - 1, 0));
      }
      if (e.key === 'Enter' && results[i]) onPick(results[i]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, i, onClose, onPick]);

  if (!open) return null;
  return (
    <div className="absolute inset-0 z-30 flex items-start justify-center bg-[color:var(--hp-modal-veil)] px-4 pt-10 backdrop-blur-sm sm:pt-16">
      <div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-hp-line bg-[color:var(--hp-panel-bar)] shadow-frame">
        <div className="flex items-center gap-2 border-b border-hp-lineSoft p-3">
          <Search size={15} className="text-hp-text3" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setI(0);
            }}
            placeholder="Search villas, tasks, owners…"
            className="w-full rounded-md border border-hp-gold/40 bg-transparent px-2 py-1.5 text-[14px] text-hp-text outline-none placeholder:text-hp-text3"
          />
          <button
            onClick={onClose}
            className="rounded border border-hp-line px-1.5 py-0.5 text-[10.5px] text-hp-text3"
          >
            esc
          </button>
        </div>
        <div className="max-h-[300px] overflow-y-auto py-1.5">
          <div className="px-3 py-1.5 text-[10.5px] uppercase tracking-[0.14em] text-hp-text3">Villas</div>
          {results.length === 0 && (
            <div className="px-3 py-6 text-center text-[13px] text-hp-text3">
              Nothing matches “{q}”. Try a villa code such as {demo.hero_villa.code}.
            </div>
          )}
          {results.map((v, idx) => (
            <button
              key={v.code}
              onMouseEnter={() => setI(idx)}
              onClick={() => onPick(v)}
              className={`flex w-full items-center gap-3 px-3 py-2 text-left ${
                idx === i ? 'bg-[color:var(--hp-gold-wash-2)]' : ''
              }`}
              style={idx === i ? { boxShadow: 'inset 2px 0 0 var(--hp-gold)' } : undefined}
            >
              <Building2 size={14} className="shrink-0 text-hp-goldDim" />
              <span className="flex-1 truncate text-[13.5px] text-hp-text">{v.name}</span>
              <span className="tnum text-[11.5px] text-hp-text3">{v.code}</span>
              {idx === i && <ArrowRight size={13} className="text-hp-goldInk" />}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-hp-lineSoft px-3 py-2 text-[10.5px] text-hp-text3">
          <span>↑↓ navigate · ↵ open · esc close</span>
          <span className="uppercase tracking-[0.14em]">HostPilot Pro · Ops</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- views */

function Dashboard({ onOpenVilla }) {
  const d = demo.ops_dashboard;
  const pe = d.profit_estimate;
  return (
    <div className="space-y-3.5">
      <div className="grain relative overflow-hidden rounded-2xl border border-hp-line panel-grad p-6 sm:p-8">
        <div className="eyebrow">Home · overview</div>
        <h3 className="mt-3 font-display text-[clamp(1.6rem,1rem+2.2vw,2.6rem)] font-medium text-hp-text">
          {d.greeting}
          <span className="text-hp-goldInk">.</span>
        </h3>
        <p className="mt-2 max-w-xl font-display text-[16px] italic leading-snug text-hp-text2">
          Your portfolio is running at <span className="font-semibold not-italic text-hp-text">78% occupancy</span>{' '}
          across <span className="font-semibold not-italic text-hp-text">24 villas</span>, with 9 turning over today.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {d.context_chips.map((c, idx) => (
            <span key={c} className="chip">
              <CircleDot
                size={11}
                style={{ color: idx === 2 ? 'var(--hp-pos)' : idx === 1 ? 'var(--hp-neg)' : 'var(--hp-gold)' }}
              />
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {d.tiles.map((t) => (
          <div key={t.label} className="hp-card-flat min-w-0 p-4">
            <div className="text-[11px] uppercase tracking-[0.09em] text-hp-text3">{t.label}</div>
            <div className="mt-2.5 flex min-w-0 flex-wrap items-end gap-x-2 gap-y-1">
              <div className="tnum min-w-0 font-display text-[clamp(1.05rem,0.72rem+1.6vw,1.9rem)] leading-none text-hp-text">
                {t.value}
              </div>
              {t.delta && <span className="tnum text-[12px] font-semibold text-hp-pos">{t.delta}</span>}
            </div>
            <div className="mt-2 text-[11.5px] text-hp-text3">{t.sub}</div>
          </div>
        ))}
      </div>

      <div className="hp-card-flat p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-display text-[19px] text-hp-text">Occupancy · last 30 days</h4>
            <div className="mt-1 text-[12px] text-hp-text3">Portfolio-wide nightly occupancy across 24 villas</div>
          </div>
          <div className="text-right">
            <span className="tnum font-display text-[28px] text-hp-text">78</span>
            <span className="text-[13px] text-hp-text3">%</span>
            <div className="text-[11.5px] text-hp-text3">today · +6 pts vs last week</div>
          </div>
        </div>
        <div className="mt-4">
          <AreaChart series={demo.ops_dashboard.occupancy_series_30d} height={130} id="ops-occ" />
        </div>
      </div>

      <div className="hp-card-flat p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="font-display text-[19px] text-hp-text">Profit estimate · {pe.month}</h4>
          <span className="text-[11.5px] text-hp-text3">Estimate — not from closed statements</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['House mgmt fee', pe.house_mgmt_fee_thb, 'What the house keeps after owner splits'],
            ['Total service income', pe.total_service_income_thb, 'Laundry · cleaning · pool · garden'],
            ['Total mgmt fee (gross)', pe.total_mgmt_fee_gross_thb, 'Before expenses'],
            ['Total expenses', pe.total_expenses_thb, 'Salaries, recurring, 3-month average'],
          ].map(([label, v, sub], i) => (
            <div key={label} className="rounded-xl border border-hp-lineSoft bg-[color:var(--hp-veil-1)] p-3.5">
              <div className="text-[11px] uppercase tracking-[0.09em] text-hp-text3">{label}</div>
              <div
                className="tnum mt-2 font-display text-[21px] leading-none"
                style={{ color: i === 3 ? 'var(--hp-neg)' : 'var(--hp-text)' }}
              >
                {baht(v)}
              </div>
              <div className="mt-1.5 text-[11px] text-hp-text3">{sub}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(pe.service_breakdown).map(([k, v]) => (
            <span key={k} className="chip tnum !text-[11.5px]">
              {k} {baht(v)}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-hp-gold/25 bg-[color:var(--hp-gold-wash)] px-4 py-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-hp-goldDeep">Estimated profit</div>
          <div className="tnum font-display text-[26px] text-hp-goldInk">{baht(pe.estimated_profit_thb)}</div>
        </div>
      </div>

      <div className="hp-card-flat p-5">
        <h4 className="font-display text-[19px] text-hp-text">Arrivals & departures · today</h4>
        <div className="mt-3 overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[560px] text-left text-[13px]">
            <thead className="text-[11px] uppercase tracking-[0.09em] text-hp-text3">
              <tr>
                <th className="pb-2 font-medium">Villa</th>
                <th className="pb-2 font-medium">Guest</th>
                <th className="pb-2 font-medium">Nights</th>
                <th className="pb-2 font-medium">Value</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-hp-text2">
              {demo.arrivals_today.map((a) => (
                <tr key={a.villa} className="border-t border-hp-lineSoft">
                  <td className="py-2.5">
                    <button
                      className="text-hp-text transition hover:text-hp-goldInk"
                      onClick={() => onOpenVilla(villas.find((v) => v.name === a.villa) || villas[0])}
                    >
                      {a.villa}
                    </button>
                  </td>
                  <td className="py-2.5">{a.guest}</td>
                  <td className="tnum py-2.5">
                    {a.nights} · {a.guests} pax
                  </td>
                  <td className="tnum py-2.5">{baht(a.value_thb)}</td>
                  <td className="py-2.5">
                    <span className="chip !text-[11.5px]">{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function VillaList({ onOpen }) {
  return (
    <div className="space-y-3.5">
      <div className="grain relative overflow-hidden rounded-2xl border border-hp-line panel-grad p-6 sm:p-8">
        <div className="eyebrow">Portfolio · 24 villas</div>
        <h3 className="mt-3 font-display text-[clamp(1.5rem,1rem+2vw,2.4rem)] font-medium text-hp-text">
          Properties <span className="italic text-hp-text2">· every villa, one file each</span>
        </h3>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {villas.map((v) => (
          <button
            key={v.code}
            onClick={() => onOpen(v)}
            className="hp-card-flat p-4 text-left transition hover:border-hp-gold/40"
          >
            <div className="flex items-baseline justify-between gap-2">
              <div className="truncate font-display text-[16px] text-hp-text">{v.name}</div>
              <span className="tnum shrink-0 text-[11px] text-hp-text3">{v.code}</span>
            </div>
            <div className="mt-1 text-[12px] text-hp-text3">
              {v.bedrooms} bed · {v.area}
            </div>
            <div className="tnum mt-3 flex gap-4 text-[12.5px] text-hp-text2">
              <span>{v.occupancy_pct}% occ</span>
              <span>{baht(v.adr_thb)} ADR</span>
              <span className="text-hp-goldInk">★ {v.rating}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="text-center text-[12px] text-hp-text3">
        Six of Azure Coast&rsquo;s 24 demo villas are populated. Press ⌘K to search them.
      </div>
    </div>
  );
}

const dossierTabs = ['Overview', 'Bookings', 'House manual', 'Photos', 'Owner', 'Financials', 'History'];

function Dossier({ villa, onBack }) {
  const [tab, setTab] = useState('Overview');
  const isHero = villa.name === demo.hero_villa.name;
  const k = demo.hero_villa.kpis;
  const grid = useMemo(() => {
    // Deterministic 30-day booking grid seeded off the villa code.
    const seed = villa.code.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return Array.from({ length: 30 }, (_, i) => {
      const v = (Math.sin(seed + i * 1.7) + 1) / 2;
      return v < villa.occupancy_pct / 100 ? 'booked' : 'open';
    });
  }, [villa]);
  const bookedCount = grid.filter((g) => g === 'booked').length;

  return (
    <div className="space-y-3.5">
      <div className="relative overflow-hidden rounded-2xl border border-hp-line">
        <img
          src={asset('/img/villa-sapphire-hero.jpg')}
          alt=""
          className="h-[220px] w-full object-cover sm:h-[290px]"
          loading="lazy"
        />
        <div className="absolute inset-0 scrim-h" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <button
            onClick={onBack}
            className="chip mb-4 !text-[11.5px] transition hover:border-hp-gold/50 hover:text-hp-text"
          >
            <ArrowLeft size={12} /> All villas
          </button>
          <div className="eyebrow">Properties · villa dossier</div>
          <h3 className="mt-2 max-w-[70%] font-display text-[clamp(1.35rem,1rem+1.8vw,2.2rem)] font-medium text-hp-text">
            {villa.name}
          </h3>
          <p className="mt-1 font-display text-[14px] italic text-hp-text2">
            {villa.bedrooms}-bedroom villa · {villa.area} · Koh Samui
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="chip !text-[11.5px]">Direct-managed</span>
            <span className="chip !text-[11.5px]" style={{ color: 'var(--hp-pos)' }}>
              ✓ Synced
            </span>
          </div>
        </div>
        <div className="absolute right-4 top-4 hidden w-[230px] grid-cols-2 gap-2 lg:grid">
          {[
            [`${villa.occupancy_pct}%`, 'Occupancy'],
            [baht(villa.adr_thb), 'ADR'],
            [String(villa.rating), 'Rating'],
            [String(villa.bedrooms), 'Bedrooms'],
          ].map(([v, l]) => (
            <div
              key={l}
              className="rounded-lg border border-hp-line bg-[color:var(--hp-scrim-panel)] px-3 py-2.5 backdrop-blur-md"
            >
              <div className="tnum font-display text-[19px] leading-none text-hp-text">{v}</div>
              <div className="mt-1 text-[9.5px] uppercase tracking-[0.14em] text-hp-text3">{l}</div>
            </div>
          ))}
          <div className="col-span-2 rounded-lg border border-hp-line bg-[color:var(--hp-scrim-panel)] px-3 py-2.5 backdrop-blur-md">
            <div className="font-display text-[17px] italic leading-none text-hp-text">
              {isHero ? demo.hero_villa.manager : 'Ploy S.'}
            </div>
            <div className="mt-1 text-[9.5px] uppercase tracking-[0.14em] text-hp-text3">Manager</div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto no-scrollbar rounded-xl border border-hp-lineSoft bg-[color:var(--hp-veil-2)] p-1.5">
        {dossierTabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-[13px] transition ${
              tab === t ? 'bg-[color:var(--hp-gold-wash-2)] text-hp-goldInk' : 'text-hp-text3 hover:text-hp-text2'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <>
          <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            {[
              ['Revenue · MTD', isHero ? baht(k.revenue_mtd_thb) : baht(Math.round(villa.adr_thb * 21)), '+18% vs last month'],
              ['Occupancy · MTD', `${villa.occupancy_pct}%`, `${bookedCount} of 30 nights`],
              ['Guest rating', String(villa.rating), isHero ? `${k.review_count} reviews` : '41 reviews'],
              ['Open items', isHero ? String(k.open_items) : '1', 'Needs action'],
            ].map(([l, v, s]) => (
              <div key={l} className="hp-card-flat p-4">
                <div className="text-[11px] uppercase tracking-[0.09em] text-hp-text3">{l}</div>
                <div className="tnum mt-2 font-display text-[22px] leading-none text-hp-text">{v}</div>
                <div className="mt-1.5 text-[11.5px] text-hp-text3">{s}</div>
              </div>
            ))}
          </div>
          <div className="grid gap-3.5 lg:grid-cols-2">
            <div className="hp-card-flat p-5">
              <h4 className="font-display text-[18px] text-hp-text">Activity timeline</h4>
              <div className="mt-4 space-y-4">
                {[
                  ['Guest in-house', 'T. Lindqvist · 7 nights · 6 guests', 'now'],
                  ['Departure clean completed', `${demo.hero_villa.manager} · photo proof attached`, '2d'],
                  ['Pool pump seal replaced', '฿3,450 · inside maintenance allowance', '3d'],
                  ['Statement issued to owner', 'July 2026 · ฿246,024 net', '5d'],
                  ['Rate change approved by owner', 'RatePilot · Balanced strategy', '8d'],
                ].map(([t, s, when]) => (
                  <div key={t} className="flex gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hp-goldDeep" />
                    <div className="flex-1">
                      <div className="text-[13.5px] text-hp-text">{t}</div>
                      <div className="text-[12px] text-hp-text3">{s}</div>
                    </div>
                    <div className="text-[11px] text-hp-text3">{when}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hp-card-flat p-5">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-[18px] text-hp-text">Next 30 days</h4>
                <span className="chip !text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-hp-gold" /> RatePilot on
                </span>
              </div>
              <div className="mt-3 flex gap-4 text-[11.5px] text-hp-text3">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: 'rgba(196,112,92,0.55)' }} /> Booked
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm border border-hp-line" /> Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: 'rgba(127,166,107,0.6)' }} /> Today
                </span>
              </div>
              <div className="mt-3 grid grid-cols-10 gap-1.5">
                {grid.map((g, i) => (
                  <div
                    key={i}
                    className="tnum flex aspect-square items-center justify-center rounded-md text-[10.5px]"
                    style={
                      i === 0
                        ? { background: 'rgba(127,166,107,0.45)', color: 'var(--hp-on-status)' }
                        : g === 'booked'
                        ? { background: 'rgba(196,112,92,0.42)', color: 'var(--hp-on-status)' }
                        : { border: '1px solid var(--hp-line)', color: 'var(--hp-text-3)' }
                    }
                  >
                    {((i + 9) % 31) + 1}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[11.5px] text-hp-text3">
                {bookedCount} of 30 nights booked · next turnover in 2 days
              </div>
            </div>
          </div>
        </>
      )}

      {tab !== 'Overview' &&
        (() => {
          const TabView = dossierTabViews[tab];
          return TabView ? <TabView villa={villa} /> : null;
        })()}
    </div>
  );
}

function Tasks() {
  const t = demo.tasks_board;
  const [cards, setCards] = useState(t.sample);
  const columns = t.columns;
  const advance = (title) =>
    setCards((cs) =>
      cs.map((c) =>
        c.title === title
          ? { ...c, state: columns[Math.min(columns.indexOf(c.state) + 1, columns.length - 1)] }
          : c
      )
    );
  return (
    <div className="space-y-3.5">
      <div className="grain relative overflow-hidden rounded-2xl border border-hp-line panel-grad p-6 sm:p-8">
        <div className="eyebrow">Operations · daily field ops</div>
        <h3 className="mt-3 font-display text-[clamp(1.5rem,1rem+2vw,2.4rem)] font-medium text-hp-text">
          Tasks <span className="text-hp-goldDeep">·</span>{' '}
          <span className="italic">what needs to happen today</span>
        </h3>
        <p className="mt-2 max-w-lg font-display text-[15px] italic text-hp-text2">
          Check-ins, check-outs, cleaning, pool, maintenance and ad-hoc work across the whole portfolio.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {[
          ['Open · this week', t.open_this_week, ''],
          ['Scheduled today', t.scheduled_today, ''],
          ['Unassigned', t.unassigned, 'Needs an owner'],
          ['Overdue', t.overdue, 'Past scheduled date'],
        ].map(([l, v, s], i) => (
          <div key={l} className="hp-card-flat p-4">
            <div className="text-[11px] uppercase tracking-[0.09em] text-hp-text3">{l}</div>
            <div
              className="tnum mt-2 font-display text-[26px] leading-none"
              style={{ color: i === 3 ? 'var(--hp-neg)' : 'var(--hp-text)' }}
            >
              {v}
            </div>
            {s && <div className="mt-1.5 text-[11.5px] text-hp-text3">{s}</div>}
          </div>
        ))}
      </div>

      <div className="hp-card-flat p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="font-display text-[19px] text-hp-text">
            Task <span className="italic">board</span>
          </h4>
          <span className="text-[11.5px] text-hp-text3">Click a card to move it along — demo only</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((col) => {
            const list = cards.filter((c) => c.state === col);
            return (
              <div key={col} className="rounded-xl border border-hp-lineSoft bg-[color:var(--hp-veil-1)] p-3">
                <div className="flex items-center justify-between">
                  <div className="text-[12.5px] font-medium text-hp-text2">{col}</div>
                  <span className="tnum text-[11px] text-hp-text3">{list.length}</span>
                </div>
                <div className="mt-3 space-y-2.5">
                  {list.length === 0 && (
                    <div className="rounded-lg border border-dashed border-hp-line px-3 py-6 text-center font-display text-[13px] italic text-hp-text3">
                      All caught up
                    </div>
                  )}
                  {list.map((c) => (
                    <button
                      key={c.title}
                      onClick={() => advance(c.title)}
                      className="w-full rounded-lg border border-hp-line bg-[color:var(--hp-veil-2)] p-3 text-left transition hover:border-hp-gold/40"
                    >
                      <div className="text-[13px] leading-snug text-hp-text">{c.title}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-hp-text3">
                        <span className="rounded-full border border-hp-line px-1.5 py-0.5">{c.dept}</span>
                        <span>{c.assignee}</span>
                        <span>· {c.due}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- shell */

export default function OpsConsole() {
  const [section, setSection] = useState('home');
  const [view, setView] = useState({ name: 'dashboard' });
  const [palette, setPalette] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openVilla = (v) => {
    setSection('properties');
    setView({ name: 'dossier', villa: v });
    setPalette(false);
  };

  /** Every sidebar destination routes through here. */
  const goTo = (sec, item) => {
    setSection(sec);
    if (item === 'Dashboard') setView({ name: 'dashboard' });
    else if (item === 'All villas') setView({ name: 'villas' });
    else if (item === 'Tasks') setView({ name: 'tasks' });
    else setView({ name: 'item', item });
  };

  const sb = sidebars[section];
  const activeItem =
    view.name === 'item'
      ? view.item
      : view.name === 'tasks'
      ? 'Tasks'
      : view.name === 'dossier' || view.name === 'villas'
      ? 'All villas'
      : 'Dashboard';

  return (
    <div ref={wrapRef} className="replica-dark relative bg-hp-bg">
      {/* top bar */}
      <div className="flex items-center gap-3 border-b border-hp-lineSoft bg-[color:var(--hp-panel-bar)] px-3 py-2.5">
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-hp-line text-hp-text3">
            <Command size={12} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[13.5px] text-hp-text">Azure Coast Villas</div>
            <div className="text-[9.5px] uppercase tracking-[0.14em] text-hp-text3">HostPilot Pro · Ops</div>
          </div>
        </div>
        <div className="hidden text-[11.5px] text-hp-text3 md:block">
          {sb.title} <span className="text-hp-line">›</span>{' '}
          <span className="text-hp-text2">{activeItem}</span>
        </div>
        <button
          onClick={() => setPalette(true)}
          className="ml-auto flex w-full max-w-[300px] items-center gap-2 rounded-lg border border-hp-line bg-[color:var(--hp-veil-2)] px-2.5 py-1.5 text-left text-[12.5px] text-hp-text3 transition hover:border-hp-gold/40"
        >
          <Search size={13} />
          <span className="flex-1 truncate">Search villas, tasks, owners…</span>
          <span className="rounded border border-hp-line px-1 py-0.5 text-[10px]">⌘K</span>
        </button>
        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-hp-goldDeep text-[10.5px] font-semibold text-[color:var(--hp-on-gold)]">
            AC
          </div>
          <div className="leading-tight">
            <div className="text-[11.5px] text-hp-text">Main office</div>
            <div className="text-[9.5px] uppercase tracking-[0.12em] text-hp-text3">Admin</div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* icon rail */}
        <div className="flex w-11 shrink-0 flex-col items-center gap-1.5 border-r border-hp-lineSoft bg-[color:var(--hp-rail-bg)] py-3">
          {rail.map((r) => {
            const Icon = r.icon;
            const active = section === r.key;
            return (
              <button
                key={r.key}
                onClick={() => goTo(r.key, sectionLanding[r.key])}
                title={r.label}
                aria-label={r.label}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                  active
                    ? 'border border-hp-gold/45 bg-[color:var(--hp-gold-wash-2)] text-hp-goldInk'
                    : 'text-hp-text3 hover:bg-[color:var(--hp-veil-3)] hover:text-hp-text2'
                }`}
              >
                <Icon size={15} />
              </button>
            );
          })}
        </div>

        {/* contextual sidebar */}
        <div className="hidden w-[186px] shrink-0 border-r border-hp-lineSoft bg-[color:var(--hp-sidebar-bg)] px-3 py-3.5 md:block">
          <div className="text-[9.5px] uppercase tracking-[0.14em] text-hp-text3">{sb.sub}</div>
          <div className="mt-1 font-display text-[18px] text-hp-text">{sb.title}</div>
          <div className="mt-4 space-y-4">
            {sb.groups.map((g) => (
              <div key={g.label}>
                <div className="text-[9.5px] uppercase tracking-[0.14em] text-hp-text3">{g.label}</div>
                <div className="mt-1.5 space-y-0.5">
                  {g.items.map((it) => {
                    const active = it === activeItem;
                    return (
                      <button
                        key={it}
                        onClick={() => goTo(section, it)}
                        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12.5px] transition ${
                          active
                            ? 'border border-hp-gold/35 bg-[color:var(--hp-gold-wash-2)] text-hp-text'
                            : 'text-hp-text2 hover:bg-[color:var(--hp-veil-3)]'
                        }`}
                      >
                        <span className="flex-1 truncate">{it}</span>
                        {active && <Star size={10} className="opacity-50" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* main */}
        <div className="min-w-0 flex-1 overflow-hidden p-3 sm:p-4">
          {/* on phones the contextual sidebar is hidden, so its items live here */}
          <div className="-mx-3 mb-3 flex gap-1.5 overflow-x-auto px-3 no-scrollbar md:hidden">
            {sb.groups.flatMap((g) => g.items).map((it) => (
              <button
                key={it}
                onClick={() => goTo(section, it)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[12px] transition ${
                  it === activeItem
                    ? 'border-hp-gold/45 bg-[color:var(--hp-gold-wash-2)] text-hp-goldInk'
                    : 'border-hp-line text-hp-text3'
                }`}
              >
                {it}
              </button>
            ))}
          </div>
          {view.name === 'dashboard' && <Dashboard onOpenVilla={openVilla} />}
          {view.name === 'dossier' && (
            <Dossier villa={view.villa} onBack={() => setView({ name: 'villas' })} />
          )}
          {view.name === 'villas' && <VillaList onOpen={(v) => setView({ name: 'dossier', villa: v })} />}
          {view.name === 'tasks' && <Tasks />}
          {view.name === 'item' && <ItemView item={view.item} goTo={goTo} />}
        </div>
      </div>

      <CommandPalette open={palette} onClose={() => setPalette(false)} onPick={openVilla} />
    </div>
  );
}
