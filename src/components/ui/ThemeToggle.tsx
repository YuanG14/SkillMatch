import { MoonIcon, SunIcon } from '@/components/ui/icons'
import { useTheme } from '@/features/theme/useTheme'
import { FOCUS_RING } from '@/utils/a11y'
import { cn } from '@/utils/cn'

const VARIANT_CLASSES = {
  // For headers on the surface background (PublicHeader).
  default: 'text-ink-600 hover:bg-surface-muted hover:text-ink-900',
  // For headers on the primary-600 brand background (TopNav).
  onBrand: 'text-white/85 hover:bg-white/10 hover:text-white',
} as const

interface ThemeToggleProps {
  variant?: keyof typeof VARIANT_CLASSES
  className?: string
}

export function ThemeToggle({ variant = 'default', className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'shrink-0 rounded-full p-2 transition-colors duration-150',
        VARIANT_CLASSES[variant],
        variant === 'onBrand'
          ? 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
          : FOCUS_RING,
        className,
      )}
    >
      {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  )
}
