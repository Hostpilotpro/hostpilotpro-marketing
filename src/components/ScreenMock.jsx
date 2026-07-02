export default function ScreenMock({ variant = 'owner', className = '' }) {
  const variants = {
    owner: { title: 'Owner Portal', accent: '#0ea5e9', body: 'Earnings · June 2026',       metric: '฿ 1,842,300' },
    ops:   { title: 'Ops Hub',      accent: '#f97316', body: 'Today · 12 tasks',           metric: '4 arriving' },
    guest: { title: 'Guest Portal', accent: '#0ea5e9', body: 'Villa Chloe · Stay #2831',   metric: '3 upgrades' },
  };
  const v = variants[variant] || variants.owner;

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-card-lift ${className}`}>
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-slate-50">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="ml-4 text-[10px] text-muted tracking-wider">{v.title.toLowerCase().replace(' ', '')}.hostpilotpro.com</span>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted mb-1">{v.body}</div>
            <div className="text-3xl font-bold text-ink">{v.metric}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-brand-gradient" />
        </div>

        <div className="flex items-end gap-2 h-24 mb-6">
          {[45, 62, 38, 78, 55, 90, 70, 82, 65, 88, 72, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: i === 5 || i === 11 ? v.accent : '#e2e8f0' }}
            />
          ))}
        </div>

        <div className="space-y-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100" />
                <div>
                  <div className="h-2 w-24 bg-slate-200 rounded mb-1" />
                  <div className="h-1.5 w-16 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-2 w-14 rounded" style={{ background: v.accent, opacity: 0.3 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
