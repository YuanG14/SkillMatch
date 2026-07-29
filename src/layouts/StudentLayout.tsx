import { DashboardLayout } from '@/layouts/DashboardLayout'
import {
  HomeIcon,
  BriefcaseIcon,
  FileTextIcon,
  SettingsIcon,
  UserIcon,
} from '@/components/ui/icons'
import type { NavItem } from '@/types/navigation'

const studentNavItems: NavItem[] = [
  { label: 'Dashboard', to: '/student', icon: HomeIcon },
  { label: 'Profile', to: '/student/profile', icon: UserIcon },
  { label: 'Internships', to: '/student/internships', icon: BriefcaseIcon },
  { label: 'Applications', to: '/student/applications', icon: FileTextIcon },
  { label: 'Settings', to: '/student/settings', icon: SettingsIcon },
]

export function StudentLayout() {
  return (
    <DashboardLayout
      navItems={studentNavItems}
      roleLabel="Student account"
      userName="Student"
      userInitial="S"
    />
  )
}
