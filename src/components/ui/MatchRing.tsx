interface MatchRingProps {
  /** Match percentage, 0-100 */
  value: number
  size?: number
  label?: string
}

/**
 * The one signature visual in the SkillMatch UI: a circular indicator of
 * match strength. Used in the landing hero mockup and anywhere a
 * student-to-opportunity match score needs a compact visual.
 */
export function MatchRing({ value, size = 72, label }: MatchRingProps) {
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, value))
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className="inline-flex flex-col items-center gap-1"
      role="img"
      aria-label={`${clamped}% match`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-primary-600)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="font-display absolute inset-0 flex items-center justify-center text-lg font-semibold text-ink-900">
          {clamped}%
        </span>
      </div>
      {label && <span className="text-xs text-ink-600">{label}</span>}
    </div>
  )
}
