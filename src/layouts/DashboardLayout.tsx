import { Outlet } from 'react-router-dom'
import { TopNav } from '@/components/shared/TopNav'
import type { NavItem } from '@/types/navigation'

interface DashboardLayoutProps {
  navItems: NavItem[]
}

export function DashboardLayout({ navItems }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-muted">
      <TopNav navItems={navItems} />
      <main>
        {/*
          Full-width desktop shell: the nav bar spans edge to edge and the
          content region below scales its side padding up with the viewport
          instead of clamping to a narrow centered column, per the
          1280px-1920px full-width target. Individual pages own the vertical
          rhythm between their own sections (hero, KPI row, two-column
          content) using the same gap scale.
        */}
        <div className="flex w-full flex-col gap-6 px-4 py-6 motion-safe:animate-[fade-in_0.25s_ease-out] sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10 2xl:px-14">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
