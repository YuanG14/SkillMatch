import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { MatchRing } from '@/components/ui/MatchRing'
import {
  BookmarkIcon,
  BriefcaseIcon,
  BuildingIcon,
  ChevronDownIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  TargetIcon,
} from '@/components/ui/icons'
import { cn } from '@/utils/cn'

interface InternshipListing {
  id: string
  title: string
  company: string
  location: string
  workSetup: 'Remote' | 'Hybrid' | 'On-site'
  type: 'Internship' | 'Part-time'
  match: number
  posted: string
  skills: string[]
  description: string
  saved: boolean
  featured?: boolean
}

const listings: InternshipListing[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'Tech Solutions Inc.',
    location: 'Makati City',
    workSetup: 'Hybrid',
    type: 'Internship',
    match: 94,
    posted: '2 hours ago',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    description: 'Build responsive product experiences and collaborate with designers and senior engineers.',
    saved: false,
    featured: true,
  },
  {
    id: '2',
    title: 'Software Engineer Intern',
    company: 'Northbridge Systems',
    location: 'Taguig City',
    workSetup: 'On-site',
    type: 'Internship',
    match: 89,
    posted: '5 hours ago',
    skills: ['Java', 'SQL', 'Git'],
    description: 'Work on internal tools, APIs, and real production features with a collaborative engineering team.',
    saved: true,
  },
  {
    id: '3',
    title: 'UI/UX Design Intern',
    company: 'Creative Studio',
    location: 'Metro Manila',
    workSetup: 'Remote',
    type: 'Internship',
    match: 86,
    posted: '1 day ago',
    skills: ['Figma', 'UI Design', 'Prototyping'],
    description: 'Turn product ideas into polished interfaces, prototypes, and reusable design system patterns.',
    saved: false,
  },
  {
    id: '4',
    title: 'Data Analyst Intern',
    company: 'DataWorks PH',
    location: 'Pasig City',
    workSetup: 'Hybrid',
    type: 'Internship',
    match: 82,
    posted: '1 day ago',
    skills: ['Python', 'Excel', 'Power BI'],
    description: 'Clean datasets, build reports, and help the analytics team surface useful business insights.',
    saved: false,
  },
  {
    id: '5',
    title: 'QA Automation Intern',
    company: 'Bright Path Labs',
    location: 'Muntinlupa City',
    workSetup: 'Hybrid',
    type: 'Internship',
    match: 78,
    posted: '2 days ago',
    skills: ['Testing', 'JavaScript', 'Selenium'],
    description: 'Help improve release quality through manual testing, test cases, and simple automation scripts.',
    saved: false,
  },
  {
    id: '6',
    title: 'Backend Developer Intern',
    company: 'Cloudline Digital',
    location: 'Quezon City',
    workSetup: 'Remote',
    type: 'Part-time',
    match: 75,
    posted: '3 days ago',
    skills: ['Node.js', 'REST API', 'PostgreSQL'],
    description: 'Support API development and learn how backend services are designed, tested, and deployed.',
    saved: false,
  },
]

const quickFilters = ['Best Match', 'Remote', 'Hybrid', 'Newly Posted']

export function FindInternshipsPage() {
  const [query, setQuery] = useState('')
  const [activeQuickFilter, setActiveQuickFilter] = useState('Best Match')
  const [savedIds, setSavedIds] = useState(() => new Set(listings.filter((item) => item.saved).map((item) => item.id)))

  const filteredListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return listings
      .filter((listing) => {
        const matchesQuery =
          !normalizedQuery ||
          listing.title.toLowerCase().includes(normalizedQuery) ||
          listing.company.toLowerCase().includes(normalizedQuery) ||
          listing.skills.some((skill) => skill.toLowerCase().includes(normalizedQuery))

        if (!matchesQuery) return false
        if (activeQuickFilter === 'Remote') return listing.workSetup === 'Remote'
        if (activeQuickFilter === 'Hybrid') return listing.workSetup === 'Hybrid'
        return true
      })
      .sort((a, b) => (activeQuickFilter === 'Best Match' ? b.match - a.match : 0))
  }, [query, activeQuickFilter])

  function toggleSaved(id: string) {
    setSavedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-2xl border border-primary-100 bg-surface shadow-[0_8px_30px_rgba(42,82,224,0.06)]">
        <div className="grid gap-8 px-6 py-7 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
              <StarIcon className="h-4 w-4" />
              Personalized internship discovery
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              Find internships that fit your skills
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600 sm:text-base">
              Search opportunities and compare your SkillMatch score before you apply.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Search internships</span>
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search role, company, or skill"
                  className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm text-ink-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                />
              </label>

              <button className="flex h-12 min-w-48 items-center justify-between rounded-xl border border-border bg-surface px-4 text-sm font-medium text-ink-700 transition hover:border-border-strong hover:bg-surface-muted">
                <span className="inline-flex items-center gap-2">
                  <MapPinIcon className="h-4.5 w-4.5 text-ink-400" />
                  Metro Manila
                </span>
                <ChevronDownIcon className="h-4 w-4 text-ink-400" />
              </button>

              <Button className="h-12 px-6">Search</Button>
            </div>
          </div>

          <div className="hidden rounded-2xl border border-primary-100 bg-primary-50 p-5 lg:block">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-primary-600 shadow-sm">
                <TargetIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-ink-900">Your profile is matching well</p>
                <p className="mt-1 text-sm leading-5 text-ink-600">
                  You have <span className="font-semibold text-primary-700">3 opportunities above 85%</span> match today.
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-surface p-3">
                <p className="text-xs text-ink-600">Best match</p>
                <p className="mt-1 font-display text-xl font-semibold text-ink-950">94%</p>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <p className="text-xs text-ink-600">New today</p>
                <p className="mt-1 font-display text-xl font-semibold text-ink-950">12</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveQuickFilter(filter)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              activeQuickFilter === filter
                ? 'border-primary-600 bg-primary-600 text-white shadow-sm'
                : 'border-border bg-surface text-ink-700 hover:border-border-strong hover:bg-surface-muted',
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <Card className="sticky top-28 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-ink-900">Filters</h2>
              <button className="text-xs font-semibold text-primary-600 hover:text-primary-700">Reset</button>
            </div>

            <FilterGroup title="Work setup" options={['Remote', 'Hybrid', 'On-site']} />
            <FilterGroup title="Internship type" options={['Internship', 'Part-time']} />
            <FilterGroup title="Match score" options={['90% and above', '80% and above', '70% and above']} />
            <FilterGroup title="Date posted" options={['Past 24 hours', 'Past week', 'Past month']} />
          </Card>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink-900">Recommended opportunities</h2>
              <p className="mt-1 text-sm text-ink-600">{filteredListings.length} internships match your current search.</p>
            </div>
            <button className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-border bg-surface px-3.5 text-sm font-medium text-ink-700 transition hover:bg-surface-muted sm:self-auto">
              Sort: Best match
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 2xl:grid-cols-2">
            {filteredListings.map((listing) => (
              <InternshipCard
                key={listing.id}
                listing={listing}
                saved={savedIds.has(listing.id)}
                onToggleSaved={() => toggleSaved(listing.id)}
              />
            ))}
          </div>

          {filteredListings.length === 0 && (
            <Card className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <SearchIcon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink-900">No internships found</h3>
              <p className="mt-1 max-w-md text-sm text-ink-600">Try another keyword or change your filters to discover more opportunities.</p>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}

function FilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="mt-5 border-t border-border pt-5 first:border-t-0">
      <p className="mb-3 text-sm font-semibold text-ink-900">{title}</p>
      <div className="space-y-2.5">
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border-strong accent-primary-600"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}

function InternshipCard({
  listing,
  saved,
  onToggleSaved,
}: {
  listing: InternshipListing
  saved: boolean
  onToggleSaved: () => void
}) {
  return (
    <Card interactive className="group flex h-full flex-col p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary-100 bg-primary-50 text-primary-700">
          <BuildingIcon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-base font-semibold text-ink-950 transition-colors group-hover:text-primary-700">
                  {listing.title}
                </h3>
                {listing.featured && <Badge tone="primary">Top match</Badge>}
              </div>
              <p className="mt-1 text-sm font-medium text-ink-600">{listing.company}</p>
            </div>

            <button
              type="button"
              onClick={onToggleSaved}
              aria-label={saved ? 'Remove from saved internships' : 'Save internship'}
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition',
                saved
                  ? 'border-primary-100 bg-primary-50 text-primary-600'
                  : 'border-border bg-surface text-ink-600 hover:bg-surface-muted',
              )}
            >
              <BookmarkIcon className="h-4.5 w-4.5" fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-600">
        <span className="inline-flex items-center gap-1.5">
          <MapPinIcon className="h-3.5 w-3.5" />
          {listing.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BriefcaseIcon className="h-3.5 w-3.5" />
          {listing.workSetup} · {listing.type}
        </span>
        <span>{listing.posted}</span>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-ink-600">{listing.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {listing.skills.map((skill) => (
          <span key={skill} className="rounded-md bg-surface-muted px-2.5 py-1 text-xs font-medium text-ink-700">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
        <div className="flex items-center gap-3">
          <MatchRing value={listing.match} size={48} />
          <div>
            <p className="text-xs text-ink-600">SkillMatch score</p>
            <p className="text-sm font-semibold text-ink-900">{listing.match}% compatible</p>
          </div>
        </div>
        <Button size="sm">View details</Button>
      </div>
    </Card>
  )
}
