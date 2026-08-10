/**
 * Shared grammar for the Ops Console views.
 *
 * Every new section in the console is assembled from these five pieces so the
 * whole replica keeps one visual language: a panel header, flat cards, a KPI
 * strip, a status pill and a horizontally scrollable table that survives a
 * 375px phone.
 */
import { baht } from '../../components/ui.jsx';

/* ------------------------------------------------------------------ head */

export function ViewHead({ eyebrow, title, em, lede, chips }) {
  return (
    <div className="grain relative overflow-hidden rounded-2xl border border-hp-line panel-grad p-5 sm:p-8">
      <div className="eyebrow">{eyebrow}</div>
      <h3 className="mt-3 font-display text-[clamp(1.35rem,1rem+1.8vw,2.3rem)] font-medium leading-tight text-hp-text">
        {title}
        {em && (
          <>
            {' '}
            <span className="text-hp-goldDeep">·</span> <span className="italic text-hp-text2">{em}</span>
          </>
        )}
      </h3>
      {lede && <p className="mt-2.5 max-w-2xl text-[13.5px] leading-relaxed text-hp-text2 sm:text-[14.5px]">{lede}</p>}
      {chips && chips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="chip !text-[11.5px]">
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ card */

export function Card({ title, sub, right, children, className = '' }) {
  return (
    <div className={`hp-card-flat min-w-0 p-4 sm:p-5 ${className}`}>
      {(title || right) && (
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div className="min-w-0">
            {title && <h4 className="font-display text-[17px] leading-tight text-hp-text sm:text-[19px]">{title}</h4>}
            {sub && <div className="mt-1 text-[11.5px] text-hp-text3">{sub}</div>}
          </div>
          {right && <div className="shrink-0 text-[11.5px] text-hp-text3">{right}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------- kpi */

/** tiles: [{ label, value, sub, tone: 'pos'|'neg'|'gold'|undefined }] */
export function KpiRow({ tiles, cols = 4 }) {
  const grid = cols === 3 ? 'sm:grid-cols-3' : cols === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4';
  return (
    <div className={`grid grid-cols-2 gap-2.5 sm:gap-3.5 ${grid}`}>
      {tiles.map((t) => (
        <div key={t.label} className="hp-card-flat p-3.5 sm:p-4">
          <div className="text-[10.5px] uppercase leading-tight tracking-[0.09em] text-hp-text3 sm:text-[11px]">
            {t.label}
          </div>
          <div
            className="tnum mt-2 font-display text-[clamp(1.15rem,0.9rem+0.9vw,1.6rem)] leading-none"
            style={{
              color:
                t.tone === 'neg'
                  ? 'var(--hp-neg)'
                  : t.tone === 'pos'
                  ? 'var(--hp-pos)'
                  : t.tone === 'gold'
                  ? 'var(--hp-gold-ink)'
                  : 'var(--hp-text)',
            }}
          >
            {t.value}
          </div>
          {t.sub && <div className="mt-1.5 text-[11px] leading-snug text-hp-text3">{t.sub}</div>}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ pill */

const tones = {
  pos: ['var(--hp-pos)', 'var(--hp-pos-wash)', 'rgb(var(--hp-pos-rgb) / 0.4)'],
  neg: ['var(--hp-neg)', 'var(--hp-neg-wash)', 'rgb(var(--hp-neg-rgb) / 0.4)'],
  warn: ['var(--hp-warn)', 'var(--hp-warn-wash)', 'rgb(var(--hp-warn-rgb) / 0.4)'],
  gold: ['var(--hp-gold-ink)', 'var(--hp-gold-wash)', 'var(--hp-gold-rule)'],
  idle: ['var(--hp-text-3)', 'var(--hp-veil-1)', 'var(--hp-line)'],
};

export function Pill({ tone = 'idle', children }) {
  const [fg, bg, bd] = tones[tone] || tones.idle;
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{ color: fg, background: bg, border: `1px solid ${bd}` }}
    >
      {children}
    </span>
  );
}

/** Map a free-text status to a tone. */
export const statusTone = (s) => {
  const t = String(s).toLowerCase();
  if (/(paid|sent|healthy|passed|live|approved|filed|on track|complete|released|recovered|closed|settled|reimbursed)/.test(t))
    return 'pos';
  if (/(overdue|failed|cancelled|held|degraded|action|charged)/.test(t)) return 'neg';
  if (/(due|pending|scheduled|draft|queued|watch|review|peak load|modified|note|in progress|in house|submitted|planning)/.test(t))
    return 'warn';
  if (/(new|issued|enquiry)/.test(t)) return 'gold';
  return 'idle';
};

/* ----------------------------------------------------------------- table */

/**
 * cols: [{ key, label, align?: 'right', width?: string, render?: (row) => node }]
 * Scrolls horizontally below the min width rather than crushing cells.
 */
export function Table({ cols, rows, minWidth = 680, onRowClick, rowKey = (r, i) => i }) {
  return (
    <div className="-mx-1 mt-3 overflow-x-auto px-1 no-scrollbar">
      <table className="w-full text-left text-[12.5px] sm:text-[13px]" style={{ minWidth }}>
        <thead className="text-[10.5px] uppercase tracking-[0.09em] text-hp-text3">
          <tr>
            {cols.map((c) => (
              <th
                key={c.key}
                className={`whitespace-nowrap pb-2 pr-3 font-medium ${c.align === 'right' ? 'text-right' : ''}`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-hp-text2">
          {rows.map((row, i) => (
            <tr
              key={rowKey(row, i)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-t border-hp-lineSoft align-top ${
                onRowClick ? 'cursor-pointer transition hover:bg-[color:var(--hp-veil-1)]' : ''
              }`}
            >
              {cols.map((c) => (
                <td
                  key={c.key}
                  className={`py-2.5 pr-3 ${c.align === 'right' ? 'text-right' : ''} ${c.tnum ? 'tnum' : ''}`}
                >
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------- mini bars */

/** Paired in/out bar chart. series: [{ m, in_thb, out_thb }] */
export function BarPairs({ series, height = 132 }) {
  const max = Math.max(...series.flatMap((s) => [s.in_thb, s.out_thb]));
  return (
    <div className="min-w-0">
      <div className="flex min-w-0 items-end gap-1 sm:gap-3" style={{ height }}>
        {series.map((s) => (
          <div key={s.m} className="flex h-full min-w-0 flex-1 items-end justify-center gap-[2px] sm:gap-[3px]">
            <div
              className="w-1/2 max-w-[16px] rounded-t-[3px]"
              style={{ height: `${(s.in_thb / max) * 100}%`, background: 'var(--hp-gold-deep)' }}
              title={`In ${baht(s.in_thb)}`}
            />
            <div
              className="w-1/2 max-w-[16px] rounded-t-[3px]"
              style={{
                height: `${(s.out_thb / max) * 100}%`,
                background: 'rgb(var(--hp-text-3-rgb) / 0.45)',
              }}
              title={`Out ${baht(s.out_thb)}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex min-w-0 gap-1 border-t border-hp-lineSoft pt-2 sm:gap-2">
        {series.map((s) => (
          <div key={s.m} className="min-w-0 flex-1 truncate text-center text-[10.5px] text-hp-text3">
            {s.m}
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-4 text-[11px] text-hp-text3">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: 'var(--hp-gold-deep)' }} /> Money in
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: 'rgb(var(--hp-text-3-rgb) / 0.45)' }} /> Money
          out
        </span>
      </div>
    </div>
  );
}

/** Horizontal proportion bar used inside table cells. */
export function Meter({ pct, tone = 'gold' }) {
  const fg = tone === 'pos' ? 'var(--hp-pos)' : tone === 'neg' ? 'var(--hp-neg)' : 'var(--hp-gold-deep)';
  return (
    <span className="inline-flex h-1.5 w-full min-w-[52px] max-w-[120px] overflow-hidden rounded-full bg-[color:var(--hp-veil-3)] align-middle">
      <span style={{ width: `${Math.max(2, Math.min(100, pct))}%`, background: fg }} />
    </span>
  );
}

/** Two-column definition list used in detail drawers. */
export function Facts({ rows }) {
  return (
    <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-3 border-b border-hp-lineSoft pb-2">
          <dt className="text-[11.5px] uppercase tracking-[0.08em] text-hp-text3">{k}</dt>
          <dd className="tnum text-right text-[13px] text-hp-text">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
