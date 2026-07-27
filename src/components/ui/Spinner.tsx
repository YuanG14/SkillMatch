interface SpinnerProps {
  size?: number
  label?: string
}

export function Spinner({ size = 20, label = 'Loading' }: SpinnerProps) {
  return (
    <span className="inline-flex items-center gap-2 text-ink-600" role="status">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="motion-safe:animate-spin"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="var(--color-border)" strokeWidth="3" />
        <path
          d="M22 12a10 10 0 0 0-10-10"
          stroke="var(--color-primary-600)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-sm">{label}</span>
    </span>
  )
}
