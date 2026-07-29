import { useId } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  hint?: string
}

export function SelectField({
  label,
  hint,
  id,
  className,
  children,
  ...props
}: SelectFieldProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const hintId = hint ? `${selectId}-hint` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-ink-700">
        {label}
      </label>
      <select
        id={selectId}
        aria-describedby={hintId}
        className={cn(
          'h-10 rounded-md border border-border-strong bg-surface px-3 text-sm text-ink-900',
          'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {hint && (
        <p id={hintId} className="text-xs text-ink-400">
          {hint}
        </p>
      )}
    </div>
  )
}
