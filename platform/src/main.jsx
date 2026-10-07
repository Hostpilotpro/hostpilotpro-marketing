import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Building2, Check, ClipboardList, House, Link2, LogOut, ShieldCheck, Users } from 'lucide-react';
import { client, configError, unwrap } from './client.js';
import './style.css';

const initialInvite = new URLSearchParams(location.hash.slice(1)).get('invite');
if (initialInvite && /^[a-f0-9]{64}$/.test(initialInvite)) {
  sessionStorage.setItem('hp-pending-invite', initialInvite);
  history.replaceState(null, '', location.pathname);
}
const timezoneOptions = ['Asia/Bangkok','Asia/Kuala_Lumpur','Asia/Jakarta','Asia/Ho_Chi_Minh','Europe/London','Europe/Amsterdam','America/New_York','UTC'];
function Input({label,...props}) { return <label className="field"><span>{label}</span><input {...props} /></label>; }
function Select({label,options,...props}) { return <label className="field"><span>{label}</span><select {...props}>{options.map(v=><option key={v}>{v}</option>)}</select></label>; }
function Notice({error,status}) { return <>{error && <p className="notice error" role="alert">{error}</p>}{status && <p className="notice" role="status">{status}</p>}</>; }
function Brand() { return <a className="brand" href="/"><House size={24}/><span>HostPilot<span className="brand-pro">PRO</span></span></a>; }

function Auth({recovery,setRecovery}) {
  const [mode,setMode] = useState('signup');
  const [form,setForm] = useState({name:'',email:'',password:''});
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [status,setStatus] = useState('');
  const update = key => e => setForm(f=>({...f,[key]:e.target.value}));
  const redirect = `${location.origin}/auth/confirm`;
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError(''); setStatus('');
    try {
      if (recovery) {
        await unwrap(client.auth.updateUser({password:form.password}));
        setForm(f=>({...f,password:''})); setRecovery(false); history.replaceState(null,'','/');
      } else if (mode==='signup') {
        const result=await unwrap(client.auth.signUp({email:form.email.trim(),password:form.password,options:{emailRedirectTo:redirect,data:{display_name:form.name.trim()}}}));
        if (!result.session) setStatus('Check your email to verify your account. After verification, sign in here to create your company or accept your invitation.');
        setForm(f=>({...f,password:''}));
      } else if (mode==='login') {
        await unwrap(client.auth.signInWithPassword({email:form.email.trim(),password:form.password}));
      } else {
        await unwrap(client.auth.resetPasswordForEmail(form.email.trim(),{redirectTo:`${location.origin}/reset-password`}));
        setStatus('If this address has an account, a password reset email will arrive. Follow its link to choose a new password.');
      }
    } catch(e) { setError(e.message); }
    finally { setBusy(false); }
  }
  return <div className="auth-grid"><section className="story"><span className="eyebrow">YOUR COMPANY. YOUR WORKSPACE.</span><h1>A calmer way<br/>to run your<br/><em>villa business.</em></h1><p>Start with your company. Bring your properties, people and daily work together.</p><div className="story-card"><Building2 size={28}/><h2>A place of your own.</h2><p>Your company’s workspace is separate from other operators. Explore with fictional villas before connecting your booking system.</p></div><p className="safety"><ShieldCheck size={19}/>A separate test platform. Your existing MPS systems stay where they are.</p></section>
    <section className="auth-form"><span className="eyebrow">EARLY TEST PLATFORM</span><h2>{recovery?'Choose a new password.':mode==='signup'?'Start with your account.':mode==='login'?'Welcome back.':'Reset your password.'}</h2><p className="muted">{recovery?'Your password reset link has opened a secure session.':mode==='signup'?'Verify your email, then set up your company workspace.':mode==='login'?'Sign in to continue to your company.':'We’ll send a link to the email on your account.'}</p>
      <Notice error={error} status={status}/><form onSubmit={submit}>
        {!recovery && mode==='signup' && <Input label="Your name" value={form.name} onChange={update('name')} minLength={2} maxLength={120} autoComplete="name" required/>}
        {!recovery && <Input label="Email" type="email" value={form.email} onChange={update('email')} autoComplete="email" required/>}
        {(recovery || mode!=='reset') && <Input label="Password" type="password" value={form.password} onChange={update('password')} minLength={mode==='login'?undefined:12} maxLength={128} autoComplete={mode==='login'?'current-password':'new-password'} required/>}
        {(recovery || mode==='signup') && <p className="small muted">Use at least 12 characters. Choose a password just for this test platform.</p>}
        <button className="primary" disabled={busy}>{busy?'Please wait…':recovery?'Save new password':mode==='signup'?'Create your account':mode==='login'?'Sign in':'Send reset link'}<ArrowRight size={17}/></button>
      </form>
      {!recovery && <div className="auth-links"><button onClick={()=>{setMode(mode==='signup'?'login':'signup');setError('');setStatus('');}}> {mode==='signup'?'Already registered? Sign in':'Create an account'}</button><button onClick={()=>{setMode('reset');setError('');setStatus('');}}>Forgot password?</button></div>}
      <p className="small muted">This is an early test platform. Use fictional property data. Payments and booking connections are not activated.</p>
    </section></div>;
}

function Setup({user,onComplete}) {
  const [form,setForm]=useState({company_name:'',country_name:'Thailand',currency_code:'THB',time_zone:'Asia/Bangkok',provider:'Hostaway',person_name:user.user_metadata?.display_name || ''});
  const [invite,setInvite]=useState(()=>sessionStorage.getItem('hp-pending-invite'));
  const [error,setError]=useState('');const [busy,setBusy]=useState(false);
  const update=key=>e=>setForm(f=>({...f,[key]:e.target.value}));
  async function submit(e) {
    e.preventDefault();setBusy(true);setError('');
    try {
      await unwrap(client.rpc(invite?'hp_accept_team_invite':'hp_create_company',invite?{invitation_token:invite,person_name:form.person_name}:form));
      sessionStorage.removeItem('hp-pending-invite');history.replaceState(null,'','/');await onComplete();
    } catch(e) {setError(e.message);} finally {setBusy(false);}
  }
  return <section className="setup card"><span className="eyebrow">{invite?'JOIN YOUR TEAM':'YOUR COMPANY'}</span><h1>{invite?'Accept your invitation.':'Give your company a home.'}</h1><p className="muted">{invite?`Signed in as ${user.email}. This must match the email your administrator invited.`:'Choose your starting settings. Local payment and reporting requirements will be reviewed before activation.'}</p><Notice error={error}/><form onSubmit={submit}><Input label="Your name" value={form.person_name} onChange={update('person_name')} minLength={2} maxLength={120} required/>
    {!invite && <><Input label="Company name" value={form.company_name} onChange={update('company_name')} placeholder="Sunshine Villas — Test Company" minLength={2} maxLength={120} required/><div className="form-grid"><Input label="Country" value={form.country_name} onChange={update('country_name')} minLength={2} maxLength={80} required/><Select label="Currency" options={['THB','USD','EUR','GBP','MYR','IDR','VND']} value={form.currency_code} onChange={update('currency_code')}/></div><Select label="Timezone" options={timezoneOptions} value={form.time_zone} onChange={update('time_zone')}/><Select label="Booking system" options={['Hostaway','Guesty','Lodgify','Other','None yet']} value={form.provider} onChange={update('provider')}/><p className="small muted">Your selection records the connection you need. No booking account or payment provider is connected by this step.</p></>}
    <button className="primary" disabled={busy}>{busy?'Setting up…':invite?'Join the company':'Create company workspace'}<ArrowRight size={17}/></button></form>
    {invite && <button className="text-button" onClick={()=>{sessionStorage.removeItem('hp-pending-invite');setInvite(null);}}>Discard invitation and create a company instead</button>}
  </section>;
}

function Workspace({data,user,reload}) {
  const [view,setView]=useState('overview');const [search,setSearch]=useState('');
  const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [status,setStatus]=useState('');
  const [invite,setInvite]=useState({email:'',role:'field'});const [inviteLink,setInviteLink]=useState('');const [invitations,setInvitations]=useState([]);
  const {company,team,properties,tasks}=data;const member=team.find(m=>m.user_id===user.id);const admin=member?.role==='admin';
  const nav=[['overview','Overview',Building2],['properties','Properties',House],['tasks','Daily tasks',ClipboardList],['team','Team',Users],['connections','Connections',Link2]];
  useEffect(()=>{setError('');setStatus('');},[view]);
  async function action(fn) {if(busy)return;setBusy(true);setError('');setStatus('');try{await fn();}catch(e){setError(e.message);}finally{setBusy(false);}}
  async function listInvites() {setInvitations(await unwrap(client.rpc('hp_list_team_invites')));}
  useEffect(()=>{let current=true;if(view==='team'&&admin)unwrap(client.rpc('hp_list_team_invites')).then(list=>{if(current)setInvitations(list);}).catch(e=>{if(current)setError(e.message);});return()=>{current=false;};},[view,admin]);
  const load=<button className="primary" disabled={busy} onClick={()=>action(async()=>{await unwrap(client.rpc('hp_load_demo_portfolio'));await reload();})}>Load 40 sample properties<ArrowRight size={17}/></button>;
  return <div className="workspace"><aside><Building2 size={28}/><h2>{company.name}</h2><p className="small muted">{company.country} · {company.currency}</p><nav aria-label="Workspace">{nav.map(([id,label,Icon])=><button key={id} className={view===id?'active':''} aria-current={view===id?'page':undefined} onClick={()=>setView(id)}><Icon size={18}/>{label}</button>)}</nav><div className="member"><strong>{member?.display_name}</strong><span className="small muted">{member?.role==='admin'?'Company administrator':member?.role==='manager'?'Manager':'Field staff'}</span></div></aside><section className="workspace-main"><span className="eyebrow">YOUR COMPANY WORKSPACE</span><div className="title-row"><h1>{view==='overview'?`Welcome, ${member?.display_name?.split(' ')[0] || 'there'}.`:nav.find(([id])=>id===view)?.[1]}</h1><span className="tag">TEST PLATFORM</span></div><Notice error={error} status={status}/>
    {view==='overview' && <><p className="muted">Your company has its own place to work. Start by exploring a fictional portfolio.</p><div className="stats">{[[House,properties.length,'Sample properties'],[Users,team.length,'Registered teammates'],[ClipboardList,tasks.filter(t=>!t.done).length,'Open sample tasks']].map(([Icon,value,label])=><article className="card" key={label}><Icon size={22}/><strong>{value}</strong><span>{label}</span></article>)}</div><div className="overview-grid"><article className="card"><span className="eyebrow">GET STARTED</span><h2>Your next steps.</h2><p className="step"><Check size={19}/>Your company workspace is ready.</p><p className="step"><House size={19}/>Explore 40 fictional villas and daily tasks.</p>{properties.length?<button className="primary" onClick={()=>setView('properties')}>Explore properties<ArrowRight size={17}/></button>:admin?load:<p>Ask your administrator to load the samples.</p>}<p className="step"><Users size={19}/>Invite a teammate to try their own login.</p><button className="text-button" onClick={()=>setView('team')}>Open your team →</button></article><article className="card"><Link2 size={28}/><h2>Keep your booking system.</h2><p className="muted">You selected {company.booking_provider}. Connecting your company’s own account comes after signup and isolation testing.</p><button className="text-button" onClick={()=>setView('connections')}>See connection status →</button></article></div></>}
    {view==='properties' && <><Input label="Find a sample property" type="search" value={search} onChange={e=>setSearch(e.target.value)}/><div className="property-grid">{properties.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())).map(p=><article className="card" key={p.id}><House size={25}/><h2>{p.name}</h2><p className="muted small">{p.bedrooms} bedrooms · {p.area}</p><span className="tag">FICTIONAL PROPERTY</span></article>)}</div>{!properties.length&&(admin?load:<p>Sample properties have not been loaded.</p>)}{properties.length>0&&!properties.some(p=>p.name.toLowerCase().includes(search.toLowerCase()))&&<p>No matching sample properties.</p>}</>}
    {view==='tasks' && <article className="card"><h2>Work that leaves a record.</h2><p className="muted">Sample tasks are saved in your company workspace.</p>{tasks.map(t=><label className="task" key={t.id}><input type="checkbox" checked={t.done} disabled={busy} onChange={e=>{const done=e.target.checked;action(async()=>{const changed=await unwrap(client.from('hp_tasks').update({done}).eq('id',t.id).select('id'));if(!changed.length)throw new Error('Task unavailable. Refresh your workspace.');await reload();});}}/><span><strong>{t.title}</strong><span className="small muted">{properties.find(p=>p.id===t.property_id)?.name}</span></span><span className="tag">{t.done?'Completed':'To do'}</span></label>)}{!tasks.length&&<p>No sample tasks yet.</p>}</article>}
    {view==='team' && <><article className="card"><h2>Your people.</h2>{team.map(m=><div className="team-row" key={m.user_id}><Users size={20}/><strong>{m.display_name}</strong><span className="tag">{m.role}</span></div>)}</article>{admin&&<article className="card"><h2>Invite a teammate.</h2><p className="muted">The teammate creates and verifies their own account, then opens your invitation link. Only the invited email can accept it. Links expire after seven days.</p><form onSubmit={e=>{e.preventDefault();setInviteLink('');action(async()=>{const token=await unwrap(client.rpc('hp_create_team_invite',{invite_email:invite.email.trim(),invite_role:invite.role}));setInviteLink(`${location.origin}/join#invite=${token}`);setStatus('Invitation ready. Share this link with the teammate you named. No invitation email was sent.');await listInvites();});}}><div className="form-grid"><Input label="Teammate email" type="email" value={invite.email} onChange={e=>setInvite(i=>({...i,email:e.target.value}))} required/><label className="field"><span>Role</span><select value={invite.role} onChange={e=>setInvite(i=>({...i,role:e.target.value}))}><option value="field">Field staff</option><option value="manager">Manager</option></select></label></div><button className="primary" disabled={busy}>Create invitation link<ArrowRight size={17}/></button></form>{inviteLink&&<div className="invite-link"><Input label="Invitation link" value={inviteLink} readOnly/><button className="text-button" onClick={()=>action(async()=>{await navigator.clipboard.writeText(inviteLink);setStatus('Invitation link copied.');})}>Copy link</button></div>}<h3>Recent invitations</h3>{invitations.map(i=><div className="invitation" key={i.id}><div><strong>{i.email}</strong><p className="small muted">{i.role} · {i.accepted_at?'Accepted':i.revoked_at?'Revoked':new Date(i.expires_at)<new Date()?'Expired':'Pending'}</p></div>{!i.accepted_at&&!i.revoked_at&&new Date(i.expires_at)>new Date()&&<button disabled={busy} className="text-button" onClick={()=>action(async()=>{await unwrap(client.rpc('hp_revoke_team_invite',{invitation_id:i.id}));setInviteLink('');await listInvites();})}>Revoke</button>}</div>)}</article>}</>}
    {view==='connections' && <article className="card"><h2>Your connections come next.</h2><p className="muted">Your settings are saved. This foundation uses fictional property data and has no live booking, advertising, messaging or payment connections.</p>{[['Booking system',company.booking_provider],['Country',company.country],['Currency',company.currency],['Timezone',company.timezone]].map(([label,value])=><div className="team-row" key={label}><strong>{label}</strong><span>{value}</span></div>)}<p className="notice">Hostaway testing is the next connection step. Guesty and Lodgify need separate adapters and validation. Payment and local reporting availability will be agreed for your country before activation.</p></article>}
  </section></div>;
}

function App() {
  const [session,setSession]=useState(null);const [loading,setLoading]=useState(Boolean(client));
  const [recovery,setRecovery]=useState(false);const [data,setData]=useState(null);const [error,setError]=useState('');
  const reload=useCallback(async()=>{
    const [companies,team,properties,tasks]=await Promise.all([unwrap(client.from('hp_companies').select('id,name,country,currency,timezone,booking_provider')),unwrap(client.from('hp_memberships').select('user_id,display_name,role,company_id')),unwrap(client.from('hp_properties').select('id,name,bedrooms,area,is_sample')),unwrap(client.from('hp_tasks').select('id,property_id,title,done'))]);
    setData({company:companies[0]||null,team,properties:properties.sort((a,b)=>a.name.localeCompare(b.name)),tasks});
  },[]);
  useEffect(()=>{
    if(!client)return;let current=true;
    client.auth.getSession().then(({data,error})=>{if(current){if(error)setError(error.message);setSession(data?.session || null);setLoading(false);}}).catch(e=>{if(current){setError(e.message);setLoading(false);}});
    const {data:{subscription}}=client.auth.onAuthStateChange((event,session)=>{if(!current)return;setSession(session);if(event==='PASSWORD_RECOVERY')setRecovery(true);if(event==='SIGNED_OUT'){setData(null);setRecovery(false);}});
    return()=>{current=false;subscription.unsubscribe();};
  },[]);
  useEffect(()=>{
    if(!session || recovery)return;let current=true;setLoading(true);setError('');
    // Fetch fresh data outside the auth callback; the callback must not hold an auth lock.
    Promise.all([unwrap(client.from('hp_companies').select('id,name,country,currency,timezone,booking_provider')),unwrap(client.from('hp_memberships').select('user_id,display_name,role,company_id')),unwrap(client.from('hp_properties').select('id,name,bedrooms,area,is_sample')),unwrap(client.from('hp_tasks').select('id,property_id,title,done'))]).then(([companies,team,properties,tasks])=>{if(current)setData({company:companies[0]||null,team,properties:properties.sort((a,b)=>a.name.localeCompare(b.name)),tasks});}).catch(e=>{if(current){setData(null);setError(e.message);}}).finally(()=>{if(current)setLoading(false);});
    return()=>{current=false;};
  },[session?.user.id,recovery]);
  async function signOut(){setError('');try{await unwrap(client.auth.signOut());sessionStorage.removeItem('hp-pending-invite');setData(null);setSession(null);history.replaceState(null,'','/');}catch(e){setError(e.message);}}
  return <><header className="header"><Brand/><div><span className="tag">EARLY TEST PLATFORM</span>{session&&<button className="text-button" onClick={signOut}><LogOut size={16}/>Sign out</button>}</div></header><main>
    {configError?<section className="setup card"><ShieldCheck size={30}/><h1>Your separate workspace is being connected.</h1><p className="muted">{configError}</p><p>Signup will open once its own login service and database are ready.</p><p className="small muted">Your existing MPS systems are unchanged.</p></section>:loading?<p className="loading" role="status">Opening your workspace…</p>:error?<section className="setup card"><h1>We couldn’t open your workspace.</h1><Notice error={error}/><button className="primary" onClick={()=>location.reload()}>Try again</button></section>:!session||recovery?<Auth recovery={recovery} setRecovery={setRecovery}/>:data?.company?<Workspace data={data} user={session.user} reload={reload}/>:<Setup user={session.user} onComplete={reload}/>}
  </main><footer>HostPilotPro · Separate company workspaces · Fictional property data during testing</footer></>;
}
createRoot(document.getElementById('root')).render(<App/>);
