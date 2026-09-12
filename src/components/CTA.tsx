import { motion, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { ctaHeadline, ctaText, site } from '@/data/site'
import { EASE, viewportOnce } from '@/lib/motion'
import { ContactForm } from './ContactForm'
import { TextReveal } from './ui/TextReveal'

const GRID_IMAGE =
  'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)'

const GLOW = 'radial-gradient(circle, rgba(216,244,75,0.20), transparent 62%)'

export function CTA() {
  const reduce = useReducedMotion()

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { duration: 0.8, ease: EASE, delay },
  })

  return (
    <section id="kontakt" className="scroll-mt-24 px-gutter pb-section pt-4">
      <div className="on-dark relative mx-auto w-full max-w-shell overflow-hidden bg-ink px-6 py-16 text-paper sm:px-12 sm:py-24 lg:px-20 lg:py-28">
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

          <TextReveal lines={ctaHeadline} className="mt-8 text-d2 font-extrabold uppercase text-paper" />

          <div className="mt-12 grid grid-cols-1 gap-16 sm:mt-16 lg:grid-cols-12 lg:gap-x-8">
            {/* lewa kolumna — opis i kontakt bezpośredni */}
            <motion.div className="lg:col-span-5" {...reveal(0.2)}>
              <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-paper/60 sm:text-[1.1875rem]">
                {ctaText}
              </p>

              <a
                href={site.phoneHref}
                className="group relative mt-10 inline-flex w-full items-center justify-between gap-6 overflow-hidden rounded-full bg-accent px-7 py-5 text-ink sm:w-auto sm:px-9 sm:py-6"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-editorial group-hover:scale-y-100 group-focus-visible:scale-y-100"
                />
                <span className="relative z-10 flex items-center gap-4">
                  <Phone className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                  <span className="font-display text-[1.125rem] font-extrabold tracking-[-0.03em] sm:text-[1.5rem]">
                    {site.phoneLabel}
                  </span>
                </span>
                <span className="relative z-10 hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] opacity-60 sm:block">
                  Zadzwoń
                </span>
              </a>

              <ul className="mt-10 space-y-4 border-t border-paper/10 pt-8">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="group inline-flex items-center gap-3 text-paper/80 transition-colors hover:text-paper"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-paper/40" strokeWidth={1.75} aria-hidden />
                    <span className="border-b border-paper/20 pb-0.5 transition-colors group-hover:border-paper">
                      {site.email}
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-paper/50">
                  <MapPin className="h-4 w-4 shrink-0 text-paper/40" strokeWidth={1.75} aria-hidden />
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em]">{site.area}</span>
                </li>
              </ul>
            </motion.div>

            {/* prawa kolumna — formularz */}
            <motion.div className="lg:col-span-6 lg:col-start-7" {...reveal(0.3)}>
              <p className="mb-8 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-paper/50">
                Albo napisz do nas
              </p>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
