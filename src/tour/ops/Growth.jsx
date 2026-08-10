/** Growth section — RatePilot, rate calendar, comp set, concierge, reviews, upsell catalogue. */
import { useState } from 'react';
import { Check, X, Star, TrendingUp, TrendingDown } from 'lucide-react';
import demo from '../../data/demo.js';
import { baht, signedBaht, AreaChart } from '../../components/ui.jsx';
import { ViewHead, Card, KpiRow, Pill, Table, Meter, statusTone } from './shared.jsx';

const sum = (a, f) => a.reduce((t, x) => t + f(x), 0);

/* ------------------------------------------------------------- RatePilot */

export function RatePilot() {
  const rp = demo.ratepilot;
  const [strategy, setStrategy] = useState(rp.strategy);
  const [decisions, setDecisions] = useState({});
  const open = rp.recommendations.filter((r) => !decisions[r.id]);
  const upside = sum(
    open,
    (r) => Math.max(0, r.delta_thb) * Math.max(0, r.nights - Number(r.pace.split(' ')[0]))
  );
  const approved = Object.values(decisions).filter((d) => d === 'approved').length;

  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Growth · RatePilot"
        title="RatePilot"
        em="a rate change is a decision, not a black box"
        lede="Every recommendation arrives with the reason it exists: the comp set it was measured against, how the window is pacing, and what happens to revenue if you accept. Owners see the same card in their portal."
        chips={[rp.horizon, `${rp.accepted_ytd_pct}% of recommendations accepted YTD`, 'Pushes to all channels on approve']}
      />

      <div className="hp-card-flat flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="text-[11.5px] uppercase tracking-[0.1em] text-hp-text3">Strategy</div>
        <div className="flex gap-1 rounded-xl border border-hp-lineSoft bg-[color:var(--hp-veil-2)] p-1">
          {rp.strategies.map((s) => (
            <button
              key={s}
              onClick={() => setStrategy(s)}
              className={`rounded-lg px-3 py-1.5 text-[12.5px] transition ${
                strategy === s
                  ? 'bg-[color:var(--hp-gold-wash-2)] text-hp-goldInk'
                  : 'text-hp-text3 hover:text-hp-text2'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="text-[12px] leading-snug text-hp-text3 sm:ml-auto sm:max-w-[46%] sm:text-right">
          {strategy === 'Occupancy'
            ? 'Fill first: RatePilot will trim harder into soft weeks and hold back on peak lifts.'
            : strategy === 'Rate'
            ? 'Protect ADR: lifts are pushed earlier and discounts need a manual override.'
            : 'Balanced: the default — trim soft weeks, lift scarce ones, never move more than 30% at once.'}
        </p>
      </div>

      <KpiRow
        tiles={[
          { label: 'Open recommendations', value: String(open.length), sub: `${rp.recommendations.length} generated this week` },
          { label: 'Unsold nights covered', value: String(sum(open, (r) => r.nights - Number(r.pace.split(' ')[0]))), sub: 'Across 6 villas' },
          { label: 'Revenue at stake', value: baht(upside), sub: 'If every open lift sells through', tone: 'gold' },
          {
            label: 'Approved this session',
            value: String(approved),
            sub: approved ? 'Demo only — no rates were pushed' : 'Approve or decline below',
            tone: approved ? 'pos' : undefined,
          },
        ]}
      />

      <div className="space-y-3">
        {rp.recommendations.map((r) => {
          const d = decisions[r.id];
          const up = r.delta_thb > 0;
          const tone = up ? 'var(--hp-pos)' : 'var(--hp-neg)';
          return (
            <div
              key={r.id}
              className="hp-card-flat p-4 sm:p-5"
              style={
                d === 'approved'
                  ? { borderColor: 'rgb(var(--hp-pos-rgb) / 0.45)' }
                  : d === 'declined'
                  ? { borderColor: 'rgb(var(--hp-neg-rgb) / 0.45)' }
                  : undefined
              }
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="min-w-0">
                  <h4 className="font-display text-[17px] leading-tight text-hp-text sm:text-[19px]">{r.villa}</h4>
                  <div className="mt-1 text-[11.5px] text-hp-text3">
                    {r.code} · {r.window} · {r.nights} nights · {r.pace}
                  </div>
                </div>
                <Pill tone={r.confidence === 'High' ? 'pos' : 'warn'}>{r.confidence} confidence</Pill>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[auto_auto_1fr] sm:items-center">
                <div className="flex items-end gap-3 sm:gap-5">
                  <div>
                    <div className="text-[10.5px] uppercase tracking-[0.1em] text-hp-text3">Current</div>
                    <div className="tnum mt-1 font-display text-[20px] leading-none text-hp-text2 line-through decoration-hp-text3/50">
                      {baht(r.current_thb)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10.5px] uppercase tracking-[0.1em] text-hp-text3">Suggested</div>
                    <div className="tnum mt-1 font-display text-[clamp(1.3rem,1rem+1vw,1.8rem)] leading-none text-hp-goldInk">
                      {baht(r.suggested_thb)}
                    </div>
                  </div>
                </div>
                <div
                  className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold"
                  style={{
                    color: tone,
                    background: up ? 'var(--hp-pos-wash)' : 'var(--hp-neg-wash)',
                    border: `1px solid ${up ? 'rgb(var(--hp-pos-rgb) / 0.4)' : 'rgb(var(--hp-neg-rgb) / 0.4)'}`,
                  }}
                >
                  {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {up ? '+' : '−'}
                  {Math.abs(r.delta_pct)}% · {signedBaht(r.delta_thb)} per night
                </div>
                <div className="text-[11.5px] text-hp-text3 sm:text-right">{r.comp}</div>
              </div>

              <p className="mt-3.5 max-w-3xl text-[13px] leading-relaxed text-hp-text2">{r.reason}</p>

              <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-hp-lineSoft pt-3">
                {d ? (
                  <>
                    <Pill tone={d === 'approved' ? 'pos' : 'neg'}>
                      {d === 'approved' ? <Check size={11} /> : <X size={11} />}
                      {d === 'approved'
                        ? 'Approved · pushed to Airbnb, Booking.com and direct'
                        : 'Declined · rate unchanged, owner notified'}
                    </Pill>
                    <button
                      onClick={() =>
                        setDecisions((s) => {
                          const next = { ...s };
                          delete next[r.id];
                          return next;
                        })
                      }
                      className="ml-auto text-[11.5px] text-hp-text3 underline decoration-dotted underline-offset-4 hover:text-hp-text2"
                    >
                      Undo
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setDecisions((s) => ({ ...s, [r.id]: 'approved' }))}
                      className="btn btn-quiet !px-3.5 !py-1.5 !text-[12.5px]"
                    >
                      <Check size={13} /> Approve
                    </button>
                    <button
                      onClick={() => setDecisions((s) => ({ ...s, [r.id]: 'declined' }))}
                      className="btn btn-quiet !px-3.5 !py-1.5 !text-[12.5px]"
                    >
                      <X size={13} /> Decline
                    </button>
                    <span className="ml-auto text-[11px] text-hp-text3">Demo only · nothing is pushed</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-hp-gold/25 bg-[color:var(--hp-gold-wash)] px-4 py-3 text-[12.5px] text-hp-goldDeep">
        {rp.uplift_note}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- rate calendar */

const seasonStyle = {
  peak: { background: 'rgba(196,112,92,0.34)', label: 'Peak' },
  high: { background: 'rgba(209,165,90,0.28)', label: 'High' },
  shoulder: { background: 'rgba(127,166,107,0.22)', label: 'Shoulder' },
  low: { background: 'var(--hp-veil-2)', label: 'Low' },
};

export function RateCalendar() {
  const rc = demo.rate_calendar;
  const booked = rc.nights.filter((n) => n[2] === 'booked').length;
  const avg = Math.round(sum(rc.nights, (n) => n[0]) / rc.nights.length);
  const revenue = sum(rc.nights.filter((n) => n[2] === 'booked'), (n) => n[0]);
  const cells = [...Array(rc.first_weekday).fill(null), ...rc.nights];
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Growth · rate calendar"
        title="Rate calendar"
        em={`${rc.villa} · ${rc.month}`}
        lede="The nightly rate as it currently sits on every channel, coloured by season and marked where a night is already sold. This is the grid RatePilot edits when a recommendation is approved."
        chips={[rc.code, `${booked} of ${rc.days} nights sold`, `Average ${baht(avg)}`]}
      />
      <KpiRow
        tiles={[
          { label: 'Average nightly rate', value: baht(avg), sub: `${rc.month} · all nights` },
          { label: 'Nights sold', value: `${booked}/${rc.days}`, sub: `${Math.round((booked / rc.days) * 100)}% occupancy` },
          { label: 'Booked revenue', value: baht(revenue), sub: 'Confirmed nights only', tone: 'pos' },
          { label: 'Peak block', value: '14–22 Nov', sub: 'Loi Krathong · awaiting approval', tone: 'gold' },
        ]}
      />
      <Card title={`${rc.month} nightly grid`} sub="Colour is season · outline means still available">
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-hp-text3">
          {rc.legend.map((l) => (
            <span key={l.season} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: seasonStyle[l.tone].background }} />
              {l.season}
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm border border-hp-gold/60" /> Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm border border-hp-line bg-[color:var(--hp-veil-3)]" /> Sold
          </span>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[9.5px] uppercase tracking-[0.1em] text-hp-text3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d}>{d.slice(0, 1)}</div>
          ))}
        </div>
        <div className="mt-1.5 grid grid-cols-7 gap-1 sm:gap-1.5">
          {cells.map((c, i) => {
            if (!c) return <div key={`e${i}`} />;
            const [rate, season, state] = c;
            const day = i - rc.first_weekday + 1;
            const sold = state === 'booked';
            return (
              <div
                key={day}
                className="flex min-h-[52px] flex-col justify-between rounded-md p-1 sm:min-h-[64px] sm:p-1.5"
                style={{
                  background: seasonStyle[season].background,
                  border: sold ? '1px solid var(--hp-line)' : '1px solid rgb(var(--hp-gold-rgb) / 0.55)',
                  opacity: sold ? 0.72 : 1,
                }}
              >
                <div className="tnum text-[10px] text-[color:var(--hp-on-status)] sm:text-[10.5px]">{day}</div>
                <div className="tnum text-[9.5px] font-semibold leading-tight text-[color:var(--hp-on-status)] sm:text-[11px]">
                  {(rate / 1000).toFixed(1)}k
                </div>
                <div className="text-[8px] uppercase tracking-[0.08em] text-[color:var(--hp-on-status)] opacity-70 sm:text-[8.5px]">
                  {sold ? 'Sold' : 'Open'}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-hp-text3">{rc.note}</p>
      </Card>
    </div>
  );
}

/* --------------------------------------------------------------- comp set */

export function CompSet() {
  const cs = demo.comp_set;
  const compAdr = Math.round(sum(cs.rows, (r) => r.adr_thb) / cs.rows.length);
  const compOcc = Math.round(sum(cs.rows, (r) => r.occupancy_pct) / cs.rows.length);
  const maxAdr = Math.max(...cs.rows.map((r) => r.adr_thb), cs.portfolio.adr_thb);
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Growth · comp set"
        title="Comp set"
        em="how the portfolio prices against the street"
        lede="Six comparable villas tracked nightly across the same micro-markets. Rate alone means nothing; rate against occupancy is the argument."
        chips={[cs.market, cs.window, `${cs.rows.length} tracked properties`]}
      />
      <KpiRow
        tiles={[
          { label: 'Portfolio ADR', value: baht(cs.portfolio.adr_thb), sub: 'Azure Coast, all channels' },
          {
            label: 'Comp set ADR',
            value: baht(compAdr),
            sub: `${cs.portfolio.adr_thb > compAdr ? 'Above' : 'Below'} the set by ${baht(Math.abs(compAdr - cs.portfolio.adr_thb))}`,
          },
          { label: 'Portfolio occupancy', value: `${cs.portfolio.occupancy_pct}%`, sub: 'Trailing 90 nights', tone: 'pos' },
          { label: 'Comp set occupancy', value: `${compOcc}%`, sub: `${cs.portfolio.occupancy_pct - compOcc} pts behind us` },
        ]}
      />
      <Card title="Tracked properties" sub="ADR and occupancy against the portfolio benchmark">
        <Table
          minWidth={820}
          rowKey={(r) => r.name}
          rows={[{ ...cs.portfolio, name: cs.portfolio.label, beds: '—', channel: 'All channels', note: 'Benchmark', us: true }, ...cs.rows]}
          cols={[
            {
              key: 'name',
              label: 'Property',
              render: (r) => (
                <span className={r.us ? 'text-hp-goldInk' : 'text-hp-text'}>{r.name}</span>
              ),
            },
            { key: 'beds', label: 'Beds', align: 'right', tnum: true },
            { key: 'adr', label: 'ADR', align: 'right', tnum: true, render: (r) => baht(r.adr_thb) },
            {
              key: 'adrbar',
              label: 'ADR index',
              render: (r) => <Meter pct={(r.adr_thb / maxAdr) * 100} tone={r.us ? 'gold' : 'pos'} />,
            },
            { key: 'occ', label: 'Occupancy', align: 'right', tnum: true, render: (r) => `${r.occupancy_pct}%` },
            { key: 'occbar', label: 'Pace', render: (r) => <Meter pct={r.occupancy_pct} tone={r.us ? 'gold' : 'pos'} /> },
            { key: 'channel', label: 'Sells on' },
            { key: 'note', label: 'Note', render: (r) => <span className="text-[11.5px]">{r.note}</span> },
          ]}
        />
      </Card>
    </div>
  );
}

/* -------------------------------------------------------- concierge sales */

export function ConciergeSales() {
  const cs = demo.concierge_sales;
  const revenue = sum(cs.lines, (l) => l.revenue_thb);
  const margin = sum(cs.lines, (l) => l.margin_thb);
  const cats = [...new Set(cs.lines.map((l) => l.category))];
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Growth · concierge sales"
        title="Concierge sales"
        em="the revenue that is not a nightly rate"
        lede="Transfers, chefs, tours and wellness sold through the guest app before arrival. It costs nothing to list and it is the fastest line on the P&L to move."
        chips={[cs.period, `${baht(revenue)} sold`, `${baht(margin)} house margin`]}
      />
      <KpiRow
        tiles={[
          { label: 'Add-on revenue', value: baht(revenue), sub: `${cs.period} · ${cs.lines.length} products`, tone: 'pos' },
          { label: 'House margin', value: baht(margin), sub: `${Math.round((margin / revenue) * 100)}% blended`, tone: 'gold' },
          { label: 'Units sold', value: String(sum(cs.lines, (l) => l.units)), sub: 'Across all stays' },
          {
            label: 'Best seller',
            value: 'Transfers',
            sub: `${baht(sum(cs.lines.filter((l) => l.category === 'Transfers'), (l) => l.revenue_thb))} · 68% attach`,
          },
        ]}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cats.map((c) => {
          const rows = cs.lines.filter((l) => l.category === c);
          const rev = sum(rows, (l) => l.revenue_thb);
          return (
            <div key={c} className="hp-card-flat p-4">
              <div className="text-[11px] uppercase tracking-[0.09em] text-hp-text3">{c}</div>
              <div className="tnum mt-2 font-display text-[20px] leading-none text-hp-text">{baht(rev)}</div>
              <div className="mt-2">
                <Meter pct={(rev / revenue) * 100} />
              </div>
              <div className="mt-1.5 text-[11px] text-hp-text3">
                {Math.round((rev / revenue) * 100)}% of add-on revenue · {rows.length} products
              </div>
            </div>
          );
        })}
      </div>
      <Card title="Product performance" sub={cs.note}>
        <Table
          minWidth={760}
          rowKey={(r) => r.item}
          rows={cs.lines}
          cols={[
            { key: 'item', label: 'Product', render: (r) => <span className="text-hp-text">{r.item}</span> },
            { key: 'category', label: 'Category' },
            { key: 'price', label: 'Price', align: 'right', tnum: true, render: (r) => baht(r.price_thb) },
            { key: 'units', label: 'Units', align: 'right', tnum: true },
            { key: 'attach', label: 'Attach', align: 'right', tnum: true, render: (r) => `${r.attach_pct}%` },
            {
              key: 'revenue',
              label: 'Revenue',
              align: 'right',
              tnum: true,
              render: (r) => <span className="text-hp-text">{baht(r.revenue_thb)}</span>,
            },
            {
              key: 'margin',
              label: 'House margin',
              align: 'right',
              tnum: true,
              render: (r) => <span style={{ color: 'var(--hp-pos)' }}>{baht(r.margin_thb)}</span>,
            },
          ]}
        />
        <div className="mt-3 flex items-center justify-between border-t border-hp-line pt-3 text-[13px]">
          <span className="text-hp-text2">{cs.period} total</span>
          <span className="tnum text-hp-text">
            {baht(revenue)} <span className="text-hp-text3">· margin {baht(margin)}</span>
          </span>
        </div>
      </Card>
    </div>
  );
}

/* --------------------------------------------------------------- reviews */

export function Reviews() {
  const rs = demo.reviews;
  const avg = (sum(rs, (r) => r.rating) / rs.length).toFixed(2);
  const mixed = rs.filter((r) => r.sentiment !== 'Positive').length;
  const unanswered = rs.filter((r) => !r.responded).length;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Growth · reviews"
        title="Guest reviews"
        em="the score is an operations metric"
        lede="Every review pulled from the channel it was written on, matched to the villa and the stay, with the sentiment flagged so a 3.6 never sits unanswered for a week."
        chips={[`${rs.length} in the last 30 days`, `Average ${avg}`, `${unanswered} awaiting a reply`]}
      />
      <KpiRow
        tiles={[
          { label: 'Average rating', value: avg, sub: `${rs.length} reviews, last 30 days`, tone: 'gold' },
          { label: 'Positive', value: String(rs.length - mixed), sub: `${Math.round(((rs.length - mixed) / rs.length) * 100)}% of reviews`, tone: 'pos' },
          { label: 'Mixed or negative', value: String(mixed), sub: 'Both cite the same aircon fault', tone: 'neg' },
          { label: 'Awaiting reply', value: String(unanswered), sub: 'Target: within 24 hours', tone: unanswered ? 'warn' : 'pos' },
        ]}
      />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {rs.map((r) => (
          <div key={r.guest + r.date} className="hp-card-flat p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <div className="min-w-0">
                <div className="text-[14px] text-hp-text">{r.villa}</div>
                <div className="text-[11.5px] text-hp-text3">
                  {r.guest} · {r.channel} · {r.date}
                </div>
              </div>
              <div className="tnum flex shrink-0 items-center gap-1.5 font-display text-[17px] text-hp-goldInk">
                <Star size={13} className="fill-current" /> {r.rating.toFixed(1)}
              </div>
            </div>
            <p className="mt-2.5 text-[13px] leading-relaxed text-hp-text2">{r.text}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-hp-lineSoft pt-2.5">
              <Pill tone={r.sentiment === 'Positive' ? 'pos' : 'warn'}>{r.sentiment}</Pill>
              <Pill tone={r.responded ? 'idle' : 'gold'}>{r.responded ? 'Replied' : 'Needs a reply'}</Pill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------- upsell catalogue */

export function UpsellCatalogue() {
  const cat = demo.upsell_catalogue;
  const live = cat.filter((c) => c.status === 'Live');
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Growth · upsell catalogue"
        title="Upsell catalogue"
        em="what the guest app is allowed to sell"
        lede="One catalogue, priced once, shown in the guest app the moment a booking is confirmed. Attach rate is the number worth arguing about — price is easy to change, attach is earned."
        chips={[`${live.length} live products`, '1 draft', '1 complimentary']}
      />
      <KpiRow
        cols={3}
        tiles={[
          { label: 'Live products', value: String(live.length), sub: 'Visible to guests today' },
          {
            label: 'Units sold · 90 days',
            value: String(sum(cat, (c) => c.sold_90d)),
            sub: 'Across the whole portfolio',
            tone: 'pos',
          },
          {
            label: 'Catalogue value · 90 days',
            value: baht(sum(cat, (c) => c.price_thb * c.sold_90d)),
            sub: 'Gross, before supplier cost',
            tone: 'gold',
          },
        ]}
      />
      <Card title="Products" sub="Price, attach rate and 90-day volume">
        <Table
          minWidth={720}
          rowKey={(r) => r.item}
          rows={cat}
          cols={[
            { key: 'item', label: 'Product', render: (r) => <span className="text-hp-text">{r.item}</span> },
            { key: 'category', label: 'Category' },
            {
              key: 'price',
              label: 'Price',
              align: 'right',
              tnum: true,
              render: (r) => (r.price_thb === 0 ? 'Included' : baht(r.price_thb)),
            },
            { key: 'attach', label: 'Attach', align: 'right', tnum: true, render: (r) => `${r.attach_pct}%` },
            { key: 'bar', label: 'Attach rate', render: (r) => <Meter pct={r.attach_pct} /> },
            { key: 'sold_90d', label: 'Sold · 90d', align: 'right', tnum: true },
            { key: 'status', label: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}
