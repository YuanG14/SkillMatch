import type { ReactNode } from 'react'
import { Logo } from '@/components/shared/Logo'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center bg-surface-muted px-4 py-10">
      <section className="w-full max-w-md rounded-xl border border-border bg-surface p-8 shadow-sm">
        <Logo />
        {children}
      </section>
    </main>
  )
}
