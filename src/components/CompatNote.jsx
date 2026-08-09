import { Layers } from 'lucide-react';

/**
 * The compatibility line, repeated everywhere on purpose (messaging-v2 §1, §7).
 *
 * Two halves, and the second half is not optional: HostPilot sits on top of a
 * channel manager, and the only channel manager it syncs with today is
 * Hostaway. Guesty and Lodgify are roadmap. No wording on this site may leave a
 * Guesty operator believing they can connect this week.
 */
export default function CompatNote({ variant = 'chip', className = '' }) {
  if (variant === 'line') {
    return (
      <p className={`text-[13.5px] leading-relaxed text-hp-text3 ${className}`}>
        <span className="text-hp-text2">Sits on top of your channel manager.</span> Hostaway is supported today; Guesty
        and Lodgify connectors are being built.
      </p>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="chip">
        <Layers size={13} className="text-hp-goldInk" />
        Sits on top of your channel manager
      </span>
      <span className="chip !text-[12px]">Hostaway today · Guesty and Lodgify next</span>
    </div>
  );
}
