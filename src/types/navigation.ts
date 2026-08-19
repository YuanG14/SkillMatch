import type { ComponentType } from 'react'

export interface NavItem {
  label: string
  to: string
  icon: ComponentType<{ className?: string }>
  /**
   * Marks a less-frequently-used item as a candidate for collapsing into the
   * TopNav "More" menu on narrower desktop/laptop widths (lg-xl range).
   * Items without this flag always stay inline. Has no effect on the mobile
   * drawer, which always lists every item.
   */
  overflow?: boolean
}
