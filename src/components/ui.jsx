import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const baht = (n) =>
  `฿${Math.abs(n).toLocaleString('en-US')}`;

export const signedBaht = (n) => `${n < 0 ? '−' : ''}฿${Math.abs(n).toLocaleString('en-US')}`;

export function Eyebrow({ children, className = '' }) {
  return <div className={`eyebrow ${className}`}>{children}</div>;
}

/** Section heading block: eyebrow + serif head + lede. */
export function SectionHead({ eyebrow, title, lede, align = 'left', className = '' }) {
  return (
    <div
      className={`reveal ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="h-sec mt-3">{title}</h2>
      <div className={`rule-gold mt-5 ${align === 'center' ? 'mx-auto w-24' : 'w-24'}`} />
      {lede && <p className="mt-5 text-[17px] leading-[1.65] text-hp-text2">{lede}</p>}
    </div>
  );
}

export function PrimaryLink({ to, children, className = '' }) {
  return (
    <Link to={to} className={`link-gold ${className}`}>
      {children} <ArrowRight size={16} />
    </Link>
  );
}

/** Pointer-tracked 3D tilt wrapper, max 4°, spring back on leave. */
export function Tilt({ children, className = '', max = 4 }) {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ x: -py * max * 2, y: px * max * 2 });
  };
  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1400px) rotateX(${t.x}deg) rotateY(${t.y}deg)`,
        transition: t.x === 0 && t.y === 0 ? 'transform 700ms cubic-bezier(0.22,0.61,0.36,1)' : 'transform 120ms linear',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

/** Browser chrome wrapper for desktop product replicas. */
export function BrowserFrame({ host = 'ops.hostpilotpro.com', children, className = '', note }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[color:var(--hp-frame-border)] bg-hp-bg shadow-frame ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-hp-lineSoft bg-[color:var(--hp-frame-bar)] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--hp-frame-dot)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--hp-frame-dot)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--hp-frame-dot)]" />
        </div>
        <div className="mx-auto max-w-[70%] truncate rounded-md border border-hp-lineSoft bg-[color:var(--hp-veil-2)] px-3 py-1 text-[11.5px] text-hp-text3">
          {host}
        </div>
        {note ? <div className="hidden text-[11px] text-hp-text3 sm:block">{note}</div> : <div className="w-8" />}
      </div>
      {children}
    </div>
  );
}

/** Phone chrome wrapper for mobile product replicas. */
export function PhoneFrame({ children, className = '', label }) {
  return (
    <div className={`mx-auto w-full max-w-[380px] ${className}`}>
      <div className="rounded-[38px] border border-[color:var(--hp-frame-border)] bg-[color:var(--hp-frame-bar)] p-2.5 shadow-frame">
        <div className="relative overflow-hidden rounded-[30px] bg-hp-bg">
          <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-[color:var(--hp-frame-notch)]" />
          {children}
        </div>
      </div>
      {label && <div className="mt-3 text-center text-[12.5px] text-hp-text3">{label}</div>}
    </div>
  );
}

export function KpiTile({ label, value, delta, sub, deltaTone = 'pos' }) {
  return (
    <div className="hp-card-flat p-4">
      <div className="text-[11.5px] uppercase tracking-[0.1em] text-hp-text3">{label}</div>
      <div className="mt-2 flex items-end gap-2">
        <div className="tnum font-display text-[26px] leading-none text-hp-text">{value}</div>
        {delta && (
          <span
            className="tnum text-[12px] font-semibold"
            style={{ color: deltaTone === 'pos' ? 'var(--hp-pos)' : 'var(--hp-neg)' }}
          >
            {delta}
          </span>
        )}
      </div>
      {sub && <div className="mt-1.5 text-[12px] text-hp-text3">{sub}</div>}
    </div>
  );
}

/** Lightweight area chart, no dependencies. */
export function AreaChart({ series, height = 150, id = 'area' }) {
  const w = 1000;
  const min = Math.min(...series) - 6;
  const max = Math.max(...series) + 4;
  const pts = series.map((v, i) => [
    (i / (series.length - 1)) * w,
    height - ((v - min) / (max - min)) * (height - 12) - 6,
  ]);
  const line = pts
    .map((p, i) => {
      if (i === 0) return `M${p[0].toFixed(1)},${p[1].toFixed(1)}`;
      const prev = pts[i - 1];
      const cx = (prev[0] + p[0]) / 2;
      return `C${cx.toFixed(1)},${prev[1].toFixed(1)} ${cx.toFixed(1)},${p[1].toFixed(1)} ${p[0].toFixed(
        1
      )},${p[1].toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--hp-gold)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--hp-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${height} L0,${height} Z`} fill={`url(#${id}-fill)`} />
      <path d={line} fill="none" stroke="var(--hp-gold-deep)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
