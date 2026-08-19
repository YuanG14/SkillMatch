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
} from '@/components/ui/icons'
import { cn } from '@/utils/cn'

interface SavedInternship {
  id: string
  title: string
  company: string
  location: string
  workSetup: 'Remote' | 'Hybrid' | 'On-site'
  type: 'Internship' | 'Part-time'
  match: number
  posted: string
  savedOn: string
  skills: string[]
  description: string
  featured?: boolean
}

const initialSavedInternships: SavedInternship[] = [
  {
    id: '2',
    title: 'Software Engineer Intern',
    company: 'Northbridge Systems',
    location: 'Taguig City',
    workSetup: 'On-site',
    type: 'Internship',
    match: 89,
    posted: '5 hours ago',
    savedOn: 'Saved today',
    skills: ['Java', 'SQL', 'Git'],
    description: 'Work on internal tools, APIs, and real production features with a collaborative engineering team.',
    featured: true,
  },
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'Tech Solutions Inc.',
    location: 'Makati City',
    workSetup: 'Hybrid',
    type: 'Internship',
    match: 94,
    posted: '2 hours ago',
    savedOn: 'Saved yesterday',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    description: 'Build responsive product experiences and collaborate with designers and senior engineers.',
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
    savedOn: 'Saved 3 days ago',
    skills: ['Node.js', 'REST API', 'PostgreSQL'],
    description: 'Support API development and learn how backend services are designed, tested, and deployed.',
  },
]

const filterTabs = ['All saved', 'High match', 'Remote', 'Hybrid'] as const

type FilterTab = (typeof filterTabs)[number]

export function SavedInternshipsPage() {
  const [savedInternships, setSavedInternships] = useState(initialSavedInternships)
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All saved')

  const filteredInternships = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return savedInternships
      .filter((internship) => {
        const matchesQuery =
          !normalizedQuery ||
          internship.title.toLowerCase().includes(normalizedQuery) ||
          internship.company.toLowerCase().includes(normalizedQuery) ||
          internship.skills.some((skill) => skill.toLowerCase().includes(normalizedQuery))

        if (!matchesQuery) return false
        if (activeFilter === 'High match') return internship.match >= 85
        if (activeFilter === 'Remote') return internship.workSetup === 'Remote'
        if (activeFilter === 'Hybrid') return internship.workSetup === 'Hybrid'
        return true
      })
      .sort((a, b) => b.match - a.match)
  }, [savedInternships, query, activeFilter])

  const highMatchCount = savedInternships.filter((internship) => internship.match >= 85).length

  function removeSaved(id: string) {
    setSavedInternships((current) => current.filter((internship) => internship.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-2xl border border-primary-100 bg-surface shadow-[0_8px_30px_rgba(42,82,224,0.06)]">
        <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
              <BookmarkIcon className="h-4 w-4" fill="currentColor" />
              Your internship shortlist
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              Saved Internships
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600 sm:text-base">
              Keep your strongest opportunities in one place, compare your SkillMatch scores, and apply when you are ready.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
            <div className="rounded-xl border border-primary-100 bg-primary-50 p-4">
              <p className="text-xs font-medium text-ink-600">Saved opportunities</p>
              <p className="mt-1 font-display text-2xl font-semibold text-ink-950">{savedInternships.length}</p>
            </div>
            <div className="rounded-xl border border-primary-100 bg-primary-50 p-4">
              <p className="text-xs font-medium text-ink-600">85%+ matches</p>
              <p className="mt-1 font-display text-2xl font-semibold text-ink-950">{highMatchCount}</p>
            </div>
          </div>
        </div>
      </section>

      <Card className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative w-full lg:max-w-md">
            <span className="sr-only">Search saved internships</span>
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your saved internships"
              className="h-11 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm text-ink-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {filterTabs.map((filter) => (
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
            <h2 className="font-display text-lg font-semibold text-ink-900">Your shortlist</h2>
            <p className="mt-1 text-sm text-ink-600">
              {filteredInternships.length} {filteredInternships.length === 1 ? 'internship' : 'internships'} in this view.
            </p>
          </div>
          <button className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-border bg-surface px-3.5 text-sm font-medium text-ink-700 transition hover:bg-surface-muted sm:self-auto">
            Sort: Best match
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>

        {filteredInternships.length > 0 ? (
          <div className="grid gap-4 2xl:grid-cols-2">
            {filteredInternships.map((internship) => (
              <SavedInternshipCard
                key={internship.id}
                internship={internship}
                onRemove={() => removeSaved(internship.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <BookmarkIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">
              {savedInternships.length === 0 ? 'No saved internships yet' : 'No saved internships found'}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-ink-600">
              {savedInternships.length === 0
                ? 'Save opportunities from Find Internships and they will appear here for easy comparison.'
                : 'Try another search term or switch filters to see more of your saved opportunities.'}
            </p>
            {savedInternships.length === 0 && (
              <Button className="mt-5" onClick={() => (window.location.href = '/student/internships')}>
                Find internships
              </Button>
            )}
          </Card>
        )}
      </section>
    </div>
  )
}

function SavedInternshipCard({
  internship,
  onRemove,
}: {
  internship: SavedInternship
  onRemove: () => void
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
                  {internship.title}
                </h3>
                {internship.featured && (
                  <Badge tone="primary" className="gap-1">
                    <StarIcon className="h-3 w-3" />
                    Strong match
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-ink-600">{internship.company}</p>
            </div>

            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove from saved internships"
              title="Remove from saved internships"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary-100 bg-primary-50 text-primary-600 transition hover:border-danger-50 hover:bg-danger-50 hover:text-danger-600"
            >
              <BookmarkIcon className="h-4.5 w-4.5" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-600">
        <span className="inline-flex items-center gap-1.5">
          <MapPinIcon className="h-3.5 w-3.5" />
          {internship.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BriefcaseIcon className="h-3.5 w-3.5" />
          {internship.workSetup} · {internship.type}
        </span>
        <span>{internship.posted}</span>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-ink-600">{internship.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {internship.skills.map((skill) => (
          <span key={skill} className="rounded-md bg-surface-muted px-2.5 py-1 text-xs font-medium text-ink-700">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-border bg-surface-muted/60 px-3.5 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-ink-600">{internship.savedOn}</span>
          <span className="text-xs font-semibold text-primary-700">Ready to review</span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
        <div className="flex items-center gap-3">
          <MatchRing value={internship.match} size={48} />
          <div>
            <p className="text-xs text-ink-600">SkillMatch score</p>
            <p className="text-sm font-semibold text-ink-900">{internship.match}% compatible</p>
          </div>
        </div>
        <Button size="sm">View details</Button>
      </div>
    </Card>
  )
}
