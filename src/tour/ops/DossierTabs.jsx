/**
 * Villa dossier tabs — everything other than Overview, which lives in
 * OpsConsole.jsx. Figures are derived from the villa passed in, so any of the
 * six demo villas produces an internally consistent file.
 */
import demo from '../../data/demo.js';
import asset from '../../lib/asset.js';
import { baht, signedBaht } from '../../components/ui.jsx';
import { Card, KpiRow, Pill, Table, Meter, statusTone } from './shared.jsx';

const sum = (a, f) => a.reduce((t, x) => t + f(x), 0);
const vd = demo.villa_detail;
const photoFiles = ['/img/villa-sapphire-hero.jpg', '/img/villa-day.jpg', '/img/samui-coast.jpg'];

const ownerFor = (villa) => demo.owners.find((o) => o.villas.includes(villa.name)) || demo.owners[0];
const statementsFor = (villa) => demo.statements.filter((s) => s.code === villa.code);

/* -------------------------------------------------------------- bookings */

export function BookingsTab({ villa }) {
  const rows = vd.bookings.map((b) => ({ ...b, value_thb: b.nights * villa.adr_thb }));
  const confirmed = rows.filter((r) => r.state !== 'Enquiry');
  return (
    <div className="space-y-3.5">
      <KpiRow
        tiles={[
          { label: 'On the books', value: String(confirmed.length), sub: `${sum(confirmed, (r) => r.nights)} nights sold forward` },
          { label: 'Forward revenue', value: baht(sum(confirmed, (r) => r.value_thb)), sub: 'Confirmed reservations', tone: 'pos' },
          { label: 'Average stay', value: `${Math.round(sum(confirmed, (r) => r.nights) / confirmed.length)} nights`, sub: 'Last six bookings' },
          { label: 'Open enquiry', value: '1', sub: '14–22 Nov · awaiting rate approval', tone: 'gold' },
        ]}
      />
      <Card title="Reservations" sub="Every channel, one calendar" right={`ADR ${baht(villa.adr_thb)}`}>
        <Table
          minWidth={780}
          rowKey={(r) => r.ref}
          rows={rows}
          cols={[
            { key: 'ref', label: 'Ref', tnum: true },
            { key: 'guest', label: 'Guest', render: (r) => <span className="text-hp-text">{r.guest}</span> },
            { key: 'channel', label: 'Channel' },
            { key: 'dates', label: 'Dates' },
            { key: 'nights', label: 'Nights', align: 'right', tnum: true },
            { key: 'pax', label: 'Pax', align: 'right', tnum: true },
            { key: 'value', label: 'Value', align: 'right', tnum: true, render: (r) => baht(r.value_thb) },
            { key: 'state', label: 'State', render: (r) => <Pill tone={statusTone(r.state)}>{r.state}</Pill> },
          ]}
        />
      </Card>
      <Card title="Tasks & maintenance" sub="Work attached to this villa">
        <Table
          minWidth={700}
          rowKey={(r) => r.title}
          rows={vd.maintenance}
          cols={[
            { key: 'title', label: 'Job', render: (r) => <span className="text-hp-text">{r.title}</span> },
            { key: 'dept', label: 'Department' },
            { key: 'who', label: 'Assigned to' },
            { key: 'when', label: 'When' },
            { key: 'cost', label: 'Cost', align: 'right', tnum: true, render: (r) => baht(r.cost_thb) },
            { key: 'state', label: 'State', render: (r) => <Pill tone={statusTone(r.state)}>{r.state}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------- house manual */

export function HouseManualTab({ villa }) {
  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {vd.house_manual.map((s) => (
          <Card key={s.section} title={s.section}>
            <ul className="mt-3 space-y-2">
              {s.items.map((i) => (
                <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-hp-text2">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-hp-goldDeep" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <Card title="Connected systems" sub={`Smart hardware already installed at ${villa.name}`}>
        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {vd.devices.map((d) => (
            <div key={d.name} className="rounded-xl border border-hp-lineSoft bg-[color:var(--hp-veil-1)] p-3.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13.5px] text-hp-text">{d.name}</span>
                <span className="shrink-0 text-[10.5px] uppercase tracking-[0.1em] text-hp-text3">{d.kind}</span>
              </div>
              <div className="tnum mt-1.5 text-[12.5px]" style={{ color: 'var(--hp-pos)' }}>
                {d.state}
              </div>
              <div className="mt-1 text-[11.5px] leading-snug text-hp-text3">{d.detail}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------- photos */

export function PhotosTab({ villa }) {
  return (
    <div className="space-y-3.5">
      <Card title="Photo library" sub={`${vd.photos.length} images · hero pushed to every channel`} right={villa.code}>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {vd.photos.map((p, i) => (
            <div key={p.label} className="overflow-hidden rounded-xl border border-hp-lineSoft">
              <div className="relative h-[128px] w-full sm:h-[150px]">
                <img
                  src={asset(photoFiles[i % photoFiles.length])}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: `${(i * 23) % 100}% 50%` }}
                />
                <div className="absolute inset-0 scrim-h" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2.5">
                  <span className="text-[12px] text-[color:var(--hp-on-status)]">{p.label}</span>
                  <Pill tone={p.tag === 'Hero' ? 'gold' : 'idle'}>{p.tag}</Pill>
                </div>
              </div>
              <div className="tnum flex items-center justify-between px-3 py-2 text-[11px] text-hp-text3">
                <span>{p.file}</span>
                <span>3000 × 2000</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11.5px] text-hp-text3">
          Reordering here reorders the listing on Airbnb, Booking.com and the direct site on the next sync.
        </p>
      </Card>
    </div>
  );
}

/* ----------------------------------------------------------------- owner */

export function OwnerTab({ villa }) {
  const o = ownerFor(villa);
  const bal = demo.owner_balances.find((b) => b.owner === o.name);
  const sts = statementsFor(villa);
  const latest = sts[0];
  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1fr_1.1fr]">
        <Card title="Owner" sub="Contact and contract">
          <div className="mt-3 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--hp-gold-wash-2)] font-display text-[15px] text-hp-goldInk">
              {o.initials}
            </div>
            <div className="min-w-0">
              <div className="font-display text-[17px] text-hp-text">{o.name}</div>
              <div className="truncate text-[12px] text-hp-text3">{o.email}</div>
            </div>
          </div>
          <dl className="mt-4 space-y-2 text-[12.5px]">
            {[
              ['Based in', o.based_in],
              ['Owner since', o.since],
              ['Villas held', o.villas.join(' · ')],
              ['Payout method', o.payout_method],
              ['Management fee', '18% of net rental'],
              ['Approval threshold', '฿5,000'],
              ['Portal access', 'Active · last sign-in yesterday 21:02'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3 border-b border-hp-lineSoft pb-2">
                <dt className="w-[124px] shrink-0 text-hp-text3">{k}</dt>
                <dd className="min-w-0 flex-1 text-hp-text2">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
        <div className="space-y-3.5">
          <KpiRow
            cols={2}
            tiles={[
              { label: 'Balance held', value: bal ? baht(bal.closing_thb) : '฿0', sub: bal ? bal.note : 'Settled', tone: bal && bal.closing_thb === 0 ? 'pos' : undefined },
              { label: 'Paid out YTD', value: bal ? baht(bal.paid_thb) : '฿0', sub: 'Across all periods' },
            ]}
          />
          {latest && (
            <Card title={`Latest statement · ${latest.period}`} sub={latest.settled} right={latest.id}>
              <div className="mt-3 space-y-1.5">
                {[
                  ['Gross rental', baht(latest.gross_thb)],
                  ['Commission', signedBaht(latest.commission_thb)],
                  ['Costs & fees', signedBaht(latest.expenses_thb)],
                  ['Other income', signedBaht(latest.other_income_thb)],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3 text-[12.5px]">
                    <span className="text-hp-text2">{k}</span>
                    <span className="tnum text-hp-text">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl border border-hp-gold/25 bg-[color:var(--hp-gold-wash)] px-3.5 py-2.5">
                <span className="text-[11px] uppercase tracking-[0.14em] text-hp-goldDeep">Net to owner</span>
                <span className="tnum font-display text-[20px] text-hp-goldInk">{baht(latest.net_thb)}</span>
              </div>
            </Card>
          )}
        </div>
      </div>
      <Card title="Owner-visible activity" sub="What this owner has seen in their portal">
        <div className="mt-3 space-y-3">
          {[
            ['Statement issued', `${latest ? latest.period : 'July 2026'} · ${latest ? baht(latest.net_thb) : ''} net`, '8 days ago'],
            ['Maintenance disclosed', 'Pool pump seal ฿3,450 · inside allowance, photo proof attached', '22 days ago'],
            ['Rate change approved', 'RatePilot · Balanced strategy · +14%', '27 days ago'],
            ['Concierge question answered', '“Why was the payout higher than June?”', '6 days ago'],
          ].map(([t, s, w]) => (
            <div key={t} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hp-goldDeep" />
              <div className="flex-1">
                <div className="text-[13px] text-hp-text">{t}</div>
                <div className="text-[12px] text-hp-text3">{s}</div>
              </div>
              <span className="shrink-0 text-[11px] text-hp-text3">{w}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------ financials */

export function FinancialsTab({ villa }) {
  const sts = statementsFor(villa);
  const latest = sts[0];
  const gross = sum(sts, (s) => s.gross_thb);
  const net = sum(sts, (s) => s.net_thb);
  const costs = sum(sts, (s) => s.expenses_thb + s.commission_thb);
  return (
    <div className="space-y-3.5">
      <KpiRow
        tiles={[
          { label: 'Gross · periods on file', value: baht(gross), sub: `${sts.length} statement${sts.length === 1 ? '' : 's'}` },
          { label: 'Costs & commission', value: signedBaht(costs), sub: 'Channel fees, services, VAT', tone: 'neg' },
          { label: 'Net to owner', value: baht(net), sub: 'Sum of every statement', tone: 'pos' },
          {
            label: 'Owner margin',
            value: `${Math.round((net / gross) * 100)}%`,
            sub: 'Net as a share of gross',
            tone: 'gold',
          },
        ]}
      />
      {latest && (
        <Card title={`Statement lines · ${latest.period}`} sub="The lines sum to the net figure below" right={latest.id}>
          <div className="mt-3 divide-y divide-hp-lineSoft">
            {latest.lines.map((l) => (
              <div key={l.label} className="flex items-baseline justify-between gap-4 py-2.5">
                <span className={`text-[13px] leading-snug ${l.cat === 'gross' ? 'text-hp-text' : 'text-hp-text2'}`}>
                  {l.label}
                </span>
                <span
                  className="tnum shrink-0 text-[13.5px]"
                  style={{
                    color:
                      l.cat === 'gross' ? 'var(--hp-text)' : l.value_thb < 0 ? 'var(--hp-neg)' : 'var(--hp-pos)',
                  }}
                >
                  {l.cat === 'gross' ? baht(l.value_thb) : signedBaht(l.value_thb)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-hp-gold/25 bg-[color:var(--hp-gold-wash)] px-4 py-3">
            <span className="text-[11px] uppercase tracking-[0.14em] text-hp-goldDeep">Net to owner</span>
            <span className="tnum font-display text-[22px] text-hp-goldInk">{baht(latest.net_thb)}</span>
          </div>
        </Card>
      )}
      <Card title="Statement history" sub="Every period closed for this villa">
        <Table
          minWidth={700}
          rowKey={(s) => s.id}
          rows={sts}
          cols={[
            { key: 'period', label: 'Period' },
            { key: 'id', label: 'Statement', tnum: true },
            { key: 'nights', label: 'Nights', align: 'right', tnum: true, render: (s) => `${s.nights_sold}/${s.nights_available}` },
            {
              key: 'occ',
              label: 'Occupancy',
              render: (s) => <Meter pct={(s.nights_sold / s.nights_available) * 100} />,
            },
            { key: 'gross', label: 'Gross', align: 'right', tnum: true, render: (s) => baht(s.gross_thb) },
            { key: 'net', label: 'Net', align: 'right', tnum: true, render: (s) => <span className="text-hp-text">{baht(s.net_thb)}</span> },
            { key: 'status', label: 'Status', render: (s) => <Pill tone={statusTone(s.status)}>{s.status}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

/* --------------------------------------------------------------- history */

export function HistoryTab({ villa }) {
  const o = ownerFor(villa);
  const events = [
    ['10 Aug 2026 · 11:52', 'Departure clean completed', `Nalin P. · photo proof attached · ${villa.code}`],
    ['9 Aug 2026 · 15:04', 'Guest checked in', 'T. Lindqvist · 7 nights · TM30 filed 15:22'],
    ['5 Aug 2026 · 09:10', 'Owner payout sent', `${o.name} · ${o.payout_method}`],
    ['2 Aug 2026 · 08:00', 'Statement issued', 'July 2026 · published to the owner portal'],
    ['19 Jul 2026 · 14:20', 'Maintenance completed', 'Pool pump seal replaced · ฿3,450 · inside allowance'],
    ['14 Jul 2026 · 10:35', 'Rate change approved', 'RatePilot · Balanced · pushed to 3 channels'],
    ['1 Jul 2026 · 03:00', 'Channel sync reconciled', '0 conflicts · 41 rate rows pushed'],
    ['18 Jun 2026 · 16:40', 'Inspection passed', 'Quarterly deep · score 96 · 0 issues'],
    ['11 Jun 2026 · 12:00', 'Hero photo replaced', 'Pool at dusk · search CTR +1.4 pts since'],
    ['4 Mar 2024 · 09:00', 'Villa onboarded', `Management agreement signed with ${o.name}`],
  ];
  return (
    <Card title="Villa history" sub="Everything that has happened to this file, newest first">
      <div className="mt-4">
        {events.map(([when, title, detail], i) => (
          <div key={when} className="flex gap-3 sm:gap-4">
            <div className="tnum w-[92px] shrink-0 pt-0.5 text-right text-[11px] leading-snug text-hp-text3 sm:w-[118px] sm:text-[11.5px]">
              {when}
            </div>
            <div className="flex flex-col items-center">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hp-goldDeep" />
              {i < events.length - 1 && <span className="w-px flex-1 bg-hp-lineSoft" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="text-[13px] text-hp-text">{title}</div>
              <div className="text-[12px] leading-snug text-hp-text3">{detail}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1 border-t border-hp-lineSoft pt-3">
        <div className="text-[11.5px] uppercase tracking-[0.1em] text-hp-text3">Documents on file</div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {vd.documents.map((d) => (
            <span key={d.name} className="chip !text-[11.5px]">
              {d.name} <span className="text-hp-text3">· {d.size}</span>
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

export const dossierTabViews = {
  Bookings: BookingsTab,
  'House manual': HouseManualTab,
  Photos: PhotosTab,
  Owner: OwnerTab,
  Financials: FinancialsTab,
  History: HistoryTab,
};
