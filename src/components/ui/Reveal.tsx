import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE, viewportOnce } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'span' | 'p'
}

/** Pojedyncze, subtelne wejście elementu przy scrollu. */
export function Reveal({ children, delay = 0, y = 18, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as] as typeof motion.div

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}
