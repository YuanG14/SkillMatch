import { useMemo, useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import {
  BriefcaseIcon,
  BuildingIcon,
  CheckIcon,
  ChevronDownIcon,
  CircleDashedIcon,
  FileTextIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  SearchIcon,
  StarIcon,
  TargetIcon,
} from '@/components/ui/icons'
import { cn } from '@/utils/cn'

type ApplicationStatus = 'Submitted' | 'Under Review' | 'Interview' | 'Offer' | 'Rejected'

interface Application {
  id: string
  title: string
  company: string
  location: string
  workSetup: 'Remote' | 'Hybrid' | 'On-site'
  match: number
  appliedOn: string
  status: ApplicationStatus
  nextStep?: string
  updated: string
}

const applications: Application[] = [
  {
    id: 'APP-1048',
    title: 'Frontend Developer Intern',
    company: 'Tech Solutions Inc.',
    location: 'Makati City',
    workSetup: 'Hybrid',
    match: 94,
    appliedOn: 'Aug 16, 2026',
    status: 'Interview',
    nextStep: 'Technical interview · Aug 22, 10:00 AM',
    updated: 'Updated 2 hours ago',
  },
  {
    id: 'APP-1042',
    title: 'Software Engineer Intern',
    company: 'Northbridge Systems',
    location: 'Taguig City',
    workSetup: 'On-site',
    match: 89,
    appliedOn: 'Aug 13, 2026',
    status: 'Under Review',
    nextStep: 'Application is being reviewed by the hiring team',
    updated: 'Updated yesterday',
  },
  {
    id: 'APP-1031',
    title: 'UI/UX Design Intern',
    company: 'Pixelcraft Studio',
    location: 'Pasig City',
    workSetup: 'Hybrid',
    match: 86,
    appliedOn: 'Aug 8, 2026',
    status: 'Offer',
    nextStep: 'Offer response due Aug 23, 2026',
    updated: 'Updated 1 day ago',
  },
  {
    id: 'APP-1028',
    title: 'Data Analyst Intern',
    company: 'InsightWorks PH',
    location: 'Quezon City',
    workSetup: 'Remote',
    match: 82,
    appliedOn: 'Aug 5, 2026',
    status: 'Submitted',
    nextStep: 'Waiting for company review',
    updated: 'Updated 4 days ago',
  },
  {
    id: 'APP-1014',
    title: 'Backend Developer Intern',
    company: 'Cloudline Digital',
    location: 'Quezon City',
    workSetup: 'Remote',
    match: 75,
    appliedOn: 'Jul 28, 2026',
    status: 'Rejected',
    nextStep: 'Application closed',
    updated: 'Updated Aug 4',
  },
]

const filters = ['All', 'Submitted', 'Under Review', 'Interview', 'Offer', 'Rejected'] as const
type Filter = (typeof filters)[number]

export function ApplicationsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')

  const filteredApplications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return applications.filter((application) => {
      const matchesFilter = activeFilter === 'All' || application.status === activeFilter
      const matchesQuery =
        !normalizedQuery ||
        application.title.toLowerCase().includes(normalizedQuery) ||
        application.company.toLowerCase().includes(normalizedQuery) ||
        application.id.toLowerCase().includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, query])

  const interviewCount = applications.filter((item) => item.status === 'Interview').length
  const activeCount = applications.filter((item) => !['Rejected', 'Offer'].includes(item.status)).length
  const offerCount = applications.filter((item) => item.status === 'Offer').length

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-2xl border border-primary-100 bg-surface shadow-[0_8px_30px_rgba(42,82,224,0.06)]">
        <div className="grid gap-6 px-6 py-7 xl:grid-cols-[1fr_auto] xl:items-center xl:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
              <FileTextIcon className="h-4 w-4" />
              Application tracker
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              My Applications
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600 sm:text-base">
              Track every internship application, see where you are in the hiring process, and stay on top of your next steps.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 xl:min-w-[460px]">
            <SummaryStat label="Active" value={activeCount} icon={<CircleDashedIcon className="h-4 w-4" />} />
            <SummaryStat label="Interviews" value={interviewCount} icon={<TargetIcon className="h-4 w-4" />} />
            <SummaryStat label="Offers" value={offerCount} icon={<StarIcon className="h-4 w-4" />} />
          </div>
        </div>
      </section>

      <Card className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <label className="relative w-full xl:max-w-md">
            <span className="sr-only">Search applications</span>
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search company, role, or application ID"
              className="h-11 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm text-ink-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'rounded-full border px-3.5 py-2 text-sm font-medium transition',
                  activeFilter === filter
                    ? 'border-primary-600 bg-primary-600 text-white shadow-sm'
                    : 'border-border bg-surface text-ink-700 hover:border-border-strong hover:bg-surface-muted',
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <section className="min-w-0">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900">Application activity</h2>
            <p className="mt-1 text-sm text-ink-600">
              {filteredApplications.length} {filteredApplications.length === 1 ? 'application' : 'applications'} in this view.
            </p>
          </div>
          <button className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-border bg-surface px-3.5 text-sm font-medium text-ink-700 transition hover:bg-surface-muted sm:self-auto">
            Sort: Recently updated
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="grid gap-4">
            {filteredApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        ) : (
          <Card className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <BriefcaseIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">No applications found</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-ink-600">
              Try a different search term or status filter. New applications will appear here after you apply to an internship.
            </p>
            <Button className="mt-5" onClick={() => (window.location.href = '/student/internships')}>
              Find internships
            </Button>
          </Card>
        )}
      </section>
    </div>
  )
}

function SummaryStat({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="rounded-xl border border-primary-100 bg-primary-50 p-4">
      <div className="flex items-center gap-2 text-primary-700">
        {icon}
        <p className="text-xs font-semibold">{label}</p>
      </div>
      <p className="mt-1.5 font-display text-2xl font-semibold text-ink-950">{value}</p>
    </div>
  )
}

function ApplicationCard({ application }: { application: Application }) {
  return (
    <Card interactive className="group overflow-hidden p-0">
      <div className="grid lg:grid-cols-[1fr_235px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary-100 bg-primary-50 text-primary-700">
              <BuildingIcon className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-ink-950 transition-colors group-hover:text-primary-700 sm:text-lg">
                      {application.title}
                    </h3>
                    <StatusBadge status={application.status} />
                  </div>
                  <p className="mt-1 text-sm font-medium text-ink-600">{application.company}</p>
                </div>

                <button
                  type="button"
                  aria-label="Application options"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-ink-500 transition hover:bg-surface-muted hover:text-ink-900"
                >
                  <MoreHorizontalIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-600">
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon className="h-4 w-4 text-ink-400" />
                  {application.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BriefcaseIcon className="h-4 w-4 text-ink-400" />
                  {application.workSetup}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FileTextIcon className="h-4 w-4 text-ink-400" />
                  {application.id}
                </span>
              </div>

              <div className="mt-5 rounded-xl border border-border bg-surface-muted/60 px-4 py-3.5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                    <TargetIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Next step</p>
                    <p className="mt-1 text-sm font-medium text-ink-800">{application.nextStep}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-xs text-ink-500">
                <span>Applied {application.appliedOn}</span>
                <span>{application.updated}</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col justify-between border-t border-border bg-primary-50/45 p-5 lg:border-l lg:border-t-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">SkillMatch score</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-display text-4xl font-semibold tracking-tight text-primary-700">{application.match}%</span>
              <span className="pb-1 text-sm font-medium text-ink-500">match</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-100">
              <div className="h-full rounded-full bg-primary-600" style={{ width: `${application.match}%` }} />
            </div>
            <p className="mt-2 text-xs leading-5 text-ink-600">
              {application.match >= 90
                ? 'Excellent fit for your current profile.'
                : application.match >= 80
                  ? 'Strong fit based on your skills.'
                  : 'Good opportunity to build experience.'}
            </p>
          </div>

          <div className="mt-5 grid gap-2">
            <Button className="w-full">View application</Button>
            <Button variant="secondary" className="w-full">View internship</Button>
          </div>
        </aside>
      </div>
    </Card>
  )
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const styles: Record<ApplicationStatus, string> = {
    Submitted: 'border-slate-200 bg-slate-50 text-slate-700',
    'Under Review': 'border-amber-200 bg-amber-50 text-amber-700',
    Interview: 'border-primary-200 bg-primary-50 text-primary-700',
    Offer: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    Rejected: 'border-red-200 bg-red-50 text-red-700',
  }

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold', styles[status])}>
      {status === 'Offer' && <CheckIcon className="h-3.5 w-3.5" />}
      {status}
    </span>
  )
}
