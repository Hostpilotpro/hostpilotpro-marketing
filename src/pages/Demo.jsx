import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ArrowRight, AlertTriangle } from 'lucide-react';
import useSeo from '../lib/seo.js';
import { Eyebrow } from '../components/ui.jsx';
import asset from '../lib/asset.js';
import '../components/sales-pages.css';

const SIZES = ['Under 20 villas', '20–50 villas', '50–100 villas', '100–200 villas', '200+ villas'];
const INTEREST = ['The full suite', 'Owner portal', 'Ops console', 'Guest app', 'Field app', 'Partner / licensing'];

const ENDPOINT = 'https://mps-ops-hub-v2.vercel.app/api/siam-enquiries/submit';

export default function Demo() {
  useSeo({
    title: 'Book a call — see HostPilot Pro on live data',
    description:
      'Tell us your portfolio size and channel manager. We send a number the same working day and screen-share the real system, including the unglamorous parts.',
    path: '/demo',
  });

  const [params] = useSearchParams();
  const presetChannel = params.get('channel') || '';
  const presetVillas = Number(params.get('villas'));
  const [state, setState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    channel: ['Hostaway','Guesty','Lodgify','Other / not selected'].includes(presetChannel) ? presetChannel : '',
    size: SIZES.includes(params.get('size')) ? params.get('size') : '',
    interest: INTEREST.includes(params.get('interest')) ? params.get('interest') : '',
    message: Number.isInteger(presetVillas) && presetVillas >= 1 && presetVillas <= 250 ? `My portfolio has ${presetVillas} villas.` : '',
  });
  const requestId = useRef(crypto.randomUUID());
  const [reference, setReference] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | mailto | error
  const set = (k) => (e) => setState({ ...state, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST', headers: {'Content-Type':'application/json'}, signal:AbortSignal.timeout(20000),
        body: JSON.stringify({request_id:requestId.current,name:state.name,email:state.email,phone:state.phone,company:state.company,
          subject:'HostPilot Pro: '+(state.interest || 'Portfolio enquiry'),
          message:[state.message, 'Portfolio: '+state.size, 'Channel manager: '+state.channel].filter(Boolean).join('\n'),
          page_url:location.href,website_trap:''}),
      });
      const result=await res.json();
      if(!res.ok || !result.received || !result.reference) throw new Error('Receipt was not confirmed');
      setReference(result.reference); setStatus('done');
    } catch { setStatus('error'); }

  };

  const field =
    'w-full rounded-xl border border-hp-line bg-[color:var(--hp-veil-2)] px-3.5 py-2.5 text-[15px] text-hp-text placeholder:text-hp-text3 outline-none transition focus:border-hp-gold/60';

  const submitted = status === 'done';

  return (
    <div className="cinematic-product-page replica-dark demo-sales-page pt-24 pb-20 sm:pt-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>Book a call</Eyebrow>
          <h1 className="sales-page-title mt-4">
            Your next chapter.<br /><span className="serif-em">A working product.</span>
          </h1>
          <p className="mt-6 text-[17px] leading-[1.7] text-hp-text2">
            You have already seen the interface in the tour, so the call is not a demo script. Bring your portfolio
            and your channel manager and we will show you the parts the tour stubs out: the Hostaway sync, a real
            statement close, payroll inputs, the bits that are still rough.
          </p>
          <figure className="demo-sales-visual"><img src={asset('/img/real-ops/02-real-ops-finance-hub.jpg')} alt="Actual anonymised HostPilot Ops finance workspace" width="1356" height="847" /><figcaption>Actual Ops interface · private information anonymised</figcaption></figure>
          <ul className="mt-8 space-y-3 text-[15px] text-hp-text2">
            {[
              'A number for your portfolio size the same working day.',
              'No slides. The live system, on real records.',
              'We will tell you where the product is weak, unprompted.',
              'If it is not a fit, we will say so on the call rather than follow up for six weeks.',
            ].map((i) => (
              <li key={i} className="flex gap-3">
                <Check size={16} className="mt-1 shrink-0 text-hp-goldInk" />
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-hp-line bg-[color:var(--hp-veil-1)] p-5 text-[14.5px] text-hp-text3">
            Prefer to look before you talk?{' '}
            <Link to="/tour" className="link-gold">
              The tour needs no email address <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="hp-card p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hp-pos/40 bg-[color:var(--hp-pos-wash)] text-hp-pos">
                <Check size={18} />
              </div>
              <h2 className="mt-5 font-display text-[26px] text-hp-text">Your enquiry was received.</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-hp-text2">
                Saved to the Siam Solutions group inbox. Our team will review your enquiry and reply to the email you provided. Reference: {reference}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/tour" className="btn btn-gold">
                  Open the tour meanwhile
                </Link>
                <button onClick={() => {requestId.current=crypto.randomUUID();setStatus('idle');}} className="btn btn-quiet">
                  Send another enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="hp-card space-y-3.5 p-6 sm:p-7">
              <p className="rounded-xl border border-hp-line p-3.5 text-[13px] leading-relaxed text-hp-text2">Your enquiry goes directly to the Siam Solutions team. We store your contact details and message privately to respond to this request.</p>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <input required className={field} aria-label="Your name" autoComplete="name" placeholder="Your name" value={state.name} onChange={set('name')} />
                <input
                  className={field}
                  aria-label="Company" autoComplete="organization" placeholder="Company"
                  value={state.company}
                  onChange={set('company')}
                />
                <input
                  required
                  type="email"
                  className={field}
                  aria-label="Email" autoComplete="email" placeholder="Email"
                  value={state.email}
                  onChange={set('email')}
                />
                <input
                  className={field}
                  aria-label="Phone or WhatsApp" autoComplete="tel" placeholder="Phone or WhatsApp"
                  value={state.phone}
                  onChange={set('phone')}
                />
                <select aria-label="Portfolio size" required className={field} value={state.size} onChange={set('size')}>
                  <option value="">Portfolio size</option>
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select aria-label="Interested in" className={field} value={state.interest} onChange={set('interest')}>
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
                aria-label="Channel manager" placeholder="Channel manager you use (Hostaway, Guesty, none…)"
                value={state.channel}
                onChange={set('channel')}
              />
              <textarea
                className={`${field} min-h-[120px]`}
                aria-label="What would you like to improve?" placeholder="What would you like to improve in your operation?"
                value={state.message}
                onChange={set('message')}
              />
              {status === 'error' && (
                <div className="flex gap-2.5 rounded-xl border border-hp-neg/40 bg-[color:var(--hp-neg-wash)] p-3.5 text-[14px] text-hp-text2">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0 text-hp-neg" />
                  <span>
                    We could not confirm receipt. Your details remain in the form. Please retry with the same details; this will not create a duplicate.
                  </span>
                </div>
              )}
              <button type="submit" disabled={status === 'sending'} className="btn btn-gold w-full">
                {status === 'sending' ? 'Sending…' : 'Send your enquiry'}
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
