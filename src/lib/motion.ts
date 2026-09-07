import type { Transition, Variants } from 'framer-motion'

/** Jedna krzywa dla całej strony — spójny, „editorialowy” rytm animacji. */
export const EASE = [0.16, 1, 0.3, 1] as const

export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const

export const baseTransition: Transition = { duration: 0.7, ease: EASE }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: baseTransition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
}

/** Wiersz tekstu wjeżdżający zza maski (overflow-hidden na rodzicu). */
export const maskLine: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
}

/** Linia rysująca się od lewej. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } },
}

export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})
