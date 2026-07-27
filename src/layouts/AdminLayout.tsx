import { DashboardLayout } from '@/layouts/DashboardLayout'
import { HomeIcon, UsersIcon, ChartIcon, SettingsIcon } from '@/components/ui/icons'
import type { NavItem } from '@/types/navigation'

const adminNavItems: NavItem[] = [
  { label: 'Overview', to: '/admin', icon: HomeIcon },
  { label: 'Users', to: '/admin/users', icon: UsersIcon },
  { label: 'Analytics', to: '/admin/analytics', icon: ChartIcon },
  { label: 'Settings', to: '/admin/settings', icon: SettingsIcon },
]

export function AdminLayout() {
  return (
    <DashboardLayout
      navItems={adminNavItems}
      roleLabel="Admin account"
      userName="Admin"
      userInitial="A"
    />
  )
}
