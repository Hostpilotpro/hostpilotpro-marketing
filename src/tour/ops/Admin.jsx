/** Admin section — users & roles, staff directory, payroll inputs, Hostaway sync, audit log, settings. */
import { ShieldCheck, ShieldAlert, RefreshCw } from 'lucide-react';
import demo from '../../data/demo.js';
import { baht } from '../../components/ui.jsx';
import { ViewHead, Card, KpiRow, Pill, Table, statusTone } from './shared.jsx';

const sum = (a, f) => a.reduce((t, x) => t + f(x), 0);

/* --------------------------------------------------------- users & roles */

const roleTone = (role) =>
  /admin|owner \/ admin/i.test(role) ? 'gold' : /manager|finance/i.test(role) ? 'pos' : /portal/i.test(role) ? 'idle' : 'warn';

export function UsersRoles() {
  const u = demo.users_roles;
  const staff = u.filter((x) => !/portal/i.test(x.role));
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Admin · people"
        title="Users & roles"
        em="who can see what"
        lede="Staff, office and owners share one system with different doors. A housekeeper sees today's jobs on a phone; finance sees the ledger; an owner sees one villa and their own money."
        chips={[`${u.length} accounts`, `${staff.length} staff · ${u.length - staff.length} owner logins`, 'SSO available on Suite']}
      />
      <KpiRow
        tiles={[
          { label: 'Active accounts', value: String(u.length), sub: 'Signed in within 7 days' },
          { label: 'Staff accounts', value: String(staff.length), sub: 'Office and field' },
          { label: 'Owner logins', value: String(u.length - staff.length), sub: 'Portal access only' },
          {
            label: 'Two-factor enabled',
            value: `${u.filter((x) => x.mfa).length}/${u.length}`,
            sub: 'Required for finance roles',
            tone: 'warn',
          },
        ]}
      />
      <Card title="Accounts" sub="Role decides the door, not the person">
        <Table
          minWidth={800}
          rowKey={(r) => r.email}
          rows={u}
          cols={[
            {
              key: 'name',
              label: 'User',
              render: (r) => (
                <div className="min-w-[150px]">
                  <div className="text-hp-text">{r.name}</div>
                  <div className="text-[11px] text-hp-text3">{r.email}</div>
                </div>
              ),
            },
            { key: 'role', label: 'Role', render: (r) => <Pill tone={roleTone(r.role)}>{r.role}</Pill> },
            { key: 'villas', label: 'Scope' },
            {
              key: 'mfa',
              label: '2FA',
              render: (r) =>
                r.mfa ? (
                  <span className="inline-flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--hp-pos)' }}>
                    <ShieldCheck size={13} /> On
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--hp-warn)' }}>
                    <ShieldAlert size={13} /> Off
                  </span>
                ),
            },
            { key: 'last_active', label: 'Last active' },
          ]}
        />
      </Card>
    </div>
  );
}

/* ------------------------------------------------------- staff directory */

export function StaffDirectory() {
  const s = demo.staff_directory;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Admin · people"
        title="Staff directory"
        em="19 people, 24 villas, one rota"
        lede="Assignments, shifts, languages and a phone number that works. The field app reads the same record, so a job can only be assigned to someone who actually covers that villa."
        chips={[`${s.length} shown of 19`, 'Languages: English · ไทย · မြန်မာ', 'Rota synced to the field app']}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {s.map((p) => (
          <div key={p.name} className="hp-card-flat p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--hp-gold-wash-2)] font-display text-[13px] text-hp-goldInk">
                {p.name
                  .split(' ')
                  .map((x) => x[0])
                  .join('')}
              </div>
              <div className="min-w-0">
                <div className="text-[14px] text-hp-text">{p.name}</div>
                <div className="text-[11.5px] text-hp-text3">{p.role}</div>
              </div>
            </div>
            <dl className="mt-3 space-y-1.5 text-[12px]">
              <div className="flex gap-2">
                <dt className="w-[74px] shrink-0 text-hp-text3">Villas</dt>
                <dd className="min-w-0 flex-1 text-hp-text2">{p.villas}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[74px] shrink-0 text-hp-text3">Shift</dt>
                <dd className="min-w-0 flex-1 text-hp-text2">{p.shift}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[74px] shrink-0 text-hp-text3">Languages</dt>
                <dd className="min-w-0 flex-1 text-hp-text2">{p.languages}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[74px] shrink-0 text-hp-text3">Contact</dt>
                <dd className="tnum min-w-0 flex-1 text-hp-text2">{p.phone}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- payroll inputs */

export function PayrollInputs() {
  const p = demo.payroll_inputs;
  const gross = sum(p.rows, (r) => r.gross_thb);
  const ot = sum(p.rows, (r) => r.ot_thb);
  const hours = sum(p.rows, (r) => r.regular_hrs + r.ot_hrs);
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Admin · payroll"
        title="Payroll inputs"
        em="hours the field app already recorded"
        lede="Clock-ins from the field app, shifts from the rota and overtime approved by the ops manager. Nothing is retyped — the payroll run reads exactly what the phones recorded."
        chips={[p.period, p.cutoff, `${p.rows.length} of 19 staff shown`]}
      />
      <KpiRow
        tiles={[
          { label: 'Hours recorded', value: `${hours}h`, sub: `${sum(p.rows, (r) => r.shifts)} shifts` },
          { label: 'Overtime', value: `${sum(p.rows, (r) => r.ot_hrs)}h`, sub: `${baht(ot)} at 1.5×`, tone: 'warn' },
          { label: 'Allowances', value: baht(sum(p.rows, (r) => r.allowance_thb)), sub: 'Transport and phone' },
          { label: 'Period total', value: baht(gross), sub: 'Gross, before statutory deductions', tone: 'gold' },
        ]}
      />
      <Card title="Half-month run" sub="Regular + overtime + allowance = gross">
        <Table
          minWidth={840}
          rowKey={(r) => r.name}
          rows={p.rows}
          cols={[
            { key: 'name', label: 'Staff', render: (r) => <span className="text-hp-text">{r.name}</span> },
            { key: 'role', label: 'Role' },
            { key: 'shifts', label: 'Shifts', align: 'right', tnum: true },
            { key: 'regular_hrs', label: 'Regular h', align: 'right', tnum: true },
            { key: 'ot_hrs', label: 'OT h', align: 'right', tnum: true },
            { key: 'rate', label: 'Rate/h', align: 'right', tnum: true, render: (r) => baht(r.rate_thb) },
            { key: 'reg', label: 'Regular', align: 'right', tnum: true, render: (r) => baht(r.regular_thb) },
            {
              key: 'otv',
              label: 'Overtime',
              align: 'right',
              tnum: true,
              render: (r) => <span style={{ color: 'var(--hp-warn)' }}>{baht(r.ot_thb)}</span>,
            },
            { key: 'allow', label: 'Allowance', align: 'right', tnum: true, render: (r) => baht(r.allowance_thb) },
            {
              key: 'gross',
              label: 'Gross',
              align: 'right',
              tnum: true,
              render: (r) => <span className="text-hp-text">{baht(r.gross_thb)}</span>,
            },
          ]}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-hp-gold/25 bg-[color:var(--hp-gold-wash)] px-4 py-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-hp-goldDeep">Period total · {p.period}</div>
          <div className="tnum font-display text-[22px] text-hp-goldInk">{baht(gross)}</div>
        </div>
      </Card>
    </div>
  );
}

/* --------------------------------------------------------- Hostaway sync */

export function HostawaySync() {
  const h = demo.hostaway_sync;
  const degraded = h.entities.filter((e) => e.status !== 'Healthy');
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Admin · system"
        title="Hostaway sync"
        em="two-way, and honest about lag"
        lede="Listings, reservations, rates, reviews and messages move both ways on webhooks with a 15-minute reconcile behind them. When a field lags, the console says so rather than pretending."
        chips={[h.account, h.mode, degraded.length ? `${degraded.length} entity degraded` : 'All healthy']}
      />
      <KpiRow
        cols={3}
        tiles={[
          { label: 'Entities synced', value: String(h.entities.length), sub: 'Properties through messages' },
          {
            label: 'Records tracked',
            value: sum(h.entities, (e) => e.records).toLocaleString('en-US'),
            sub: 'Across the whole account',
          },
          {
            label: 'Changes in the last hour',
            value: String(sum(h.entities, (e) => e.changed)),
            sub: '3 bookings, 41 rate pushes, 2 reviews',
            tone: 'gold',
          },
        ]}
      />
      <Card
        title="Sync status by entity"
        sub="Last successful run and what moved"
        right={
          <span className="inline-flex items-center gap-1.5">
            <RefreshCw size={12} /> Reconciles every 15 min
          </span>
        }
      >
        <Table
          minWidth={780}
          rowKey={(r) => r.entity}
          rows={h.entities}
          cols={[
            { key: 'entity', label: 'Entity', render: (r) => <span className="text-hp-text">{r.entity}</span> },
            { key: 'last', label: 'Last sync' },
            { key: 'records', label: 'Records', align: 'right', tnum: true, render: (r) => r.records.toLocaleString('en-US') },
            { key: 'changed', label: 'Changed', align: 'right', tnum: true },
            { key: 'detail', label: 'Detail', render: (r) => <span className="text-[11.5px]">{r.detail}</span> },
            { key: 'status', label: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
          ]}
        />
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------- audit log */

export function AuditLog() {
  const a = demo.audit_log;
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Admin · system"
        title="Audit log"
        em="every action, every actor"
        lede="Who approved the payment, who moved the rate, who changed a role and from which address. Immutable, exportable, and the reason an owner dispute takes minutes rather than a morning."
        chips={[`${a.length} most recent entries`, 'Retained 7 years', 'Exports to CSV']}
      />
      <Card title="Recent activity" sub="Newest first · system actions included">
        <Table
          minWidth={820}
          rowKey={(r, i) => r.when + i}
          rows={a}
          cols={[
            { key: 'when', label: 'When', tnum: true },
            { key: 'actor', label: 'Actor', render: (r) => <span className="text-hp-text">{r.actor}</span> },
            { key: 'action', label: 'Action' },
            { key: 'target', label: 'Target', render: (r) => <span className="text-[12px]">{r.target}</span> },
            { key: 'ip', label: 'Source', tnum: true },
          ]}
        />
      </Card>
    </div>
  );
}

/* --------------------------------------------------------------- settings */

export function Settings() {
  return (
    <div className="space-y-3.5">
      <ViewHead
        eyebrow="Admin · settings"
        title="Settings"
        em="the rules the rest of the system obeys"
        lede="Fee percentages, close days, approval thresholds and notification rules. Change the management fee here and every statement issued after the change uses it — nothing is hard-coded per villa unless you say so."
        chips={['Organisation-wide', 'Per-villa overrides available', 'Changes are audited']}
      />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {demo.settings.groups.map((g) => (
          <Card key={g.label} title={g.label}>
            <div className="mt-3 space-y-3">
              {g.fields.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-3">
                  <label className="min-w-0 flex-1 text-[12.5px] leading-snug text-hp-text2">{f.label}</label>
                  {f.kind === 'toggle' ? (
                    <span
                      className="flex h-5 w-9 shrink-0 items-center rounded-full px-0.5"
                      style={{
                        background: f.on ? 'var(--hp-gold-deep)' : 'var(--hp-veil-3)',
                        border: '1px solid var(--hp-line)',
                        justifyContent: f.on ? 'flex-end' : 'flex-start',
                      }}
                      aria-hidden
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full"
                        style={{ background: f.on ? 'var(--hp-on-gold)' : 'var(--hp-text-3)' }}
                      />
                    </span>
                  ) : (
                    <span className="min-w-0 max-w-[58%] break-words rounded-lg border border-hp-line bg-[color:var(--hp-veil-2)] px-2.5 py-1.5 text-right text-[12.5px] leading-snug text-hp-text">
                      {f.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-hp-lineSoft bg-[color:var(--hp-veil-1)] px-4 py-3">
        <span className="text-[12px] text-hp-text3">Settings are read-only in this demo.</span>
        <button className="btn btn-quiet ml-auto !px-4 !py-1.5 !text-[12.5px]" type="button">
          Save changes
        </button>
      </div>
    </div>
  );
}
