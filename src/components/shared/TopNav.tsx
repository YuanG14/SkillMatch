import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/constants/routes'
import { BellIcon, ChevronDownIcon, LogOutIcon, MenuIcon, XIcon } from '@/components/ui/icons'
import { useAuth } from '@/features/auth/useAuth'
import { FOCUS_RING } from '@/utils/a11y'
import { cn } from '@/utils/cn'
import type { NavItem } from '@/types/navigation'

const ON_BRAND_FOCUS_RING =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

function BrandMark() {
  return (
    <Link to={APP_ROUTES.home} className={cn('inline-flex shrink-0 items-center gap-2.5 rounded-md', ON_BRAND_FOCUS_RING)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-lg font-bold text-white">
        S
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-white">SkillMatch</span>
    </Link>
  )
}

function TopNavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  return (
    <NavLink
      to={item.to}
      end
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-150',
          ON_BRAND_FOCUS_RING,
          isActive ? 'bg-white text-primary-700 shadow-sm' : 'text-white/85 hover:bg-white/10 hover:text-white',
        )
      }
    >
      <item.icon className="h-[17px] w-[17px] shrink-0" />
      {item.label}
    </NavLink>
  )
}

interface TopNavProps {
  navItems: NavItem[]
}

export function TopNav({ navItems }: TopNavProps) {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isAccountMenuOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isAccountMenuOpen])

  const displayName = profile?.fullName ?? profile?.email ?? 'Account'
  const initial = displayName.charAt(0).toUpperCase()
  const roleLabel = profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : ''

  async function handleSignOut() {
    setIsAccountMenuOpen(false)
    await signOut()
    navigate(APP_ROUTES.login, { replace: true })
  }

  return (
    <header className="sticky top-0 z-40 bg-primary-600 shadow-md">
      <div className="flex h-[72px] items-center gap-4 px-4 sm:px-6 lg:px-8 xl:px-10">
        <BrandMark />

        {/* Center nav -- persistent from lg upward, matching the desktop-first target breakpoints. */}
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-1.5">
          {navItems.map((item) => (
            <TopNavLink key={item.to} item={item} />
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0 xl:gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className={cn(
              'relative rounded-full p-2 text-white/85 transition-colors duration-150 hover:bg-white/10 hover:text-white',
              ON_BRAND_FOCUS_RING,
            )}
          >
            <BellIcon className="h-5 w-5" />
            <span
              aria-hidden="true"
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-600 ring-2 ring-primary-600"
            />
          </button>

          <div className="relative" ref={accountMenuRef}>
            <button
              type="button"
              onClick={() => setIsAccountMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isAccountMenuOpen}
              className={cn(
                'flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors duration-150 hover:bg-white/10',
                ON_BRAND_FOCUS_RING,
              )}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-primary-700">
                {initial}
              </span>
              <span className="hidden flex-col items-start leading-tight sm:flex">
                <span className="text-sm font-semibold text-white">{displayName}</span>
                <span className="text-xs text-white/70">{roleLabel}</span>
              </span>
              <ChevronDownIcon
                className={cn('hidden h-4 w-4 text-white/70 transition-transform duration-150 sm:block', isAccountMenuOpen && 'rotate-180')}
              />
            </button>

            {isAccountMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-10 mt-2 w-52 origin-top-right rounded-lg border border-border bg-surface py-1 shadow-lg motion-safe:animate-[scale-in_0.15s_ease-out]"
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

          {/* Nav items collapse into this trigger below lg. */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen((open) => !open)}
            aria-label={isMobileNavOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isMobileNavOpen}
            className={cn(
              'rounded-full p-2 text-white/85 transition-colors duration-150 hover:bg-white/10 hover:text-white lg:hidden',
              ON_BRAND_FOCUS_RING,
            )}
          >
            {isMobileNavOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileNavOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/15 px-4 py-3 lg:hidden">
          {navItems.map((item) => (
            <TopNavLink key={item.to} item={item} onNavigate={() => setIsMobileNavOpen(false)} />
          ))}
        </nav>
      )}
    </header>
  )
}
