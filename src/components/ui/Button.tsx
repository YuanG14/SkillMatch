import type { ButtonHTMLAttributes, ReactNode } from 'react'
import {
  buttonClasses,
  type ButtonVariant,
  type ButtonSize,
} from '@/utils/buttonVariants'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  )
}
