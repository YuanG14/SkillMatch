import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/shared/Sidebar'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import type { NavItem } from '@/types/navigation'

interface DashboardLayoutProps {
  navItems: NavItem[]
  roleLabel: string
  userName: string
  userInitial: string
}

export function DashboardLayout({
  navItems,
  roleLabel,
  userName,
  userInitial,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-surface-muted">
      <Sidebar items={navItems} roleLabel={roleLabel} />
      <div className="flex flex-1 flex-col">
        <DashboardHeader userName={userName} userInitial={userInitial} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
