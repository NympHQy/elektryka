import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'accent' | 'outline'
type Size = 'md' | 'lg'

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  children: ReactNode
}

const base =
  'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-mono uppercase tracking-[0.14em] transition-colors duration-500 ease-editorial'

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.6875rem]',
  lg: 'h-14 px-7 text-[0.75rem] sm:h-16 sm:px-9',
}

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-paper hover:text-ink',
  accent: 'bg-accent text-ink hover:text-ink',
  outline: 'border border-line-strong text-ink hover:text-ink',
}

/** Przycisk-link z akcentowym wypełnieniem wjeżdżającym od dołu. */
export function ButtonLink({
  variant = 'solid',
  size = 'md',
  icon,
  children,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(base, sizes[size], variants[variant], className)} {...props}>
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-editorial group-hover:scale-y-100 group-focus-visible:scale-y-100',
          variant === 'accent' ? 'bg-ink' : 'bg-accent',
        )}
      />
      <span
        className={cn(
          'relative z-10 inline-flex items-center gap-2.5 transition-colors duration-500',
          variant === 'accent' && 'group-hover:text-accent group-focus-visible:text-accent',
        )}
      >
        {icon}
        {children}
      </span>
    </a>
  )
}
