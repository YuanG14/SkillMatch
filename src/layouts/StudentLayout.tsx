import { DashboardLayout } from '@/layouts/DashboardLayout'
import {
  GridIcon,
  SearchIcon,
  BookmarkIcon,
  FileTextIcon,
  UserIcon,
  TargetIcon,
  StarIcon,
} from '@/components/ui/icons'
import type { NavItem } from '@/types/navigation'

const studentNavItems: NavItem[] = [
  { label: 'Dashboard', to: '/student', icon: GridIcon },
  { label: 'Find Internships', to: '/student/internships', icon: SearchIcon },
  { label: 'Saved Internships', to: '/student/saved', icon: BookmarkIcon },
  { label: 'My Applications', to: '/student/applications', icon: FileTextIcon },
  { label: 'My Profile', to: '/student/profile', icon: UserIcon },
  { label: 'Skill Gap Analysis', to: '/student/skill-gap-analysis', icon: TargetIcon },
  { label: 'Recommended', to: '/student/recommended', icon: StarIcon },
]

export function StudentLayout() {
  return <DashboardLayout navItems={studentNavItems} />
}
