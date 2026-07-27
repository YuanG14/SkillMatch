import { Logo } from '@/components/shared/Logo'

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-10 text-sm text-ink-600 sm:flex-row sm:justify-between">
        <Logo />
        <p>&copy; {new Date().getFullYear()} SkillMatch. All rights reserved.</p>
      </div>
    </footer>
  )
}
