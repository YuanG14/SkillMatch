import type { ReactNode } from 'react'
import { Reveal } from '@/components/how-it-works/Reveal'
import { cn } from '@/utils/cn'

interface JourneyStepProps {
  number: string
  title: string
  description: string
  visual: ReactNode
  reverse?: boolean
  delay?: number
}

export function JourneyStep({
  number,
  title,
  description,
  visual,
  reverse = false,
  delay = 0,
}: JourneyStepProps) {
  return (
    <Reveal delay={delay} className="grid items-center gap-8 lg:grid-cols-2">
      <div className={cn(reverse && 'lg:order-2')}>
        <span className="font-display text-3xl font-semibold text-primary-600">
          {number}
        </span>
        <h3 className="font-display mt-2 text-xl font-semibold text-ink-950">{title}</h3>
        <p className="mt-2 max-w-md text-ink-600">{description}</p>
      </div>
      <div className={cn('flex justify-center', reverse && 'lg:order-1')}>{visual}</div>
    </Reveal>
  )
}
