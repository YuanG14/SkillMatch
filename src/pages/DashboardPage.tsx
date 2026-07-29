import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/auth/useAuth'
import type { UserRole } from '@/types/auth'

interface DashboardPageProps { role: UserRole }
export function DashboardPage({ role }: DashboardPageProps) {
  const { profile, signOut } = useAuth(); const navigate = useNavigate()
  async function handleSignOut() { await signOut(); navigate(APP_ROUTES.login, { replace: true }) }
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-6"><section className="w-full max-w-xl rounded-xl bg-white p-8 shadow-sm"><p className="text-sm font-medium uppercase tracking-wide text-blue-700">{role} dashboard</p><h1 className="mt-2 text-3xl font-semibold">Welcome, {profile?.fullName ?? profile?.email}</h1><p className="mt-3 text-slate-600">Your account is authenticated and ready for the next SkillMatch features.</p><button className="mt-6 rounded-md border border-slate-300 px-4 py-2" onClick={() => void handleSignOut()} type="button">Sign out</button></section></main>
}
