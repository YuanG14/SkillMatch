import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { APP_ROUTES } from '@/constants/routes'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <Link className="text-xl font-bold text-blue-700" to={APP_ROUTES.home}>SkillMatch</Link>
        {children}
      </section>
    </main>
  )
}
