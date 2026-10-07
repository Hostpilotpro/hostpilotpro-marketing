import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Check, CircleCheck, ClipboardList, House, Layers, Link2, LogOut, ShieldCheck, Users } from 'lucide-react';
import Logo from '../components/Logo.jsx';
import { demoApi } from './api.js';
import './sandbox.css';

const defaults = { name: '', company: '', email: '', password: '', country: 'Thailand', currency: 'THB', timezone: 'Asia/Bangkok', provider: 'Hostaway' };
const currencies = ['THB', 'USD', 'EUR', 'GBP', 'MYR', 'IDR', 'VND'];
const timezones = ['Asia/Bangkok', 'Asia/Kuala_Lumpur', 'Asia/Jakarta', 'Asia/Ho_Chi_Minh', 'Europe/London', 'Europe/Amsterdam', 'America/New_York', 'UTC'];

function Field({ label, ...props }) {
  return <label className="lab-field"><span>{label}</span><input {...props} /></label>;
}
function Select({ label, options, ...props }) {
  return <label className="lab-field"><span>{label}</span><select {...props}>{options.map(value => <option key={value}>{value}</option>)}</select></label>;
}
function Message({ error, status }) {
  return <>{error && <p className="lab-error" role="alert">{error}</p>}{status && <p className="lab-status" role="status">{status}</p>}</>;
}

function Auth({ mode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const login = mode === 'login';
  const join = mode === 'join';
  const [form, setForm] = useState(defaults);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [available, setAvailable] = useState(null);
  const [step, setStep] = useState(1);
  useEffect(() => {
    const controller = new AbortController();
    demoApi('status', { signal: controller.signal }).then(() => setAvailable(true)).catch(e => {
      if (e.name !== 'AbortError') { setAvailable(false); setError(e.message); }
    });
    return () => controller.abort();
  }, []);
  useEffect(() => { setError(''); setStep(1); setForm(defaults); }, [mode]);
  const change = key => event => setForm(current => ({ ...current, [key]: event.target.value }));
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    if (!login && !join && step === 1) { setStep(2); return; }
    setBusy(true); setError('');
    try {
      await demoApi(login ? 'login' : join ? 'accept-invite' : 'signup', {
        method: 'POST', data: { ...form, ...(join ? { token: location.hash.slice(1) } : {}) },
      });
      navigate('/sandbox/workspace', { replace: true });
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }
  return <div className="lab-auth">
    <section className="lab-story">
      <span className="lab-eyebrow">YOUR COMPANY. YOUR WORKSPACE.</span>
      <h1>A calmer way<br />to run your<br /><em>villa business.</em></h1>
      <p>Bring your properties, people and daily work together. Start with a company of your own.</p>
      <div className="lab-preview" aria-label="Illustration of a demo workspace">
        <div className="lab-preview-top"><Building2 size={18} /> Your company <span>DEMO</span></div>
        <div className="lab-preview-cards"><div><House size={20} /><strong>Properties</strong><small>Your portfolio, organised</small></div><div><Users size={20} /><strong>Team</strong><small>The right people together</small></div></div>
        <div className="lab-preview-row"><CircleCheck size={17} /><span>Arrival preparation</span><small>Sample task</small></div>
        <div className="lab-preview-row"><CircleCheck size={17} /><span>Pool inspection</span><small>Sample task</small></div>
      </div>
      <div className="lab-isolation"><ShieldCheck size={22} /><p>A separate place to explore.<br /><span>Your existing MPS systems stay where they are.</span></p></div>
    </section>
    <section className="lab-auth-card">
      <div className="lab-card-heading"><span className="lab-tag">LOCAL DEMO</span><span>{!login && !join ? `Step ${step} of 2` : 'Welcome'}</span></div>
      <h2>{login ? 'Welcome back.' : join ? 'Join your team.' : step === 1 ? 'Start with your account.' : 'Make it your company.'}</h2>
      <p>{login ? 'Sign in to the demo company you created.' : join ? 'Use the email your administrator invited.' : step === 1 ? 'Create a login, then set up your company workspace.' : 'These settings belong to your demo company.'}</p>
      <form onSubmit={submit}>
        {(step === 1 || login || join) ? <>
          {!login && <Field label="Your name" name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={change('name')} />}
          <Field label="Email" name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={change('email')} />
          <Field label="Password" name="password" type="password" autoComplete={login ? 'current-password' : 'new-password'} required minLength={login ? undefined : 12} maxLength={128} value={form.password} onChange={change('password')} />
          {!login && <small className="lab-help">At least 12 characters. Use a test email and a password just for this demo.</small>}
        </> : <>
          <Field label="Company name" name="company" autoComplete="organization" placeholder="Your villa management company" required maxLength={120} value={form.company} onChange={change('company')} />
          <Field label="Country" name="country" required maxLength={60} value={form.country} onChange={change('country')} />
          <div className="lab-form-grid"><Select label="Currency" options={currencies} value={form.currency} onChange={change('currency')} /><Select label="Timezone" options={timezones} value={form.timezone} onChange={change('timezone')} /></div>
          <Select label="Your booking system" options={['Hostaway', 'Guesty', 'Lodgify', 'Other', 'None yet']} value={form.provider} onChange={change('provider')} />
          <small className="lab-help">This records your choice. No booking system is connected in this demo.</small>
        </>}
        <Message error={error} />
        <button className="lab-button primary" disabled={busy || available !== true}>{busy ? 'Please wait…' : login ? 'Sign in' : join ? 'Join company' : step === 1 ? 'Continue to company setup' : 'Create demo workspace'}<ArrowRight size={17} /></button>
        {!login && !join && step === 2 && <button className="lab-text-button" type="button" onClick={() => setStep(1)} disabled={busy}>Back to your account</button>}
      </form>
      <p className="lab-auth-switch">{login ? 'New here? ' : 'Already have a demo account? '}<Link to={login ? '/sandbox/signup' : '/sandbox/login'}>{login ? 'Create a company' : 'Sign in'}</Link></p>
      <div className="lab-note">Local signup test. No subscription, email verification or real booking connections. Accounts are saved on this computer.</div>
    </section>
  </div>;
}

const views = [{ id: 'overview', label: 'Overview', icon: Layers }, { id: 'properties', label: 'Properties', icon: House }, { id: 'tasks', label: 'Daily tasks', icon: ClipboardList }, { id: 'team', label: 'Team', icon: Users }, { id: 'connections', label: 'Connections', icon: Link2 }, { id: 'owner', label: 'Owner preview', icon: Building2 }];

function Workspace() {
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [view, setView] = useState('overview');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [invite, setInvite] = useState({ email: '', role: 'manager' });
  const [invitation, setInvitation] = useState('');
  const [search, setSearch] = useState('');
  const [propertyId, setPropertyId] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    demoApi('workspace', { signal: controller.signal }).then(setWorkspace).catch(e => {
      if (e.name === 'AbortError') return;
      if (e.status === 401) navigate('/sandbox/login', { replace: true }); else setError(e.message);
    });
    return () => controller.abort();
  }, [navigate]);
  async function action(path, data, method = 'POST') {
    if (busy) return;
    setBusy(true); setError(''); setStatus('');
    try {
      const result = await demoApi(path, { method, data });
      if (path === 'logout') { navigate('/sandbox/login', { replace: true }); return; }
      if (path === 'invites') {
        setInvitation(new URL(result.invitationPath, window.location.origin).href);
        setWorkspace(await demoApi('workspace'));
        setStatus('Invitation link created. No email was sent. Open the link to register the test teammate.');
      } else { setWorkspace(result); setStatus(path === 'load-samples' ? 'Your 40 fictional properties and six sample tasks are ready.' : 'Task updated.'); }
    } catch (e) { if (e.status === 401) navigate('/sandbox/login', { replace: true }); else setError(e.message); }
    finally { setBusy(false); }
  }
  if (!workspace) return <div className="lab-loading"><Message error={error} />{!error && <p role="status">Opening your company workspace…</p>}<Link to="/sandbox/login">Back to sign in</Link></div>;
  const { company, user, properties, tasks, team, invites } = workspace;
  const admin = user.role === 'admin';
  const selectedProperty = properties.find(p => p.id === propertyId) || properties[0];
  const completed = tasks.filter(t => t.done).length;
  const loadSamples = <button className="lab-button primary" disabled={busy} onClick={() => action('load-samples')}>Load 40 demo properties<ArrowRight size={17} /></button>;
  return <div className="lab-workspace">
    <aside className="lab-sidebar"><div className="lab-company-icon"><Building2 size={24} /></div><h2>{company.name}</h2><p>{company.country} · {company.currency}</p><nav aria-label="Workspace">{views.map(({ id, label, icon: Icon }) => <button key={id} aria-current={view === id ? 'page' : undefined} onClick={() => { setView(id); setError(''); setStatus(''); }}><Icon size={18} />{label}</button>)}</nav><div className="lab-sidebar-foot"><strong>{user.name}</strong><span>{user.role === 'admin' ? 'Company administrator' : user.role === 'field' ? 'Field staff' : 'Manager'}</span><button disabled={busy} onClick={() => action('logout')}><LogOut size={16} />Sign out</button></div></aside>
    <section className="lab-work-content">
      <div className="lab-work-heading"><div><span className="lab-eyebrow">YOUR COMPANY WORKSPACE</span><h1>{view === 'overview' ? `Welcome, ${user.name.split(' ')[0]}.` : views.find(v => v.id === view).label}</h1></div><span className="lab-tag">DEMO DATA ONLY</span></div>
      <Message error={error} status={status} />
      {view === 'overview' && <>
        <p className="lab-intro">Your company has its own place to work. Let’s get your sample portfolio ready.</p>
        <div className="lab-stats"><article><House size={22} /><strong>{properties.length}</strong><span>Demo properties</span></article><article><Users size={22} /><strong>{team.length}</strong><span>Registered teammates</span></article><article><ClipboardList size={22} /><strong>{tasks.length - completed}</strong><span>Open sample tasks</span></article></div>
        <div className="lab-overview-grid"><article className="lab-panel"><span className="lab-eyebrow">GET STARTED</span><h2>Your next steps.</h2><div className="lab-step"><CircleCheck size={20} /><div><strong>Create your company</strong><span>{company.name} is ready.</span></div><span className="lab-pill">Done</span></div><div className="lab-step"><House size={20} /><div><strong>Explore a sample portfolio</strong><span>40 fictional villas, with sample daily tasks.</span></div></div>{properties.length ? <button className="lab-button" onClick={() => setView('properties')}>Explore properties<ArrowRight size={16} /></button> : admin ? loadSamples : <p>Ask your administrator to load the sample portfolio.</p>}<div className="lab-step"><Users size={20} /><div><strong>Try a teammate login</strong><span>Create an invitation link in the Team page.</span></div></div><button className="lab-text-button" onClick={() => setView('team')}>Open your team →</button></article><article className="lab-panel lab-next"><Link2 size={28} /><h2>Keep your booking system.</h2><p>You selected <strong>{company.provider}</strong>. In the future, you’ll connect your company’s own account here.</p><p>This demo does not connect to Hostaway, Guesty, Lodgify or any MPS account.</p><button className="lab-button" onClick={() => setView('connections')}>See connections<ArrowRight size={16} /></button></article></div>
      </>}
      {view === 'properties' && <><div className="lab-section-top"><p>{properties.length} fictional properties in {company.name}.</p>{!properties.length && admin && loadSamples}</div><Field label="Search properties" type="search" placeholder="Search by villa name or area" value={search} onChange={e => setSearch(e.target.value)} /><div className="lab-properties">{properties.filter(p => `${p.name} ${p.area}`.toLowerCase().includes(search.toLowerCase())).map(p => <article className="lab-property" key={p.id}><div className="lab-villa-art"><House size={46} strokeWidth={1} /><span>SAMPLE PROPERTY</span></div><div><h3>{p.name}</h3><p>{p.area} · {p.bedrooms} bedrooms</p><button className="lab-text-button" onClick={() => { setPropertyId(p.id); setView('owner'); }}>View owner preview →</button></div></article>)}</div>{properties.length > 0 && !properties.some(p => `${p.name} ${p.area}`.toLowerCase().includes(search.toLowerCase())) && <p>No properties match your search.</p>}</>}
      {view === 'tasks' && <article className="lab-panel"><h2>Try the daily workflow.</h2><p>These sample tasks can be completed and reopened. Changes are saved in this demo.</p>{!tasks.length && <p>Load the demo properties first to create sample tasks.</p>}{tasks.map(task => <label key={task.id} className={`lab-task ${task.done ? 'done' : ''}`}><input type="checkbox" checked={Boolean(task.done)} disabled={busy} onChange={e => action(`tasks/${task.id}`, { done: e.target.checked }, 'PATCH')} /><span><strong>{task.title}</strong><small>{task.property_name}</small></span><span className="lab-pill">{task.done ? 'Completed' : 'To do'}</span></label>)}</article>}
      {view === 'team' && <div className="lab-overview-grid"><article className="lab-panel"><h2>Your people.</h2>{team.map(person => <div className="lab-person" key={person.id}><div className="lab-avatar">{person.name.slice(0, 1).toUpperCase()}</div><div><strong>{person.name}</strong><span>{person.email}</span></div><span className="lab-pill">{person.role}</span></div>)}{invites.length > 0 && <h3 className="lab-subheading">Pending invitations</h3>}{invites.map((item, i) => <div className="lab-person" key={`${item.email}-${i}`}><div><strong>{item.email}</strong><span>{item.role} · Not registered yet</span></div></div>)}</article><article className="lab-panel"><h2>Invite a test teammate.</h2><p>Make a link for a manager or field staff member to create their own demo login. Nothing is emailed.</p>{admin ? <form onSubmit={e => { e.preventDefault(); action('invites', invite); }}><Field label="Teammate email" type="email" required maxLength={254} value={invite.email} onChange={e => setInvite(current => ({ ...current, email: e.target.value }))} /><Select label="Team role" options={['manager', 'field']} value={invite.role} onChange={e => setInvite(current => ({ ...current, role: e.target.value }))} /><button className="lab-button primary" disabled={busy}>Create invitation link<ArrowRight size={16} /></button>{invitation && <div className="lab-invitation"><Field label="Invitation link" readOnly value={invitation} onFocus={e => e.target.select()} /><small>Copy this link. Opening it and completing registration signs in as the new teammate. Links expire after seven days.</small></div>}</form> : <p>Your company administrator manages invitations.</p>}</article></div>}
      {view === 'connections' && <><p className="lab-intro">Choose the system your company already uses. Live connections will be introduced after separate testing.</p><div className="lab-connections">{['Hostaway', 'Guesty', 'Lodgify'].map(provider => <article className="lab-panel" key={provider}><Link2 size={28} /><h2>{provider}</h2><span className="lab-pill">{company.provider === provider ? 'Your selected system' : 'Future connection'}</span><p>{provider === 'Hostaway' ? 'Planned first connection for property and reservation imports.' : 'Requires its own connection development and testing.'}</p><button className="lab-button" disabled>Not connected in demo</button></article>)}</div><div className="lab-panel lab-connection-note"><ShieldCheck size={22} /><p>No API keys are requested or saved. Messaging, payments and automatic jobs are disconnected.</p></div></>}
      {view === 'owner' && <article className="lab-panel"><span className="lab-eyebrow">OWNER EXPERIENCE · PREVIEW</span><h2>{company.name}</h2><p>This is a staff preview for fictional properties. Separate owner accounts, statements and payments are not implemented in this demo.</p>{selectedProperty ? <><label className="lab-field"><span>Preview property</span><select value={selectedProperty.id} onChange={e => setPropertyId(e.target.value)}>{properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label><div className="lab-owner-card"><House size={36} /><h3>{selectedProperty.name}</h3><p>{selectedProperty.area} · {selectedProperty.bedrooms} bedrooms</p><span className="lab-pill">Fictional villa</span></div><h3 className="lab-subheading">Property activity</h3>{tasks.filter(t => t.property_id === selectedProperty.id).map(t => <div className="lab-step" key={t.id}><Check size={18} /><strong>{t.title}</strong><span className="lab-pill">{t.done ? 'Completed' : 'To do'}</span></div>)}{!tasks.some(t => t.property_id === selectedProperty.id) && <p>No sample activity recorded for this property.</p>}</> : <p>Load demo properties to explore the owner preview.</p>}</article>}
    </section>
  </div>;
}

export default function Sandbox() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'HostPilotPro · Company signup demo';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.append(robots);
    return () => { document.title = previous; robots.remove(); };
  }, []);
  return <div className="sandbox"><header className="lab-header"><Link to="/sandbox/signup" aria-label="HostPilotPro demo home"><Logo /></Link><div><span className="lab-tag">ISOLATED DEMO</span><Link to="/sandbox/login">Sign in<ArrowRight size={15} /></Link></div></header><main><Routes><Route path="/sandbox/signup" element={<Auth mode="signup" />} /><Route path="/sandbox/login" element={<Auth mode="login" />} /><Route path="/sandbox/join" element={<Auth mode="join" />} /><Route path="/sandbox/workspace" element={<Workspace />} /><Route path="*" element={<Navigate to="/sandbox/signup" replace />} /></Routes></main><footer className="lab-footer">HostPilotPro signup lab · Fictional portfolio data · No live MPS connections</footer></div>;
}
