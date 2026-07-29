interface ProgressBarProps {
  /** 0-100 */
  value: number
  label?: string
}

/**
 * A linear progress indicator. Used for completion-style metrics (e.g.
 * profile completion) -- MatchRing stays reserved for match-score displays,
 * so the two visual languages don't blur together.
 */
export function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-600">{label}</span>
          <span className="font-display font-semibold text-ink-900">{clamped}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-muted"
      >
        <div
          className="h-full rounded-full bg-primary-600 transition-[width] duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
