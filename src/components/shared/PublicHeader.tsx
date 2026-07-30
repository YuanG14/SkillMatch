import { Link } from 'react-router-dom'
import { APP_ROUTES, ROLE_DASHBOARD_ROUTES } from '@/constants/routes'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/useAuth'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'For Students', to: APP_ROUTES.forStudents },
  { label: 'For Companies', to: '/#for-companies' },
]

export function PublicHeader() {
  const { profile, signOut } = useAuth()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {profile ? (
            <>
              <Link
                to={ROLE_DASHBOARD_ROUTES[profile.role]}
                className="hidden text-sm font-medium text-ink-700 hover:text-ink-900 sm:inline"
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
                className="hidden text-sm font-medium text-ink-700 hover:text-ink-900 sm:inline"
              >
                Log In
              </Link>
              <Link to={APP_ROUTES.register}>
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
