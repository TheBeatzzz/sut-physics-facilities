# Supabase setup for the SUT Physics equipment platform

This site can run in two modes:

- Prototype mode: uses browser `localStorage`; no shared database.
- Supabase mode: uses faculty login, shared PostgreSQL tables, and Supabase Storage for equipment and faculty profile photos.

## 1. Create the Supabase project

1. Go to Supabase and create a new project.
2. Open **SQL Editor**.
3. Copy the full contents of [`supabase-schema.sql`](supabase-schema.sql) and run it.

The SQL creates:

- `registry_admins` approved-faculty allowlist table
- `facilities` table
- `equipment` table
- `visitor_events` table for anonymous website visitor statistics
- `equipment-photos` storage bucket for equipment images and faculty profile pictures
- Row Level Security policies

By default, edit access is limited to authenticated users who are both:

- using an email ending with `@sut.ac.th` or `@g.sut.ac.th`;
- listed as active in `registry_admins`.

## 2. Configure authentication

In Supabase, open **Authentication → URL Configuration**.

Recommended URL settings:

- Set **Site URL** to the published admin page, not `localhost`:
  `https://thebeatzzz.github.io/sut-physics-facilities/admin.html`
- Add the same GitHub Pages admin URL to **Redirect URLs** for password recovery and invite flows:
  `https://thebeatzzz.github.io/sut-physics-facilities/admin.html`

Then open **Authentication → Providers → Email**:

- Enable Email provider.
- Keep password sign-in enabled.

If an invite link opens `localhost:3000` or shows `otp_expired`, update the URL Configuration above and send a fresh invite. Supabase invite links are one-time/short-lived and expired links cannot be reused.

If your faculty use a different email domain, edit both the `registry_admins_sut_email` constraint and the `public.is_sut_editor()` function in `supabase-schema.sql` before running it, or update them in SQL Editor.

## 3. Add approved faculty admins

After running the schema, insert the first approved registry manager directly in Supabase SQL Editor:

```sql
insert into public.registry_admins (email, full_name, role, active)
values ('faculty.name@sut.ac.th', 'Faculty Name', 'admin', true)
on conflict (email) do update set
  full_name = excluded.full_name,
  role = excluded.role,
  active = excluded.active;
```

Add one row per approved faculty member. Only active emails in this table can manage equipment records.

Both regular SUT email and Google-hosted SUT email are accepted, for example:

```sql
insert into public.registry_admins (email, full_name, role, active)
values ('faculty.name@g.sut.ac.th', 'Faculty Name', 'faculty', true);
```

Once the first admin is added, approved admins can also manage this table from Supabase SQL Editor. Do not store this list or any service-role key in the GitHub Pages website.

## 4. Faculty passwords

Recommended workflow:

1. Add the faculty email to `registry_admins`.
2. In **Supabase → Authentication → Users**, create or invite the faculty user with an initial password or password-recovery email.
3. The faculty member signs in at `admin.html` with email and password.
4. After sign-in, they can use **Change password** in the admin toolbar to set their own password.

Do not distribute shared passwords. If you must create an initial password, ask the faculty member to change it immediately after first login. The website only lets the currently signed-in faculty member update their own Supabase password.

## 5. Add project credentials to the website

Open [`supabase-config.js`](supabase-config.js) and replace:

```js
url: "https://YOUR-PROJECT-REF.supabase.co",
anonKey: "YOUR-SUPABASE-ANON-KEY",
```

Use values from **Project Settings → API**:

- Project URL, for example `https://your-project-ref.supabase.co`
- anon public key

Use the base Project URL only. Do not paste the REST endpoint ending in `/rest/v1/`.

Do not put the service-role key in this website.

## 6. Seed example records

After publishing the config:

1. Open `admin.html`.
2. Sign in with a pre-approved SUT faculty email.
3. Go to **Data & export**.
4. Click **Seed examples**.

This adds the example Physics equipment and facility records to Supabase.

## 7. Public publishing workflow

The public page shows only equipment where:

- `reviewStatus` is `Verified`
- `publicReady` is checked

Facilities are public profile records: if a facility exists in the `facilities` table, the public Facilities Map can display it even before equipment has been linked or approved.

The admin page can see all records after sign-in.

## 8. Visitor statistics

The public `index.html` and `faculty.html` pages record anonymous page views when Supabase is configured and the latest schema has been run.

The analytics record stores:

- anonymous browser session ID
- page path and title
- referrer host
- browser language, screen size, viewport size, and timezone
- optional UTM campaign fields

It does not ask visitors for names, emails, or form data. Anonymous visitors can insert page-view events only; only approved registry editors can read visitor statistics in the admin overview.

If the admin overview says visitor analytics are unavailable, rerun the latest [`supabase-schema.sql`](supabase-schema.sql) in Supabase SQL Editor and refresh the admin page.

## 9. Scopus metrics refresh

Faculty members only need to paste their Scopus author profile link in the faculty form. The website extracts the Scopus Author ID from URLs such as:

```text
https://www.scopus.com/authid/detail.uri?authorId=12345678900
```

To refresh h-index, citation count, and document count automatically, deploy the Supabase Edge Function and store the Elsevier API key as a secret:

```bash
supabase secrets set ELSEVIER_API_KEY=your-elsevier-api-key
supabase functions deploy refresh-scopus-metrics
```

Then open `admin.html`, sign in, go to **Data & export**, and click **Refresh Scopus metrics**.

The Elsevier API key is never stored in GitHub Pages JavaScript. The public faculty profile displays refreshed Scopus metrics when the Edge Function saves them to the faculty record, with the Scopus Author ID and last updated date.

Faculty members can also enter a fallback h-index and citation count in the faculty profile form. Those faculty-provided values appear on the public profile only when refreshed Scopus metrics are not available.

## Security note

`admin.html` is still a public file on GitHub Pages. That is normal for a static site. The protection is in Supabase:

- anonymous visitors cannot read draft/internal equipment rows;
- anonymous visitors can read public facility profile rows;
- anonymous visitors cannot edit records;
- only authenticated, active, pre-approved `@sut.ac.th` or `@g.sut.ac.th` users in `registry_admins` can manage records and upload photos.

If the website reports that `facility_ids` or `profile_photo` cannot be found in the faculty schema cache, rerun the latest [`supabase-schema.sql`](supabase-schema.sql) in Supabase SQL Editor. At minimum, run:

```sql
alter table if exists public.faculty
add column if not exists facility_ids jsonb not null default '[]'::jsonb;

alter table if exists public.faculty
add column if not exists profile_photo jsonb;

notify pgrst, 'reload schema';
```

## Password login troubleshooting

If a faculty member cannot sign in:

1. Confirm the user exists in **Supabase → Authentication → Users**.
2. Confirm their email is active in `public.registry_admins`.
3. Confirm the email ends with `@sut.ac.th` or `@g.sut.ac.th`.
4. If the password is unknown, send a password recovery/invite email from Supabase Dashboard or create a temporary password and ask them to change it immediately.

The site can still complete Supabase invite/recovery callbacks, but normal registry login is password-first.

If Supabase shows `email rate limit exceeded` while sending invites or recovery emails, wait for the Auth email quota to reset before sending another email. Supabase's built-in email provider has a low project-wide sending limit; for repeated faculty onboarding, either configure a custom SMTP provider in Supabase Auth or create the user with a temporary password and ask them to change it after first sign-in.

## RLS insert troubleshooting

If saving a facility or equipment record shows an error like:

```text
new row violates row-level security policy for table "facilities"
```

the signed-in user is authenticated, but Supabase does not currently evaluate them as an active registry editor. In **Supabase → SQL Editor**, run:

```sql
insert into public.registry_admins (email, full_name, role, active)
values ('panomsak@g.sut.ac.th', 'Panomsak Meemon', 'admin', true)
on conflict (email) do update set
  full_name = excluded.full_name,
  role = excluded.role,
  active = excluded.active;
```

Then rerun the latest `public.is_sut_editor()` definition from `supabase-schema.sql`, or rerun the full latest schema file. Sign out of the admin page and sign in again before retrying the save.
