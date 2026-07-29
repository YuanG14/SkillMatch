-- Student profile: personal info, education, location, career goals, and
-- internship preferences. One row per student, keyed 1:1 to public.profiles.
-- Apply with `supabase db push` or paste into the Supabase SQL editor.
create type public.remote_preference as enum ('remote', 'hybrid', 'onsite', 'flexible');

create table public.student_profiles (
  profile_id uuid primary key references public.profiles (id) on delete cascade,

  -- Personal info
  phone text,
  headline text,

  -- Location
  location_city text,
  location_country text,

  -- Education
  school_name text,
  degree text,
  field_of_study text,
  graduation_year smallint,

  -- Career goals
  career_goals text,

  -- Internship preferences
  preferred_roles text[] not null default '{}',
  preferred_locations text[] not null default '{}',
  remote_preference public.remote_preference,
  availability_start_date date,

  updated_at timestamptz not null default now()
);

alter table public.student_profiles enable row level security;

create policy "Students can read their own profile"
  on public.student_profiles for select to authenticated
  using ((select auth.uid()) = profile_id);

create policy "Students can insert their own profile"
  on public.student_profiles for insert to authenticated
  with check (
    (select auth.uid()) = profile_id
    and exists (
      select 1 from public.profiles p where p.id = profile_id and p.role = 'student'
    )
  );

create policy "Students can update their own profile"
  on public.student_profiles for update to authenticated
  using ((select auth.uid()) = profile_id)
  with check (
    (select auth.uid()) = profile_id
    and exists (
      select 1 from public.profiles p where p.id = profile_id and p.role = 'student'
    )
  );

create function public.set_student_profile_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_student_profile_update
  before update on public.student_profiles
  for each row execute procedure public.set_student_profile_updated_at();
