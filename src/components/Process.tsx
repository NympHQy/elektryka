import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { processSteps } from '@/data/site'
import { EASE, viewportOnce } from '@/lib/motion'
import { SectionHeader } from './ui/SectionHeader'

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="bg-surface py-section">
      <div className="shell">
        <SectionHeader
          eyebrow="Proces · 05"
          meta="Cztery etapy"
          lines={['Prosty proces.', 'Profesjonalny efekt.']}
        />

        <div ref={ref} className="relative mt-16 sm:mt-24">
          {/* oś: pozioma na desktopie, pionowa na mobile */}
          <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-line md:left-0 md:top-[7px] md:h-px md:w-full">
            <motion.span
              aria-hidden
              className="block h-full w-full origin-top bg-ink md:origin-left"
              style={reduce ? undefined : { scaleY: progress, scaleX: progress }}
            />
          </div>

          <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-gutter">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.index}
                className="relative pl-10 md:pl-0 md:pt-12"
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              >
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-ink bg-paper md:top-0"
                  initial={{ scale: reduce ? 1 : 0.4 }}
                  whileInView={{ scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 + 0.1 }}
                >
                  <span className="absolute inset-[3px] rounded-full bg-accent" />
                </motion.span>

                <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-ink-300">{step.index}</p>
                <h3 className="mt-3 font-display text-[1.25rem] font-bold uppercase tracking-[-0.02em] sm:text-[1.5rem]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[30ch] text-[0.9375rem] leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
