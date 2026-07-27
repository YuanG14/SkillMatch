import { Link, Navigate } from 'react-router-dom'
import { APP_ROUTES, ROLE_DASHBOARD_ROUTES } from '@/constants/routes'
import { PageStatus } from '@/features/auth/ProtectedRoute'
import { useAuth } from '@/features/auth/useAuth'

export function HomePage() {
  const { isLoading, user, profile } = useAuth()
  if (isLoading) return <PageStatus message="Loading…" />
  if (user && !user.email_confirmed_at) return <Navigate to={APP_ROUTES.verifyEmail} replace />
  if (profile) return <Navigate to={ROLE_DASHBOARD_ROUTES[profile.role]} replace />
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-white text-slate-900">
      <h1 className="text-3xl font-semibold">SkillMatch</h1>
      <p className="text-slate-500">Smart internship and skill matching platform.</p>
      <div className="flex gap-3"><Link className="rounded-md bg-blue-700 px-4 py-2 text-white" to={APP_ROUTES.login}>Sign in</Link><Link className="rounded-md border border-slate-300 px-4 py-2" to={APP_ROUTES.register}>Create account</Link></div>
    </main>
  )
}
