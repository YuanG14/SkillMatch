import { DashboardLayout } from '@/layouts/DashboardLayout'
import { GridIcon, UsersIcon, BriefcaseIcon, FileTextIcon, ChartIcon, BuildingIcon } from '@/components/ui/icons'
import type { NavItem } from '@/types/navigation'

const companyNavItems: NavItem[] = [
  { label: 'Dashboard', to: '/company', icon: GridIcon },
  { label: 'Candidates', to: '/company/candidates', icon: UsersIcon },
  { label: 'Job Listings', to: '/company/listings', icon: BriefcaseIcon },
  { label: 'Applications', to: '/company/applications', icon: FileTextIcon },
  { label: 'Analytics', to: '/company/analytics', icon: ChartIcon },
  { label: 'Company Profile', to: '/company/profile', icon: BuildingIcon },
]

export function CompanyLayout() {
  return <DashboardLayout navItems={companyNavItems} />
}
