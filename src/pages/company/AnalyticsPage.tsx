import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/Card'
import {
  BriefcaseIcon,
  ChartIcon,
  FileTextIcon,
  StarIcon,
  TargetIcon,
  TrendingUpIcon,
  UserIcon,
  UsersIcon,
} from '@/components/ui/icons'

const periods = ['Last 30 days', 'Last 90 days', 'This year'] as const

type Period = (typeof periods)[number]

const periodData: Record<Period, {
  views: string
  applications: string
  conversion: string
  avgMatch: string
  viewDelta: string
  applicationDelta: string
  conversionDelta: string
  matchDelta: string
  weeklyApplications: number[]
  weeklyViews: number[]
}> = {
  'Last 30 days': {
    views: '2,846', applications: '186', conversion: '6.5%', avgMatch: '84%',
    viewDelta: '+18.2%', applicationDelta: '+12.4%', conversionDelta: '+0.8%', matchDelta: '+3.1%',
    weeklyApplications: [22, 31, 28, 37, 41, 46, 52], weeklyViews: [310, 388, 365, 421, 478, 456, 522],
  },
  'Last 90 days': {
    views: '7,932', applications: '521', conversion: '6.6%', avgMatch: '82%',
    viewDelta: '+22.7%', applicationDelta: '+15.8%', conversionDelta: '+1.1%', matchDelta: '+2.4%',
    weeklyApplications: [39, 48, 44, 56, 62, 68, 75], weeklyViews: [620, 710, 688, 762, 824, 846, 901],
  },
  'This year': {
    views: '18,420', applications: '1,246', conversion: '6.8%', avgMatch: '81%',
    viewDelta: '+31.5%', applicationDelta: '+25.1%', conversionDelta: '+1.6%', matchDelta: '+4.7%',
    weeklyApplications: [48, 61, 58, 74, 82, 91, 104], weeklyViews: [860, 980, 944, 1108, 1212, 1264, 1398],
  },
}

const rolePerformance = [
  { role: 'Frontend Developer Intern', views: 812, applicants: 64, strong: 41, rate: 7.9 },
  { role: 'Software Engineer Intern', views: 704, applicants: 51, strong: 29, rate: 7.2 },
  { role: 'Data Analyst Intern', views: 526, applicants: 38, strong: 22, rate: 7.2 },
  { role: 'UI/UX Design Intern', views: 463, applicants: 27, strong: 13, rate: 5.8 },
]

const sourceData = [
  { source: 'SkillMatch recommendations', value: 46 },
  { source: 'Internship search', value: 31 },
  { source: 'Saved internships', value: 14 },
  { source: 'Direct / profile', value: 9 },
]

const skillDemand = [
  { skill: 'React', demand: 92, candidates: 78 },
  { skill: 'TypeScript', demand: 86, candidates: 61 },
  { skill: 'SQL', demand: 78, candidates: 72 },
  { skill: 'REST APIs', demand: 74, candidates: 58 },
  { skill: 'Git', demand: 69, candidates: 81 },
]

function TrendBadge({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
      <TrendingUpIcon className="h-3.5 w-3.5" /> {value}
    </span>
  )
}

function MiniLineChart({ values, label }: { values: number[]; label: string }) {
  const points = useMemo(() => {
    const min = Math.min(...values)
    const max = Math.max(...values)
    const span = Math.max(max - min, 1)
    return values.map((value, index) => {
      const x = 6 + (index / (values.length - 1)) * 88
      const y = 84 - ((value - min) / span) * 66
      return `${x},${y}`
    }).join(' ')
  }, [values])

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gradient-to-b from-primary-50/60 to-white">
      <div className="absolute inset-x-5 inset-y-5 flex flex-col justify-between">
        {[0, 1, 2, 3].map((line) => <div key={line} className="border-t border-dashed border-primary-100" />)}
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full p-3" aria-label={label}>
        <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.3" vectorEffect="non-scaling-stroke" className="text-primary-600" />
        {points.split(' ').map((point) => {
          const [cx, cy] = point.split(',')
          return <circle key={point} cx={cx} cy={cy} r="1.8" fill="white" stroke="currentColor" strokeWidth="1.2" className="text-primary-600" />
        })}
      </svg>
      <div className="absolute inset-x-5 bottom-2 flex justify-between text-[10px] font-medium text-ink-400">
        <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span><span>Week 5</span><span>Week 6</span><span>Week 7</span>
      </div>
    </div>
  )
}

export function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>('Last 30 days')
  const data = periodData[period]

  return (
    <div className="flex flex-col gap-6 pb-8">
      <section className="overflow-hidden rounded-2xl border border-primary-100 bg-surface shadow-[0_8px_30px_rgba(42,82,224,0.06)]">
        <div className="flex flex-col gap-5 px-6 py-7 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">
              <ChartIcon className="h-4 w-4" /> Recruitment analytics
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">Understand what is driving your hiring</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600 sm:text-base">
              Track listing performance, applicant quality, conversion, and the skills candidates bring to your internship pipeline.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-ink-500">Reporting period</span>
            <select value={period} onChange={(e) => setPeriod(e.target.value as Period)} className="h-11 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-ink-700 outline-none focus:border-primary-300">
              {periods.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Listing views', value: data.views, delta: data.viewDelta, icon: BriefcaseIcon, note: 'Across active listings' },
          { label: 'Applications', value: data.applications, delta: data.applicationDelta, icon: FileTextIcon, note: 'Submitted by candidates' },
          { label: 'Apply conversion', value: data.conversion, delta: data.conversionDelta, icon: TargetIcon, note: 'Views that became applications' },
          { label: 'Average SkillMatch', value: data.avgMatch, delta: data.matchDelta, icon: StarIcon, note: 'Across active applicants' },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.label} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-ink-500">{item.label}</p>
                  <div className="mt-2 flex items-center gap-2"><p className="font-display text-2xl font-semibold text-ink-950">{item.value}</p><TrendBadge value={item.delta} /></div>
                  <p className="mt-1 text-xs text-ink-500">{item.note}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600"><Icon className="h-5 w-5" /></div>
              </div>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="font-display text-lg font-semibold text-ink-950">Application momentum</h2><p className="mt-1 text-xs text-ink-500">Applications received across your active internship listings.</p></div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary-700"><span className="h-2.5 w-2.5 rounded-full bg-primary-600" /> Applications</div>
          </div>
          <MiniLineChart values={data.weeklyApplications} label="Applications over time" />
        </Card>

        <Card className="p-5 sm:p-6">
          <div><h2 className="font-display text-lg font-semibold text-ink-950">Applicant pipeline</h2><p className="mt-1 text-xs text-ink-500">Where candidates currently sit in your hiring flow.</p></div>
          <div className="mt-6 space-y-4">
            {[
              { label: 'Applied', value: 186, width: 100 },
              { label: 'Under review', value: 94, width: 72 },
              { label: 'Shortlisted', value: 48, width: 49 },
              { label: 'Interview', value: 16, width: 29 },
              { label: 'Offer', value: 7, width: 18 },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between text-xs"><span className="font-medium text-ink-600">{item.label}</span><span className="font-semibold text-ink-900">{item.value}</span></div>
                <div className="h-2.5 overflow-hidden rounded-full bg-ink-50"><div className="h-full rounded-full bg-primary-500" style={{ width: `${item.width}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-primary-50 p-3.5 text-xs leading-5 text-primary-800"><strong>8.6%</strong> of applicants currently reach the interview stage.</div>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-border px-5 py-4 sm:px-6"><h2 className="font-display text-lg font-semibold text-ink-950">Job listing performance</h2><p className="mt-1 text-xs text-ink-500">Compare engagement and applicant quality by role.</p></div>
          <div className="overflow-x-auto">
            <table className="min-w-[680px] w-full text-left">
              <thead><tr className="bg-ink-50/80 text-[11px] font-semibold uppercase tracking-wide text-ink-400"><th className="px-6 py-3">Role</th><th className="px-4 py-3">Views</th><th className="px-4 py-3">Applicants</th><th className="px-4 py-3">Strong matches</th><th className="px-6 py-3">Conversion</th></tr></thead>
              <tbody className="divide-y divide-border">
                {rolePerformance.map((role) => (
                  <tr key={role.role} className="text-sm">
                    <td className="px-6 py-4 font-medium text-ink-900">{role.role}</td><td className="px-4 py-4 text-ink-600">{role.views}</td><td className="px-4 py-4 text-ink-600">{role.applicants}</td><td className="px-4 py-4"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{role.strong}</span></td><td className="px-6 py-4 font-semibold text-primary-700">{role.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div><h2 className="font-display text-lg font-semibold text-ink-950">Application sources</h2><p className="mt-1 text-xs text-ink-500">How candidates are discovering your internships.</p></div>
          <div className="mt-6 space-y-5">
            {sourceData.map((source) => (
              <div key={source.source}>
                <div className="mb-2 flex items-center justify-between"><span className="text-sm font-medium text-ink-700">{source.source}</span><span className="text-sm font-semibold text-ink-950">{source.value}%</span></div>
                <div className="h-3 overflow-hidden rounded-full bg-ink-50"><div className="h-full rounded-full bg-primary-500" style={{ width: `${source.value}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary-100 bg-primary-50 p-4"><TrendingUpIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" /><p className="text-xs leading-5 text-primary-800"><strong>Recommendations are your strongest source.</strong> Nearly half of applications come from SkillMatch's personalized recommendations.</p></div>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-5 sm:p-6">
          <div><h2 className="font-display text-lg font-semibold text-ink-950">Skill demand vs. candidate supply</h2><p className="mt-1 text-xs text-ink-500">See which skills are important to your listings and how often they appear in your candidate pool.</p></div>
          <div className="mt-6 space-y-5">
            {skillDemand.map((item) => (
              <div key={item.skill}>
                <div className="mb-2 flex items-center justify-between"><span className="text-sm font-semibold text-ink-800">{item.skill}</span><span className="text-[11px] text-ink-500">Demand {item.demand}% · Candidate supply {item.candidates}%</span></div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div><div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-ink-400">Role demand</div><div className="h-2 rounded-full bg-ink-50"><div className="h-2 rounded-full bg-primary-600" style={{ width: `${item.demand}%` }} /></div></div>
                  <div><div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-ink-400">Candidate supply</div><div className="h-2 rounded-full bg-ink-50"><div className="h-2 rounded-full bg-emerald-500" style={{ width: `${item.candidates}%` }} /></div></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div><h2 className="font-display text-lg font-semibold text-ink-950">Recruitment insights</h2><p className="mt-1 text-xs text-ink-500">Actionable highlights based on your current pipeline.</p></div>
          <div className="mt-5 space-y-3">
            {[
              { icon: TrendingUpIcon, title: 'Frontend listing is performing best', text: 'It has the highest application conversion at 7.9% and 41 strong-match candidates.' },
              { icon: UsersIcon, title: 'TypeScript is your biggest skill gap', text: 'Demand is high, but only 61% of current candidates list it as a verified skill.' },
              { icon: StarIcon, title: 'Applicant quality is improving', text: 'Average SkillMatch increased to 84%, up 3.1% from the previous period.' },
              { icon: UserIcon, title: 'Interview stage has room to grow', text: 'Only 8.6% of applicants reach interviews. Review the shortlist criteria for strong 85%+ matches.' },
            ].map((insight) => {
              const Icon = insight.icon
              return <div key={insight.title} className="flex gap-3 rounded-xl border border-border p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600"><Icon className="h-4.5 w-4.5" /></div><div><p className="text-sm font-semibold text-ink-900">{insight.title}</p><p className="mt-1 text-xs leading-5 text-ink-500">{insight.text}</p></div></div>
            })}
          </div>
        </Card>
      </section>
    </div>
  )
}
