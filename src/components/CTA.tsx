import { motion, useReducedMotion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { ctaHeadline, ctaText, site } from '@/data/site'
import { EASE, viewportOnce } from '@/lib/motion'
import { TextReveal } from './ui/TextReveal'

const GRID_IMAGE =
  'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)'

const GLOW = 'radial-gradient(circle, rgba(216,244,75,0.20), transparent 62%)'

export function CTA() {
  const reduce = useReducedMotion()

  return (
    <section id="kontakt" className="scroll-mt-24 px-gutter pb-section pt-4">
      <div className="relative mx-auto w-full max-w-shell overflow-hidden bg-ink px-6 py-20 text-paper sm:px-12 sm:py-28 lg:px-20 lg:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: GRID_IMAGE, backgroundSize: '72px 72px' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full"
          style={{ background: GLOW }}
          initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.4, ease: EASE }}
        />

        <div className="relative">
          <p className="flex items-center gap-2.5 font-mono text-micro uppercase text-paper/50">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            Kontakt · 06
          </p>

          <TextReveal
            lines={ctaHeadline}
            className="mt-8 text-d2 font-extrabold uppercase text-paper"
          />

          <motion.p
            className="mt-7 max-w-[56ch] text-[1.0625rem] leading-relaxed text-paper/60 sm:text-[1.1875rem]"
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            {ctaText}
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col items-start gap-8 sm:mt-14 lg:flex-row lg:items-center lg:justify-between"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <a
              href={site.phoneHref}
              className="group relative inline-flex w-full items-center justify-between gap-6 overflow-hidden rounded-full bg-accent px-7 py-5 text-ink transition-colors duration-500 ease-editorial sm:w-auto sm:px-10 sm:py-7"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-editorial group-hover:scale-y-100 group-focus-visible:scale-y-100"
              />
              <span className="relative z-10 flex items-center gap-4">
                <Phone className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                <span className="font-display text-[1.125rem] font-extrabold tracking-[-0.03em] sm:text-[1.625rem]">
                  {site.phoneLabel}
                </span>
              </span>
              <span className="relative z-10 hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] opacity-60 sm:block">
                Zadzwoń
              </span>
            </a>

            <div className="flex flex-col gap-1.5">
              <a href={`mailto:${site.email}`} className="link-underline text-paper/80 transition-colors hover:text-paper">
                {site.email}
              </a>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-paper/40">
                {site.area}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
