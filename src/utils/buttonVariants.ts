import { cn } from '@/utils/cn'
import { FOCUS_RING } from '@/utils/a11y'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-primary-50 text-primary-700 hover:bg-primary-100',
  outline: 'bg-surface text-ink-700 border border-border-strong hover:border-ink-400',
  ghost: 'bg-transparent text-ink-700 hover:bg-surface-muted',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
}

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    FOCUS_RING,
    'disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )
}
