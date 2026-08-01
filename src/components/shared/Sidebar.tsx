import { NavLink } from 'react-router-dom'
import { Logo } from '@/components/shared/Logo'
import { cn } from '@/utils/cn'
import { FOCUS_RING } from '@/utils/a11y'
import type { NavItem } from '@/types/navigation'

interface SidebarProps {
  items: NavItem[]
  roleLabel: string
}

export function Sidebar({ items, roleLabel }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface md:flex">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                FOCUS_RING,
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-ink-600 hover:bg-surface-muted hover:text-ink-900',
              )
            }
          >
            <item.icon className="h-[18px] w-[18px]" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-4 text-xs text-ink-400">{roleLabel}</div>
    </aside>
  )
}
