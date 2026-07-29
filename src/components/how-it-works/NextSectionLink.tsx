import type { MouseEvent } from 'react'
import { ArrowRightIcon } from '@/components/ui/icons'
import { scrollToSection } from '@/utils/scrollToSection'

interface NextSectionLinkProps {
  targetId: string
  label: string
}

/** Subtle "Next: X →" text link -- navigation, not a CTA. */
export function NextSectionLink({ targetId, label }: NextSectionLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    scrollToSection(targetId)
    window.history.replaceState(null, '', `#${targetId}`)
  }

  return (
    <div className="mt-12 flex justify-center">
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        Next: {label}
        <ArrowRightIcon
          className="transition-transform group-hover:translate-x-0.5"
          width={16}
          height={16}
        />
      </a>
    </div>
  )
}
