-- Apply only to a NEW, dedicated HostPilotPro test project.
-- No existing business data, credentials, integrations or auth settings are copied.
create schema if not exists hp_private;
revoke all on schema hp_private from public, anon;
grant usage on schema hp_private to authenticated;

create table public.hp_companies (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 2 and 120),
  country text not null check (length(trim(country)) between 2 and 80),
  currency text not null check (currency in ('THB','USD','EUR','GBP','MYR','IDR','VND')),
  timezone text not null,
  booking_provider text not null check (booking_provider in ('Hostaway','Guesty','Lodgify','Other','None yet')),
  created_by uuid not null unique references auth.users(id),
  created_at timestamptz not null default now()
);
create table public.hp_memberships (
  user_id uuid primary key references auth.users(id) on delete cascade,
  company_id uuid not null references public.hp_companies(id),
  display_name text not null check (length(trim(display_name)) between 2 and 120),
  role text not null check (role in ('admin','manager','field')),
  created_at timestamptz not null default now()
);
create index hp_memberships_company_idx on public.hp_memberships(company_id);
create table public.hp_properties (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.hp_companies(id),
  name text not null,
  bedrooms integer not null check (bedrooms between 1 and 50),
  area text not null,
  is_sample boolean not null default true,
  unique(company_id, name), unique(company_id, id)
);
create table public.hp_tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.hp_companies(id),
  property_id uuid not null,
  title text not null,
  done boolean not null default false,
  foreign key (company_id, property_id) references public.hp_properties(company_id, id)
);
create index hp_tasks_company_idx on public.hp_tasks(company_id);
create table hp_private.invites (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.hp_companies(id),
  email text not null,
  role text not null check (role in ('manager','field')),
  token_hash text not null unique,
  expires_at timestamptz not null default now() + interval '7 days',
  accepted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);
create index hp_invites_company_idx on hp_private.invites(company_id);
alter table public.hp_companies enable row level security;
alter table public.hp_memberships enable row level security;
alter table public.hp_properties enable row level security;
alter table public.hp_tasks enable row level security;
alter table hp_private.invites enable row level security;
revoke all on public.hp_companies, public.hp_memberships, public.hp_properties, public.hp_tasks from public, anon, authenticated;
revoke all on hp_private.invites from public, anon, authenticated;
grant select on public.hp_companies, public.hp_memberships, public.hp_properties, public.hp_tasks to authenticated;
grant update(done) on public.hp_tasks to authenticated;

-- Privileged work is kept OUTSIDE the exposed schema. Every operation derives
-- identity from auth.uid(), never editable metadata or a client company ID.
create function hp_private.verified_user() returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare actor uuid := auth.uid();
begin
  if actor is null or not exists (
    select 1 from auth.users where id = actor and email_confirmed_at is not null
    and email is not null and not coalesce(is_anonymous, false)
    and (banned_until is null or banned_until < now())
  ) then raise exception 'Verify your email and sign in to continue.' using errcode = '42501'; end if;
  return actor;
end $$;
create function hp_private.company_id() returns uuid
language sql stable security definer set search_path = '' as $$
  select company_id from public.hp_memberships where user_id = hp_private.verified_user();
$$;
create function hp_private.member_role() returns text
language sql stable security definer set search_path = '' as $$
  select role from public.hp_memberships where user_id = hp_private.verified_user();
$$;
create policy company_read on public.hp_companies for select to authenticated using (id = (select hp_private.company_id()));
create policy team_read on public.hp_memberships for select to authenticated using (company_id = (select hp_private.company_id()));
create policy properties_read on public.hp_properties for select to authenticated using (company_id = (select hp_private.company_id()));
create policy tasks_read on public.hp_tasks for select to authenticated using (company_id = (select hp_private.company_id()));
create policy tasks_update on public.hp_tasks for update to authenticated
using (company_id = (select hp_private.company_id())) with check (company_id = (select hp_private.company_id()));

create function hp_private.create_company(company_name text, country_name text, currency_code text, time_zone text, provider text, person_name text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare actor uuid := hp_private.verified_user(); result uuid;
begin
  perform pg_advisory_xact_lock(hashtextextended(actor::text, 0));
  if exists(select 1 from public.hp_memberships where user_id = actor) then raise exception 'Your account already belongs to a company.'; end if;
  if not exists(select 1 from pg_timezone_names where name = time_zone) then raise exception 'Choose a valid timezone.'; end if;
  insert into public.hp_companies(name,country,currency,timezone,booking_provider,created_by)
  values(trim(company_name),trim(country_name),currency_code,time_zone,provider,actor) returning id into result;
  insert into public.hp_memberships(user_id,company_id,display_name,role) values(actor,result,trim(person_name),'admin');
  return result;
end $$;
create function hp_private.load_demo_portfolio() returns void
language plpgsql security definer set search_path = '' as $$
declare company uuid := hp_private.company_id(); property uuid; n integer;
begin
  if hp_private.member_role() is distinct from 'admin' then raise exception 'Only your company administrator can load samples.' using errcode = '42501'; end if;
  perform pg_advisory_xact_lock(hashtextextended(company::text, 1));
  if exists(select 1 from public.hp_properties where company_id = company) then return; end if;
  for n in 1..40 loop
    insert into public.hp_properties(company_id,name,bedrooms,area) values(company,'Demo Villa ' || lpad(n::text,2,'0'),2+n%4,'Sample neighbourhood ' || (1+n%4)) returning id into property;
    if n <= 6 then insert into public.hp_tasks(company_id,property_id,title) values(company,property,case when n%2=0 then 'Sample arrival preparation' else 'Sample pool inspection' end); end if;
  end loop;
end $$;
create function hp_private.create_team_invite(invite_email text, invite_role text) returns text
language plpgsql security definer set search_path = '' as $$
declare company uuid := hp_private.company_id(); token text := replace(gen_random_uuid()::text || gen_random_uuid()::text,'-',''); target text := lower(trim(invite_email));
begin
  if hp_private.member_role() is distinct from 'admin' then raise exception 'Only your company administrator can invite people.' using errcode = '42501'; end if;
  if invite_role not in ('manager','field') or invite_role is null then raise exception 'Choose manager or field staff.'; end if;
  if target is null or length(target) > 254 or target !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then raise exception 'Enter a valid email.'; end if;
  perform pg_advisory_xact_lock(hashtextextended(company::text,2));
  if (select count(*) from hp_private.invites where company_id=company and expires_at>now() and accepted_at is null and revoked_at is null) >= 20 then raise exception 'This test workspace allows 20 pending invitations.'; end if;
  update hp_private.invites set revoked_at=now() where company_id=company and email=target and accepted_at is null and revoked_at is null;
  insert into hp_private.invites(company_id,email,role,token_hash) values(company,target,invite_role,encode(sha256(convert_to(token,'UTF8')),'hex'));
  return token;
end $$;
create function hp_private.accept_team_invite(invitation_token text, person_name text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare actor uuid := hp_private.verified_user(); invitation hp_private.invites%rowtype; actor_email text;
begin
  perform pg_advisory_xact_lock(hashtextextended(actor::text,0));
  if invitation_token is null or length(invitation_token)<>64 then raise exception 'This invitation is invalid.'; end if;
  if exists(select 1 from public.hp_memberships where user_id=actor) then raise exception 'Your account already belongs to a company.'; end if;
  select lower(email) into actor_email from auth.users where id=actor;
  select * into invitation from hp_private.invites where token_hash=encode(sha256(convert_to(invitation_token,'UTF8')),'hex') and expires_at>now() and accepted_at is null and revoked_at is null for update;
  if invitation.id is null or invitation.email is distinct from actor_email then raise exception 'Sign in with the invited email address and a valid invitation.' using errcode='42501'; end if;
  insert into public.hp_memberships(user_id,company_id,display_name,role) values(actor,invitation.company_id,trim(person_name),invitation.role);
  update hp_private.invites set accepted_at=now() where id=invitation.id;
  return invitation.company_id;
end $$;
create function hp_private.list_team_invites() returns table(id uuid,email text,role text,expires_at timestamptz,accepted_at timestamptz,revoked_at timestamptz)
language plpgsql security definer set search_path = '' as $$
declare company uuid := hp_private.company_id();
begin
  if hp_private.member_role() is distinct from 'admin' then raise exception 'Only your company administrator can view invitations.' using errcode='42501'; end if;
  return query select i.id,i.email,i.role,i.expires_at,i.accepted_at,i.revoked_at from hp_private.invites i where i.company_id=company order by i.created_at desc limit 50;
end $$;
create function hp_private.revoke_team_invite(invitation_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare company uuid := hp_private.company_id();
begin
  if hp_private.member_role() is distinct from 'admin' then raise exception 'Only your company administrator can revoke invitations.' using errcode='42501'; end if;
  update hp_private.invites set revoked_at=now() where id=invitation_id and company_id=company and accepted_at is null;
  if not found then raise exception 'Pending invitation not found.'; end if;
end $$;

-- Exposed functions remain SECURITY INVOKER. They call guarded private routines.
create function public.hp_create_company(company_name text,country_name text,currency_code text,time_zone text,provider text,person_name text) returns uuid
language sql security invoker set search_path='' as $$ select hp_private.create_company(company_name,country_name,currency_code,time_zone,provider,person_name); $$;
create function public.hp_load_demo_portfolio() returns void language sql security invoker set search_path='' as $$ select hp_private.load_demo_portfolio(); $$;
create function public.hp_create_team_invite(invite_email text,invite_role text) returns text language sql security invoker set search_path='' as $$ select hp_private.create_team_invite(invite_email,invite_role); $$;
create function public.hp_accept_team_invite(invitation_token text,person_name text) returns uuid language sql security invoker set search_path='' as $$ select hp_private.accept_team_invite(invitation_token,person_name); $$;
create function public.hp_list_team_invites() returns table(id uuid,email text,role text,expires_at timestamptz,accepted_at timestamptz,revoked_at timestamptz)
language sql security invoker set search_path='' as $$ select * from hp_private.list_team_invites(); $$;
create function public.hp_revoke_team_invite(invitation_id uuid) returns void language sql security invoker set search_path='' as $$ select hp_private.revoke_team_invite(invitation_id); $$;
revoke all on all functions in schema hp_private from public,anon,authenticated;
grant execute on all functions in schema hp_private to authenticated;
revoke all on function public.hp_create_company(text,text,text,text,text,text), public.hp_load_demo_portfolio(), public.hp_create_team_invite(text,text), public.hp_accept_team_invite(text,text), public.hp_list_team_invites(), public.hp_revoke_team_invite(uuid) from public,anon,authenticated;
grant execute on function public.hp_create_company(text,text,text,text,text,text), public.hp_load_demo_portfolio(), public.hp_create_team_invite(text,text), public.hp_accept_team_invite(text,text), public.hp_list_team_invites(), public.hp_revoke_team_invite(uuid) to authenticated;
