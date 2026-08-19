import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { MatchRing } from '@/components/ui/MatchRing'
import {
  BriefcaseIcon,
  CheckIcon,
  FileTextIcon,
  MoreHorizontalIcon,
  SearchIcon,
  StarIcon,
  TrendingUpIcon,
  UserIcon,
  UsersIcon,
} from '@/components/ui/icons'
import { cn } from '@/utils/cn'

type ApplicationStatus = 'New' | 'Reviewing' | 'Shortlisted' | 'Interview' | 'Offer' | 'Rejected'

type Application = {
  id: string
  applicant: string
  initials: string
  role: string
  match: number
  applied: string
  status: ApplicationStatus
  school: string
  program: string
  skills: string[]
  note: string
}

const applications: Application[] = [
  {
    id: 'APP-1048', applicant: 'John Doe', initials: 'JD', role: 'Frontend Developer Intern', match: 94,
    applied: '2 hours ago', status: 'New', school: 'De La Salle Lipa', program: 'BS Computer Science',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Git'], note: 'Strong portfolio and excellent frontend skill alignment.',
  },
  {
    id: 'APP-1047', applicant: 'Jane Smith', initials: 'JS', role: 'Frontend Developer Intern', match: 91,
    applied: '5 hours ago', status: 'Shortlisted', school: 'Mapúa University', program: 'BS Information Technology',
    skills: ['React', 'JavaScript', 'Figma', 'REST API'], note: 'Strong UI background with relevant web application projects.',
  },
  {
    id: 'APP-1042', applicant: 'Alex Cruz', initials: 'AC', role: 'Data Analyst Intern', match: 88,
    applied: 'Yesterday', status: 'Interview', school: 'University of Santo Tomas', program: 'BS Data Science',
    skills: ['Python', 'SQL', 'Excel', 'Power BI'], note: 'Great analytical foundation and strong data visualization experience.',
  },
  {
    id: 'APP-1039', applicant: 'Mika Santos', initials: 'MS', role: 'Software Engineer Intern', match: 84,
    applied: '1 day ago', status: 'Reviewing', school: 'Batangas State University', program: 'BS Computer Engineering',
    skills: ['Java', 'SQL', 'Git', 'OOP'], note: 'Good fundamentals; currently being reviewed by the engineering team.',
  },
  {
    id: 'APP-1031', applicant: 'Carlo Reyes', initials: 'CR', role: 'UI/UX Design Intern', match: 79,
    applied: '2 days ago', status: 'Offer', school: 'Adamson University', program: 'BS Information Systems',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'Research'], note: 'Strong design process and communication during interview.',
  },
  {
    id: 'APP-1024', applicant: 'Bea Lim', initials: 'BL', role: 'Frontend Developer Intern', match: 73,
    applied: '4 days ago', status: 'Rejected', school: 'FEU Institute of Technology', program: 'BS Information Technology',
    skills: ['HTML', 'CSS', 'JavaScript', 'Git'], note: 'Good fundamentals but currently below the role benchmark.',
  },
]

const statusFilters = ['All', 'New', 'Reviewing', 'Shortlisted', 'Interview', 'Offer', 'Rejected'] as const

const statusClasses: Record<ApplicationStatus, string> = {
  New: 'bg-primary-50 text-primary-700',
  Reviewing: 'bg-amber-50 text-amber-700',
  Shortlisted: 'bg-violet-50 text-violet-700',
  Interview: 'bg-cyan-50 text-cyan-700',
  Offer: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-rose-50 text-rose-700',
}

export function CompanyApplicationsPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof statusFilters)[number]>('All')
  const [role, setRole] = useState('All roles')
  const [sort, setSort] = useState('Newest')
  const [selectedId, setSelectedId] = useState<string | null>('APP-1048')

  const filteredApplications = useMemo(() => {
    let result = applications.filter((application) => {
      const searchable = [application.id, application.applicant, application.role, application.school, application.program, ...application.skills]
        .join(' ')
        .toLowerCase()
      const matchesQuery = searchable.includes(query.trim().toLowerCase())
      const matchesStatus = status === 'All' || application.status === status
      const matchesRole = role === 'All roles' || application.role === role
      return matchesQuery && matchesStatus && matchesRole
    })

    if (sort === 'Best match') result = [...result].sort((a, b) => b.match - a.match)
    if (sort === 'Lowest match') result = [...result].sort((a, b) => a.match - b.match)
    return result
  }, [query, status, role, sort])

  const selected = applications.find((application) => application.id === selectedId) ?? null

  return (
    <div className="flex flex-col gap-6 pb-8">
      <section className="overflow-hidden rounded-2xl border border-primary-100 bg-surface shadow-[0_8px_30px_rgba(42,82,224,0.06)]">
        <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
              <FileTextIcon className="h-4 w-4" />
              Applicant pipeline
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">Manage applications in one place</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600 sm:text-base">
              Review applicants, compare SkillMatch scores, move candidates through your hiring pipeline, and keep every application organized.
            </p>
          </div>

          <div className="rounded-2xl border border-primary-100 bg-primary-50 p-5">
            <div className="flex items-center gap-4">
              <MatchRing value={94} size={76} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">Highest match</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink-950">John Doe</p>
                <p className="mt-1 text-sm text-ink-600">Frontend Developer Intern</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface px-3 py-2.5 text-xs text-ink-700 shadow-sm">
              <TrendingUpIcon className="h-4 w-4 text-primary-600" />
              <span><strong className="font-semibold text-primary-700">18 new applications</strong> arrived this week.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total applications', value: '186', note: '+18 this week', icon: FileTextIcon },
          { label: 'Under review', value: '42', note: 'Needs team action', icon: UsersIcon },
          { label: 'Interviews', value: '16', note: 'Scheduled / ongoing', icon: UserIcon },
          { label: 'Offers', value: '7', note: '3 awaiting response', icon: StarIcon },
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600"><Icon className="h-5 w-5" /></div>
              </div>
            </Card>
          )
        })}
      </section>

      <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative min-w-0 flex-1 xl:max-w-md">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search applicant, role, skill, ID..." className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm text-ink-900 outline-none transition focus:border-primary-300 focus:ring-4 focus:ring-primary-50" />
          </div>
          <div className="flex flex-wrap gap-2">
            <select value={role} onChange={(e) => setRole(e.target.value)} className="h-11 rounded-xl border border-border bg-surface px-3 text-sm text-ink-700 outline-none focus:border-primary-300">
              <option>All roles</option>
              <option>Frontend Developer Intern</option>
              <option>Software Engineer Intern</option>
              <option>Data Analyst Intern</option>
              <option>UI/UX Design Intern</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-11 rounded-xl border border-border bg-surface px-3 text-sm text-ink-700 outline-none focus:border-primary-300">
              <option>Newest</option><option>Best match</option><option>Lowest match</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {statusFilters.map((filter) => (
            <button key={filter} onClick={() => setStatus(filter)} className={cn('whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition', status === filter ? 'bg-primary-600 text-white shadow-sm' : 'bg-ink-50 text-ink-600 hover:bg-primary-50 hover:text-primary-700')}>{filter}</button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 px-1">
            <div><h2 className="font-display text-lg font-semibold text-ink-950">Applications</h2><p className="mt-0.5 text-xs text-ink-500">{filteredApplications.length} results in this view</p></div>
          </div>

          {filteredApplications.map((application) => (
            <button key={application.id} onClick={() => setSelectedId(application.id)} className={cn('w-full rounded-2xl border bg-surface p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md', selectedId === application.id ? 'border-primary-300 ring-4 ring-primary-50' : 'border-border')}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 font-display text-sm font-semibold text-primary-700">{application.initials}</div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-ink-950">{application.applicant}</h3>
                      <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', statusClasses[application.status])}>{application.status}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-ink-700">{application.role}</p>
                    <p className="mt-1 text-xs text-ink-500">{application.id} • {application.school} • {application.applied}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">{application.skills.slice(0, 4).map((skill) => <Badge key={skill} variant="soft">{skill}</Badge>)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <div className="flex items-center gap-2"><MatchRing value={application.match} size={52} /><div><p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">SkillMatch</p><p className="text-sm font-semibold text-ink-900">{application.match}%</p></div></div>
                  <span className="text-xs font-medium text-primary-600">Review application →</span>
                </div>
              </div>
            </button>
          ))}

          {filteredApplications.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center"><SearchIcon className="mx-auto h-7 w-7 text-ink-300" /><h3 className="mt-3 font-display font-semibold text-ink-900">No applications found</h3><p className="mt-1 text-sm text-ink-500">Try changing the search or filters.</p></div>
          )}
        </div>

        <aside className="xl:sticky xl:top-24 xl:self-start">
          {selected ? (
            <Card className="overflow-hidden p-0">
              <div className="border-b border-border bg-gradient-to-br from-primary-50 to-white p-5">
                <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600">Application detail</p><h3 className="mt-1 font-display text-lg font-semibold text-ink-950">{selected.applicant}</h3><p className="mt-1 text-sm text-ink-600">{selected.role}</p></div><button className="rounded-lg p-2 text-ink-400 hover:bg-white hover:text-ink-700"><MoreHorizontalIcon className="h-5 w-5" /></button></div>
              </div>
              <div className="space-y-5 p-5">
                <div className="flex items-center justify-between rounded-xl bg-ink-50 p-3"><div><p className="text-xs text-ink-500">SkillMatch score</p><p className="mt-0.5 font-display text-xl font-semibold text-ink-950">{selected.match}%</p></div><MatchRing value={selected.match} size={58} /></div>
                <div><p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Education</p><p className="mt-2 text-sm font-medium text-ink-900">{selected.program}</p><p className="mt-1 text-xs text-ink-500">{selected.school}</p></div>
                <div><p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Why they stand out</p><p className="mt-2 text-sm leading-6 text-ink-600">{selected.note}</p></div>
                <div><p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Pipeline status</p><div className="mt-2 flex items-center gap-2"><span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', statusClasses[selected.status])}>{selected.status}</span><span className="text-xs text-ink-500">Applied {selected.applied}</span></div></div>
                <div className="grid grid-cols-2 gap-2"><Button variant="secondary" className="w-full">View profile</Button><Button className="w-full"><CheckIcon className="h-4 w-4" /> Move forward</Button></div>
                <Button variant="ghost" className="w-full text-rose-600 hover:bg-rose-50 hover:text-rose-700">Reject application</Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 text-center"><BriefcaseIcon className="mx-auto h-7 w-7 text-ink-300" /><p className="mt-3 text-sm text-ink-500">Select an application to review.</p></Card>
          )}
        </aside>
      </section>
    </div>
  )
}
