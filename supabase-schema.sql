-- Supabase setup for the SUT Physics equipment platform.
-- Run this in Supabase SQL Editor, then edit `supabase-config.js` with your
-- Project URL and anon public key.

create extension if not exists pgcrypto;

create table if not exists public.registry_admins (
  email text primary key,
  full_name text,
  role text not null default 'faculty' check (role in ('faculty', 'manager', 'admin')),
  active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.registry_admins
  drop constraint if exists registry_admins_sut_email;

alter table public.registry_admins
  add constraint registry_admins_sut_email
  check (
    lower(btrim(email)) like '%@sut.ac.th'
    or lower(btrim(email)) like '%@g.sut.ac.th'
  );

create table if not exists public.facilities (
  id text primary key,
  name text not null,
  building text,
  room text,
  lead text,
  owner_email text,
  description text,
  color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faculty (
  id text primary key,
  name text not null,
  title text,
  email text,
  office text,
  phone text,
  bio text,
  research_interests jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  activities jsonb not null default '[]'::jsonb,
  recognitions jsonb not null default '[]'::jsonb,
  profile_links jsonb not null default '{}'::jsonb,
  scopus_metrics jsonb,
  manual_metrics jsonb,
  facility_ids jsonb not null default '[]'::jsonb,
  profile_photo jsonb,
  color text,
  public_ready boolean not null default true,
  owner_email text,
  sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.faculty
add column if not exists facility_ids jsonb not null default '[]'::jsonb;

alter table if exists public.faculty
add column if not exists profile_photo jsonb;

alter table if exists public.faculty
add column if not exists scopus_metrics jsonb;

alter table if exists public.faculty
add column if not exists manual_metrics jsonb;

alter table if exists public.facilities
add column if not exists owner_email text;

create table if not exists public.students (
  id text primary key,
  student_code text,
  name text not null,
  preferred_name text,
  email text,
  record_type text not null default 'physics' check (record_type in ('physics', 'sut-external')),
  level text not null default 'Bachelor' check (level in ('Bachelor', 'Master', 'PhD')),
  status text not null default 'Active' check (status in ('Active', 'Leave', 'Graduated', 'Withdrawn')),
  advisor_id text references public.faculty(id) on update cascade on delete set null,
  advisor_role text not null default 'Primary advisor' check (advisor_role in ('Primary advisor', 'Co-advisor', 'Committee member', 'Research supervisor')),
  coadvisor text,
  research_group_id text references public.facilities(id) on update cascade on delete set null,
  research_group text,
  home_school text,
  home_program text,
  project_title text,
  thesis_title text,
  start_term integer check (start_term in (1, 2, 3)),
  start_year integer,
  expected_graduation_year integer,
  graduation_year integer,
  office text,
  phone text,
  profile_photo jsonb,
  short_bio text,
  research_interests jsonb not null default '[]'::jsonb,
  skills jsonb not null default '[]'::jsonb,
  notes text,
  program_id text,
  study_progress jsonb not null default '{}'::jsonb,
  deadline_alerts_enabled boolean not null default true,
  deadline_lead_days jsonb not null default '[30, 14, 7, 1]'::jsonb,
  verification_status text not null default 'Pending' check (verification_status in ('Pending', 'Verified', 'Rejected')),
  public_ready boolean not null default false,
  verified_by_email text,
  verified_at timestamptz,
  owner_email text,
  sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.students
add column if not exists owner_email text;

alter table if exists public.students
add column if not exists profile_photo jsonb;

alter table if exists public.students
add column if not exists record_type text not null default 'physics';

alter table if exists public.students
add column if not exists advisor_role text not null default 'Primary advisor';

alter table if exists public.students
add column if not exists home_school text;

alter table if exists public.students
add column if not exists home_program text;

alter table if exists public.students
add column if not exists skills jsonb not null default '[]'::jsonb;

alter table if exists public.students
add column if not exists research_interests jsonb not null default '[]'::jsonb;

alter table if exists public.students
alter column research_interests set default '[]'::jsonb;

update public.students
set research_interests = '[]'::jsonb
where research_interests is null;

alter table if exists public.students
alter column research_interests set not null;

alter table public.students
  drop constraint if exists students_research_interests_limit;

alter table public.students
  add constraint students_research_interests_limit
  check (jsonb_typeof(research_interests) = 'array' and jsonb_array_length(research_interests) <= 5);

alter table if exists public.students
add column if not exists research_group_id text references public.facilities(id) on update cascade on delete set null;

alter table if exists public.students
add column if not exists short_bio text;

alter table if exists public.students
alter column short_bio type text;

alter table if exists public.students
add column if not exists program_id text;

alter table if exists public.students
add column if not exists study_progress jsonb not null default '{}'::jsonb;

alter table if exists public.students
add column if not exists deadline_alerts_enabled boolean not null default true;

alter table if exists public.students
add column if not exists deadline_lead_days jsonb not null default '[30, 14, 7, 1]'::jsonb;

alter table if exists public.students
add column if not exists verification_status text not null default 'Pending';

alter table if exists public.students
add column if not exists public_ready boolean not null default false;

alter table if exists public.students
add column if not exists verified_by_email text;

alter table if exists public.students
add column if not exists verified_at timestamptz;

alter table if exists public.students
add column if not exists start_term integer;

alter table public.students
  drop constraint if exists students_start_term_check;

alter table public.students
  add constraint students_start_term_check
  check (start_term is null or start_term in (1, 2, 3));

alter table public.students
  drop constraint if exists students_record_type_check;

alter table public.students
  add constraint students_record_type_check
  check (record_type in ('physics', 'sut-external'));

alter table public.students
  drop constraint if exists students_advisor_role_check;

alter table public.students
  add constraint students_advisor_role_check
  check (advisor_role in ('Primary advisor', 'Co-advisor', 'Committee member', 'Research supervisor'));

alter table public.students
  drop constraint if exists students_verification_status_check;

alter table public.students
  add constraint students_verification_status_check
  check (verification_status in ('Pending', 'Verified', 'Rejected'));

alter table public.students
  drop constraint if exists students_level_check;

update public.students
set level = 'Bachelor'
where level = 'Undergraduate';

alter table public.students
  add constraint students_level_check
  check (level in ('Bachelor', 'Master', 'PhD'));

alter table public.students
  drop constraint if exists students_program_id_check;

alter table public.students
  add constraint students_program_id_check
  check (
    program_id is null
    or program_id in ('bsc-physics', 'msc-physics', 'msc-applied-physics', 'phd-physics', 'phd-applied-physics')
  );

create table if not exists public.equipment (
  id text primary key,
  name text not null,
  asset_code text,
  manufacturer text,
  model text,
  category text,
  description varchar(800),
  facility_id text references public.facilities(id) on update cascade on delete set null,
  room text,
  custodian text,
  email text,
  research_group text,
  acquisition_year integer,
  status text not null default 'Operational',
  access text not null default 'Shared by arrangement',
  last_maintenance date,
  next_maintenance date,
  safety text,
  public_ready boolean not null default false,
  review_status text not null default 'Draft' check (review_status in ('Draft', 'Submitted', 'Verified')),
  submitter_name text,
  submitter_email text,
  owner_email text,
  submitter_notes text,
  feature_photo jsonb,
  gallery jsonb not null default '[]'::jsonb,
  sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.equipment
add column if not exists owner_email text;

create table if not exists public.services (
  id text primary key,
  title text not null,
  category text not null default 'workshops' check (category in ('certified-measurements', 'short-courses', 'workshops', 'stem')),
  summary varchar(320),
  details text,
  audience text,
  duration text,
  schedule text,
  fee text,
  location text,
  contact_name text,
  contact_email text,
  faculty_id text references public.faculty(id) on update cascade on delete set null,
  owner_email text,
  public_ready boolean not null default false,
  review_status text not null default 'Draft' check (review_status in ('Draft', 'Submitted', 'Verified')),
  submitter_notes text,
  sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.services
add column if not exists owner_email text;

create index if not exists equipment_public_idx
  on public.equipment (review_status, public_ready);

create index if not exists equipment_facility_idx
  on public.equipment (facility_id);

create index if not exists faculty_public_idx
  on public.faculty (public_ready);

create index if not exists faculty_owner_email_idx
  on public.faculty (lower(owner_email));

create index if not exists students_status_idx
  on public.students (status, level);

create index if not exists students_program_idx
  on public.students (program_id);

create index if not exists students_verification_idx
  on public.students (verification_status, updated_at desc);

create index if not exists students_public_idx
  on public.students (verification_status, public_ready, level, program_id);

create index if not exists students_advisor_idx
  on public.students (advisor_id);

create index if not exists students_research_group_idx
  on public.students (research_group_id);

create index if not exists students_owner_email_idx
  on public.students (lower(owner_email));

create index if not exists students_email_idx
  on public.students (lower(email));

create index if not exists facilities_owner_email_idx
  on public.facilities (lower(owner_email));

create index if not exists equipment_owner_email_idx
  on public.equipment (lower(owner_email));

create index if not exists services_public_idx
  on public.services (review_status, public_ready);

create index if not exists services_owner_email_idx
  on public.services (lower(owner_email));

create index if not exists services_faculty_idx
  on public.services (faculty_id);

create table if not exists public.visitor_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null default 'page_view' check (event_name in ('page_view')),
  session_id text not null,
  page_path text not null,
  page_title text,
  page_referrer text,
  page_host text,
  user_agent text,
  language text,
  screen_width integer,
  screen_height integer,
  viewport_width integer,
  viewport_height integer,
  timezone text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz not null default now()
);

create index if not exists visitor_events_created_idx
  on public.visitor_events (created_at desc);

create index if not exists visitor_events_page_idx
  on public.visitor_events (page_path);

create index if not exists visitor_events_session_idx
  on public.visitor_events (session_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists facilities_set_updated_at on public.facilities;
create trigger facilities_set_updated_at
before update on public.facilities
for each row execute function public.set_updated_at();

drop trigger if exists equipment_set_updated_at on public.equipment;
create trigger equipment_set_updated_at
before update on public.equipment
for each row execute function public.set_updated_at();

drop trigger if exists faculty_set_updated_at on public.faculty;
create trigger faculty_set_updated_at
before update on public.faculty
for each row execute function public.set_updated_at();

drop trigger if exists students_set_updated_at on public.students;
create trigger students_set_updated_at
before update on public.students
for each row execute function public.set_updated_at();

drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists registry_admins_set_updated_at on public.registry_admins;
create trigger registry_admins_set_updated_at
before update on public.registry_admins
for each row execute function public.set_updated_at();

create or replace function public.is_sut_editor()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  with current_identity as (
    select lower(btrim(coalesce(
      nullif(auth.jwt() ->> 'email', ''),
      nullif(auth.jwt() -> 'user_metadata' ->> 'email', ''),
      ''
    ))) as email
  )
  select exists (
    select 1
    from public.registry_admins
    cross join current_identity
    where lower(btrim(registry_admins.email)) = current_identity.email
      and registry_admins.active = true
      and (
        current_identity.email like '%@sut.ac.th'
        or current_identity.email like '%@g.sut.ac.th'
      )
  );
$$;

revoke all on function public.is_sut_editor() from public;
grant execute on function public.is_sut_editor() to anon, authenticated;

create or replace function public.is_facility_owner(target_owner_email text, target_lead text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  with current_identity as (
    select lower(btrim(coalesce(
      nullif(auth.jwt() ->> 'email', ''),
      nullif(auth.jwt() -> 'user_metadata' ->> 'email', ''),
      ''
    ))) as email
  )
  select exists (
    select 1
    from public.faculty
    cross join current_identity
    where (
        lower(btrim(coalesce(faculty.owner_email, ''))) = current_identity.email
        or lower(btrim(coalesce(faculty.email, ''))) = current_identity.email
      )
      and (
        current_identity.email like '%@sut.ac.th'
        or current_identity.email like '%@g.sut.ac.th'
      )
      and (
        lower(btrim(coalesce(target_owner_email, ''))) = current_identity.email
        or lower(btrim(coalesce(target_lead, ''))) = lower(btrim(coalesce(faculty.name, '')))
      )
  );
$$;

revoke all on function public.is_facility_owner(text, text) from public;
grant execute on function public.is_facility_owner(text, text) to anon, authenticated;

create or replace function public.is_faculty_profile_owner(target_owner_email text, target_email text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  with current_identity as (
    select lower(btrim(coalesce(
      nullif(auth.jwt() ->> 'email', ''),
      nullif(auth.jwt() -> 'user_metadata' ->> 'email', ''),
      ''
    ))) as email
  )
  select exists (
    select 1
    from current_identity
    where (
        lower(btrim(coalesce(target_owner_email, ''))) = current_identity.email
        or lower(btrim(coalesce(target_email, ''))) = current_identity.email
      )
      and (
        current_identity.email like '%@sut.ac.th'
        or current_identity.email like '%@g.sut.ac.th'
      )
  );
$$;

revoke all on function public.is_faculty_profile_owner(text, text) from public;
grant execute on function public.is_faculty_profile_owner(text, text) to anon, authenticated;

create or replace function public.current_sut_email()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select lower(btrim(coalesce(
    nullif(auth.jwt() ->> 'email', ''),
    nullif(auth.jwt() -> 'user_metadata' ->> 'email', ''),
    ''
  )));
$$;

revoke all on function public.current_sut_email() from public;
grant execute on function public.current_sut_email() to anon, authenticated;

create or replace function public.is_registered_sut_faculty()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  with current_identity as (
    select public.current_sut_email() as email
  )
  select public.is_sut_editor()
  or exists (
    select 1
    from public.faculty
    cross join current_identity
    where (
        lower(btrim(coalesce(faculty.owner_email, ''))) = current_identity.email
        or lower(btrim(coalesce(faculty.email, ''))) = current_identity.email
      )
      and (
        current_identity.email like '%@sut.ac.th'
        or current_identity.email like '%@g.sut.ac.th'
      )
  );
$$;

revoke all on function public.is_registered_sut_faculty() from public;
grant execute on function public.is_registered_sut_faculty() to anon, authenticated;

create or replace function public.is_student_self(target_owner_email text, target_email text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  with current_identity as (
    select public.current_sut_email() as email
  )
  select exists (
    select 1
    from current_identity
    where (
        lower(btrim(coalesce(target_owner_email, ''))) = current_identity.email
        or lower(btrim(coalesce(target_email, ''))) = current_identity.email
      )
      and (
        current_identity.email like '%@sut.ac.th'
        or current_identity.email like '%@g.sut.ac.th'
      )
  );
$$;

revoke all on function public.is_student_self(text, text) from public;
grant execute on function public.is_student_self(text, text) to anon, authenticated;

create or replace function public.is_student_owner(target_owner_email text, target_email text, target_advisor_id text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  with current_identity as (
    select lower(btrim(coalesce(
      nullif(auth.jwt() ->> 'email', ''),
      nullif(auth.jwt() -> 'user_metadata' ->> 'email', ''),
      ''
    ))) as email
  )
  select exists (
    select 1
    from current_identity
    where (
        lower(btrim(coalesce(target_owner_email, ''))) = current_identity.email
        or lower(btrim(coalesce(target_email, ''))) = current_identity.email
      )
      and (
        current_identity.email like '%@sut.ac.th'
        or current_identity.email like '%@g.sut.ac.th'
      )
  )
  or exists (
    select 1
    from public.faculty
    cross join current_identity
    where (
        lower(btrim(coalesce(faculty.owner_email, ''))) = current_identity.email
        or lower(btrim(coalesce(faculty.email, ''))) = current_identity.email
      )
      and btrim(coalesce(target_advisor_id, '')) = btrim(coalesce(faculty.id, ''))
      and (
        current_identity.email like '%@sut.ac.th'
        or current_identity.email like '%@g.sut.ac.th'
      )
  );
$$;

revoke all on function public.is_student_owner(text, text, text) from public;
grant execute on function public.is_student_owner(text, text, text) to anon, authenticated;

create or replace function public.protect_student_verification_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  current_email text := public.current_sut_email();
  faculty_editor boolean := public.is_registered_sut_faculty();
begin
  if faculty_editor then
    if new.verification_status = 'Verified' and (tg_op = 'INSERT' or old.verification_status is distinct from 'Verified') then
      new.verified_by_email := coalesce(nullif(new.verified_by_email, ''), current_email);
      new.verified_at := coalesce(new.verified_at, now());
    elsif new.verification_status is distinct from 'Verified' then
      new.verified_at := case when new.verification_status = 'Pending' then null else new.verified_at end;
    end if;
    return new;
  end if;

  if tg_op = 'INSERT' then
    if not public.is_student_self(coalesce(new.owner_email, current_email), coalesce(new.email, current_email)) then
      raise exception 'Student records must use the signed-in student email.';
    end if;
    new.owner_email := coalesce(nullif(new.owner_email, ''), current_email);
    new.email := coalesce(nullif(new.email, ''), current_email);
    new.verification_status := 'Pending';
    new.verified_by_email := null;
    new.verified_at := null;
    return new;
  end if;

  new.owner_email := old.owner_email;
  new.email := old.email;
  new.verification_status := old.verification_status;
  new.verified_by_email := old.verified_by_email;
  new.verified_at := old.verified_at;
  return new;
end;
$$;

revoke all on function public.protect_student_verification_fields() from public;
grant execute on function public.protect_student_verification_fields() to authenticated;

drop trigger if exists students_protect_verification on public.students;
create trigger students_protect_verification
before insert or update on public.students
for each row execute function public.protect_student_verification_fields();

create or replace function public.is_equipment_owner(target_owner_email text, target_email text, target_submitter_email text, target_custodian text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  with current_identity as (
    select lower(btrim(coalesce(
      nullif(auth.jwt() ->> 'email', ''),
      nullif(auth.jwt() -> 'user_metadata' ->> 'email', ''),
      ''
    ))) as email
  )
  select exists (
    select 1
    from public.faculty
    cross join current_identity
    where (
        lower(btrim(coalesce(faculty.owner_email, ''))) = current_identity.email
        or lower(btrim(coalesce(faculty.email, ''))) = current_identity.email
      )
      and (
        current_identity.email like '%@sut.ac.th'
        or current_identity.email like '%@g.sut.ac.th'
      )
      and (
        lower(btrim(coalesce(target_owner_email, ''))) = current_identity.email
        or lower(btrim(coalesce(target_email, ''))) = current_identity.email
        or lower(btrim(coalesce(target_submitter_email, ''))) = current_identity.email
        or lower(btrim(coalesce(target_custodian, ''))) = lower(btrim(coalesce(faculty.name, '')))
      )
  );
$$;

revoke all on function public.is_equipment_owner(text, text, text, text) from public;
grant execute on function public.is_equipment_owner(text, text, text, text) to anon, authenticated;

create or replace function public.is_service_owner(target_owner_email text, target_contact_email text, target_contact_name text, target_faculty_id text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  with current_identity as (
    select lower(btrim(coalesce(
      nullif(auth.jwt() ->> 'email', ''),
      nullif(auth.jwt() -> 'user_metadata' ->> 'email', ''),
      ''
    ))) as email
  )
  select exists (
    select 1
    from public.faculty
    cross join current_identity
    where (
        lower(btrim(coalesce(faculty.owner_email, ''))) = current_identity.email
        or lower(btrim(coalesce(faculty.email, ''))) = current_identity.email
      )
      and (
        current_identity.email like '%@sut.ac.th'
        or current_identity.email like '%@g.sut.ac.th'
      )
      and (
        lower(btrim(coalesce(target_owner_email, ''))) = current_identity.email
        or lower(btrim(coalesce(target_contact_email, ''))) = current_identity.email
        or lower(btrim(coalesce(target_contact_name, ''))) = lower(btrim(coalesce(faculty.name, '')))
        or btrim(coalesce(target_faculty_id, '')) = btrim(coalesce(faculty.id, ''))
      )
  );
$$;

revoke all on function public.is_service_owner(text, text, text, text) from public;
grant execute on function public.is_service_owner(text, text, text, text) to anon, authenticated;

alter table public.registry_admins enable row level security;
alter table public.facilities enable row level security;
alter table public.faculty enable row level security;
alter table public.students enable row level security;
alter table public.equipment enable row level security;
alter table public.services enable row level security;
alter table public.visitor_events enable row level security;

drop policy if exists "Approved admins can read admin list" on public.registry_admins;
create policy "Approved admins can read admin list"
on public.registry_admins for select
to authenticated
using (public.is_sut_editor());

drop policy if exists "Approved admins can manage admin list" on public.registry_admins;
create policy "Approved admins can manage admin list"
on public.registry_admins for all
to authenticated
using (public.is_sut_editor())
with check (public.is_sut_editor());

drop policy if exists "Public can read facilities" on public.facilities;
create policy "Public can read facilities"
on public.facilities for select
to anon, authenticated
using (true);

drop policy if exists "SUT editors can read all facilities" on public.facilities;
create policy "SUT editors can read all facilities"
on public.facilities for select
to authenticated
using (public.is_sut_editor());

drop policy if exists "SUT editors can manage facilities" on public.facilities;
create policy "SUT editors can manage facilities"
on public.facilities for all
to authenticated
using (public.is_sut_editor())
with check (public.is_sut_editor());

drop policy if exists "Registered SUT faculty can insert facilities" on public.facilities;
create policy "Registered SUT faculty can insert facilities"
on public.facilities for insert
to authenticated
with check (public.is_sut_editor() or public.is_facility_owner(owner_email, lead));

drop policy if exists "Registered SUT faculty can update owned facilities" on public.facilities;
create policy "Registered SUT faculty can update owned facilities"
on public.facilities for update
to authenticated
using (public.is_facility_owner(owner_email, lead))
with check (public.is_facility_owner(owner_email, lead));

drop policy if exists "Registered SUT faculty can delete owned facilities" on public.facilities;
create policy "Registered SUT faculty can delete owned facilities"
on public.facilities for delete
to authenticated
using (public.is_facility_owner(owner_email, lead));

drop policy if exists "Public can read public faculty profiles" on public.faculty;
create policy "Public can read public faculty profiles"
on public.faculty for select
to anon, authenticated
using (public_ready = true);

drop policy if exists "SUT editors can read all faculty profiles" on public.faculty;
create policy "SUT editors can read all faculty profiles"
on public.faculty for select
to authenticated
using (public.is_sut_editor());

drop policy if exists "SUT editors can manage faculty profiles" on public.faculty;
create policy "SUT editors can manage faculty profiles"
on public.faculty for all
to authenticated
using (public.is_sut_editor())
with check (public.is_sut_editor());

drop policy if exists "Faculty can read own faculty profile" on public.faculty;
create policy "Faculty can read own faculty profile"
on public.faculty for select
to authenticated
using (public.is_faculty_profile_owner(owner_email, email));

drop policy if exists "Faculty can insert own faculty profile" on public.faculty;
create policy "Faculty can insert own faculty profile"
on public.faculty for insert
to authenticated
with check (public.is_faculty_profile_owner(owner_email, email));

drop policy if exists "Faculty can update own faculty profile" on public.faculty;
create policy "Faculty can update own faculty profile"
on public.faculty for update
to authenticated
using (public.is_faculty_profile_owner(owner_email, email))
with check (public.is_faculty_profile_owner(owner_email, email));

drop policy if exists "SUT editors can read all students" on public.students;
create policy "SUT editors can read all students"
on public.students for select
to authenticated
using (public.is_sut_editor());

drop policy if exists "SUT editors can manage students" on public.students;
create policy "SUT editors can manage students"
on public.students for all
to authenticated
using (public.is_sut_editor())
with check (public.is_sut_editor());

drop policy if exists "Public can read verified public students" on public.students;
create policy "Public can read verified public students"
on public.students for select
to anon, authenticated
using (verification_status = 'Verified' and public_ready = true);

drop policy if exists "Owners and advisors can read students" on public.students;
drop policy if exists "Owners and advisors can insert students" on public.students;
drop policy if exists "Owners and advisors can update students" on public.students;
drop policy if exists "Owners and advisors can delete students" on public.students;

drop policy if exists "Registered faculty can read all students" on public.students;
create policy "Registered faculty can read all students"
on public.students for select
to authenticated
using (public.is_registered_sut_faculty());

drop policy if exists "Registered faculty can update students" on public.students;
create policy "Registered faculty can update students"
on public.students for update
to authenticated
using (public.is_registered_sut_faculty())
with check (public.is_registered_sut_faculty());

drop policy if exists "Students can read own student record" on public.students;
create policy "Students can read own student record"
on public.students for select
to authenticated
using (public.is_student_self(owner_email, email));

drop policy if exists "Students can create own pending student record" on public.students;
create policy "Students can create own pending student record"
on public.students for insert
to authenticated
with check (public.is_student_self(owner_email, email));

drop policy if exists "Students can update own student record" on public.students;
create policy "Students can update own student record"
on public.students for update
to authenticated
using (public.is_student_self(owner_email, email))
with check (public.is_student_self(owner_email, email));

drop policy if exists "Students can delete own unverified student record" on public.students;
create policy "Students can delete own unverified student record"
on public.students for delete
to authenticated
using (public.is_student_self(owner_email, email) and verification_status <> 'Verified');

drop policy if exists "Public can read approved equipment" on public.equipment;
create policy "Public can read approved equipment"
on public.equipment for select
to anon, authenticated
using (review_status = 'Verified' and public_ready = true);

drop policy if exists "SUT editors can read all equipment" on public.equipment;
create policy "SUT editors can read all equipment"
on public.equipment for select
to authenticated
using (public.is_sut_editor());

drop policy if exists "SUT editors can insert equipment" on public.equipment;
create policy "SUT editors can insert equipment"
on public.equipment for insert
to authenticated
with check (public.is_sut_editor());

drop policy if exists "Faculty can read owned equipment" on public.equipment;
create policy "Faculty can read owned equipment"
on public.equipment for select
to authenticated
using (public.is_equipment_owner(owner_email, email, submitter_email, custodian));

drop policy if exists "Faculty can insert owned equipment" on public.equipment;
create policy "Faculty can insert owned equipment"
on public.equipment for insert
to authenticated
with check (public.is_equipment_owner(owner_email, email, submitter_email, custodian));

drop policy if exists "SUT editors can update equipment" on public.equipment;
create policy "SUT editors can update equipment"
on public.equipment for update
to authenticated
using (public.is_sut_editor())
with check (public.is_sut_editor());

drop policy if exists "Faculty can update owned equipment" on public.equipment;
create policy "Faculty can update owned equipment"
on public.equipment for update
to authenticated
using (public.is_equipment_owner(owner_email, email, submitter_email, custodian))
with check (public.is_equipment_owner(owner_email, email, submitter_email, custodian));

drop policy if exists "SUT editors can delete equipment" on public.equipment;
create policy "SUT editors can delete equipment"
on public.equipment for delete
to authenticated
using (public.is_sut_editor());

drop policy if exists "Faculty can delete owned equipment" on public.equipment;
create policy "Faculty can delete owned equipment"
on public.equipment for delete
to authenticated
using (public.is_equipment_owner(owner_email, email, submitter_email, custodian));

drop policy if exists "Public can read approved services" on public.services;
create policy "Public can read approved services"
on public.services for select
to anon, authenticated
using (review_status = 'Verified' and public_ready = true);

drop policy if exists "SUT editors can read all services" on public.services;
create policy "SUT editors can read all services"
on public.services for select
to authenticated
using (public.is_sut_editor());

drop policy if exists "SUT editors can manage services" on public.services;
create policy "SUT editors can manage services"
on public.services for all
to authenticated
using (public.is_sut_editor())
with check (public.is_sut_editor());

drop policy if exists "Faculty can read owned services" on public.services;
create policy "Faculty can read owned services"
on public.services for select
to authenticated
using (public.is_service_owner(owner_email, contact_email, contact_name, faculty_id));

drop policy if exists "Faculty can insert owned services" on public.services;
create policy "Faculty can insert owned services"
on public.services for insert
to authenticated
with check (public.is_service_owner(owner_email, contact_email, contact_name, faculty_id));

drop policy if exists "Faculty can update owned services" on public.services;
create policy "Faculty can update owned services"
on public.services for update
to authenticated
using (public.is_service_owner(owner_email, contact_email, contact_name, faculty_id))
with check (public.is_service_owner(owner_email, contact_email, contact_name, faculty_id));

drop policy if exists "Faculty can delete owned services" on public.services;
create policy "Faculty can delete owned services"
on public.services for delete
to authenticated
using (public.is_service_owner(owner_email, contact_email, contact_name, faculty_id));

drop policy if exists "Public can insert visitor analytics" on public.visitor_events;
create policy "Public can insert visitor analytics"
on public.visitor_events for insert
to anon, authenticated
with check (
  event_name = 'page_view'
  and length(session_id) between 8 and 120
  and length(page_path) between 1 and 500
);

drop policy if exists "SUT editors can read visitor analytics" on public.visitor_events;
create policy "SUT editors can read visitor analytics"
on public.visitor_events for select
to authenticated
using (public.is_sut_editor());

drop policy if exists "SUT editors can delete visitor analytics" on public.visitor_events;
create policy "SUT editors can delete visitor analytics"
on public.visitor_events for delete
to authenticated
using (public.is_sut_editor());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'equipment-photos',
  'equipment-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read equipment photos" on storage.objects;
create policy "Public can read equipment photos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'equipment-photos');

drop policy if exists "SUT editors can upload equipment photos" on storage.objects;
create policy "SUT editors can upload equipment photos"
on storage.objects for insert
to authenticated
with check (bucket_id = 'equipment-photos' and public.is_sut_editor());

drop policy if exists "Faculty can upload owned equipment photos" on storage.objects;
create policy "Faculty can upload owned equipment photos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'equipment-photos'
  and (
    public.is_sut_editor()
    or exists (
      select 1
      from public.faculty
      where public.is_faculty_profile_owner(faculty.owner_email, faculty.email)
    )
  )
);

drop policy if exists "SUT editors can update equipment photos" on storage.objects;
create policy "SUT editors can update equipment photos"
on storage.objects for update
to authenticated
using (bucket_id = 'equipment-photos' and public.is_sut_editor())
with check (bucket_id = 'equipment-photos' and public.is_sut_editor());

drop policy if exists "Faculty can update owned equipment photos" on storage.objects;
create policy "Faculty can update owned equipment photos"
on storage.objects for update
to authenticated
using (
  bucket_id = 'equipment-photos'
  and (
    public.is_sut_editor()
    or public.is_equipment_owner(
      (select equipment.owner_email from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1)),
      (select equipment.email from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1)),
      (select equipment.submitter_email from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1)),
      (select equipment.custodian from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1))
    )
    or public.is_faculty_profile_owner(
      (select faculty.owner_email from public.faculty where faculty.id = split_part(storage.objects.name, '/', 2)),
      (select faculty.email from public.faculty where faculty.id = split_part(storage.objects.name, '/', 2))
    )
  )
)
with check (
  bucket_id = 'equipment-photos'
  and (
    public.is_sut_editor()
    or public.is_equipment_owner(
      (select equipment.owner_email from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1)),
      (select equipment.email from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1)),
      (select equipment.submitter_email from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1)),
      (select equipment.custodian from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1))
    )
    or public.is_faculty_profile_owner(
      (select faculty.owner_email from public.faculty where faculty.id = split_part(storage.objects.name, '/', 2)),
      (select faculty.email from public.faculty where faculty.id = split_part(storage.objects.name, '/', 2))
    )
  )
);

drop policy if exists "SUT editors can delete equipment photos" on storage.objects;
create policy "SUT editors can delete equipment photos"
on storage.objects for delete
to authenticated
using (bucket_id = 'equipment-photos' and public.is_sut_editor());

drop policy if exists "Faculty can delete owned equipment photos" on storage.objects;
create policy "Faculty can delete owned equipment photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'equipment-photos'
  and (
    public.is_sut_editor()
    or public.is_equipment_owner(
      (select equipment.owner_email from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1)),
      (select equipment.email from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1)),
      (select equipment.submitter_email from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1)),
      (select equipment.custodian from public.equipment where equipment.id = split_part(storage.objects.name, '/', 1))
    )
    or public.is_faculty_profile_owner(
      (select faculty.owner_email from public.faculty where faculty.id = split_part(storage.objects.name, '/', 2)),
      (select faculty.email from public.faculty where faculty.id = split_part(storage.objects.name, '/', 2))
    )
  )
);

drop policy if exists "Students can upload own profile photos" on storage.objects;
create policy "Students can upload own profile photos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'equipment-photos'
  and split_part(storage.objects.name, '/', 1) = 'students'
  and public.is_student_self(
    (select students.owner_email from public.students where students.id = split_part(storage.objects.name, '/', 2)),
    (select students.email from public.students where students.id = split_part(storage.objects.name, '/', 2))
  )
);

drop policy if exists "Students can update own profile photos" on storage.objects;
create policy "Students can update own profile photos"
on storage.objects for update
to authenticated
using (
  bucket_id = 'equipment-photos'
  and split_part(storage.objects.name, '/', 1) = 'students'
  and public.is_student_self(
    (select students.owner_email from public.students where students.id = split_part(storage.objects.name, '/', 2)),
    (select students.email from public.students where students.id = split_part(storage.objects.name, '/', 2))
  )
)
with check (
  bucket_id = 'equipment-photos'
  and split_part(storage.objects.name, '/', 1) = 'students'
  and public.is_student_self(
    (select students.owner_email from public.students where students.id = split_part(storage.objects.name, '/', 2)),
    (select students.email from public.students where students.id = split_part(storage.objects.name, '/', 2))
  )
);

drop policy if exists "Students can delete own profile photos" on storage.objects;
create policy "Students can delete own profile photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'equipment-photos'
  and split_part(storage.objects.name, '/', 1) = 'students'
  and public.is_student_self(
    (select students.owner_email from public.students where students.id = split_part(storage.objects.name, '/', 2)),
    (select students.email from public.students where students.id = split_part(storage.objects.name, '/', 2))
  )
);

notify pgrst, 'reload schema';
