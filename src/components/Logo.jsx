export default function Logo({ className = '', showWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-label="HostPilot Pro"
        role="img"
        className="shrink-0"
      >
        {/* A roofline over an open aperture — the house you can see into. */}
        <path d="M4 15.2 16 4l12 11.2" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M8 16.6v11h16v-11" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <circle cx="16" cy="21.4" r="3.4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="16" cy="21.4" r="1" fill="currentColor" />
      </svg>
      {showWordmark && (
        <span className="leading-none">
          <span className="font-display text-[19px] font-medium tracking-[-0.01em] text-hp-text">
            HostPilot
          </span>
          <span className="ml-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-hp-goldDeep">
            Pro
          </span>
        </span>
      )}
    </span>
  );
}
