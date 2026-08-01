import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/shared/Sidebar'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import type { NavItem } from '@/types/navigation'

interface DashboardLayoutProps {
  navItems: NavItem[]
  roleLabel: string
}

export function DashboardLayout({ navItems, roleLabel }: DashboardLayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface-muted">
      <Sidebar
        items={navItems}
        roleLabel={roleLabel}
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader onMenuClick={() => setIsNavOpen(true)} />
        <main className="flex-1">
          {/*
            True desktop container: content never stretches edge-to-edge past
            1440px, and horizontal padding scales up at larger breakpoints
            instead of a single fixed value. Individual pages are responsible
            for the vertical rhythm between their own sections (hero, KPI
            row, two-column content) using the same gap scale.
          */}
          <div className="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

