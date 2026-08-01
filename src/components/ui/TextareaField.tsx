import { useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string
}

export function TextareaField({
  label,
  hint,
  id,
  className,
  ...props
}: TextareaFieldProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const hintId = hint ? `${textareaId}-hint` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-sm font-medium text-ink-700">
        {label}
      </label>
      <textarea
        id={textareaId}
        aria-describedby={hintId}
        rows={4}
        className={cn(
          'rounded-md border border-border-strong bg-surface px-3 py-2 text-sm text-ink-900',
          'placeholder:text-ink-400 transition-[border-color,box-shadow] duration-150',
          'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600',
          className,
        )}
        {...props}
      />
      {hint && (
        <p id={hintId} className="text-xs text-ink-400">
          {hint}
        </p>
      )}
    </div>
  )
}
