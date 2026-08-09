import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, AlertTriangle } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { Eyebrow } from '../components/ui.jsx';

const SIZES = ['Under 20 villas', '20–50 villas', '50–100 villas', '100–200 villas', '200+ villas'];
const INTEREST = ['The full suite', 'Owner portal', 'Ops console', 'Guest app', 'Field app', 'Partner / licensing'];

const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT || '';
const FALLBACK_MAIL = 'info@mrpropertysiam.com';

export default function Demo() {
  useSeo({
    title: 'Book a call — see HostPilot Pro on live data',
    description:
      'Tell us your portfolio size and channel manager. We send a number the same working day and screen-share the real system, including the unglamorous parts.',
    path: '/demo',
  });

  const [state, setState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    channel: '',
    size: '',
    interest: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | done | mailto | error
  const set = (k) => (e) => setState({ ...state, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...state, source: 'hostpilotpro.com/demo' }),
        });
        if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);
        setStatus('done');
        return;
      } catch (err) {
        setStatus('error');
        return;
      }
    }

    // No endpoint configured: fall back to a mail draft, and still show a success state
    // with the address in plain text so nothing is lost if no mail client opens.
    const body = encodeURIComponent(
      [
        `Name: ${state.name}`,
        `Company: ${state.company}`,
        `Email: ${state.email}`,
        `Phone: ${state.phone}`,
        `Channel manager: ${state.channel}`,
        `Portfolio size: ${state.size}`,
        `Interested in: ${state.interest}`,
        '',
        state.message,
      ].join('\n')
    );
    window.location.href = `mailto:${FALLBACK_MAIL}?subject=${encodeURIComponent(
      `HostPilot Pro enquiry — ${state.company || state.name}`
    )}&body=${body}`;
    setStatus('mailto');
  };

  const field =
    'w-full rounded-xl border border-hp-line bg-[rgba(255,252,245,0.03)] px-3.5 py-2.5 text-[15px] text-hp-text placeholder:text-hp-text3 outline-none transition focus:border-hp-gold/60';

  const submitted = status === 'done' || status === 'mailto';

  return (
    <div className="pt-24 pb-20 sm:pt-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>Book a call</Eyebrow>
          <h1 className="h-sec mt-4 font-medium">
            Thirty minutes, <span className="serif-em text-hp-text2">live product.</span>
          </h1>
          <p className="mt-6 text-[17px] leading-[1.7] text-hp-text2">
            You have already seen the interface in the tour, so the call is not a demo script. Bring your portfolio
            and your channel manager and we will show you the parts the tour stubs out: the Hostaway sync, a real
            statement close, payroll inputs, the bits that are still rough.
          </p>
          <ul className="mt-8 space-y-3 text-[15px] text-hp-text2">
            {[
              'A number for your portfolio size the same working day.',
              'No slides. The live system, on real records.',
              'We will tell you where the product is weak, unprompted.',
              'If it is not a fit, we will say so on the call rather than follow up for six weeks.',
            ].map((i) => (
              <li key={i} className="flex gap-3">
                <Check size={16} className="mt-1 shrink-0 text-hp-gold" />
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-hp-line bg-[rgba(255,252,245,0.025)] p-5 text-[14.5px] text-hp-text3">
            Prefer to look before you talk?{' '}
            <Link to="/tour" className="link-gold">
              The tour needs no email address <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="hp-card p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hp-pos/40 bg-[rgba(127,166,107,0.14)] text-hp-pos">
                <Check size={18} />
              </div>
              <h2 className="mt-5 font-display text-[26px] text-hp-text">Received. We will come back today.</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-hp-text2">
                {status === 'mailto'
                  ? 'A mail draft should have opened. If it did not, send the same details to '
                  : 'We reply within one working day, Thailand time. If anything is urgent, write to '}
                <a href={`mailto:${FALLBACK_MAIL}`} className="link-gold">
                  {FALLBACK_MAIL}
                </a>
                .
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/tour" className="btn btn-gold">
                  Open the tour meanwhile
                </Link>
                <button onClick={() => setStatus('idle')} className="btn btn-quiet">
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="hp-card space-y-3.5 p-6 sm:p-7">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <input required className={field} placeholder="Your name" value={state.name} onChange={set('name')} />
                <input
                  className={field}
                  placeholder="Company"
                  value={state.company}
                  onChange={set('company')}
                />
                <input
                  required
                  type="email"
                  className={field}
                  placeholder="Email"
                  value={state.email}
                  onChange={set('email')}
                />
                <input
                  className={field}
                  placeholder="Phone or WhatsApp"
                  value={state.phone}
                  onChange={set('phone')}
                />
                <select required className={field} value={state.size} onChange={set('size')}>
                  <option value="">Portfolio size</option>
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select className={field} value={state.interest} onChange={set('interest')}>
                  <option value="">Interested in</option>
                  {INTEREST.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <input
                className={field}
                placeholder="Channel manager you use (Hostaway, Guesty, none…)"
                value={state.channel}
                onChange={set('channel')}
              />
              <textarea
                className={`${field} min-h-[120px]`}
                placeholder="What is broken in your operation right now?"
                value={state.message}
                onChange={set('message')}
              />
              {status === 'error' && (
                <div className="flex gap-2.5 rounded-xl border border-hp-neg/40 bg-[rgba(196,112,92,0.1)] p-3.5 text-[14px] text-hp-text2">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0 text-hp-neg" />
                  <span>
                    That did not send. Email{' '}
                    <a href={`mailto:${FALLBACK_MAIL}`} className="link-gold">
                      {FALLBACK_MAIL}
                    </a>{' '}
                    directly and we will pick it up straight away.
                  </span>
                </div>
              )}
              <button type="submit" disabled={status === 'sending'} className="btn btn-gold w-full">
                {status === 'sending' ? 'Sending…' : 'Send and get a number today'}
              </button>
              <p className="text-[13px] text-hp-text3">
                We use this to reply and to size a quote. No newsletter, no sequence, no reselling your details.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
