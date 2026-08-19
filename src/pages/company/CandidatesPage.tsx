import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { MatchRing } from '@/components/ui/MatchRing'
import {
  BriefcaseIcon,
  CheckIcon,
  SearchIcon,
  StarIcon,
  TrendingUpIcon,
  UserIcon,
  UsersIcon,
} from '@/components/ui/icons'
import { cn } from '@/utils/cn'

type CandidateStatus = 'New' | 'Shortlisted' | 'Interview' | 'Reviewed'
type Candidate = {
  id: string
  name: string
  initials: string
  program: string
  school: string
  location: string
  internship: string
  match: number
  skills: string[]
  missingSkill: string
  applied: string
  status: CandidateStatus
  experience: string
}

const candidates: Candidate[] = [
  {
    id: 'candidate-1',
    name: 'John Doe',
    initials: 'JD',
    program: 'BS Computer Science',
    school: 'De La Salle Lipa',
    location: 'Batangas',
    internship: 'Frontend Developer Intern',
    match: 94,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
    missingSkill: 'Testing',
    applied: '2 hours ago',
    status: 'New',
    experience: '3 portfolio projects',
  },
  {
    id: 'candidate-2',
    name: 'Jane Smith',
    initials: 'JS',
    program: 'BS Information Technology',
    school: 'Mapúa University',
    location: 'Makati City',
    internship: 'Frontend Developer Intern',
    match: 91,
    skills: ['React', 'JavaScript', 'Figma', 'REST API'],
    missingSkill: 'TypeScript',
    applied: '5 hours ago',
    status: 'Shortlisted',
    experience: '2 web app projects',
  },
  {
    id: 'candidate-3',
    name: 'Alex Cruz',
    initials: 'AC',
    program: 'BS Data Science',
    school: 'University of Santo Tomas',
    location: 'Manila',
    internship: 'Data Analyst Intern',
    match: 88,
    skills: ['Python', 'SQL', 'Excel', 'Power BI'],
    missingSkill: 'Tableau',
    applied: 'Yesterday',
    status: 'Interview',
    experience: '1 analytics capstone',
  },
  {
    id: 'candidate-4',
    name: 'Mika Santos',
    initials: 'MS',
    program: 'BS Computer Engineering',
    school: 'Batangas State University',
    location: 'Batangas City',
    internship: 'Software Engineer Intern',
    match: 84,
    skills: ['Java', 'SQL', 'Git', 'OOP'],
    missingSkill: 'Spring Boot',
    applied: '1 day ago',
    status: 'Reviewed',
    experience: '2 Java projects',
  },
  {
    id: 'candidate-5',
    name: 'Carlo Reyes',
    initials: 'CR',
    program: 'BS Information Systems',
    school: 'Adamson University',
    location: 'Pasay City',
    internship: 'UI/UX Design Intern',
    match: 79,
    skills: ['Figma', 'Wireframing', 'Prototyping', 'Research'],
    missingSkill: 'Design Systems',
    applied: '2 days ago',
    status: 'New',
    experience: '4 case studies',
  },
]

const statusFilters = ['All', 'New', 'Shortlisted', 'Interview', 'Reviewed'] as const

export function CandidatesPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof statusFilters)[number]>('All')
  const [role, setRole] = useState('All roles')
  const [sort, setSort] = useState('Best match')
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(
    new Set(candidates.filter((candidate) => candidate.status === 'Shortlisted').map((candidate) => candidate.id)),
  )

  const filteredCandidates = useMemo(() => {
    let result = candidates.filter((candidate) => {
      const searchable = [
        candidate.name,
        candidate.program,
        candidate.school,
        candidate.internship,
        ...candidate.skills,
      ]
        .join(' ')
        .toLowerCase()

      const matchesQuery = searchable.includes(query.trim().toLowerCase())
      const matchesStatus = status === 'All' || candidate.status === status
      const matchesRole = role === 'All roles' || candidate.internship === role
      return matchesQuery && matchesStatus && matchesRole
    })

    if (sort === 'Best match') result = [...result].sort((a, b) => b.match - a.match)
    if (sort === 'Lowest match') result = [...result].sort((a, b) => a.match - b.match)
    return result
  }, [query, status, role, sort])

  const toggleShortlist = (id: string) => {
    setShortlistedIds((current) => {
      const next = new Set(current)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <section className="overflow-hidden rounded-2xl border border-primary-100 bg-surface shadow-[0_8px_30px_rgba(42,82,224,0.06)]">
        <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
              <UsersIcon className="h-4 w-4" />
              Talent discovery
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              Find your strongest candidates
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600 sm:text-base">
              Compare applicants using SkillMatch scores, relevant skills, experience, and role fit before moving them forward.
            </p>
          </div>

          <div className="rounded-2xl border border-primary-100 bg-primary-50 p-5">
            <div className="flex items-center gap-4">
              <MatchRing value={94} size={76} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">Top candidate</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink-950">John Doe</p>
                <p className="mt-1 text-sm text-ink-600">Frontend Developer Intern</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface px-3 py-2.5 text-xs text-ink-700 shadow-sm">
              <TrendingUpIcon className="h-4 w-4 text-primary-600" />
              <span><strong className="font-semibold text-primary-700">12 candidates</strong> are above an 85% match.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total candidates', value: '124', note: '+18 this week', icon: UsersIcon },
          { label: 'Strong matches', value: '42', note: '85% match or higher', icon: StarIcon },
          { label: 'Shortlisted', value: String(shortlistedIds.size + 17), note: 'Across active roles', icon: CheckIcon },
          { label: 'Open roles', value: '3', note: 'Currently accepting', icon: BriefcaseIcon },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.label} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-ink-500">{item.label}</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-ink-950">{item.value}</p>
                  <p className="mt-1 text-xs text-ink-500">{item.note}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          )
        })}
      </section>

      <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative min-w-0 flex-1 xl:max-w-md">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search candidate, skill, school..."
              className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="h-11 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-ink-700 outline-none focus:border-primary-400"
            >
              <option>All roles</option>
              {[...new Set(candidates.map((candidate) => candidate.internship))].map((internship) => (
                <option key={internship}>{internship}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-11 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-ink-700 outline-none focus:border-primary-400"
            >
              <option>Best match</option>
              <option>Lowest match</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
          {statusFilters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={cn(
                'rounded-full border px-3.5 py-2 text-sm font-medium transition',
                status === item
                  ? 'border-primary-600 bg-primary-600 text-white shadow-sm'
                  : 'border-border bg-surface text-ink-700 hover:border-primary-200 hover:bg-primary-50',
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink-950">Candidate pool</h2>
            <p className="mt-1 text-sm text-ink-600">{filteredCandidates.length} candidates match your current filters.</p>
          </div>
          <p className="text-xs text-ink-500">Match scores are based on role requirements and candidate profiles.</p>
        </div>

        {filteredCandidates.length > 0 ? (
          <div className="grid gap-4">
            {filteredCandidates.map((candidate) => {
              const isShortlisted = shortlistedIds.has(candidate.id)
              return (
                <Card key={candidate.id} className="overflow-hidden p-0 transition hover:border-primary-200 hover:shadow-[0_10px_34px_rgba(42,82,224,0.08)]">
                  <div className="grid lg:grid-cols-[1fr_250px]">
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 font-display text-sm font-semibold text-white shadow-sm">
                          {candidate.initials}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-display text-lg font-semibold text-ink-950">{candidate.name}</h3>
                                <Badge tone={candidate.status === 'Interview' ? 'success' : candidate.status === 'Shortlisted' ? 'primary' : 'neutral'}>
                                  {candidate.status}
                                </Badge>
                              </div>
                              <p className="mt-1 text-sm font-medium text-ink-700">{candidate.program}</p>
                              <p className="mt-1 text-xs text-ink-500">{candidate.school} · {candidate.location}</p>
                            </div>
                            <span className="rounded-lg bg-surface-muted px-2.5 py-1.5 text-xs font-medium text-ink-600">Applied {candidate.applied}</span>
                          </div>

                          <div className="mt-4 rounded-xl border border-border bg-surface-muted/60 p-3.5">
                            <p className="text-xs text-ink-500">Applied for</p>
                            <p className="mt-1 text-sm font-semibold text-ink-900">{candidate.internship}</p>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {candidate.skills.map((skill) => (
                              <span key={skill} className="rounded-lg bg-primary-50 px-2.5 py-1.5 text-xs font-medium text-primary-700">
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-500">
                            <span className="inline-flex items-center gap-1.5"><UserIcon className="h-4 w-4" />{candidate.experience}</span>
                            <span>Skill to improve: <strong className="font-medium text-ink-700">{candidate.missingSkill}</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <aside className="border-t border-border bg-surface-muted/60 p-5 lg:border-l lg:border-t-0">
                      <p className="text-xs font-medium text-ink-500">SkillMatch score</p>
                      <div className="mt-3 flex items-center gap-3">
                        <MatchRing value={candidate.match} size={66} />
                        <div>
                          <p className="font-display text-lg font-semibold text-ink-950">{candidate.match}% match</p>
                          <p className="text-xs text-ink-500">{candidate.match >= 90 ? 'Excellent fit' : candidate.match >= 85 ? 'Strong fit' : 'Good fit'}</p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-2">
                        <Button className="w-full">Review profile</Button>
                        <button
                          type="button"
                          onClick={() => toggleShortlist(candidate.id)}
                          className={cn(
                            'h-10 w-full rounded-xl border text-sm font-semibold transition',
                            isShortlisted
                              ? 'border-primary-200 bg-primary-50 text-primary-700'
                              : 'border-border bg-surface text-ink-700 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700',
                          )}
                        >
                          {isShortlisted ? 'Shortlisted' : 'Add to shortlist'}
                        </button>
                      </div>
                    </aside>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <SearchIcon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">No candidates found</h3>
            <p className="mt-1 text-sm text-ink-500">Try changing your search, role, or status filters.</p>
          </Card>
        )}
      </section>
    </div>
  )
}
