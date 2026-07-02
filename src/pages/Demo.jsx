import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

const PORTFOLIO_SIZES = ['Under 20 villas', '20–50 villas', '50–100 villas', '100–200 villas', '200+ villas'];
const PRODUCTS = ['Full Suite', 'Owner Portal', 'Ops Hub', 'Guest Portal'];

export default function Demo() {
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState({
    name: '', company: '', email: '', phone: '', timezone: '', size: '', interest: '', message: '',
  });
  const set = (k) => (e) => setState({ ...state, [k]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(
`Name: ${state.name}
Company: ${state.company}
Email: ${state.email}
Phone: ${state.phone}
Timezone: ${state.timezone}
Portfolio size: ${state.size}
Interested in: ${state.interest}

Message:
${state.message}
`);
    window.location.href = `mailto:jordi@mrpropertysiam.com?subject=${encodeURIComponent(
      'HostPilotPro demo request — ' + (state.company || state.name)
    )}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="pt-16 md:pt-24 pb-24 md:pb-32">
      <div className="container-editorial grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20">
        <div className="reveal">
          <div className="eyebrow mb-6">Request a demo</div>
          <h1 className="text-4xl md:text-6xl leading-[1.05] text-ink">
            30 minutes. <span className="gradient-text">Live product.</span>
          </h1>
          <p className="mt-6 text-slate-600 leading-relaxed">
            We'll walk through the three products with your portfolio in mind. Bring your Hostaway account — we'll show you the sync live.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-slate-700">
            {['No slides. Real screens.', 'Your villas, mocked in the demo.', 'Straight pricing at the end.'].map((i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-gradient flex items-center justify-center text-white">
                  <Check size={11} strokeWidth={3} />
                </span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal">
          {submitted ? (
            <div className="card border border-slate-200">
              <h2 className="text-2xl font-bold text-ink mb-3">Thanks — we're on it.</h2>
              <p className="text-slate-600 leading-relaxed">
                Your mail client should have opened with the message pre-filled. If not, email us directly at{' '}
                <a href="mailto:jordi@mrpropertysiam.com" className="text-sky font-semibold border-b border-sky/30">jordi@mrpropertysiam.com</a>. We'll reply within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="card border border-slate-200 space-y-5">
              <Field label="Your name">
                <input required value={state.name} onChange={set('name')} className={input} />
              </Field>
              <Field label="Company">
                <input required value={state.company} onChange={set('company')} className={input} />
              </Field>
              <div className="grid grid-cols-2 gap-5">
                <Field label="Email">
                  <input required type="email" value={state.email} onChange={set('email')} className={input} />
                </Field>
                <Field label="Phone">
                  <input value={state.phone} onChange={set('phone')} className={input} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Field label="Timezone">
                  <input placeholder="e.g. GMT+7" value={state.timezone} onChange={set('timezone')} className={input} />
                </Field>
                <Field label="Portfolio size">
                  <select required value={state.size} onChange={set('size')} className={input}>
                    <option value="">Select…</option>
                    {PORTFOLIO_SIZES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Interested in">
                <select required value={state.interest} onChange={set('interest')} className={input}>
                  <option value="">Select…</option>
                  {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </Field>
              <Field label="Anything specific you want to see?">
                <textarea rows={4} value={state.message} onChange={set('message')} className={input} />
              </Field>
              <button type="submit" className="btn-primary mt-2">
                Send request <ArrowUpRight size={16} />
              </button>
              <p className="text-xs text-muted pt-2">We only use this to contact you about the demo. No newsletter, no lists.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const input =
  'w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-ink focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/20 transition-all placeholder:text-slate-400';

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.14em] font-semibold text-slate-700 mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
