/** Finance section of the Ops Console — hub, statements, balances, queue, cash, bills, payouts. */
import { useState } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import demo from '../../data/demo.js';
import { baht, signedBaht } from '../../components/ui.jsx';
import { ViewHead, Card, KpiRow, Pill, Table, BarPairs, Meter, Facts, statusTone } from './shared.jsx';

const sum = (a, f) => a.reduce((t, x) => t + f(x), 0);

const outstanding = sum(demo.owner_balances, (b) => b.closing_thb);
const scheduledPayouts = sum(
  demo.payouts.filter((p) => p.status === 'Scheduled'),
  (p) => p.amount_thb
);
const heldPayouts = sum(
  demo.payouts.filter((p) => p.status === 'Held'),
  (p) => p.amount_thb
);
const queueTotal = sum(demo.payment_queue, (i) => i.amount_thb);

/* ------------------------------------------------------------------- hub */

export function FinanceHub() {
  const h = demo.finance_hub;
  const mtd = h.monthly[h.monthly.length - 1];
  const closed = h.monthly[h.monthly.length - 2];
  const billsDue = demo.bills.filter((b) => b.status !== 'Paid');
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Finance · money in, money out"
        title="Finance hub"
        em="one ledger for 24 villas"
        lede="Guest money, owner money and house money kept apart, reconciled nightly and closed on the 1st. Every figure below traces back to a reservation, a receipt or a payout."
        chips={[h.month, 'Base currency THB', 'Close day 1st · payout day 5th']}
      />

      <KpiRow
        tiles={[
          { label: 'Money in · Aug MTD', value: baht(mtd.in_thb), sub: `Jul closed at ${baht(closed.in_thb)}`, tone: 'pos' },
          { label: 'Money out · Aug MTD', value: baht(mtd.out_thb), sub: 'Payouts, bills, payroll', tone: 'neg' },
          {
            label: 'Owner balances outstanding',
            value: baht(outstanding),
            sub: `${demo.owner_balances.filter((b) => b.closing_thb > 0).length} owners unsettled`,
          },
          {
            label: 'Pending payouts',
            value: baht(scheduledPayouts),
            sub: `Next run 5 Sep · ${baht(heldPayouts)} held`,
            tone: 'gold',
          },
        ]}
      />

      <div className="grid grid-cols-1 items-start gap-3.5 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-3.5">
          <Card title="Money in vs money out" sub="Collected against paid, by month" right="THB · 2026">
            <div className="mt-4">
              <BarPairs series={h.monthly} />
            </div>
            <p className="mt-3 text-[11.5px] leading-relaxed text-hp-text3">{h.notes.join(' ')}</p>
          </Card>
          <Card title="Bills outstanding" sub="Suppliers and utilities">
            <div className="mt-3 space-y-2">
              {billsDue.slice(0, 4).map((b) => (
                <div key={b.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12.5px] text-hp-text">{b.supplier}</div>
                    <div className="text-[11px] text-hp-text3">Due {b.due}</div>
                  </div>
                  <span className="tnum text-[12.5px] text-hp-text2">{baht(b.amount_thb)}</span>
                  <Pill tone={statusTone(b.status)}>{b.status}</Pill>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-3.5">
          <Card title="Needs a decision" sub="Sitting in the payment queue">
            <div className="mt-3 space-y-2.5">
              {demo.payment_queue.slice(0, 4).map((i) => (
                <div
                  key={i.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-hp-lineSoft bg-[color:var(--hp-veil-1)] px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <div className="truncate text-[13px] text-hp-text">{i.payee}</div>
                    <div className="truncate text-[11.5px] text-hp-text3">
                      {i.villa} · {i.category}
                    </div>
                  </div>
                  <div className="tnum shrink-0 text-[13px] text-hp-text">{baht(i.amount_thb)}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-hp-lineSoft pt-3 text-[12px]">
              <span className="text-hp-text3">{demo.payment_queue.length} items awaiting approval</span>
              <span className="tnum text-hp-text">{baht(queueTotal)}</span>
            </div>
          </Card>

        </div>
      </div>

      <Card title="Latest statements" sub="Issued on the 1st, paid on the 5th">
        <Table
          minWidth={640}
          cols={[
            { key: 'period', label: 'Period' },
            { key: 'owner', label: 'Owner', render: (r) => <span className="text-hp-text">{r.owner}</span> },
            { key: 'villa', label: 'Villa' },
            { key: 'gross', label: 'Gross', align: 'right', tnum: true, render: (r) => baht(r.gross_thb) },
            {
              key: 'net',
              label: 'Net to owner',
              align: 'right',
              tnum: true,
              render: (r) => <span className="text-hp-text">{baht(r.net_thb)}</span>,
            },
            { key: 'status', label: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
          ]}
          rows={demo.statements.slice(0, 5)}
          rowKey={(r) => r.id}
        />
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------ statements */

function StatementDetail({ st, onBack }) {
  const grossLine = st.lines[0];
  const rest = st.lines.slice(1);
  return (
    <div className="space-y-3.5">
      <div className="grain relative overflow-hidden rounded-2xl border border-hp-line panel-grad p-5 sm:p-7">
        <button onClick={onBack} className="chip mb-4 !text-[11.5px] transition hover:border-hp-gold/50 hover:text-hp-text">
          <ArrowLeft size={12} /> All statements
        </button>
        <div className="eyebrow">Finance · owner statement</div>
        <h3 className="mt-2 font-display text-[clamp(1.3rem,1rem+1.6vw,2.1rem)] font-medium text-hp-text">
          {st.villa} <span className="italic text-hp-text2">· {st.period}</span>
        </h3>
        <p className="mt-1.5 text-[13px] text-hp-text2">
          {st.owner} · {st.id}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill tone={statusTone(st.status)}>{st.status}</Pill>
          <span className="chip !text-[11.5px]">{st.settled}</span>
        </div>
      </div>

      <KpiRow
        tiles={[
          { label: 'Gross rental', value: baht(st.gross_thb), sub: `${st.reservations.length} reservations` },
          { label: 'Commission', value: signedBaht(st.commission_thb), sub: 'Channel fees', tone: 'neg' },
          { label: 'Costs & fees', value: signedBaht(st.expenses_thb), sub: 'Management, services, VAT', tone: 'neg' },
          { label: 'Net to owner', value: baht(st.net_thb), sub: st.issued, tone: 'gold' },
        ]}
      />

      <Card title="Statement lines" sub="Every line traces to a document in the villa file">
        <div className="mt-3 divide-y divide-hp-lineSoft">
          <div className="flex items-baseline justify-between gap-4 py-2.5">
            <span className="text-[13px] text-hp-text">{grossLine.label}</span>
            <span className="tnum shrink-0 text-[13.5px] text-hp-text">{baht(grossLine.value_thb)}</span>
          </div>
          {rest.map((l) => (
            <div key={l.label} className="flex items-baseline justify-between gap-4 py-2.5">
              <span className="text-[13px] leading-snug text-hp-text2">{l.label}</span>
              <span
                className="tnum shrink-0 text-[13.5px]"
                style={{ color: l.value_thb < 0 ? 'var(--hp-neg)' : 'var(--hp-pos)' }}
              >
                {signedBaht(l.value_thb)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-hp-gold/25 bg-[color:var(--hp-gold-wash)] px-4 py-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-hp-goldDeep">Net to owner</div>
          <div className="tnum font-display text-[24px] text-hp-goldInk">{baht(st.net_thb)}</div>
        </div>
        <p className="mt-2.5 text-[11.5px] text-hp-text3">
          {st.lines.length} lines sum to {baht(st.net_thb)}. Occupancy {Math.round((st.nights_sold / st.nights_available) * 100)}% ·{' '}
          {st.nights_sold} of {st.nights_available} nights · ADR{' '}
          {baht(Math.round(st.gross_thb / st.nights_sold))}.
        </p>
      </Card>

      <Card title="Reservations behind the gross" sub="The bookings that produced the revenue line">
        <Table
          minWidth={620}
          cols={[
            { key: 'ref', label: 'Ref', tnum: true },
            { key: 'guest', label: 'Guest', render: (r) => <span className="text-hp-text">{r.guest}</span> },
            { key: 'channel', label: 'Channel' },
            { key: 'dates', label: 'Dates' },
            { key: 'nights', label: 'Nights', align: 'right', tnum: true },
            { key: 'gross', label: 'Gross', align: 'right', tnum: true, render: (r) => baht(r.gross_thb) },
          ]}
          rows={st.reservations}
          rowKey={(r) => r.ref}
        />
        <div className="mt-3 flex items-center justify-between border-t border-hp-line pt-3 text-[13px]">
          <span className="text-hp-text2">
            {st.reservations.length} reservations · {st.nights_sold} nights
          </span>
          <span className="tnum text-hp-text">{baht(st.gross_thb)}</span>
        </div>
      </Card>
    </div>
  );
}

export function Statements() {
  const [open, setOpen] = useState(null);
  if (open) return <StatementDetail st={open} onBack={() => setOpen(null)} />;
  const totalNet = sum(demo.statements, (s) => s.net_thb);
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Finance · statements"
        title="Owner statements"
        em="click one, see every line"
        lede="Statements close automatically on the 1st. Owners see the same document in their portal, with the same line items and the same proof attached."
        chips={[`${demo.statements.length} statements`, 'July 2026 closed', 'August 2026 in progress']}
      />
      <KpiRow
        cols={3}
        tiles={[
          { label: 'Statements issued', value: String(demo.statements.length), sub: 'Across 6 villas and 3 periods' },
          { label: 'Net to owners', value: baht(totalNet), sub: 'All periods shown' },
          {
            label: 'Unpaid',
            value: baht(sum(demo.statements.filter((s) => s.status !== 'Paid' && s.status !== 'Draft'), (s) => s.net_thb)),
            sub: 'Issued but not yet settled',
            tone: 'neg',
          },
        ]}
      />
      <Card title="All statements" sub="Select a row to open the detail" right="Sorted newest first">
        <Table
          minWidth={960}
          onRowClick={setOpen}
          rowKey={(r) => r.id}
          rows={demo.statements}
          cols={[
            { key: 'period', label: 'Month' },
            { key: 'owner', label: 'Owner', render: (r) => <span className="text-hp-text">{r.owner}</span> },
            { key: 'villa', label: 'Villa' },
            { key: 'gross', label: 'Gross', align: 'right', tnum: true, render: (r) => baht(r.gross_thb) },
            {
              key: 'comm',
              label: 'Commission',
              align: 'right',
              tnum: true,
              render: (r) => <span style={{ color: 'var(--hp-neg)' }}>{signedBaht(r.commission_thb)}</span>,
            },
            {
              key: 'exp',
              label: 'Expenses',
              align: 'right',
              tnum: true,
              render: (r) => <span style={{ color: 'var(--hp-neg)' }}>{signedBaht(r.expenses_thb)}</span>,
            },
            {
              key: 'other',
              label: 'Recovered',
              align: 'right',
              tnum: true,
              render: (r) =>
                r.other_income_thb ? (
                  <span style={{ color: 'var(--hp-pos)' }}>+{baht(r.other_income_thb)}</span>
                ) : (
                  <span className="text-hp-text3">—</span>
                ),
            },
            {
              key: 'net',
              label: 'Net',
              align: 'right',
              tnum: true,
              render: (r) => <span className="text-hp-text">{baht(r.net_thb)}</span>,
            },
            { key: 'status', label: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

/* -------------------------------------------------------- owner balances */

export function OwnerBalances() {
  const buckets = ['Current', '31–60 days', '61–90 days', '90+ days'];
  const bucketTotal = (name) =>
    sum(demo.owner_balances, (b) => b.aged.find((a) => a.bucket === name)?.amount_thb || 0);
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Finance · owner balances"
        title="Owner balances"
        em="what the house still holds"
        lede="Money collected on an owner's behalf that has not yet been paid out. Opening balance plus statements credited, less payouts made, equals what is held today."
        chips={[`${baht(outstanding)} outstanding`, 'Aged from statement issue date', 'Reconciled 10 Aug 14:06']}
      />
      <KpiRow
        tiles={buckets.map((b, i) => ({
          label: b,
          value: baht(bucketTotal(b)),
          sub: i === 0 ? 'Within the payout cycle' : i === 1 ? 'One cycle late' : 'Escalated',
          tone: i === 0 ? undefined : bucketTotal(b) > 0 ? 'neg' : undefined,
        }))}
      />
      <Card title="Running balance by owner" sub="Opening + credited − paid ± adjustments = held today">
        <Table
          minWidth={880}
          rowKey={(r) => r.owner}
          rows={demo.owner_balances}
          cols={[
            {
              key: 'owner',
              label: 'Owner',
              render: (r) => (
                <div className="min-w-[140px]">
                  <div className="text-hp-text">{r.owner}</div>
                  <div className="text-[11px] text-hp-text3">{r.villas}</div>
                </div>
              ),
            },
            { key: 'opening', label: 'Opening', align: 'right', tnum: true, render: (r) => baht(r.opening_thb) },
            {
              key: 'credited',
              label: 'Credited',
              align: 'right',
              tnum: true,
              render: (r) => <span style={{ color: 'var(--hp-pos)' }}>{signedBaht(r.credited_thb)}</span>,
            },
            {
              key: 'paid',
              label: 'Paid out',
              align: 'right',
              tnum: true,
              render: (r) => <span style={{ color: 'var(--hp-neg)' }}>{signedBaht(-r.paid_thb)}</span>,
            },
            {
              key: 'adj',
              label: 'Adjustments',
              align: 'right',
              tnum: true,
              render: (r) => (r.adjust_thb === 0 ? '—' : signedBaht(r.adjust_thb)),
            },
            {
              key: 'closing',
              label: 'Held today',
              align: 'right',
              tnum: true,
              render: (r) => (
                <span className="text-hp-text" style={r.closing_thb === 0 ? { color: 'var(--hp-pos)' } : undefined}>
                  {baht(r.closing_thb)}
                </span>
              ),
            },
            { key: 'note', label: 'Note', render: (r) => <span className="text-[11.5px]">{r.note}</span> },
          ]}
        />
      </Card>
      <Card title="Ageing" sub="Where each held balance sits in the cycle">
        <div className="mt-3 space-y-3">
          {demo.owner_balances
            .filter((b) => b.closing_thb > 0)
            .map((b) => (
              <div key={b.owner} className="rounded-xl border border-hp-lineSoft bg-[color:var(--hp-veil-1)] p-3.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[13.5px] text-hp-text">{b.owner}</span>
                  <span className="tnum text-[13.5px] text-hp-text">{baht(b.closing_thb)}</span>
                </div>
                <div className="mt-2.5 flex h-2 overflow-hidden rounded-full bg-[color:var(--hp-veil-3)]">
                  {b.aged.map((a, i) => (
                    <span
                      key={a.bucket}
                      style={{
                        width: `${(a.amount_thb / b.closing_thb) * 100}%`,
                        background: i === 0 ? 'var(--hp-gold-deep)' : i === 1 ? 'var(--hp-warn)' : 'var(--hp-neg)',
                      }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-hp-text3">
                  {b.aged
                    .filter((a) => a.amount_thb > 0)
                    .map((a) => (
                      <span key={a.bucket} className="tnum">
                        {a.bucket} · {baht(a.amount_thb)}
                      </span>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}

/* --------------------------------------------------------- payment queue */

export function PaymentQueue() {
  const [state, setState] = useState({});
  const decided = Object.keys(state).length;
  const remaining = demo.payment_queue.filter((i) => !state[i.id]);
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Finance · payment queue"
        title="Payment queue"
        em="nothing leaves without a decision"
        lede="Every spend the field team raises lands here with the receipt attached. Approve it and it joins the next supplier run; reject it and the requester is told why."
        chips={[`${remaining.length} awaiting approval`, `${baht(sum(remaining, (i) => i.amount_thb))} in the queue`, 'Threshold ฿5,000']}
      />
      <KpiRow
        cols={3}
        tiles={[
          { label: 'Awaiting approval', value: String(remaining.length), sub: 'Oldest raised 2 days ago' },
          { label: 'Value in queue', value: baht(sum(remaining, (i) => i.amount_thb)), sub: 'Across 6 suppliers' },
          {
            label: 'Decided this session',
            value: String(decided),
            sub: decided ? 'Demo only — nothing is really sent' : 'Approve or reject below',
            tone: decided ? 'pos' : undefined,
          },
        ]}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {demo.payment_queue.map((i) => {
          const d = state[i.id];
          return (
            <div
              key={i.id}
              className="hp-card-flat p-4"
              style={
                d === 'approved'
                  ? { borderColor: 'rgb(var(--hp-pos-rgb) / 0.45)' }
                  : d === 'rejected'
                  ? { borderColor: 'rgb(var(--hp-neg-rgb) / 0.45)' }
                  : undefined
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[14px] leading-snug text-hp-text">{i.payee}</div>
                  <div className="mt-0.5 text-[11.5px] text-hp-text3">
                    {i.villa} · {i.category}
                  </div>
                </div>
                <div className="tnum shrink-0 font-display text-[19px] text-hp-text">{baht(i.amount_thb)}</div>
              </div>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-hp-text2">{i.note}</p>
              <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-hp-text3">
                <span>{i.id}</span>
                <span>· {i.doc}</span>
                <span>· raised by {i.raised_by}, {i.raised}</span>
              </div>
              <div className="mt-3.5 flex items-center gap-2 border-t border-hp-lineSoft pt-3">
                {d ? (
                  <>
                    <Pill tone={d === 'approved' ? 'pos' : 'neg'}>
                      {d === 'approved' ? <Check size={11} /> : <X size={11} />}
                      {d === 'approved' ? 'Approved · queued for the 12 Aug run' : 'Rejected · requester notified'}
                    </Pill>
                    <button
                      onClick={() =>
                        setState((s) => {
                          const next = { ...s };
                          delete next[i.id];
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
                      onClick={() => setState((s) => ({ ...s, [i.id]: 'approved' }))}
                      className="btn btn-quiet !px-3.5 !py-1.5 !text-[12.5px]"
                    >
                      <Check size={13} /> Approve
                    </button>
                    <button
                      onClick={() => setState((s) => ({ ...s, [i.id]: 'rejected' }))}
                      className="btn btn-quiet !px-3.5 !py-1.5 !text-[12.5px]"
                    >
                      <X size={13} /> Reject
                    </button>
                    <span className="ml-auto text-[11px] text-hp-text3">Demo only</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- petty cash */

export function PettyCash() {
  const pc = demo.petty_cash;
  let running = 0;
  const rows = pc.entries.map((e) => {
    running += e.amount_thb;
    return { ...e, balance: running };
  });
  const spend = sum(pc.entries.filter((e) => e.amount_thb < 0), (e) => -e.amount_thb);
  const drops = sum(pc.entries.filter((e) => e.kind === 'Drop'), (e) => e.amount_thb);
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Finance · petty cash"
        title="Petty cash"
        em="the drawer, reconciled daily"
        lede="Field spend photographed at the counter, coded to a villa and reconciled against the drawer the same evening. What is left in the tin should match the closing balance exactly."
        chips={[pc.drawer, `Custodian ${pc.custodian}`, pc.period]}
      />
      <KpiRow
        tiles={[
          { label: 'Opening float', value: baht(pc.float_thb), sub: '1 Aug carried forward' },
          { label: 'Cash drops', value: signedBaht(drops), sub: '2 drops from the office safe', tone: 'pos' },
          { label: 'Spend', value: signedBaht(-spend), sub: `${pc.entries.filter((e) => e.kind === 'Spend').length} coded lines`, tone: 'neg' },
          { label: 'Closing balance', value: baht(running), sub: 'Counted 10 Aug 18:00 · matches', tone: 'gold' },
        ]}
      />
      <Card title="Drawer ledger" sub="Running balance after every movement">
        <Table
          minWidth={780}
          rowKey={(r) => r.ref}
          rows={rows}
          cols={[
            { key: 'date', label: 'Date' },
            { key: 'ref', label: 'Ref', tnum: true },
            { key: 'label', label: 'Description', render: (r) => <span className="text-hp-text">{r.label}</span> },
            { key: 'by', label: 'By' },
            { key: 'kind', label: 'Type', render: (r) => <Pill tone={r.kind === 'Spend' ? 'idle' : 'gold'}>{r.kind}</Pill> },
            {
              key: 'amount',
              label: 'Amount',
              align: 'right',
              tnum: true,
              render: (r) => (
                <span style={{ color: r.amount_thb < 0 ? 'var(--hp-neg)' : 'var(--hp-pos)' }}>
                  {signedBaht(r.amount_thb)}
                </span>
              ),
            },
            {
              key: 'balance',
              label: 'Balance',
              align: 'right',
              tnum: true,
              render: (r) => <span className="text-hp-text">{baht(r.balance)}</span>,
            },
          ]}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-hp-gold/25 bg-[color:var(--hp-gold-wash)] px-4 py-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-hp-goldDeep">Cash in the drawer</div>
          <div className="tnum font-display text-[22px] text-hp-goldInk">{baht(running)}</div>
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ bills */

export function Bills() {
  const byStatus = (s) => demo.bills.filter((b) => b.status === s);
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Finance · bills"
        title="Supplier bills"
        em="due, paid, overdue"
        lede="Utilities, laundry, pool contracts and one-off suppliers. Bills scanned in the field arrive here already coded to a villa and a category."
        chips={[`${demo.bills.length} bills this cycle`, 'Terms: 14 days', 'Auto-coded from bill scans']}
      />
      <KpiRow
        cols={3}
        tiles={[
          { label: 'Due', value: baht(sum(byStatus('Due'), (b) => b.amount_thb)), sub: `${byStatus('Due').length} bills`, tone: 'gold' },
          { label: 'Overdue', value: baht(sum(byStatus('Overdue'), (b) => b.amount_thb)), sub: `${byStatus('Overdue').length} bills past terms`, tone: 'neg' },
          { label: 'Paid this cycle', value: baht(sum(byStatus('Paid'), (b) => b.amount_thb)), sub: `${byStatus('Paid').length} bills settled`, tone: 'pos' },
        ]}
      />
      <Card title="All supplier bills" sub="Sorted by status, then due date">
        <Table
          minWidth={860}
          rowKey={(r) => r.id}
          rows={demo.bills}
          cols={[
            { key: 'id', label: 'Bill', tnum: true },
            { key: 'supplier', label: 'Supplier', render: (r) => <span className="text-hp-text">{r.supplier}</span> },
            { key: 'category', label: 'Category' },
            { key: 'villa', label: 'Allocated to' },
            { key: 'issued', label: 'Issued' },
            { key: 'due', label: 'Due' },
            { key: 'amount', label: 'Amount', align: 'right', tnum: true, render: (r) => baht(r.amount_thb) },
            { key: 'status', label: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------- payouts */

export function Payouts() {
  const batches = [...new Set(demo.payouts.map((p) => p.batch))];
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Finance · payouts"
        title="Owner payouts"
        em="batched on the 5th"
        lede="Thai bank transfers for domestic owners, Wise for everyone else. A payout only exists once its statement is closed, so the amount always matches a document the owner can already see."
        chips={[`${batches.length} batches`, `${baht(scheduledPayouts + heldPayouts)} scheduled or held`, 'FX rate locked at close']}
      />
      <KpiRow
        cols={3}
        tiles={[
          {
            label: 'Sent · Aug run',
            value: baht(sum(demo.payouts.filter((p) => p.status === 'Sent'), (p) => p.amount_thb)),
            sub: '3 owners paid 5 Aug',
            tone: 'pos',
          },
          {
            label: 'Scheduled · Sep run',
            value: baht(sum(demo.payouts.filter((p) => p.status === 'Scheduled'), (p) => p.amount_thb)),
            sub: '3 owners, 5 Sep 2026',
            tone: 'gold',
          },
          {
            label: 'Held',
            value: baht(sum(demo.payouts.filter((p) => p.status === 'Held'), (p) => p.amount_thb)),
            sub: 'Bank details under review',
            tone: 'neg',
          },
        ]}
      />
      {batches.map((b) => {
        const rows = demo.payouts.filter((p) => p.batch === b);
        return (
          <Card
            key={b}
            title={`Batch ${b}`}
            sub={`${rows[0].date} · ${rows.length} owners`}
            right={baht(sum(rows, (r) => r.amount_thb))}
          >
            <Table
              minWidth={880}
              rowKey={(r) => r.batch + r.owner + r.villa}
              rows={rows}
              cols={[
                { key: 'date', label: 'Date' },
                { key: 'owner', label: 'Owner', render: (r) => <span className="text-hp-text">{r.owner}</span> },
                { key: 'villa', label: 'Villa' },
                { key: 'period', label: 'Period' },
                { key: 'method', label: 'Method' },
                { key: 'amount', label: 'Amount', align: 'right', tnum: true, render: (r) => baht(r.amount_thb) },
                { key: 'fx', label: 'Settlement' },
                { key: 'status', label: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
              ]}
            />
          </Card>
        );
      })}
    </div>
  );
}
