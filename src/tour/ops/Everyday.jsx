/** Home, Properties and Operations sub-views — everything the sidebar can reach. */
import demo from '../../data/demo.js';
import asset from '../../lib/asset.js';
import { baht, AreaChart } from '../../components/ui.jsx';
import { ViewHead, Card, KpiRow, Pill, Table, Meter, statusTone } from './shared.jsx';

const sum = (a, f) => a.reduce((t, x) => t + f(x), 0);
const photoFiles = ['/img/villa-sapphire-hero.jpg', '/img/villa-day.jpg', '/img/samui-coast.jpg'];

/* ================================================================== HOME */

export function MyDay() {
  const d = demo.my_day;
  const done = d.blocks.filter((b) => b.tone === 'done').length;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Home · my day"
        title="My day"
        em={d.date}
        lede={`${d.staff} · ${d.role}. The console builds a running order from the rota, the arrivals board and anything waiting on your approval.`}
        chips={[`${done} of ${d.blocks.length} done`, '9 turnovers today', 'Next: payment queue']}
      />
      <div className="hp-card-flat p-4 sm:p-5">
        <div className="space-y-0">
          {d.blocks.map((b, i) => (
            <div key={b.time} className="flex gap-3 sm:gap-4">
              <div className="tnum w-[46px] shrink-0 pt-0.5 text-right text-[12px] text-hp-text3 sm:w-[54px] sm:text-[13px]">
                {b.time}
              </div>
              <div className="flex flex-col items-center">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{
                    background:
                      b.tone === 'done'
                        ? 'var(--hp-pos)'
                        : b.tone === 'now'
                        ? 'var(--hp-gold)'
                        : 'var(--hp-text-3)',
                  }}
                />
                {i < d.blocks.length - 1 && <span className="w-px flex-1 bg-hp-lineSoft" />}
              </div>
              <div className="flex-1 pb-5">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className={`text-[13.5px] ${b.tone === 'done' ? 'text-hp-text2' : 'text-hp-text'}`}>
                    {b.title}
                  </span>
                  {b.tone === 'now' && <Pill tone="gold">Now</Pill>}
                  {b.tone === 'done' && <Pill tone="pos">Done</Pill>}
                </div>
                <div className="mt-0.5 text-[12px] text-hp-text3">{b.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArrivalsDepartures() {
  const a = demo.arrivals_today;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Home · today"
        title="Arrivals & departures"
        em="the board the whole team works from"
        lede="Who is coming, who is leaving, what each stay is worth and whether the villa behind it is ready. The field app shows the same board filtered to the crew's own villas."
        chips={['Monday 10 August 2026', '9 turnovers', 'Sunset 18:41']}
      />
      <KpiRow
        tiles={[
          { label: 'Arriving today', value: '2', sub: '10 guests inbound' },
          { label: 'Departing today', value: '1', sub: 'Clean starts 11:10' },
          { label: 'In house', value: '1', sub: '9 guests staying on' },
          { label: 'Value on the board', value: baht(sum(a, (x) => x.value_thb)), sub: 'Across 4 stays', tone: 'gold' },
        ]}
      />
      <Card title="Today's movements" sub="Pulled from Hostaway, matched to the cleaning rota">
        <Table
          minWidth={720}
          rowKey={(r) => r.villa}
          rows={a}
          cols={[
            { key: 'villa', label: 'Villa', render: (r) => <span className="text-hp-text">{r.villa}</span> },
            { key: 'guest', label: 'Guest' },
            { key: 'nights', label: 'Nights', align: 'right', tnum: true },
            { key: 'guests', label: 'Pax', align: 'right', tnum: true },
            { key: 'value', label: 'Stay value', align: 'right', tnum: true, render: (r) => baht(r.value_thb) },
            { key: 'status', label: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

export function Inbox() {
  const m = demo.inbox;
  const unread = m.filter((x) => x.unread).length;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Home · inbox"
        title="Inbox"
        em="guests, owners and suppliers in one thread list"
        lede="Airbnb and Booking.com messages, owner portal notes, direct email and WhatsApp all land here attached to the villa and the reservation they belong to."
        chips={[`${unread} unread`, '4 channels connected', 'Median first reply 6 min']}
      />
      <div className="hp-card-flat divide-y divide-hp-lineSoft">
        {m.map((x) => (
          <div key={x.subject} className="flex gap-3 p-3.5 sm:p-4">
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
              style={{ background: x.unread ? 'var(--hp-gold)' : 'transparent', border: x.unread ? 'none' : '1px solid var(--hp-line)' }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span className={`text-[13.5px] ${x.unread ? 'text-hp-text' : 'text-hp-text2'}`}>{x.from}</span>
                <span className="shrink-0 text-[11px] text-hp-text3">{x.when}</span>
              </div>
              <div className="mt-0.5 text-[13px] text-hp-text2">{x.subject}</div>
              <div className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-hp-text3">{x.preview}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Pill tone="idle">{x.channel}</Pill>
                <Pill tone="idle">{x.villa}</Pill>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MyTasks() {
  const rows = demo.tasks_board.sample;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Home · personal"
        title="My tasks"
        em="only what is assigned to you"
        lede="The same records as the operations board, filtered to the signed-in user. Ops managers see what they own; a housekeeper sees four jobs and nothing else."
        chips={['Ploy S. · Operations manager', `${rows.length} assigned`, '1 overdue portfolio-wide']}
      />
      <Card title="Assigned to me" sub="Today and tomorrow">
        <Table
          minWidth={640}
          rowKey={(r) => r.title}
          rows={rows}
          cols={[
            { key: 'title', label: 'Task', render: (r) => <span className="text-hp-text">{r.title}</span> },
            { key: 'dept', label: 'Department' },
            { key: 'assignee', label: 'Assignee' },
            { key: 'due', label: 'Due' },
            { key: 'state', label: 'State', render: (r) => <Pill tone={statusTone(r.state)}>{r.state}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

export function MyRequests() {
  const r = demo.my_requests;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Home · personal"
        title="My requests"
        em="spend and changes waiting on someone else"
        lede="Anything you raised that needs an owner, a manager or a budget holder to say yes. Each one carries the quote, the photos and the villa it belongs to."
        chips={[`${r.length} requests`, `${baht(sum(r, (x) => x.amount_thb))} of proposed spend`, 'Threshold ฿5,000']}
      />
      <Card title="Raised by me" sub="Newest first">
        <Table
          minWidth={720}
          rowKey={(x) => x.id}
          rows={r}
          cols={[
            { key: 'id', label: 'Ref', tnum: true },
            { key: 'title', label: 'Request', render: (x) => <span className="text-hp-text">{x.title}</span> },
            { key: 'villa', label: 'Villa' },
            { key: 'raised', label: 'Raised' },
            {
              key: 'amount',
              label: 'Amount',
              align: 'right',
              tnum: true,
              render: (x) => (x.amount_thb === 0 ? '—' : baht(x.amount_thb)),
            },
            { key: 'stage', label: 'Stage', render: (x) => <Pill tone={statusTone(x.stage)}>{x.stage}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

export function MyBills() {
  const b = demo.my_bills;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Home · personal"
        title="My bills"
        em="receipts you photographed"
        lede="Every receipt scanned in the field app appears here with its coding, so a technician can see exactly what has been approved and what is still with finance."
        chips={[`${b.length} submitted this month`, `${baht(sum(b, (x) => x.amount_thb))} total`, 'Photo proof attached to each']}
      />
      <Card title="Submitted receipts" sub="Petty cash and reimbursements">
        <Table
          minWidth={680}
          rowKey={(x) => x.id}
          rows={b}
          cols={[
            { key: 'id', label: 'Ref', tnum: true },
            { key: 'label', label: 'Description', render: (x) => <span className="text-hp-text">{x.label}</span> },
            { key: 'villa', label: 'Villa' },
            { key: 'date', label: 'Date' },
            { key: 'method', label: 'Method' },
            { key: 'amount', label: 'Amount', align: 'right', tnum: true, render: (x) => baht(x.amount_thb) },
            { key: 'state', label: 'State', render: (x) => <Pill tone={statusTone(x.state)}>{x.state}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

/* ============================================================ PROPERTIES */

export function PropertyDrift() {
  const d = demo.property_drift;
  const action = d.filter((x) => x.severity === 'Action').length;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Properties · portfolio"
        title="Property drift"
        em="where the channels stopped agreeing with you"
        lede="Listings drift. Someone edits a rate in the Airbnb app, a max-guest count is changed on Booking.com, a hero photo is never updated. Drift detection compares the villa file to every channel nightly and shows the differences."
        chips={[`${d.length} differences found`, `${action} need action`, 'Checked 10 Aug 03:00']}
      />
      <KpiRow
        cols={3}
        tiles={[
          { label: 'Villas with drift', value: String(new Set(d.map((x) => x.villa)).size), sub: 'Of 24 in the portfolio', tone: 'warn' },
          { label: 'Needs action', value: String(action), sub: 'Rate, occupancy or fee differences', tone: 'neg' },
          { label: 'Watch only', value: String(d.length - action), sub: 'Cosmetic or low impact' },
        ]}
      />
      <Card title="Differences" sub="Villa file on the left, channel on the right">
        <Table
          minWidth={800}
          rowKey={(x, i) => x.villa + i}
          rows={d}
          cols={[
            { key: 'villa', label: 'Villa', render: (x) => <span className="text-hp-text">{x.villa}</span> },
            { key: 'field', label: 'Field' },
            { key: 'ours', label: 'Villa file', render: (x) => <span className="text-hp-text">{x.ours}</span> },
            { key: 'channel', label: 'On channel', render: (x) => <span style={{ color: 'var(--hp-warn)' }}>{x.channel}</span> },
            { key: 'since', label: 'Drifting for' },
            { key: 'severity', label: 'Severity', render: (x) => <Pill tone={statusTone(x.severity)}>{x.severity}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

export function HeroPhotos() {
  const p = demo.hero_photos;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Properties · portfolio"
        title="Hero photos"
        em="the first 200 milliseconds of a booking"
        lede="Each villa's lead image scored on composition, light and how it converts in search. Two villas are shooting again because their click-through has fallen below the portfolio floor of 4.0%."
        chips={[`${p.length} villas shown`, '2 reshoots queued', 'Portfolio CTR floor 4.0%']}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {p.map((x, i) => (
          <div key={x.villa} className="hp-card-flat overflow-hidden">
            <div className="relative h-[132px] w-full overflow-hidden bg-[color:var(--hp-veil-2)]">
              <img
                src={asset(photoFiles[i % photoFiles.length])}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: `${(i * 27) % 100}% 50%`, filter: x.state === 'Live' ? 'none' : 'grayscale(0.55)' }}
              />
              <div className="absolute inset-0 scrim-h" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                <span className="tnum text-[11px] text-[color:var(--hp-on-status)] opacity-80">{x.file}</span>
                <Pill tone={x.state === 'Live' ? 'pos' : 'warn'}>{x.state}</Pill>
              </div>
            </div>
            <div className="p-3.5">
              <div className="text-[13.5px] text-hp-text">{x.villa}</div>
              <div className="mt-2 flex items-center gap-2">
                <span className="tnum text-[12px] text-hp-text2">Score {x.score}</span>
                <Meter pct={x.score} tone={x.score >= 85 ? 'pos' : 'neg'} />
              </div>
              <div className="mt-1.5 text-[11.5px] text-hp-text3">
                Search CTR {x.ctr_pct}% · updated {x.updated}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioAnalytics() {
  const a = demo.portfolio_analytics;
  const latest = a.revpar_series[a.revpar_series.length - 1];
  const first = a.revpar_series[0];
  const blendedComm = Math.round(sum(a.channels, (c) => (c.share_pct * c.commission_pct) / 100));
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Properties · portfolio"
        title="Portfolio analytics"
        em="RevPAR, channel mix, commission drag"
        lede="The three numbers that decide whether a portfolio is worth managing: revenue per available night, where the bookings come from, and how much of the top line the channels keep."
        chips={[a.window, `RevPAR ${baht(latest)}`, `Blended commission ${blendedComm}%`]}
      />
      <KpiRow
        tiles={[
          { label: 'RevPAR · Aug', value: baht(latest), sub: `${Math.round(((latest - first) / first) * 100)}% vs Sep last year`, tone: 'pos' },
          { label: 'Direct share', value: `${a.channels[0].share_pct}%`, sub: 'Zero commission', tone: 'gold' },
          { label: 'Blended commission', value: `${blendedComm}%`, sub: 'Weighted by channel share', tone: 'neg' },
          { label: 'Highest ADR channel', value: 'Repeat', sub: `${baht(a.channels[4].adr_thb)} · 3% of nights` },
        ]}
      />
      <Card title="RevPAR · trailing 12 months" sub="Revenue per available night across all 24 villas">
        <div className="mt-4">
          <AreaChart series={a.revpar_series} height={140} id="ops-revpar" />
        </div>
        <div className="mt-1 flex justify-between text-[10.5px] text-hp-text3">
          {a.months.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </Card>
      <Card title="Channel mix" sub="Share of nights, ADR and what the channel keeps">
        <Table
          minWidth={640}
          rowKey={(r) => r.channel}
          rows={a.channels}
          cols={[
            { key: 'channel', label: 'Channel', render: (r) => <span className="text-hp-text">{r.channel}</span> },
            { key: 'share', label: 'Share', align: 'right', tnum: true, render: (r) => `${r.share_pct}%` },
            { key: 'bar', label: 'Share of nights', render: (r) => <Meter pct={r.share_pct * 2.5} /> },
            { key: 'adr', label: 'ADR', align: 'right', tnum: true, render: (r) => baht(r.adr_thb) },
            {
              key: 'comm',
              label: 'Commission',
              align: 'right',
              tnum: true,
              render: (r) => (
                <span style={{ color: r.commission_pct === 0 ? 'var(--hp-pos)' : 'var(--hp-neg)' }}>
                  {r.commission_pct === 0 ? 'None' : `${r.commission_pct}%`}
                </span>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}

export function OwnerDirectory({ onOpenStatements }) {
  const o = demo.owners;
  const bal = (name) => demo.owner_balances.find((b) => b.owner === name);
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Properties · owners"
        title="Owner directory"
        em="17 owners, one relationship each"
        lede="Contact, contract start, villas held and the money currently owed to them. Everything an owner can see in their portal is generated from this record."
        chips={[`${o.length} of 17 shown`, 'Portal access for all', 'Statements issued monthly']}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {o.map((x) => {
          const b = bal(x.name);
          return (
            <div key={x.email} className="hp-card-flat p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--hp-gold-wash-2)] font-display text-[13px] text-hp-goldInk">
                  {x.initials}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[14px] text-hp-text">{x.name}</div>
                  <div className="truncate text-[11.5px] text-hp-text3">{x.email}</div>
                </div>
              </div>
              <dl className="mt-3 space-y-1.5 text-[12px]">
                <div className="flex gap-2">
                  <dt className="w-[70px] shrink-0 text-hp-text3">Villas</dt>
                  <dd className="min-w-0 flex-1 text-hp-text2">{x.villas.join(' · ')}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-[70px] shrink-0 text-hp-text3">Based in</dt>
                  <dd className="min-w-0 flex-1 text-hp-text2">{x.based_in}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-[70px] shrink-0 text-hp-text3">Since</dt>
                  <dd className="min-w-0 flex-1 text-hp-text2">{x.since}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-[70px] shrink-0 text-hp-text3">Payout</dt>
                  <dd className="min-w-0 flex-1 text-hp-text2">{x.payout_method}</dd>
                </div>
              </dl>
              <div className="mt-3 flex items-center justify-between border-t border-hp-lineSoft pt-2.5">
                <span className="text-[11.5px] text-hp-text3">Balance held</span>
                <span
                  className="tnum text-[13px]"
                  style={{ color: b && b.closing_thb > 0 ? 'var(--hp-text)' : 'var(--hp-pos)' }}
                >
                  {b ? baht(b.closing_thb) : '—'}
                </span>
              </div>
              <button
                onClick={onOpenStatements}
                className="btn btn-quiet mt-3 w-full !py-1.5 !text-[12.5px]"
                type="button"
              >
                Open statements
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Onboarding() {
  const o = demo.onboarding;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Properties · owners"
        title="Onboarding"
        em="fifteen steps from signature to first booking"
        lede="Contract, inventory, photography, pricing, channel listings, smart-lock handover. Each villa moves through the same checklist so the twenty-fifth onboarding is as good as the first."
        chips={[`${o.length} villas in flight`, 'Average 34 days to live', 'Next go-live 18 Aug']}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {o.map((x) => (
          <div key={x.code} className="hp-card-flat p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <div className="min-w-0">
                <div className="text-[14.5px] text-hp-text">{x.villa}</div>
                <div className="text-[11.5px] text-hp-text3">
                  {x.code} · {x.owner}
                </div>
              </div>
              <Pill tone="gold">{x.eta}</Pill>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="tnum text-[12.5px] text-hp-text2">{x.progress}%</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[color:var(--hp-veil-3)]">
                <span className="block h-full" style={{ width: `${x.progress}%`, background: 'var(--hp-gold-deep)' }} />
              </span>
              <span className="tnum text-[11.5px] text-hp-text3">{x.steps}</span>
            </div>
            <div className="mt-2 text-[12px] text-hp-text2">Current step · {x.stage}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ OPERATIONS */

export function ReservationsFeed() {
  const r = demo.reservations_feed;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Operations · today"
        title="Reservations feed"
        em="every booking, modification and cancellation"
        lede="A live tape of what the channels are doing. New bookings create their own cleaning and inspection tasks; cancellations release the calendar and tell RatePilot to look again."
        chips={['Synced 1 minute ago', `${r.filter((x) => x.state === 'New').length} new today`, '318 reservations on file']}
      />
      <KpiRow
        tiles={[
          { label: 'New today', value: String(r.filter((x) => x.state === 'New').length), sub: 'Auto-tasked on arrival', tone: 'gold' },
          { label: 'Modified', value: String(r.filter((x) => x.state === 'Modified').length), sub: 'Dates or guest count changed', tone: 'warn' },
          { label: 'Cancelled', value: String(r.filter((x) => x.state === 'Cancelled').length), sub: 'Calendar released', tone: 'neg' },
          {
            label: 'Value in the feed',
            value: baht(sum(r.filter((x) => x.state !== 'Cancelled'), (x) => x.value_thb)),
            sub: 'Excluding cancellations',
          },
        ]}
      />
      <Card title="Recent activity" sub="Newest first · pulled from all channels">
        <Table
          minWidth={860}
          rowKey={(x) => x.ref}
          rows={r}
          cols={[
            { key: 'when', label: 'When' },
            { key: 'ref', label: 'Ref', tnum: true },
            { key: 'villa', label: 'Villa', render: (x) => <span className="text-hp-text">{x.villa}</span> },
            { key: 'guest', label: 'Guest' },
            { key: 'channel', label: 'Channel' },
            { key: 'dates', label: 'Dates' },
            { key: 'nights', label: 'Nights', align: 'right', tnum: true },
            { key: 'value', label: 'Value', align: 'right', tnum: true, render: (x) => baht(x.value_thb) },
            { key: 'state', label: 'State', render: (x) => <Pill tone={statusTone(x.state)}>{x.state}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

export function Inspections() {
  const ins = demo.inspections;
  const scored = ins.filter((x) => x.score !== null);
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Operations · today"
        title="Inspections"
        em="the standard, evidenced"
        lede="Pre-arrival, post-departure and quarterly deep inspections, each scored against a villa-specific checklist with photographs attached. A failed inspection orders a re-clean before the guest ever knows."
        chips={[`${ins.length} inspections this week`, `Average score ${Math.round(sum(scored, (x) => x.score) / scored.length)}`, '1 failed · re-clean ordered']}
      />
      <Card title="This week" sub="Completed and scheduled">
        <Table
          minWidth={760}
          rowKey={(x) => x.villa + x.when}
          rows={ins}
          cols={[
            { key: 'villa', label: 'Villa', render: (x) => <span className="text-hp-text">{x.villa}</span> },
            { key: 'type', label: 'Type' },
            { key: 'inspector', label: 'Inspector' },
            { key: 'when', label: 'When' },
            { key: 'score', label: 'Score', align: 'right', tnum: true, render: (x) => (x.score === null ? '—' : x.score) },
            {
              key: 'bar',
              label: 'Against standard',
              render: (x) =>
                x.score === null ? <span className="text-hp-text3">Not yet run</span> : <Meter pct={x.score} tone={x.score >= 90 ? 'pos' : 'neg'} />,
            },
            { key: 'issues', label: 'Issues', align: 'right', tnum: true, render: (x) => (x.issues === null ? '—' : x.issues) },
            { key: 'state', label: 'Outcome', render: (x) => <Pill tone={statusTone(x.state)}>{x.state}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

export function Checkout() {
  const c = demo.checkout;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Operations · today"
        title="Checkout"
        em="the five things that must happen before the deposit is released"
        lede="Clean started, inventory checked, meters read, damages logged, deposit decided. Nothing is released until each column is answered, and each answer is timestamped against a member of staff."
        chips={['Standard checkout 11:00', 'Meter reads feed the owner statement', 'Deposits held ฿20,000']}
      />
      <Card title="Checkout board" sub="Today and in-house stays">
        <Table
          minWidth={860}
          rowKey={(x) => x.villa}
          rows={c}
          cols={[
            { key: 'villa', label: 'Villa', render: (x) => <span className="text-hp-text">{x.villa}</span> },
            { key: 'guest', label: 'Guest' },
            { key: 'out', label: 'Checkout' },
            { key: 'clean', label: 'Clean' },
            { key: 'inventory', label: 'Inventory' },
            { key: 'meter', label: 'Meter read' },
            { key: 'deposit', label: 'Deposit' },
            { key: 'state', label: 'State', render: (x) => <Pill tone={statusTone(x.state)}>{x.state}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

export function ServiceSchedule() {
  const s = demo.service_schedule;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Operations · field services"
        title="Service schedule"
        em="recurring work, planned not remembered"
        lede="Pool, garden, aircon, linen, pest control. Each service generates its own tasks on its own cadence and lands on the right crew's phone without anyone typing it out again."
        chips={[`${s.length} recurring services`, '24 villas covered', 'Next: pool chemicals 15:00']}
      />
      <Card title="Recurring services" sub="Cadence, crew and next run">
        <Table
          minWidth={740}
          rowKey={(x) => x.service}
          rows={s}
          cols={[
            { key: 'service', label: 'Service', render: (x) => <span className="text-hp-text">{x.service}</span> },
            { key: 'crew', label: 'Crew or supplier' },
            { key: 'frequency', label: 'Cadence' },
            { key: 'villas', label: 'Villas', align: 'right', tnum: true },
            { key: 'next', label: 'Next run' },
            { key: 'state', label: 'Status', render: (x) => <Pill tone={statusTone(x.state)}>{x.state}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

export function DamageClaims() {
  const d = demo.damage_claims;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Operations · field services"
        title="Damage claims"
        em="photographs, or it did not happen"
        lede="Damage logged at inspection with before-and-after photographs, priced from the villa inventory, and either charged to the deposit, claimed from the channel or waived with the owner told why."
        chips={[`${d.length} open claims`, `${baht(sum(d, (x) => x.amount_thb))} claimed`, 'Evidence attached to all']}
      />
      <Card title="Claims" sub="Newest first">
        <Table
          minWidth={800}
          rowKey={(x) => x.id}
          rows={d}
          cols={[
            { key: 'id', label: 'Ref', tnum: true },
            { key: 'villa', label: 'Villa', render: (x) => <span className="text-hp-text">{x.villa}</span> },
            { key: 'guest', label: 'Guest' },
            { key: 'item', label: 'Item' },
            { key: 'amount', label: 'Amount', align: 'right', tnum: true, render: (x) => baht(x.amount_thb) },
            { key: 'evidence', label: 'Evidence' },
            { key: 'when', label: 'Logged' },
            { key: 'stage', label: 'Outcome', render: (x) => <Pill tone={statusTone(x.stage)}>{x.stage}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

export function TM30() {
  const t = demo.tm30;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Operations · field services"
        title="TM30"
        em="the Thai filing nobody enjoys"
        lede="Every foreign guest must be reported to immigration within 24 hours of arrival. The console files it automatically the moment a check-in is confirmed and keeps the receipt against the reservation."
        chips={[`${t.filter((x) => x.state === 'Filed').length} filed`, `${t.filter((x) => x.state !== 'Filed').length} queued`, 'Auto-file on check-in: on']}
      />
      <Card title="Filings" sub="Latest arrivals">
        <Table
          minWidth={760}
          rowKey={(x) => x.guest + x.arrival}
          rows={t}
          cols={[
            { key: 'guest', label: 'Guest', render: (x) => <span className="text-hp-text">{x.guest}</span> },
            { key: 'nationality', label: 'Nationality' },
            { key: 'villa', label: 'Villa' },
            { key: 'arrival', label: 'Arrival' },
            { key: 'filed', label: 'Filed' },
            { key: 'ref', label: 'Reference', tnum: true },
            { key: 'state', label: 'State', render: (x) => <Pill tone={statusTone(x.state)}>{x.state}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}
