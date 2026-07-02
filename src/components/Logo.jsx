export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="hp-logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="6" fill="url(#hp-logo-g)" />
        <path
          d="M9 8v16M9 16h9a5 5 0 0 0 0-8h-9m14 8v8"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-sans text-lg font-bold tracking-tight leading-none">
        <span className="text-sky">Host</span>
        <span className="text-slate-700">Pilot</span>
        <span className="text-orange">Pro</span>
      </span>
    </span>
  );
}
