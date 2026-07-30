import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import logoImage from '@/assets/logo.png'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('inline-flex items-center', className)}>
      <img src={logoImage} alt="SkillMatch" className="h-9 w-auto sm:h-10" />
    </Link>
  )
}
