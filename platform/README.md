# HostPilotPro separate test platform

This is a standalone Vite app under `platform/`, deployed as a **new Vercel project**, with a **new Supabase project**. The parent repository remains the marketing website. No existing business backend or production database should be linked to this app.

## Implemented

- Managed email/password signup, email verification, login/logout and password recovery using Supabase Auth.
- Verified users create one company workspace, or accept an email-bound invitation.
- Country, currency, timezone and requested booking provider saved during onboarding.
- Company administrator, manager and field-staff membership roles.
- Idempotent load of 40 fictional properties and six sample tasks per company.
- Database-enforced company isolation for companies, memberships, properties and tasks.
- Task updates can modify only the completion flag; company IDs and permissions cannot be changed directly.
- Administrator-only teammate links with seven-day expiry, hashed tokens, revocation, one-time use and verified-email matching. No invitation email is sent automatically.
- Guarded privileged routines in a non-exposed schema; exposed RPCs use security invoker.

## Provisioning order

1. Confirm the Supabase organization and the quoted new-project cost.
2. Create a brand-new test project; do not branch or alter the existing operational database.
3. Keep email confirmations enabled. Configure the test site's URL and allowed `/auth/confirm` and `/reset-password` redirects. Disable anonymous sign-ins. Configure a supported SMTP sender before inviting external test users; the default mail service has limited delivery scope and rate limits.
4. Apply `supabase/migrations/20261007080641_company_foundation.sql` to the new project only. `database/schema.sql` is the identical review copy; tests require them to match.
5. Create a separate Vercel project, rooted at `platform/`. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` and `VITE_SUPABASE_PROJECT_REF` from **that new project**. Use only a modern publishable key in browser code. Never use a service-role key or a management token.
6. Deploy the platform as an isolated test deployment. Leave the marketing production branch, public signup links and existing portals unchanged.
7. Verify auth configuration and database advisors. Run isolation checks on the new project and complete a browser journey with two test companies and a verified teammate account. Local PostgreSQL tests alone do not establish that cloud configuration or email delivery is working.

## Local checks

Requires Node 24 (Vite 8).

```
npm ci --ignore-scripts
npm test
npm run build
```

Tests use an in-memory PostgreSQL engine (PGlite), exercising real grants, RLS, function guards and foreign keys. A minimal local `auth.users`/`auth.uid()` fixture supplies identity for database tests; it is not an authentication service or live Supabase Auth test. Tests cover two companies, cross-company reads/updates, anonymous and unverified access, forbidden role changes, invite email spoofing, revocation and restricted staff actions.

After project linking and environment verification, `npm run dev` binds to `127.0.0.1:5420`. Without cloud configuration the app displays a setup-pending screen rather than pretending signup works.

## Boundaries

This is the signup and company-access foundation, not a migration of the full OPS, owner or guest product. Manager/field users can view the company sample portfolio and update sample tasks; only administrators can seed samples or manage invitations. Property-specific owner permissions and stay-specific guest permissions come later.

No Hostaway, payment, advertising or messaging integrations are activated. Country selection does not activate legal/reporting support. Email sending, provider accounts, subscription billing, additional operational tables, audit logging, monitoring, backups and access revocation policies must be evaluated before a public launch. The test UI tells users to use fictional property data and is marked noindex.

Auth uses PKCE with a browser session. An email confirmation opened in a different browser can verify the account but may require a normal password login in the original app. Pending teammate tokens are stored in session storage, removed from the URL after capture, and cleared after acceptance/logout. Invitation acceptance must be deliberately confirmed by the signed-in invited person.
