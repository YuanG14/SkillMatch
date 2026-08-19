import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { MatchRing } from '@/components/ui/MatchRing'
import {
  ArrowRightIcon,
  BookmarkIcon,
  BriefcaseIcon,
  BuildingIcon,
  CheckIcon,
  MapPinIcon,
  StarIcon,
  TargetIcon,
  TrendingUpIcon,
} from '@/components/ui/icons'
import { cn } from '@/utils/cn'

type WorkSetup = 'Remote' | 'Hybrid' | 'On-site'

type Recommendation = {
  id: string
  title: string
  company: string
  location: string
  workSetup: WorkSetup
  match: number
  posted: string
  stipend: string
  skills: string[]
  reasons: string[]
  missingSkills: string[]
  description: string
  category: 'Top Matches' | 'New for You' | 'Growth Picks'
}

const recommendations: Recommendation[] = [
  {
    id: 'r1',
    title: 'Frontend Developer Intern',
    company: 'Tech Solutions Inc.',
    location: 'Makati City',
    workSetup: 'Hybrid',
    match: 94,
    posted: '2 hours ago',
    stipend: '₱18K–₱22K / month',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    reasons: ['Strong React foundation', 'Frontend projects align well', 'Preferred hybrid setup'],
    missingSkills: ['Testing'],
    description: 'Build responsive product experiences and collaborate with designers and senior engineers.',
    category: 'Top Matches',
  },
  {
    id: 'r2',
    title: 'Software Engineer Intern',
    company: 'Northbridge Systems',
    location: 'Taguig City',
    workSetup: 'On-site',
    match: 91,
    posted: '4 hours ago',
    stipend: '₱20K–₱25K / month',
    skills: ['Java', 'SQL', 'Git'],
    reasons: ['Java is one of your strongest skills', 'Good database fundamentals', 'Matches your software track'],
    missingSkills: ['Spring Boot'],
    description: 'Work on internal tools, APIs, and production features with a collaborative engineering team.',
    category: 'Top Matches',
  },
  {
    id: 'r3',
    title: 'Junior Web Developer Intern',
    company: 'PixelForge Studio',
    location: 'Pasig City',
    workSetup: 'Remote',
    match: 88,
    posted: 'Today',
    stipend: '₱15K–₱20K / month',
    skills: ['JavaScript', 'React', 'REST API'],
    reasons: ['Excellent web development alignment', 'Remote preference match', 'Portfolio projects are relevant'],
    missingSkills: ['Next.js'],
    description: 'Help create client-facing web applications and reusable frontend components.',
    category: 'New for You',
  },
  {
    id: 'r4',
    title: 'QA Automation Intern',
    company: 'Bright Path Labs',
    location: 'Muntinlupa City',
    workSetup: 'Hybrid',
    match: 84,
    posted: '1 day ago',
    stipend: '₱16K–₱19K / month',
    skills: ['JavaScript', 'Testing', 'Selenium'],
    reasons: ['Strong programming fundamentals', 'Good pathway into software engineering', 'Hybrid location fits your profile'],
    missingSkills: ['Selenium'],
    description: 'Improve software quality through structured testing, test cases, and automation scripts.',
    category: 'Growth Picks',
  },
  {
    id: 'r5',
    title: 'Backend Developer Intern',
    company: 'Cloudline Digital',
    location: 'Quezon City',
    workSetup: 'Remote',
    match: 81,
    posted: '1 day ago',
    stipend: '₱18K–₱23K / month',
    skills: ['Node.js', 'REST API', 'PostgreSQL'],
    reasons: ['Matches your full-stack direction', 'Database skills transfer well', 'High learning potential'],
    missingSkills: ['Node.js', 'PostgreSQL'],
    description: 'Support API development and learn how backend services are designed, tested, and deployed.',
    category: 'Growth Picks',
  },
]

const tabs = ['For You', 'Top Matches', 'New for You', 'Growth Picks'] as const

export function RecommendedPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('For You')
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(['r2']))

  const visibleRecommendations = useMemo(() => {
    if (activeTab === 'For You') return recommendations
    return recommendations.filter((item) => item.category === activeTab)
  }, [activeTab])

  const toggleSaved = (id: string) => {
    setSavedIds((current) => {
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
              <StarIcon className="h-4 w-4" />
              Personalized for your profile
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              Recommended internships for you
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600 sm:text-base">
              SkillMatch ranks opportunities using your skills, interests, work preferences, and current career readiness.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-ink-700">
                Software Development
              </span>
              <span className="rounded-full border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-ink-700">
                Metro Manila
              </span>
              <span className="rounded-full border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-ink-700">
                Remote or Hybrid
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-primary-100 bg-primary-50 p-5">
            <div className="flex items-center gap-4">
              <MatchRing value={94} size={78} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">Best match today</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink-950">Frontend Developer Intern</p>
                <p className="mt-1 text-sm text-ink-600">Tech Solutions Inc.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface px-3 py-2.5 text-xs text-ink-700 shadow-sm">
              <TrendingUpIcon className="h-4 w-4 text-primary-600" />
              Your top match improved by <span className="font-semibold text-primary-700">6%</span> after your latest skill update.
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <TargetIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-500">Strong matches</p>
              <p className="font-display text-xl font-semibold text-ink-950">3</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <BriefcaseIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-500">New recommendations</p>
              <p className="font-display text-xl font-semibold text-ink-950">8</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <TrendingUpIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-500">Average match</p>
              <p className="font-display text-xl font-semibold text-ink-950">88%</p>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink-950">Your recommendations</h2>
            <p className="mt-1 text-sm text-ink-600">Updated based on your profile and Skill Gap Analysis.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'rounded-full border px-3.5 py-2 text-sm font-medium transition',
                  activeTab === tab
                    ? 'border-primary-600 bg-primary-600 text-white shadow-sm'
                    : 'border-border bg-surface text-ink-700 hover:border-border-strong hover:bg-surface-muted',
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4">
          {visibleRecommendations.map((item, index) => (
            <Card key={item.id} className="overflow-hidden p-0 transition hover:border-primary-200 hover:shadow-[0_10px_34px_rgba(42,82,224,0.08)]">
              <div className="grid gap-0 lg:grid-cols-[1fr_235px]">
                <div className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-primary-600 sm:flex">
                      <BuildingIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-lg font-semibold text-ink-950">{item.title}</h3>
                            {index === 0 && activeTab === 'For You' ? <Badge tone="success">Best match</Badge> : null}
                          </div>
                          <p className="mt-1 text-sm font-medium text-ink-700">{item.company}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleSaved(item.id)}
                          aria-label={savedIds.has(item.id) ? 'Remove from saved' : 'Save internship'}
                          className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-lg border transition',
                            savedIds.has(item.id)
                              ? 'border-primary-200 bg-primary-50 text-primary-600'
                              : 'border-border bg-surface text-ink-500 hover:border-primary-200 hover:text-primary-600',
                          )}
                        >
                          <BookmarkIcon className="h-4.5 w-4.5" />
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-500">
                        <span className="inline-flex items-center gap-1.5"><MapPinIcon className="h-4 w-4" />{item.location}</span>
                        <span>{item.workSetup}</span>
                        <span>{item.stipend}</span>
                        <span>{item.posted}</span>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-ink-600">{item.description}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <span key={skill} className="rounded-lg bg-surface-muted px-2.5 py-1.5 text-xs font-medium text-ink-700">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 rounded-xl border border-primary-100 bg-primary-50/70 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-700">Why this is recommended</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-3">
                          {item.reasons.map((reason) => (
                            <div key={reason} className="flex items-start gap-2 text-xs leading-5 text-ink-700">
                              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                                <CheckIcon className="h-2.5 w-2.5" />
                              </span>
                              {reason}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="border-t border-border bg-surface-muted/60 p-5 lg:border-l lg:border-t-0">
                  <div className="flex items-center justify-between lg:block">
                    <div>
                      <p className="text-xs font-medium text-ink-500">SkillMatch score</p>
                      <div className="mt-2 flex items-center gap-3">
                        <MatchRing value={item.match} size={64} />
                        <div>
                          <p className="font-display text-lg font-semibold text-ink-950">{item.match}% match</p>
                          <p className="text-xs text-ink-500">Excellent fit</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-xs font-medium text-ink-500">Skill to improve</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.missingSkills.map((skill) => (
                        <span key={skill} className="rounded-md border border-border bg-surface px-2 py-1 text-xs font-medium text-ink-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2">
                    <Button className="w-full">View internship</Button>
                    <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface text-sm font-semibold text-ink-700 transition hover:border-border-strong hover:bg-surface-muted">
                      See match details
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </aside>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.72fr]">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <TargetIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-ink-950">Make your recommendations even better</h2>
              <p className="mt-1 text-sm leading-6 text-ink-600">
                Add your preferred roles, work setup, location, and target skills so SkillMatch can rank opportunities more precisely.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700">
                Update preferences <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Recommendation quality</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-3xl font-semibold text-ink-950">92%</p>
              <p className="mt-1 text-sm text-ink-600">Your profile has enough information for strong recommendations.</p>
            </div>
            <StarIcon className="h-8 w-8 shrink-0 text-primary-500" />
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-muted">
            <div className="h-full w-[92%] rounded-full bg-primary-600" />
          </div>
        </Card>
      </section>
    </div>
  )
}
