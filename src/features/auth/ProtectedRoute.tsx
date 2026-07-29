import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { APP_ROUTES, ROLE_DASHBOARD_ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/auth/useAuth'
import type { UserRole } from '@/types/auth'

interface ProtectedRouteProps {
  allowedRoles: readonly UserRole[]
  children: ReactNode
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { isLoading, session, user, profile } = useAuth()
  const location = useLocation()

  if (isLoading) return <PageStatus message="Loading your account…" />
  if (!session || !user) return <Navigate to={APP_ROUTES.login} replace state={{ from: location }} />
  if (!user.email_confirmed_at) return <Navigate to={APP_ROUTES.verifyEmail} replace />
  if (!profile) return <PageStatus message="Setting up your account…" />
  if (!allowedRoles.includes(profile.role)) {
    return <Navigate to={ROLE_DASHBOARD_ROUTES[profile.role]} replace />
  }
  return <>{children}</>
}

export function PageStatus({ message }: { message: string }) {
  return <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-600">{message}</main>
}
