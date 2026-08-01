import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from '@/components/shared/Logo'
import { XIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'
import { FOCUS_RING } from '@/utils/a11y'
import type { NavItem } from '@/types/navigation'

interface SidebarProps {
  items: NavItem[]
  roleLabel: string
  /** Controls the mobile/tablet drawer variant. Ignored at md+ (always visible there). */
  isOpen?: boolean
  onClose?: () => void
}

/**
 * Shared nav content between the persistent desktop rail and the mobile
 * drawer, so the two never drift out of sync.
 */
function SidebarNav({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 p-4">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
              FOCUS_RING,
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-ink-600 hover:bg-surface-muted hover:text-ink-900',
            )
          }
        >
          <item.icon className="h-[18px] w-[18px] shrink-0" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export function Sidebar({ items, roleLabel, isOpen = false, onClose }: SidebarProps) {
  // Lock body scroll and allow Escape-to-close while the mobile drawer is open.
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Persistent desktop/tablet rail */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface md:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Logo />
        </div>
        <SidebarNav items={items} />
        <div className="border-t border-border p-4 text-xs text-ink-400">{roleLabel}</div>
      </aside>

      {/* Mobile drawer -- overlay + slide-in panel, hidden entirely at md+ */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!isOpen}
      >
        <div
          onClick={onClose}
          className={cn(
            'absolute inset-0 bg-ink-950/40 transition-opacity duration-200',
            isOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className={cn(
            'absolute inset-y-0 left-0 flex w-72 max-w-[80vw] flex-col bg-surface shadow-xl transition-transform duration-200 ease-out',
            isOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation"
              className={cn(
                'rounded-md p-2 text-ink-600 hover:bg-surface-muted hover:text-ink-900',
                FOCUS_RING,
              )}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <SidebarNav items={items} onNavigate={onClose} />
          <div className="border-t border-border p-4 text-xs text-ink-400">{roleLabel}</div>
        </aside>
      </div>
    </>
  )
}
