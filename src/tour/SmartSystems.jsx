import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  KeyRound,
  Maximize2,
  Radio,
  RotateCcw,
  Shield,
  TriangleAlert,
  X,
  Zap,
} from 'lucide-react';
import asset from '../lib/asset.js';
import { smartStatus, cameras, lock, meter, systems } from '../data/smart-systems.js';

/**
 * Smart systems — a tab inside the Owner portal replica.
 *
 * The argument this screen makes: HostPilot Pro does not sell smart tech. The
 * cameras, lock, meter and sensors are already at the villa. What the platform
 * adds is that they sit next to the booking and the statement — so a guest's
 * electricity becomes a line of owner income, and a door code expires when the
 * guest leaves.
 *
 * Three things genuinely respond:
 *   1. camera tiles expand and collapse
 *   2. issuing or revoking a door code changes the visible state
 *   3. the meter card jumps to the statement line it produces
 */

const toneVar = {
  pos: 'var(--hp-pos)',
  warn: 'var(--hp-warn)',
  idle: 'var(--hp-text-3)',
};
const toneWash = {
  pos: 'var(--hp-pos-wash)',
  warn: 'var(--hp-warn-wash)',
  idle: 'var(--hp-veil-2)',
};

/* --------------------------------------------------------------- status strip */

function StatusStrip() {
  return (
    <div className="hp-card-flat flex flex-col gap-2.5 p-4 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-2.5">
        <Radio size={15} className="shrink-0 text-hp-goldInk" />
        <span className="text-[13.5px] text-hp-text">{smartStatus.headline}</span>
      </div>
      <div
        className="flex items-center gap-2 rounded-full px-3 py-1.5 sm:ml-auto"
        style={{ background: 'var(--hp-warn-wash)', border: '1px solid rgb(var(--hp-warn-rgb) / 0.4)' }}
      >
        <TriangleAlert size={13} className="shrink-0" style={{ color: 'var(--hp-warn)' }} />
        <span className="text-[12.5px] font-medium" style={{ color: 'var(--hp-warn)' }}>
          {smartStatus.attention}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- cameras */

function LiveBadge({ label = 'Live' }) {
  return (
    <span className="cam-chip inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em]">
      <span className="live-dot" /> {label}
    </span>
  );
}

function CameraStill({ cam, className = '' }) {
  return (
    <>
      <img
        src={asset(`/img/smart/${cam.img}`)}
        alt={cam.alt}
        loading="lazy"
        className={`cam-img h-full w-full object-cover ${className}`}
      />
      <div className="pointer-events-none absolute inset-0 cam-scrim" />
    </>
  );
}

function Cameras() {
  const [openId, setOpenId] = useState(null);
  const open = cameras.find((c) => c.id === openId);

  if (open) {
    return (
      <div className="hp-card-flat overflow-hidden">
        <div className="flex items-center gap-3 border-b border-hp-lineSoft px-4 py-3">
          <LiveBadge />
          <div className="min-w-0">
            <div className="truncate text-[13.5px] font-medium text-hp-text">{open.name}</div>
            <div className="truncate text-[11.5px] text-hp-text3">
              {open.brand} · {open.stamp}
            </div>
          </div>
          <button
            onClick={() => setOpenId(null)}
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hp-line px-2.5 py-1.5 text-[12px] text-hp-text2 transition hover:border-hp-gold/50 hover:text-hp-goldInk"
          >
            <X size={12} /> Close
          </button>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <CameraStill cam={open} />
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
            {/* scrub bar */}
            <div className="flex items-center gap-3">
              <span
                className="rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold tabular-nums cam-chip"
              >
                18:42:07
              </span>
              <div className="relative h-1.5 flex-1 rounded-full" style={{ background: 'var(--hp-cam-chip)' }}>
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: '88%', background: 'var(--hp-gold)' }}
                />
                <div
                  className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
                  style={{ left: 'calc(88% - 6px)', background: 'var(--hp-gold)' }}
                />
              </div>
              <span className="rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold tabular-nums cam-chip">
                now
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-hp-lineSoft px-4 py-3">
          <span className="text-[11px] uppercase tracking-[0.12em] text-hp-text3">
            Recorded clips · last 7 days
          </span>
          <div className="flex flex-wrap gap-1.5">
            {['3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug', '8 Aug', '9 Aug'].map((d, i) => (
              <span
                key={d}
                className="rounded-md border border-hp-lineSoft px-2 py-1 text-[11px] text-hp-text2"
                style={{ background: i === 6 ? 'var(--hp-gold-wash)' : 'var(--hp-veil-1)' }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar border-t border-hp-lineSoft px-3 py-3">
          {cameras.map((c) => (
            <button
              key={c.id}
              onClick={() => setOpenId(c.id)}
              className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition ${
                c.id === open.id ? 'border-hp-gold' : 'border-hp-lineSoft hover:border-hp-gold/50'
              }`}
            >
              <CameraStill cam={c} />
              <span
                className="absolute inset-x-0 bottom-0 px-1.5 pb-1 text-left text-[10px] font-medium"
                style={{ color: 'var(--hp-on-status)' }}
              >
                {c.name}
              </span>
            </button>
          ))}
        </div>

        <p className="border-t border-hp-lineSoft px-4 py-3 text-[12.5px] text-hp-text3">
          {open.detail}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2.5 flex items-end justify-between gap-3">
        <div>
          <h4 className="font-display text-[18px] text-hp-text">Cameras</h4>
          <p className="text-[12.5px] text-hp-text3">
            Four cameras already on the villa's own network. Click a tile to open it.
          </p>
        </div>
        <span className="hidden text-[11.5px] text-hp-text3 sm:inline">Vendor: Reolink</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {cameras.map((c) => (
          <button
            key={c.id}
            onClick={() => setOpenId(c.id)}
            className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-hp-line text-left transition hover:border-hp-gold/60"
          >
            <CameraStill cam={c} className="transition duration-700 group-hover:scale-[1.04]" />
            <div className="absolute left-2 top-2">
              <LiveBadge />
            </div>
            <span className="cam-chip absolute right-2 top-2 rounded-full p-1.5 opacity-0 transition group-hover:opacity-100">
              <Maximize2 size={12} />
            </span>
            <div className="absolute inset-x-0 bottom-0 p-2.5">
              <div className="text-[12.5px] font-semibold" style={{ color: 'var(--hp-on-status)' }}>
                {c.name}
              </div>
              <div className="text-[10.5px] tabular-nums" style={{ color: 'var(--hp-on-status)', opacity: 0.82 }}>
                {c.stamp}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ door lock */

const randomCode = () =>
  Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(' ');

function DoorLock() {
  const [state, setState] = useState({});   /* id -> { code, status } */
  const [flash, setFlash] = useState(null);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const reset = () => {
    setState({});
    setFlash(null);
  };

  const schedule = () => {
    const t = setTimeout(reset, 6000);
    timers.current.push(t);
  };

  const issue = (row) => {
    const code = randomCode();
    setState((s) => ({ ...s, [row.id]: { code, status: 'issued' } }));
    setFlash(
      `New ${row.role.toLowerCase()} ${code} issued and pushed to the lock. In the product it would also go out on the guest's arrival message. Nothing is saved in this demo — this resets shortly.`
    );
    schedule();
  };

  const revoke = (row) => {
    setState((s) => ({ ...s, [row.id]: { code: row.code, status: 'revoked' } }));
    setFlash(
      `${row.role} revoked. The lock drops it within seconds and the reservation records who revoked it and when. Nothing is saved in this demo — this resets shortly.`
    );
    schedule();
  };

  return (
    <div className="hp-card-flat overflow-hidden">
      <div className="flex items-center gap-2 border-b border-hp-lineSoft px-4 py-3">
        <KeyRound size={15} className="text-hp-goldInk" />
        <span className="text-[13.5px] font-medium text-hp-text">Door lock</span>
        <span className="ml-auto text-[11.5px] text-hp-text3">{lock.battery}</span>
      </div>

      <div className="flex gap-3 p-4 sm:gap-4">
        <div className="relative h-[92px] w-[78px] shrink-0 overflow-hidden rounded-xl border border-hp-lineSoft sm:h-[112px] sm:w-[96px]">
          <img
            src={asset(`/img/smart/${lock.img}`)}
            alt={lock.alt}
            loading="lazy"
            className="cam-img h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] text-hp-text2">{lock.brand}</div>
          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11.5px]"
            style={{ background: 'var(--hp-pos-wash)', color: 'var(--hp-pos)' }}
          >
            <Shield size={11} /> Online · locked
          </div>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-hp-text3">{lock.note}</p>
        </div>
      </div>

      <div className="divide-y divide-hp-lineSoft border-t border-hp-lineSoft">
        {lock.codes.map((row) => {
          const s = state[row.id];
          const revoked = s?.status === 'revoked';
          const issued = s?.status === 'issued';
          return (
            <div key={row.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3">
              <div className="min-w-[9.5rem] flex-1">
                <div className="text-[13px] font-medium text-hp-text">{row.role}</div>
                <div className="text-[11.5px] text-hp-text3">{row.who}</div>
              </div>
              <div className="text-right">
                <div
                  className="tnum text-[16px] font-semibold tracking-[0.14em]"
                  style={{
                    color: revoked ? 'var(--hp-neg)' : issued ? 'var(--hp-pos)' : 'var(--hp-text)',
                    textDecoration: revoked ? 'line-through' : 'none',
                  }}
                >
                  {s?.code || row.code}
                </div>
                <div
                  className="text-[11px]"
                  style={{
                    color: revoked
                      ? 'var(--hp-neg)'
                      : issued
                      ? 'var(--hp-pos)'
                      : 'var(--hp-text-3)',
                  }}
                >
                  {revoked ? 'Revoked just now' : issued ? 'Issued just now' : row.window}
                </div>
              </div>
              <div className="flex w-full gap-2 sm:w-auto">
                <button
                  onClick={() => issue(row)}
                  className="flex-1 rounded-full border border-hp-gold/50 px-3 py-1.5 text-[12px] font-semibold text-hp-goldInk transition hover:bg-[color:var(--hp-gold-wash-2)] sm:flex-none"
                  style={{ background: 'var(--hp-gold-wash)' }}
                >
                  Issue new code
                </button>
                <button
                  onClick={() => revoke(row)}
                  disabled={row.id === 'owner'}
                  className="flex-1 rounded-full border border-hp-line px-3 py-1.5 text-[12px] text-hp-text2 transition enabled:hover:border-hp-neg/50 enabled:hover:text-hp-neg disabled:opacity-40 sm:flex-none"
                >
                  Revoke
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {flash && (
        <div
          className="flex items-start gap-2.5 border-t border-hp-lineSoft px-4 py-3"
          style={{ background: 'var(--hp-gold-wash)' }}
        >
          <Check size={14} className="mt-0.5 shrink-0 text-hp-goldInk" />
          <p className="flex-1 text-[12.5px] leading-relaxed text-hp-text2">{flash}</p>
          <button
            onClick={reset}
            className="inline-flex shrink-0 items-center gap-1 text-[11.5px] text-hp-text3 hover:text-hp-goldInk"
          >
            <RotateCcw size={11} /> Reset
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------- electricity → statement */

function MeterToStatement({ onOpenStatement }) {
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{ border: '1px solid var(--hp-gold-rule)', background: 'var(--hp-gold-wash-grad)' }}
    >
      <div className="flex items-center gap-2 border-b border-hp-lineSoft px-4 py-3">
        <Zap size={15} className="text-hp-goldInk" />
        <span className="text-[13.5px] font-medium text-hp-text">Electricity meter</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11.5px] text-hp-text3">
          <span className="live-dot" /> reading live
        </span>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.9fr)] lg:items-center lg:gap-5">
        {/* ---- the meter itself */}
        <div>
          <div className="flex gap-3.5">
            <div className="relative h-[86px] w-[74px] shrink-0 overflow-hidden rounded-xl border border-hp-lineSoft">
              <img
                src={asset(`/img/smart/${meter.img}`)}
                alt={meter.alt}
                loading="lazy"
                className="cam-img h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.1em] text-hp-text3">Current reading</div>
              <div className="tnum font-display text-[26px] leading-none text-hp-text sm:text-[30px]">
                {meter.reading}
              </div>
              <div className="mt-1.5 text-[11.5px] text-hp-text3">{meter.brand}</div>
            </div>
          </div>

          <div className="mt-3.5 grid grid-cols-2 gap-2.5">
            {[meter.stay, meter.month].map((b) => (
              <div
                key={b.label}
                className="rounded-xl border border-hp-lineSoft p-3"
                style={{ background: 'var(--hp-surface)' }}
              >
                <div className="text-[11px] text-hp-text3">{b.label}</div>
                <div className="tnum mt-1.5 text-[15px] font-semibold text-hp-text">{b.kwh}</div>
                <div className="tnum text-[13px] text-hp-goldInk">{b.thb}</div>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-[11.5px] leading-relaxed text-hp-text3">{meter.tariff}</p>
        </div>

        {/* ---- the connector: kWh becomes baht becomes an income line.
             Runs downward when the cards stack, rightward when they sit side by side. */}
        <div className="flex flex-col items-center gap-1.5 lg:hidden">
          <div className="flow-rail-v h-5 w-[2px]" />
          <span className="flow-badge">becomes income</span>
          <div className="flow-rail-v h-5 w-[2px]" />
          <ArrowRight size={16} className="rotate-90 text-hp-goldInk" />
        </div>
        <div className="hidden w-[136px] flex-col items-center gap-2 lg:flex">
          <span className="flow-badge">becomes income</span>
          <div className="flex w-full items-center">
            <div className="flow-rail h-[2px] flex-1" />
            <ArrowRight size={17} className="-ml-0.5 shrink-0 text-hp-goldInk" />
          </div>
          <span className="tnum text-[11px] text-hp-text3">1,604 kWh · ฿7.00/kWh</span>
        </div>

        {/* ---- the statement line it produces */}
        <button
          onClick={onOpenStatement}
          className="group w-full rounded-xl p-4 text-left transition hover:shadow-goldGlow"
          style={{ border: '1px solid var(--hp-gold-rule)', background: 'var(--hp-surface)' }}
        >
          <div className="text-[11px] uppercase tracking-[0.12em] text-hp-goldDeep">
            {meter.statement_period} owner statement
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-3">
            <span className="text-[13.5px] font-medium text-hp-text">{meter.statement_line}</span>
            <span className="tnum shrink-0 text-[19px] font-semibold" style={{ color: 'var(--hp-pos)' }}>
              +{meter.recovered_thb}
            </span>
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-hp-text3">
            Guest consumption above the included allowance lands as income to you, not to the manager. The meter
            photo and the reading that produced it are attached to the line.
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-hp-goldInk transition group-hover:gap-2.5">
            Open it on the July statement <ArrowRight size={13} />
          </span>
        </button>
      </div>

      <p className="border-t border-hp-lineSoft px-4 py-3 text-[12.5px] leading-relaxed text-hp-text2">
        A smart-home app stops at the reading. This is why the meter belongs in the property platform: the kWh, the
        reservation that burned them and the ฿ line on the owner's statement are the same record.
      </p>
    </div>
  );
}

/* --------------------------------------------------------------- everything else */

function SystemRow({ s }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-hp-lineSoft">
        <img
          src={asset(`/img/smart/${s.img}`)}
          alt={s.alt}
          loading="lazy"
          className="cam-img h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-hp-text">{s.name}</div>
        <div className="truncate text-[11.5px] text-hp-text3">
          {s.brand} · {s.sub}
        </div>
      </div>
      <span
        className="shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-medium"
        style={{ background: toneWash[s.tone], color: toneVar[s.tone] }}
      >
        {s.state}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------- the tab */

export default function SmartSystems({ onOpenStatement }) {
  return (
    <div className="space-y-3.5">
      <div className="hp-card-flat p-4 sm:p-5">
        <h3 className="font-display text-[19px] text-hp-text">Smart systems · Villa Sunset Sapphire</h3>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-hp-text2">
          The hardware was already here. What is new is that it sits beside the booking and the statement: codes come
          from the reservation, the meter feeds the July income line, and a low tank raises a task instead of an email.
        </p>
      </div>

      <StatusStrip />
      <Cameras />
      <MeterToStatement onOpenStatement={onOpenStatement} />
      <DoorLock />

      <div className="hp-card-flat overflow-hidden">
        <div className="border-b border-hp-lineSoft px-4 py-3 text-[13.5px] font-medium text-hp-text">
          Everything else on the villa network
        </div>
        <div className="divide-y divide-hp-lineSoft">
          {systems.map((s) => (
            <SystemRow key={s.id} s={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
