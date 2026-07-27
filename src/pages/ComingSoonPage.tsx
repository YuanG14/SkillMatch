import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'

interface ComingSoonPageProps {
  title: string
}

export function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <EmptyState
        title={title}
        description="This part of SkillMatch is being built in an upcoming sprint."
        action={
          <Link to="/">
            <Button variant="outline">Back to home</Button>
          </Link>
        }
      />
    </div>
  )
}
