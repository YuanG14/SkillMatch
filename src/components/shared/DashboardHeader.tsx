import { SearchIcon, BellIcon } from '@/components/ui/icons'

interface DashboardHeaderProps {
  userName: string
  userInitial: string
}

export function DashboardHeader({ userName, userInitial }: DashboardHeaderProps) {
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
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
            {userInitial}
          </span>
          <span className="hidden text-sm font-medium text-ink-900 sm:inline">
            {userName}
          </span>
        </div>
      </div>
    </header>
  )
}
