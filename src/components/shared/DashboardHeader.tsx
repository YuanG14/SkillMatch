import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon, BellIcon, LogOutIcon, MenuIcon } from '@/components/ui/icons'
import { useAuth } from '@/features/auth/useAuth'
import { APP_ROUTES } from '@/constants/routes'
import { FOCUS_RING } from '@/utils/a11y'
import { cn } from '@/utils/cn'

interface DashboardHeaderProps {
  /** Shows the hamburger trigger below md and opens the mobile nav drawer. */
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const displayName = profile?.fullName ?? profile?.email ?? 'Account'
  const initial = displayName.charAt(0).toUpperCase()

  async function handleSignOut() {
    setIsMenuOpen(false)
    await signOut()
    navigate(APP_ROUTES.login, { replace: true })
  }

  return (
    <header className="flex h-16 items-center justify-between gap-3 border-b border-border bg-surface px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className={cn(
          'shrink-0 rounded-md p-2 text-ink-600 transition-colors duration-150 hover:bg-surface-muted hover:text-ink-900 md:hidden',
          FOCUS_RING,
        )}
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <div className="flex w-full min-w-0 max-w-sm items-center gap-2 rounded-md border border-border bg-surface-muted px-3 py-2">
        <SearchIcon className="h-4 w-4 shrink-0 text-ink-400" />
        <input
          type="search"
          aria-label="Search internships, companies"
          placeholder="Search..."
          className="w-full min-w-0 bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className={cn(
            'rounded-md p-2 text-ink-600 transition-colors duration-150 hover:bg-surface-muted hover:text-ink-900',
            FOCUS_RING,
          )}
        >
          <BellIcon className="h-5 w-5" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            className={cn(
              'flex items-center gap-2 rounded-md p-1 transition-colors duration-150 hover:bg-surface-muted',
              FOCUS_RING,
            )}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
              {initial}
            </span>
            <span className="hidden text-sm font-medium text-ink-900 sm:inline">
              {displayName}
            </span>
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-10 mt-2 w-52 origin-top-right rounded-md border border-border bg-surface py-1 shadow-lg motion-safe:animate-[scale-in_0.15s_ease-out]"
            >
              <div className="truncate border-b border-border px-3 py-2 text-xs text-ink-400">
                {profile?.email}
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={() => void handleSignOut()}
                className={cn(
                  'flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ink-700 transition-colors duration-150 hover:bg-surface-muted',
                  FOCUS_RING,
                )}
              >
                <LogOutIcon className="h-4 w-4" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
