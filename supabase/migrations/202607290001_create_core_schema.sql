-- SkillMatch core domain schema. Requires 202607270001_create_auth_profiles.sql.
-- `public.profiles` is the canonical application user record; auth.users remains
-- the source of credentials and sessions.

create type public.internship_status as enum ('draft', 'open', 'closed', 'archived');
create type public.application_status as enum ('applied', 'under_review', 'shortlisted', 'interview', 'accepted', 'rejected', 'withdrawn');
create type public.report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

create function public.has_role(expected_role public.user_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = expected_role
  );
$$;

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.student_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  headline text,
  bio text,
  location text,
  profile_completion smallint not null default 0 check (profile_completion between 0 and 100),
  updated_at timestamptz not null default now()
);

create table public.company_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  company_name text not null,
  industry text,
  website text,
  logo_url text,
  description text,
  is_verified boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.skills (
  id bigint generated always as identity primary key,
  name text not null unique,
  category text,
  created_at timestamptz not null default now()
);

create table public.student_skills (
  student_id uuid not null references public.student_profiles(user_id) on delete cascade,
  skill_id bigint not null references public.skills(id) on delete restrict,
  proficiency_level smallint not null check (proficiency_level between 1 and 5),
  created_at timestamptz not null default now(),
  primary key (student_id, skill_id)
);

create table public.internships (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.company_profiles(user_id) on delete cascade,
  title text not null,
  description text not null,
  location text,
  employment_type text,
  work_setup text,
  status public.internship_status not null default 'draft',
  application_deadline date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (application_deadline is null or application_deadline >= created_at::date)
);

create table public.internship_skills (
  internship_id uuid not null references public.internships(id) on delete cascade,
  skill_id bigint not null references public.skills(id) on delete restrict,
  is_required boolean not null default true,
  primary key (internship_id, skill_id)
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  internship_id uuid not null references public.internships(id) on delete cascade,
  student_id uuid not null references public.student_profiles(user_id) on delete cascade,
  status public.application_status not null default 'applied',
  applied_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (internship_id, student_id)
);

create table public.saved_internships (
  student_id uuid not null references public.student_profiles(user_id) on delete cascade,
  internship_id uuid not null references public.internships(id) on delete cascade,
  saved_at timestamptz not null default now(),
  primary key (student_id, internship_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  message text not null check (length(trim(message)) > 0),
  created_at timestamptz not null default now(),
  check (sender_id <> receiver_id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.education (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.student_profiles(user_id) on delete cascade,
  school text not null,
  degree text,
  field text,
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table public.experience (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.student_profiles(user_id) on delete cascade,
  title text not null,
  company text not null,
  start_date date,
  end_date date,
  description text,
  created_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.student_profiles(user_id) on delete cascade,
  title text not null,
  description text,
  link text,
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table public.certifications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.student_profiles(user_id) on delete cascade,
  name text not null,
  issuer text,
  issue_date date,
  expiry_date date,
  created_at timestamptz not null default now(),
  check (expiry_date is null or issue_date is null or expiry_date >= issue_date)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  target_id uuid,
  reason text not null,
  status public.report_status not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table public.admin_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references public.profiles(id) on delete restrict,
  action text not null,
  target_id uuid,
  created_at timestamptz not null default now()
);

create index internships_company_status_idx on public.internships(company_id, status);
create index internships_open_deadline_idx on public.internships(status, application_deadline);
create index applications_student_idx on public.applications(student_id, applied_at desc);
create index applications_internship_idx on public.applications(internship_id, status);
create index messages_participants_idx on public.messages(sender_id, receiver_id, created_at desc);
create index notifications_user_read_idx on public.notifications(user_id, is_read, created_at desc);
create index student_skills_skill_idx on public.student_skills(skill_id);
create index internship_skills_skill_idx on public.internship_skills(skill_id);
create index reports_status_idx on public.reports(status, created_at desc);

create trigger student_profiles_set_updated_at before update on public.student_profiles for each row execute procedure public.set_updated_at();
create trigger company_profiles_set_updated_at before update on public.company_profiles for each row execute procedure public.set_updated_at();
create trigger internships_set_updated_at before update on public.internships for each row execute procedure public.set_updated_at();
create trigger applications_set_updated_at before update on public.applications for each row execute procedure public.set_updated_at();

alter table public.student_profiles enable row level security;
alter table public.company_profiles enable row level security;
alter table public.skills enable row level security;
alter table public.student_skills enable row level security;
alter table public.internships enable row level security;
alter table public.internship_skills enable row level security;
alter table public.applications enable row level security;
alter table public.saved_internships enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.education enable row level security;
alter table public.experience enable row level security;
alter table public.projects enable row level security;
alter table public.certifications enable row level security;
alter table public.reports enable row level security;
alter table public.admin_logs enable row level security;

create policy "Students manage their profile" on public.student_profiles for all to authenticated using (user_id = auth.uid() or public.is_admin()) with check ((user_id = auth.uid() and public.has_role('student')) or public.is_admin());
create policy "Companies manage their profile" on public.company_profiles for all to authenticated using (user_id = auth.uid() or public.is_admin()) with check ((user_id = auth.uid() and public.has_role('company')) or public.is_admin());
create policy "Users read active companies" on public.company_profiles for select to authenticated using (user_id = auth.uid() or public.is_admin() or exists (select 1 from public.internships where internships.company_id = company_profiles.user_id and internships.status = 'open'));
create policy "Companies read applicant student profiles" on public.student_profiles for select to authenticated using (public.is_admin() or exists (select 1 from public.applications join public.internships on internships.id = applications.internship_id where applications.student_id = student_profiles.user_id and internships.company_id = auth.uid()));
create policy "Companies read applicant identities" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin() or exists (select 1 from public.applications join public.internships on internships.id = applications.internship_id where applications.student_id = profiles.id and internships.company_id = auth.uid()));
create policy "Authenticated users read skills" on public.skills for select to authenticated using (true);
create policy "Admins manage skills" on public.skills for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Students manage their skills" on public.student_skills for all to authenticated using (student_id = auth.uid() or public.is_admin()) with check ((student_id = auth.uid() and public.has_role('student')) or public.is_admin());

create policy "Users read available internships" on public.internships for select to authenticated using (status = 'open' or company_id = auth.uid() or public.is_admin());
create policy "Companies create internships" on public.internships for insert to authenticated with check (company_id = auth.uid() and public.has_role('company'));
create policy "Companies and admins update internships" on public.internships for update to authenticated using (company_id = auth.uid() or public.is_admin()) with check (company_id = auth.uid() or public.is_admin());
create policy "Companies and admins delete internships" on public.internships for delete to authenticated using (company_id = auth.uid() or public.is_admin());
create policy "Users read skills for visible internships" on public.internship_skills for select to authenticated using (exists (select 1 from public.internships where internships.id = internship_id and (internships.status = 'open' or internships.company_id = auth.uid() or public.is_admin())));
create policy "Companies manage internship skills" on public.internship_skills for all to authenticated using (exists (select 1 from public.internships where internships.id = internship_id and (internships.company_id = auth.uid() or public.is_admin()))) with check (exists (select 1 from public.internships where internships.id = internship_id and (internships.company_id = auth.uid() or public.is_admin())));

create policy "Relevant users read applications" on public.applications for select to authenticated using (student_id = auth.uid() or exists (select 1 from public.internships where internships.id = internship_id and internships.company_id = auth.uid()) or public.is_admin());
create policy "Students create applications" on public.applications for insert to authenticated with check (student_id = auth.uid() and public.has_role('student'));
create policy "Relevant users update applications" on public.applications for update to authenticated using (student_id = auth.uid() or exists (select 1 from public.internships where internships.id = internship_id and internships.company_id = auth.uid()) or public.is_admin()) with check (student_id = auth.uid() or exists (select 1 from public.internships where internships.id = internship_id and internships.company_id = auth.uid()) or public.is_admin());
create policy "Students remove saved internships" on public.saved_internships for all to authenticated using (student_id = auth.uid() or public.is_admin()) with check ((student_id = auth.uid() and public.has_role('student')) or public.is_admin());

create policy "Participants read messages" on public.messages for select to authenticated using (sender_id = auth.uid() or receiver_id = auth.uid() or public.is_admin());
create policy "Users send messages" on public.messages for insert to authenticated with check (sender_id = auth.uid());
create policy "Users read notifications" on public.notifications for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy "Users update notifications" on public.notifications for update to authenticated using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

create policy "Students manage education" on public.education for all to authenticated using (student_id = auth.uid() or public.is_admin()) with check ((student_id = auth.uid() and public.has_role('student')) or public.is_admin());
create policy "Students manage experience" on public.experience for all to authenticated using (student_id = auth.uid() or public.is_admin()) with check ((student_id = auth.uid() and public.has_role('student')) or public.is_admin());
create policy "Students manage projects" on public.projects for all to authenticated using (student_id = auth.uid() or public.is_admin()) with check ((student_id = auth.uid() and public.has_role('student')) or public.is_admin());
create policy "Students manage certifications" on public.certifications for all to authenticated using (student_id = auth.uid() or public.is_admin()) with check ((student_id = auth.uid() and public.has_role('student')) or public.is_admin());
create policy "Users submit and read reports" on public.reports for select to authenticated using (reporter_id = auth.uid() or public.is_admin());
create policy "Users submit reports" on public.reports for insert to authenticated with check (reporter_id = auth.uid());
create policy "Admins manage reports" on public.reports for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins read logs" on public.admin_logs for select to authenticated using (public.is_admin());
create policy "Admins create logs" on public.admin_logs for insert to authenticated with check (admin_id = auth.uid() and public.is_admin());
