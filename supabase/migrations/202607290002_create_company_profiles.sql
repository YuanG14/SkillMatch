-- Company profile: registration details, branding/links, and verification
-- status (set by SkillMatch admins, displayed read-only to the company).
-- Apply with `supabase db push` or paste into the Supabase SQL editor.
create type public.verification_status as enum ('pending', 'verified', 'rejected');
create type public.company_size_range as enum ('1-10', '11-50', '51-200', '201-500', '500+');

create table public.company_profiles (
  profile_id uuid primary key references public.profiles (id) on delete cascade,

  -- Company details
  company_name text,
  industry text,
  company_size public.company_size_range,
  headquarters_city text,
  headquarters_country text,
  about text,

  -- Branding & links
  logo_url text,
  website_url text,
  linkedin_url text,
  twitter_url text,

  -- Verification -- writable only through set_company_verification_status(),
  -- never directly by the company. Defaults every new company to pending review.
  verification_status public.verification_status not null default 'pending',
  verified_at timestamptz,

  updated_at timestamptz not null default now()
);

alter table public.company_profiles enable row level security;

create policy "Companies can read their own profile"
  on public.company_profiles for select to authenticated
  using ((select auth.uid()) = profile_id);

create policy "Companies can insert their own profile"
  on public.company_profiles for insert to authenticated
  with check (
    (select auth.uid()) = profile_id
    and exists (
      select 1 from public.profiles p where p.id = profile_id and p.role = 'company'
    )
  );

create policy "Companies can update their own profile"
  on public.company_profiles for update to authenticated
  using ((select auth.uid()) = profile_id)
  with check (
    (select auth.uid()) = profile_id
    and exists (
      select 1 from public.profiles p where p.id = profile_id and p.role = 'company'
    )
  );

-- Prevent companies from setting their own verification status: whatever a
-- company sends for these two columns is discarded and the previous value
-- is kept, regardless of RLS. Only set_company_verification_status() (below)
-- can actually change them.
create function public.lock_company_verification_fields()
returns trigger
language plpgsql
as $$
begin
  new.verification_status := old.verification_status;
  new.verified_at := old.verified_at;
  new.updated_at := now();
  return new;
end;
$$;

create trigger on_company_profile_update
  before update on public.company_profiles
  for each row execute procedure public.lock_company_verification_fields();

-- Admin-only path to change verification status. Intended for the future
-- admin verification review screen; call via the service role or an
-- authenticated admin session.
create function public.set_company_verification_status(
  target_profile_id uuid,
  new_status public.verification_status
)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  if not exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ) then
    raise exception 'Only admins may set company verification status';
  end if;

  update public.company_profiles
  set
    verification_status = new_status,
    verified_at = case when new_status = 'verified' then now() else null end,
    updated_at = now()
  where profile_id = target_profile_id;
end;
$$;
