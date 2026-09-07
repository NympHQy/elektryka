import { motion, useReducedMotion } from 'framer-motion'
import type { ElementType } from 'react'
import { EASE, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

type TextRevealProps = {
  lines: readonly string[]
  as?: ElementType
  className?: string
  lineClassName?: string
  delay?: number
  /** Ostatnia linia dostaje akcentowe podkreślenie rysowane po odsłonięciu. */
  accentLast?: boolean
}

/**
 * Nagłówek wieloliniowy — każda linia wyjeżdża zza maski.
 *
 * Uwaga: obserwatorem widoczności jest wrapper z `overflow-hidden`, a nie
 * przesunięty tekst w środku. Przesunięty element jest w całości przycięty,
 * więc IntersectionObserver nigdy nie uznałby go za widoczny.
 */
export function TextReveal({
  lines,
  as: Tag = 'h2',
  className,
  lineClassName,
  delay = 0,
  accentLast = false,
}: TextRevealProps) {
  const reduce = useReducedMotion()

  return (
    <Tag className={className}>
      {lines.map((line, i) => {
        const isLast = i === lines.length - 1
        return (
          <motion.span
            key={line}
            className="block overflow-hidden pb-[0.06em]"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.span
              className={cn('block', lineClassName)}
              variants={{
                hidden: { y: reduce ? 0 : '110%' },
                show: { y: '0%', transition: { duration: 0.9, ease: EASE, delay: delay + i * 0.08 } },
              }}
            >
              {accentLast && isLast ? (
                <span className="relative inline-block">
                  {line}
                  <motion.span
                    aria-hidden
                    className="absolute -bottom-[0.04em] left-0 h-[0.07em] w-full origin-left bg-accent"
                    variants={{
                      hidden: { scaleX: reduce ? 1 : 0 },
                      show: {
                        scaleX: 1,
                        transition: { duration: 1, ease: EASE, delay: delay + i * 0.08 + 0.45 },
                      },
                    }}
                  />
                </span>
              ) : (
                line
              )}
            </motion.span>
          </motion.span>
        )
      })}
    </Tag>
  )
}
