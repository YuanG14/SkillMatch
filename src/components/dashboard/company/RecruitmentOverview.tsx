import { Card } from '@/components/ui/Card'
import type { MockRecruitmentOverview } from '@/mock/companyDashboardData'

interface RecruitmentOverviewProps {
  overview: MockRecruitmentOverview
}

/**
 * Compact pipeline snapshot -- a lighter-weight complement to the top KPI
 * row, giving a quick funnel read (applications -> shortlisted ->
 * interviews -> offers) without repeating the same card treatment.
 */
export function RecruitmentOverview({ overview }: RecruitmentOverviewProps) {
  const items = [
    { label: 'Applications', value: overview.applications },
    { label: 'Shortlisted', value: overview.shortlisted },
    { label: 'Interviews', value: overview.interviews },
    { label: 'Offers', value: overview.offers },
  ]

  return (
    <Card className="grid grid-cols-2 divide-y divide-border sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1 p-5">
          <p className="font-display text-2xl font-semibold text-ink-950">{item.value}</p>
          <p className="text-sm text-ink-600">{item.label}</p>
        </div>
      ))}
    </Card>
  )
}
