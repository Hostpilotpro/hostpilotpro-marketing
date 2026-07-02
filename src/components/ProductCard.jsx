import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function ProductCard({ eyebrow, name, tagline, description, to, index }) {
  return (
    <Link to={to} className="group card flex flex-col justify-between min-h-[280px] border border-slate-200">
      <div>
        <div className="flex items-start justify-between mb-6">
          <span className="eyebrow">{eyebrow}</span>
          <span className="text-slate-300 font-bold text-xl leading-none">0{index}</span>
        </div>
        <h3 className="text-2xl font-bold text-ink mb-3">{name}</h3>
        <p className="text-slate-700 text-sm leading-relaxed mb-6">{tagline}</p>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center gap-1.5 mt-8 text-sky text-sm font-semibold group-hover:gap-2.5 transition-all">
        Explore <ArrowUpRight size={14} />
      </div>
    </Link>
  );
}
