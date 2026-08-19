import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  CheckIcon,
  CircleDashedIcon,
  FileTextIcon,
  StarIcon,
  TargetIcon,
  TrendingUpIcon,
} from '@/components/ui/icons'

type Gap = {
  skill: string
  category: string
  current: number
  target: number
  demand: string
  note: string
}

const categories = [
  { label: 'Frontend development', value: 84, target: 78 },
  { label: 'Programming fundamentals', value: 81, target: 75 },
  { label: 'Backend & APIs', value: 68, target: 76 },
  { label: 'Databases', value: 58, target: 71 },
  { label: 'Developer tools', value: 64, target: 74 },
]

const gaps: Gap[] = [
  {
    skill: 'TypeScript',
    category: 'Frontend',
    current: 48,
    target: 78,
    demand: 'High demand',
    note: 'Frequently requested in frontend and full-stack internship listings.',
  },
  {
    skill: 'REST API Integration',
    category: 'Backend',
    current: 55,
    target: 80,
    demand: 'High demand',
    note: 'Strengthen API consumption, authentication, loading states, and error handling.',
  },
  {
    skill: 'SQL',
    category: 'Data',
    current: 42,
    target: 70,
    demand: 'Growing',
    note: 'Useful across software engineering, data, and backend internship roles.',
  },
]

const learningPlan = [
  {
    step: '01',
    title: 'Strengthen TypeScript',
    description: 'Practice typing React props, API responses, utility types, and reusable interfaces.',
    duration: '5–7 days',
    gain: '+6% readiness',
  },
  {
    step: '02',
    title: 'Build one API-driven feature',
    description: 'Create a feature with REST requests, loading states, validation, and error handling.',
    duration: '4–6 days',
    gain: '+5% readiness',
  },
  {
    step: '03',
    title: 'Practice SQL essentials',
    description: 'Cover SELECT, JOIN, GROUP BY, filtering, subqueries, and relational design basics.',
    duration: '5–7 days',
    gain: '+4% readiness',
  },
]

export function SkillGapAnalysisPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-2xl border border-primary-100 bg-surface shadow-[0_8px_30px_rgba(42,82,224,0.06)]">
        <div className="grid gap-6 px-6 py-7 xl:grid-cols-[1fr_auto] xl:items-center xl:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
              <TargetIcon className="h-4 w-4" />
              Personalized career insight
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              Skill Gap Analysis
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600 sm:text-base">
              Compare your current abilities with the skills internship employers are looking for, then focus on the gaps that can improve your match score the most.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 xl:min-w-[465px]">
            <SummaryStat label="Readiness" value="78%" icon={<TrendingUpIcon className="h-4 w-4" />} />
            <SummaryStat label="Strong skills" value="7" icon={<StarIcon className="h-4 w-4" />} />
            <SummaryStat label="Priority gaps" value="3" icon={<AlertTriangleIcon className="h-4 w-4" />} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">Skills overview</p>
              <h2 className="mt-1 font-display text-lg font-semibold text-ink-950">Your skills vs. internship benchmark</h2>
              <p className="mt-1 text-sm text-ink-600">Based on internship roles currently matched to your profile.</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-ink-600">
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary-600" />You</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-border-strong" />Target</span>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {categories.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium text-ink-700">{item.label}</span>
                  <span className="font-semibold text-ink-950">{item.value}%</span>
                </div>
                <div className="relative h-2.5 rounded-full bg-surface-muted">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-primary-600" style={{ width: `${item.value}%` }} />
                  <span
                    className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-border-strong"
                    style={{ left: `${item.target}%` }}
                    title={`Target benchmark: ${item.target}%`}
                  />
                </div>
                <p className="mt-1.5 text-right text-[11px] text-ink-400">Target {item.target}%</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-success-50 bg-success-50 p-4">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-success-600 shadow-sm">
                <CheckIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900">Your strongest areas</p>
                <p className="mt-1 text-sm leading-6 text-ink-600">
                  React, JavaScript, UI development, problem solving, and programming fundamentals already put you in a strong position for several internship roles.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">Career readiness</p>
          <h2 className="mt-1 font-display text-lg font-semibold text-ink-950">Overall readiness score</h2>

          <div className="mt-6 flex justify-center">
            <ReadinessRing value={78} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <MiniMetric label="Profile skills" value="12" />
            <MiniMetric label="Roles analyzed" value="24" />
            <MiniMetric label="Above benchmark" value="2 / 5" />
            <MiniMetric label="Potential" value="92%" />
          </div>

          <div className="mt-5 rounded-xl border border-primary-100 bg-primary-50 p-4">
            <div className="flex items-start gap-3">
              <TrendingUpIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" />
              <div>
                <p className="text-sm font-semibold text-ink-900">You are close to job-ready</p>
                <p className="mt-1 text-sm leading-6 text-ink-600">
                  Improving your top 3 gaps could raise your estimated readiness from 78% to around 90%.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">Priority gaps</p>
            <h2 className="mt-1 font-display text-xl font-semibold text-ink-950">Skills worth improving next</h2>
            <p className="mt-1 text-sm text-ink-600">Ranked by how much each skill can improve your internship match potential.</p>
          </div>
          <Button variant="secondary" className="self-start sm:self-auto">View all skills</Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {gaps.map((gap, index) => <SkillGapCard key={gap.skill} gap={gap} rank={index + 1} />)}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Card className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">Recommended plan</p>
              <h2 className="mt-1 font-display text-lg font-semibold text-ink-950">Your fastest path to a stronger profile</h2>
              <p className="mt-1 text-sm text-ink-600">A focused sequence based on your highest-impact gaps.</p>
            </div>
            <span className="hidden rounded-lg bg-primary-50 px-3 py-2 text-xs font-semibold text-primary-700 sm:block">~3 weeks</span>
          </div>

          <div className="mt-6 space-y-4">
            {learningPlan.map((item, index) => (
              <div key={item.step} className="relative flex gap-4">
                {index < learningPlan.length - 1 && <span className="absolute left-5 top-10 h-[calc(100%+16px)] w-px bg-border" />}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-xs font-bold text-white shadow-sm">
                  {item.step}
                </div>
                <div className="flex-1 rounded-xl border border-border bg-surface-muted p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-ink-950">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-ink-600">{item.description}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-success-50 px-2.5 py-1 text-xs font-semibold text-success-600">{item.gain}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-ink-600">
                    <CircleDashedIcon className="h-3.5 w-3.5" /> Estimated {item.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-4 self-start">
          <Card className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <BriefcaseIcon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-ink-950">Best-fit roles right now</h3>
            <div className="mt-4 space-y-3">
              <RoleFit role="Frontend Developer Intern" score={91} />
              <RoleFit role="Web Developer Intern" score={87} />
              <RoleFit role="Software Engineer Intern" score={81} />
            </div>
            <button
              type="button"
              onClick={() => { window.location.href = '/student/recommended' }}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition hover:text-primary-600"
            >
              See recommended roles <ArrowRightIcon className="h-4 w-4" />
            </button>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-ink-700">
                <FileTextIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-ink-950">How this score works</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-600">
                  SkillMatch compares skills in your profile with skills requested by internship listings, then weighs missing skills by demand and relevance.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

function SummaryStat({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-xl border border-primary-100 bg-primary-50 p-4">
      <div className="flex items-center gap-2 text-primary-700">{icon}<p className="text-xs font-semibold">{label}</p></div>
      <p className="mt-1.5 font-display text-2xl font-semibold text-ink-950">{value}</p>
    </div>
  )
}

function ReadinessRing({ value }: { value: number }) {
  const size = 176
  const stroke = 13
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative h-44 w-44">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90" aria-label={`${value}% career readiness`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#edf1fe" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2a52e0"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-4xl font-semibold text-ink-950">{value}%</span>
        <span className="mt-1 text-xs font-medium text-ink-600">Career readiness</span>
      </div>
    </div>
  )
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-muted p-3">
      <p className="text-xs text-ink-600">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold text-ink-950">{value}</p>
    </div>
  )
}

function SkillGapCard({ gap, rank }: { gap: Gap; rank: number }) {
  const difference = gap.target - gap.current

  return (
    <Card interactive className="group p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 font-display text-sm font-semibold text-primary-700">#{rank}</div>
          <div>
            <h3 className="font-display text-base font-semibold text-ink-950 transition group-hover:text-primary-700">{gap.skill}</h3>
            <p className="mt-0.5 text-xs text-ink-600">{gap.category}</p>
          </div>
        </div>
        <span className="rounded-full bg-danger-50 px-2.5 py-1 text-xs font-semibold text-danger-600">-{difference} pts</span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-ink-600">Current {gap.current}%</span>
          <span className="font-medium text-ink-700">Target {gap.target}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-surface-muted">
          <div className="h-full rounded-full bg-primary-600" style={{ width: `${gap.current}%` }} />
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-ink-600">{gap.note}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">{gap.demand}</span>
        <span className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-ink-600">High impact</span>
      </div>
      <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition hover:text-primary-600">
        View learning resources <ArrowRightIcon className="h-4 w-4" />
      </button>
    </Card>
  )
}

function RoleFit({ role, score }: { role: string; score: number }) {
  return (
    <div className="rounded-xl border border-border bg-surface-muted p-3.5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink-700">{role}</p>
        <span className="text-sm font-semibold text-primary-700">{score}%</span>
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-primary-50">
        <div className="h-full rounded-full bg-primary-600" style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}
