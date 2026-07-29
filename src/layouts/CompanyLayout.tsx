import { DashboardLayout } from '@/layouts/DashboardLayout'
import {
  HomeIcon,
  BuildingIcon,
  BriefcaseIcon,
  UsersIcon,
  SettingsIcon,
} from '@/components/ui/icons'
import type { NavItem } from '@/types/navigation'

const companyNavItems: NavItem[] = [
  { label: 'Dashboard', to: '/company', icon: HomeIcon },
  { label: 'Company Profile', to: '/company/profile', icon: BuildingIcon },
  { label: 'Listings', to: '/company/listings', icon: BriefcaseIcon },
  { label: 'Candidates', to: '/company/candidates', icon: UsersIcon },
  { label: 'Settings', to: '/company/settings', icon: SettingsIcon },
]

export function CompanyLayout() {
  return <DashboardLayout navItems={companyNavItems} roleLabel="Company account" />
}
