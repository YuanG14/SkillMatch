import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import {
  BriefcaseIcon,
  CheckIcon,
  FileTextIcon,
  MoreHorizontalIcon,
  SearchIcon,
  TrendingUpIcon,
  UsersIcon,
} from '@/components/ui/icons'
import { cn } from '@/utils/cn'

type ListingStatus = 'Active' | 'Draft' | 'Closed'
type Listing = {
  id: string
  title: string
  location: string
  setup: 'Remote' | 'Hybrid' | 'On-site'
  type: 'Internship' | 'Part-time'
  status: ListingStatus
  posted: string
  closes: string
  applicants: number
  strongMatches: number
  views: number
  skills: string[]
}

const initialListings: Listing[] = [
  {
    id: 'SM-INT-024',
    title: 'Frontend Developer Intern',
    location: 'Makati City',
    setup: 'Hybrid',
    type: 'Internship',
    status: 'Active',
    posted: 'Aug 16, 2026',
    closes: 'Sep 15, 2026',
    applicants: 32,
    strongMatches: 14,
    views: 286,
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'SM-INT-021',
    title: 'Software Engineer Intern',
    location: 'Taguig City',
    setup: 'Hybrid',
    type: 'Internship',
    status: 'Active',
    posted: 'Aug 12, 2026',
    closes: 'Sep 10, 2026',
    applicants: 27,
    strongMatches: 11,
    views: 244,
    skills: ['Java', 'SQL', 'Git'],
  },
  {
    id: 'SM-INT-018',
    title: 'Data Analyst Intern',
    location: 'Remote',
    setup: 'Remote',
    type: 'Internship',
    status: 'Active',
    posted: 'Aug 8, 2026',
    closes: 'Sep 5, 2026',
    applicants: 19,
    strongMatches: 8,
    views: 198,
    skills: ['Python', 'SQL', 'Power BI'],
  },
  {
    id: 'SM-INT-014',
    title: 'UI/UX Design Intern',
    location: 'Makati City',
    setup: 'On-site',
    type: 'Internship',
    status: 'Draft',
    posted: 'Not published',
    closes: '—',
    applicants: 0,
    strongMatches: 0,
    views: 0,
    skills: ['Figma', 'Prototyping', 'User Research'],
  },
  {
    id: 'SM-INT-009',
    title: 'QA Engineer Intern',
    location: 'Pasig City',
    setup: 'Hybrid',
    type: 'Internship',
    status: 'Closed',
    posted: 'Jul 3, 2026',
    closes: 'Aug 2, 2026',
    applicants: 41,
    strongMatches: 17,
    views: 342,
    skills: ['Testing', 'JavaScript', 'Jira'],
  },
]

const filters = ['All', 'Active', 'Draft', 'Closed'] as const

type Filter = (typeof filters)[number]

function statusTone(status: ListingStatus) {
  if (status === 'Active') return 'success' as const
  if (status === 'Draft') return 'warning' as const
  return 'neutral' as const
}

export function JobListingsPage() {
  const [listings, setListings] = useState(initialListings)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('All')
  const [sort, setSort] = useState('Newest')
  const [showCreatePanel, setShowCreatePanel] = useState(false)

  const stats = useMemo(() => {
    const active = listings.filter((listing) => listing.status === 'Active')
    return {
      active: active.length,
      applicants: active.reduce((total, listing) => total + listing.applicants, 0),
      strongMatches: active.reduce((total, listing) => total + listing.strongMatches, 0),
      views: active.reduce((total, listing) => total + listing.views, 0),
    }
  }, [listings])

  const filteredListings = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const next = listings.filter((listing) => {
      const matchesFilter = filter === 'All' || listing.status === filter
      const matchesQuery =
        !normalized ||
        [listing.title, listing.id, listing.location, listing.setup, ...listing.skills]
          .join(' ')
          .toLowerCase()
          .includes(normalized)
      return matchesFilter && matchesQuery
    })

    return [...next].sort((a, b) => {
      if (sort === 'Most applicants') return b.applicants - a.applicants
      if (sort === 'Most views') return b.views - a.views
      if (sort === 'Best matches') return b.strongMatches - a.strongMatches
      return initialListings.findIndex((item) => item.id === a.id) - initialListings.findIndex((item) => item.id === b.id)
    })
  }, [filter, listings, query, sort])

  function duplicateListing(listing: Listing) {
    const copy: Listing = {
      ...listing,
      id: `SM-INT-${String(listings.length + 25).padStart(3, '0')}`,
      status: 'Draft',
      posted: 'Not published',
      closes: '—',
      applicants: 0,
      strongMatches: 0,
      views: 0,
      title: `${listing.title} Copy`,
    }
    setListings((current) => [copy, ...current])
  }

  function toggleListingStatus(id: string) {
    setListings((current) =>
      current.map((listing) => {
        if (listing.id !== id) return listing
        if (listing.status === 'Active') return { ...listing, status: 'Closed' as const }
        return { ...listing, status: 'Active' as const, posted: listing.posted === 'Not published' ? 'Aug 19, 2026' : listing.posted }
      }),
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <section className="overflow-hidden rounded-[28px] border border-primary-100 bg-gradient-to-br from-white via-primary-50/70 to-primary-100/80 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-primary-700">
              <BriefcaseIcon className="h-4 w-4" /> Company hiring workspace
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">Job Listings</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink-600 sm:text-base">
              Create, publish, and manage internship opportunities while tracking how each listing performs with candidates.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="lg" onClick={() => setFilter('Draft')}>
              View drafts
            </Button>
            <Button size="lg" onClick={() => setShowCreatePanel((current) => !current)}>
              + Post a Job
            </Button>
          </div>
        </div>
      </section>

      {showCreatePanel && (
        <Card className="border-primary-100 bg-primary-50/40 p-5 motion-safe:animate-[slide-down_0.2s_ease-out]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-display text-base font-semibold text-ink-950">Create a new internship listing</p>
              <p className="mt-1 text-sm text-ink-600">Start with the essentials now. You can add requirements, screening questions, and skills before publishing.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCreatePanel(false)}>Cancel</Button>
              <Button onClick={() => setShowCreatePanel(false)}>Start listing</Button>
            </div>
          </div>
        </Card>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Active listings', value: stats.active, helper: 'Currently accepting', icon: BriefcaseIcon },
          { label: 'Total applicants', value: stats.applicants, helper: 'Across active roles', icon: UsersIcon },
          { label: 'Strong matches', value: stats.strongMatches, helper: '80% match or higher', icon: CheckIcon },
          { label: 'Listing views', value: stats.views, helper: 'Across active roles', icon: TrendingUpIcon },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-ink-600">{stat.label}</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-ink-950">{stat.value}</p>
                  <p className="mt-1 text-xs text-ink-400">{stat.helper}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </Card>
          )
        })}
      </section>

      <Card className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, skill, location, or listing ID..."
              className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-4 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-primary-300 focus:ring-4 focus:ring-primary-50"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={cn(
                    'rounded-xl px-3.5 py-2 text-sm font-semibold transition',
                    filter === item
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'border border-border bg-surface text-ink-600 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700',
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-10 rounded-xl border border-border bg-surface px-3 text-sm font-semibold text-ink-700 outline-none focus:border-primary-300"
            >
              <option>Newest</option>
              <option>Most applicants</option>
              <option>Most views</option>
              <option>Best matches</option>
            </select>
          </div>
        </div>
      </Card>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink-950">Your listings</h2>
            <p className="mt-1 text-sm text-ink-600">{filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'} shown</p>
          </div>
        </div>

        {filteredListings.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden p-0 transition-shadow hover:shadow-md">
                <div className="grid gap-0 lg:grid-cols-[1fr_340px]">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge tone={statusTone(listing.status)}>{listing.status}</Badge>
                          <span className="text-xs font-semibold text-ink-400">{listing.id}</span>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-ink-950">{listing.title}</h3>
                        <p className="mt-1 text-sm text-ink-600">{listing.location} · {listing.setup} · {listing.type}</p>
                      </div>

                      <button
                        type="button"
                        aria-label={`More actions for ${listing.title}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-ink-600 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
                      >
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {listing.skills.map((skill) => (
                        <Badge key={skill} tone="primary">{skill}</Badge>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Posted</p>
                        <p className="mt-1 text-sm font-medium text-ink-700">{listing.posted}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Closes</p>
                        <p className="mt-1 text-sm font-medium text-ink-700">{listing.closes}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Work setup</p>
                        <p className="mt-1 text-sm font-medium text-ink-700">{listing.setup}</p>
                      </div>
                    </div>
                  </div>

                  <aside className="border-t border-border bg-surface-muted/70 p-5 sm:p-6 lg:border-l lg:border-t-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Performance</p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div>
                        <p className="font-display text-2xl font-semibold text-ink-950">{listing.applicants}</p>
                        <p className="text-xs text-ink-600">Applicants</p>
                      </div>
                      <div>
                        <p className="font-display text-2xl font-semibold text-primary-600">{listing.strongMatches}</p>
                        <p className="text-xs text-ink-600">Strong match</p>
                      </div>
                      <div>
                        <p className="font-display text-2xl font-semibold text-ink-950">{listing.views}</p>
                        <p className="text-xs text-ink-600">Views</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-2">
                      <Button className="w-full">Manage listing</Button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => duplicateListing(listing)}
                          className="h-10 rounded-xl border border-border bg-surface text-sm font-semibold text-ink-700 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
                        >
                          Duplicate
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleListingStatus(listing.id)}
                          className="h-10 rounded-xl border border-border bg-surface text-sm font-semibold text-ink-700 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
                        >
                          {listing.status === 'Active' ? 'Close' : 'Publish'}
                        </button>
                      </div>
                    </div>
                  </aside>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <FileTextIcon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">No listings found</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">Try changing your filters or search terms, or create a new internship listing.</p>
            <Button className="mt-5" onClick={() => setShowCreatePanel(true)}>Post a Job</Button>
          </Card>
        )}
      </section>
    </div>
  )
}
