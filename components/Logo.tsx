export function LogoMark({ className = "", size = 28 }: { className?: string; size?: number }) {
  // Compass rose / pilot bearing mark — geometric, two-color (ink + gold accent)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Cardinal needle (ink) */}
      <path
        d="M16 3.5 L19 16 L16 28.5 L13 16 Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Cross bearing (gold accent) */}
      <path
        d="M3.5 16 L28.5 16"
        stroke="#B8894A"
        strokeWidth="1.5"
      />
      <circle cx="16" cy="16" r="2.4" fill="#B8894A" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="text-ink" size={26} />
      <span className="font-display text-[1.05rem] font-medium tracking-tight text-ink">
        HostPilot <span className="text-gold">Pro</span>
      </span>
    </span>
  );
}
