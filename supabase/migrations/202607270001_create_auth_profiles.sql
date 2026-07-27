-- SkillMatch authentication and role authorization. Apply with `supabase db push`
-- or paste into the Supabase SQL editor before deploying the frontend.
create type public.user_role as enum ('student', 'company', 'admin');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role public.user_role not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  requested_role text := coalesce(new.raw_user_meta_data ->> 'role', 'student');
begin
  if requested_role not in ('student', 'company') then
    raise exception 'Only student and company accounts may self-register';
  end if;

  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    requested_role::public.user_role
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Provision administrators only through the Supabase dashboard/service role:
-- insert into public.profiles (id, email, full_name, role)
-- values ('<auth-user-id>', 'admin@example.com', 'Platform Admin', 'admin');
