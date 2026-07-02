import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Rss, Clock } from 'lucide-react';

const UPCOMING = [
  { tag: 'Product',    title: 'Building an owner portal that owners actually open',     read: '8 min read' },
  { tag: 'Operations', title: 'How we replaced three WhatsApp groups with one task board', read: '6 min read' },
  { tag: 'Finance',    title: 'VAT-clean owner statements in Thailand: what to include',   read: '10 min read' },
  { tag: 'AI',         title: 'Inventory AI: photographing a villa in 20 minutes',        read: '5 min read' },
  { tag: 'Guest',      title: 'The guest experience playbook we run in 85 villas',        read: '12 min read' },
  { tag: 'Ops',        title: 'Onboarding a new villa in under 4 hours',                  read: '7 min read' },
];

export default function Blog() {
  return (
    <>
      {/* HERO */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20 text-center">
        <div className="container-editorial max-w-3xl">
          <div className="eyebrow mb-6 reveal">Blog</div>
          <h1 className="text-5xl md:text-7xl leading-[1.05] text-ink reveal">
            Field notes from <span className="gradient-text">85 villas.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed reveal">
            We're writing about what we learn running Mr Property Siam on our own software — operations, owner relationships, finance, guest experience, and the AI we ship along the way.
          </p>
        </div>
      </section>

      {/* COMING SOON BANNER */}
      <section className="pb-12">
        <div className="container-editorial reveal">
          <div className="bg-brand-gradient rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-white/85 text-xs uppercase tracking-[0.14em] font-semibold mb-2">
                <Rss size={13} /> Coming soon
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                First posts land in Q3 2026.
              </h2>
              <p className="text-white/90 leading-relaxed max-w-2xl">
                We're already drafting a small library of longer pieces on how we run the platform inside MPS. Drop your email and we'll send you the first three posts.
              </p>
            </div>
            <a
              href="mailto:jordi@mrpropertysiam.com?subject=Subscribe%20me%20to%20the%20HostPilotPro%20blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-btn transition-all self-start whitespace-nowrap"
            >
              <Mail size={16} /> Notify me
            </a>
          </div>
        </div>
      </section>

      {/* UPCOMING POSTS */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-200">
        <div className="container-editorial">
          <div className="max-w-2xl mb-10 reveal">
            <div className="eyebrow mb-3">On the docket</div>
            <h2 className="text-3xl md:text-4xl text-ink leading-tight">
              What we're writing next.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPCOMING.map((p) => (
              <div
                key={p.title}
                className="reveal card border border-slate-200 flex flex-col cursor-not-allowed opacity-90"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-xs font-semibold text-sky uppercase tracking-wider">
                    {p.tag}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-muted">Draft</span>
                </div>
                <h3 className="text-lg font-bold text-ink leading-snug mb-4 flex-1">{p.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Clock size={12} /> {p.read}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container-editorial reveal">
          <div className="bg-slate-900 rounded-2xl p-12 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Prefer to see it live?
            </h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto leading-relaxed">
              You can skip the blog and get the whole playbook in one demo call.
            </p>
            <div className="mt-8">
              <Link to="/demo" className="inline-flex items-center gap-2 px-7 py-3 bg-brand-gradient text-white font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-btn transition-all">
                Request a demo <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
