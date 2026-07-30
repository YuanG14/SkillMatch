import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { HOW_IT_WORKS_SECTIONS } from '@/components/how-it-works/howItWorksSections'
import { useActiveSection } from '@/hooks/useActiveSection'
import { scrollToSection } from '@/utils/scrollToSection'
import { cn } from '@/utils/cn'

// PublicHeader is h-16 (64px). Add the nav's own approximate height plus a
// little breathing room so a section heading never lands underneath either.
const SCROLL_OFFSET_PX = 140

// How long a clicked pill stays highlighted before handing control back to
// scroll-driven detection. Long enough for the jump + intersection update to
// settle, short enough that a real subsequent scroll takes over quickly.
const CLICK_OVERRIDE_MS = 700

function pillClasses(active: boolean) {
  return cn(
    'shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600',
    active
      ? 'border-primary-100 bg-primary-50 text-primary-700'
      : 'border-transparent text-ink-600 hover:bg-surface-muted hover:text-ink-900',
  )
}

export function HowItWorksSectionNav() {
  const sectionIds = useMemo(() => HOW_IT_WORKS_SECTIONS.map((s) => s.id), [])
  const observedActiveId = useActiveSection(sectionIds, SCROLL_OFFSET_PX)
  const [clickedId, setClickedId] = useState<string | null>(null)
  const clickTimeoutRef = useRef<number | undefined>(undefined)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  // Prefer whatever the user just clicked over the scroll-driven value --
  // an instant scrollIntoView jump can land a section's top exactly on the
  // observer's boundary with zero measurable overlap, which some browsers
  // never report as "intersecting". Highlighting the clicked pill directly
  // means the nav is never stuck out of sync with an instant jump.
  const activeId = clickedId ?? observedActiveId

  useEffect(() => {
    return () => window.clearTimeout(clickTimeoutRef.current)
  }, [])

  // Direct link support: /how-it-works#skill-gaps scrolls there after load.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash || !sectionIds.includes(hash)) return

    const timeout = window.setTimeout(() => scrollToSection(hash), 80)
    return () => window.clearTimeout(timeout)
    // Only ever run once, on mount -- later hash changes come from clicks below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep the active pill in view on the mobile horizontally-scrolling nav.
  useEffect(() => {
    itemRefs.current[activeId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeId])

  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    scrollToSection(id, 'auto')
    window.history.replaceState(null, '', `#${id}`)

    setClickedId(id)
    window.clearTimeout(clickTimeoutRef.current)
    clickTimeoutRef.current = window.setTimeout(() => setClickedId(null), CLICK_OVERRIDE_MS)

    // Mouse clicks (event.detail > 0) leave a stale focus-visible ring on the
    // pill in some browsers even after the active section moves elsewhere as
    // the user scrolls. Keyboard activation (detail === 0) keeps focus so the
    // ring stays visible, which is what accessibility needs.
    if (event.detail > 0) {
      event.currentTarget.blur()
    }
  }

  return (
    <nav
      aria-label="How It Works sections"
      className="sticky top-16 z-30 border-b border-border bg-surface/95 backdrop-blur"
    >
      <div className="mx-auto max-w-7xl px-6 py-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400 sm:hidden">
          Explore SkillMatch
        </p>

        {/* Desktop / tablet: wraps into rows of compact pills. */}
        <div className="hidden flex-wrap items-center justify-center gap-2 sm:flex">
          <span className="mr-1 shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-400">
            Explore SkillMatch
          </span>
          {HOW_IT_WORKS_SECTIONS.map((section) => (
            <a
              key={section.id}
              ref={(el) => {
                itemRefs.current[section.id] = el
              }}
              href={`#${section.id}`}
              onClick={(event) => handleClick(event, section.id)}
              aria-current={activeId === section.id ? 'page' : undefined}
              className={pillClasses(activeId === section.id)}
            >
              {section.label}
            </a>
          ))}
        </div>

        {/* Mobile: horizontally scrollable, scrollbar hidden. */}
        <div className="-mx-6 flex gap-2 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
          {HOW_IT_WORKS_SECTIONS.map((section) => (
            <a
              key={section.id}
              ref={(el) => {
                itemRefs.current[section.id] = el
              }}
              href={`#${section.id}`}
              onClick={(event) => handleClick(event, section.id)}
              aria-current={activeId === section.id ? 'page' : undefined}
              className={pillClasses(activeId === section.id)}
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
