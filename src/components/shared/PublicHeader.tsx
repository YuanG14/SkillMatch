import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { APP_ROUTES, ROLE_DASHBOARD_ROUTES } from '@/constants/routes'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/Button'
import { MenuIcon, XIcon } from '@/components/ui/icons'
import { useAuth } from '@/features/auth/useAuth'
import { cn } from '@/utils/cn'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: APP_ROUTES.howItWorks },
  { label: 'For Students', to: APP_ROUTES.forStudents },
  { label: 'For Companies', to: '/#for-companies' },
]

function isLinkActive(pathname: string, to: string) {
  if (to.startsWith('/#')) return false
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function PublicHeader() {
  const { profile, signOut } = useAuth()
  const { pathname } = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Close on Escape, outside click, and prevent body scroll while open.
  useEffect(() => {
    if (!isMobileMenuOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }

    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = previousOverflow
    }
  }, [isMobileMenuOpen])

  async function handleSignOut() {
    await signOut()
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link.to)
            return (
              <Link
                key={link.label}
                to={link.to}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900',
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary-600 transition-transform duration-200 ease-out group-hover:scale-x-100',
                    active && 'scale-x-100',
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            {profile ? (
              <>
                <Link
                  to={ROLE_DASHBOARD_ROUTES[profile.role]}
                  className="text-sm font-medium text-ink-700 transition-colors hover:text-ink-900"
                >
                  Dashboard
                </Link>
                <Button size="sm" variant="outline" onClick={() => void handleSignOut()}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to={APP_ROUTES.login}
                  className="text-sm font-medium text-ink-700 transition-colors hover:text-ink-900"
                >
                  Log In
                </Link>
                <Link to={APP_ROUTES.register}>
                  <Button size="sm" className="transition-transform active:scale-95">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-ink-700 transition-colors hover:bg-surface-muted hover:text-ink-900 md:hidden"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <MenuIcon
                className={cn(
                  'absolute transition-all duration-200',
                  isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100',
                )}
                width={20}
                height={20}
              />
              <XIcon
                className={cn(
                  'absolute transition-all duration-200',
                  isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0',
                )}
                width={20}
                height={20}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav-menu"
        className={cn(
          'overflow-hidden border-t border-border bg-surface transition-all duration-300 ease-out md:hidden',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 border-t-0 opacity-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link.to)
            return (
              <Link
                key={link.label}
                to={link.to}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-ink-700 hover:bg-surface-muted hover:text-ink-900',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-col gap-2 border-t border-border px-6 py-4 sm:hidden">
          {profile ? (
            <>
              <Link
                to={ROLE_DASHBOARD_ROUTES[profile.role]}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-surface-muted hover:text-ink-900"
              >
                Dashboard
              </Link>
              <Button
                variant="outline"
                className="justify-center"
                onClick={() => void handleSignOut()}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link
                to={APP_ROUTES.login}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-surface-muted hover:text-ink-900"
              >
                Log In
              </Link>
              <Link to={APP_ROUTES.register}>
                <Button className="w-full justify-center">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
