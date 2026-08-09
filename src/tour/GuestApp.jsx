import { useMemo, useState } from 'react';
import { KeyRound, Wifi, ShieldCheck, Plus, Check, Clock } from 'lucide-react';
import demo from '../data/demo.js';
import { baht } from '../components/ui.jsx';
import asset from '../lib/asset.js';

export default function GuestApp() {
  const g = demo.guest_stay;
  const initial = useMemo(
    () => Object.fromEntries(g.addons.map((a) => [a.name, a.state === 'Booked'])),
    [g.addons]
  );
  const [sel, setSel] = useState(initial);

  const total = g.addons.reduce((sum, a) => (sel[a.name] ? sum + a.price_thb : sum), 0);
  const count = Object.values(sel).filter(Boolean).length;

  return (
    <div className="replica-light bg-hp-bg text-hp-text2">
      {/* stay header */}
      <div className="relative">
        <img src={asset('/img/villa-sapphire-hero.jpg')} alt="" className="h-[190px] w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 scrim-v" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="eyebrow">Your stay</div>
          <h3 className="mt-1.5 font-display text-[22px] font-medium leading-tight text-hp-text">{g.villa}</h3>
          <div className="mt-1 text-[12.5px] text-hp-text2">
            {g.dates} · {g.nights} nights · {g.party}
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4">
        {/* countdown */}
        <div className="rounded-2xl border border-hp-gold/30 bg-[color:var(--hp-gold-wash)] p-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-hp-goldDeep">
            <Clock size={11} /> Check-in
          </div>
          <div className="mt-2 flex items-end gap-2">
            <span className="tnum font-display text-[27px] leading-none text-hp-text">Today</span>
            <span className="tnum text-[15px] text-hp-text2">{g.checkin.time}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--hp-pos)' }}>
            <ShieldCheck size={12} /> {g.checkin.status}
          </div>
        </div>

        {/* access */}
        <div className="grid grid-cols-2 gap-3">
          <div className="hp-card-flat p-3.5">
            <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.12em] text-hp-text3">
              <KeyRound size={11} /> Door code
            </div>
            <div className="tnum mt-2 font-display text-[22px] tracking-[0.12em] text-hp-goldInk">
              {g.checkin.door_code}
            </div>
          </div>
          <div className="hp-card-flat p-3.5">
            <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.12em] text-hp-text3">
              <Wifi size={11} /> Wi-Fi
            </div>
            <div className="mt-2 truncate text-[13.5px] text-hp-text">{g.checkin.wifi}</div>
          </div>
        </div>

        {/* add-ons */}
        <div className="hp-card-flat overflow-hidden">
          <div className="border-b border-hp-lineSoft px-4 py-3">
            <h4 className="font-display text-[16px] text-hp-text">Add to your stay</h4>
            <div className="text-[11.5px] text-hp-text3">Tap to add. Charged to the villa account at checkout.</div>
          </div>
          <div className="divide-y divide-[color:var(--hp-line-soft)]">
            {g.addons.map((a) => {
              const on = sel[a.name];
              return (
                <button
                  key={a.name}
                  onClick={() => setSel((s) => ({ ...s, [a.name]: !s[a.name] }))}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[color:var(--hp-veil-3)]"
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                      on
                        ? 'border-hp-gold bg-hp-gold text-[color:var(--hp-on-gold)]'
                        : 'border-hp-line text-hp-text3'
                    }`}
                  >
                    {on ? <Check size={13} /> : <Plus size={13} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] text-hp-text">{a.name}</span>
                    {a.sub && <span className="block text-[11.5px] text-hp-text3">{a.sub}</span>}
                  </span>
                  <span className="tnum shrink-0 text-[13px] text-hp-text2">{baht(a.price_thb)}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between border-t border-hp-line bg-[color:var(--hp-veil-2)] px-4 py-3">
            <div className="text-[12px] text-hp-text3">
              {count} item{count === 1 ? '' : 's'} on this stay
            </div>
            <div className="tnum font-display text-[19px] text-hp-goldInk">{baht(total)}</div>
          </div>
        </div>

        {/* punchline */}
        <div className="rounded-2xl border border-hp-line bg-[image:var(--hp-gold-wash-grad)] p-4">
          <div className="eyebrow">The point</div>
          <div className="tnum mt-2 font-display text-[26px] leading-none text-hp-goldInk">
            {baht(demo.guest_stay.upsell_revenue_thb)}
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-hp-text2">
            Add-on revenue booked on this single seven-night stay. Guests buy more when the list is in their pocket
            instead of in an email. That is the argument for the guest app paying for itself.
          </p>
        </div>

        <div className="pb-2 text-center text-[11px] text-hp-text3">
          Stay code {g.stay_code} · {g.guest}
        </div>
      </div>
    </div>
  );
}
