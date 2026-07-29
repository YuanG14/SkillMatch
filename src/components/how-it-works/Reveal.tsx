import type { HTMLAttributes } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  /** Stagger delay in ms, applied via inline style -- keep small and subtle. */
  delay?: number
}

/**
 * Fades and slides a section into place the first time it scrolls into the
 * viewport. Respects prefers-reduced-motion globally via index.css.
 */
export function Reveal({ delay = 0, className, style, children, ...props }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className,
      )}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
