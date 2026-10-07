create index hp_tasks_company_property_idx on public.hp_tasks(company_id,property_id);
create policy invites_no_direct_client_access on hp_private.invites for all to authenticated using (false) with check (false);
