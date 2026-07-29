import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon, BellIcon, LogOutIcon } from '@/components/ui/icons'
import { useAuth } from '@/features/auth/useAuth'
import { APP_ROUTES } from '@/constants/routes'

export function DashboardHeader() {
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
    <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-6">
      <div className="flex w-full max-w-sm items-center gap-2 rounded-md border border-border bg-surface-muted px-3 py-2">
        <SearchIcon className="h-4 w-4 text-ink-400" />
        <input
          type="search"
          placeholder="Search internships, companies..."
          className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-md p-2 text-ink-600 hover:bg-surface-muted hover:text-ink-900"
        >
          <BellIcon className="h-5 w-5" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            className="flex items-center gap-2 rounded-md p-1 hover:bg-surface-muted"
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
              className="absolute right-0 top-full z-10 mt-2 w-52 rounded-md border border-border bg-surface py-1 shadow-lg"
            >
              <div className="truncate border-b border-border px-3 py-2 text-xs text-ink-400">
                {profile?.email}
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={() => void handleSignOut()}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ink-700 hover:bg-surface-muted"
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
