import { Link } from 'react-router-dom'
import { ErrorState } from '@/components/ui/ErrorState'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center px-6">
      <ErrorState
        title="Page not found"
        description="The page you're looking for doesn't exist or may have moved."
        action={
          <Link to="/">
            <Button variant="outline">Back to home</Button>
          </Link>
        }
      />
    </div>
  )
}
