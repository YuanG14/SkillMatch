import type { ComponentType } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import type { IconProps } from '@/components/ui/icons'

interface FeatureCardProps {
  icon: ComponentType<IconProps>
  title: string
  description: string
}

/** Icon + title + description card, used in feature grids. */
export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-3 p-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
          <Icon width={19} height={19} />
        </span>
        <h3 className="font-display text-base font-semibold text-ink-900">{title}</h3>
        <p className="text-sm text-ink-600">{description}</p>
      </CardContent>
    </Card>
  )
}
