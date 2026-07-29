interface StatProps {
  value: string
  label: string
}

/** A single value + label pair, e.g. for hero trust indicators. */
export function Stat({ value, label }: StatProps) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-sm text-ink-600">{label}</p>
    </div>
  )
}
