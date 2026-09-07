import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Liczba dobijająca do wartości docelowej po wejściu w viewport.
 * Bez okrągłych wskaźników — sama typografia.
 */
export function Counter({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduce = useReducedMotion()

  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : value

  const [current, setCurrent] = useState(match ? 0 : target)

  useEffect(() => {
    if (!match || !inView) return
    if (reduce) {
      setCurrent(target)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setCurrent(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration, reduce, match])

  return (
    <span ref={ref} className="tabular-nums">
      {match ? current : ''}
      {suffix}
    </span>
  )
}
