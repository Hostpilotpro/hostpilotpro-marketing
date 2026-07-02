import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import ScreenMock from './ScreenMock.jsx';

export default function ProductPage({
  eyebrow,
  title,
  italic,
  subhead,
  audienceLabel,
  features,
  gallery,
  mockVariant,
}) {
  return (
    <>
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="container-editorial">
          <div className="eyebrow mb-6 reveal">{eyebrow}</div>
          <h1 className="text-4xl md:text-6xl leading-[1.05] text-ink max-w-4xl reveal">
            {title}
            {italic && <> <span className="gradient-text">{italic}</span></>}
          </h1>
          <p className="mt-8 text-lg text-slate-600 max-w-2xl leading-relaxed reveal">{subhead}</p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-editorial reveal"><ScreenMock variant={mockVariant} /></div>
      </section>

      <section className="py-20 md:py-24 bg-white border-y border-slate-200">
        <div className="container-editorial">
          <div className="max-w-2xl mb-12 reveal">
            <div className="eyebrow mb-3">{audienceLabel}</div>
            <h2 className="text-3xl md:text-4xl text-ink leading-tight">Every capability, already shipped.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
            {features.map((f) => (
              <div key={f} className="reveal flex gap-3.5 items-start py-3 border-b border-slate-100">
                <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-brand-gradient flex items-center justify-center text-white">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className="text-slate-700 leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {gallery && (
        <section className="py-20 md:py-24">
          <div className="container-editorial">
            <div className="max-w-2xl mb-10 reveal">
              <div className="eyebrow mb-3">Screenshot gallery</div>
              <h2 className="text-3xl md:text-4xl text-ink leading-tight">Real screens. From production.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {gallery.map((g, i) => (
                <div key={i} className="reveal">
                  <ScreenMock variant={g.variant} />
                  <div className="mt-4 text-sm text-muted">{g.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-28">
        <div className="container-editorial reveal">
          <div className="bg-brand-gradient rounded-2xl p-10 md:p-14 text-center text-white">
            <h2 className="text-3xl md:text-4xl leading-tight text-white max-w-3xl mx-auto font-bold">See it in your portfolio.</h2>
            <p className="mt-5 text-white/90 max-w-xl mx-auto leading-relaxed">30 minutes, live product, real data. No slides.</p>
            <div className="mt-8">
              <Link to="/demo" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-sky font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-btn transition-all">
                Request a demo <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
