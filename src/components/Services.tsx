import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services, site } from '@/data/site'
import { EASE, viewportOnce } from '@/lib/motion'
import { SectionHeader } from './ui/SectionHeader'

export function Services() {
  const reduce = useReducedMotion()

  return (
    <section id="uslugi" className="scroll-mt-24 py-section">
      <div className="shell">
        <SectionHeader
          eyebrow="Usługi · 01"
          meta="06 obszarów"
          lines={['Kompleksowa', 'obsługa elektryczna.']}
          intro="Sześć obszarów, w których pracujemy na co dzień — od pierwszego przewodu po protokół końcowy. Zakres dobieramy do budynku, nie do cennika."
        />

        <ul className="mt-16 border-t border-line sm:mt-20">
          {services.map((service, i) => (
            <motion.li
              key={service.index}
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.05 }}
            >
              <a
                href="#kontakt"
                className="group relative flex flex-col gap-3 border-b border-line py-7 transition-colors duration-500 ease-editorial hover:bg-surface md:grid md:grid-cols-12 md:items-center md:gap-6 md:py-9"
                aria-label={`${service.title} — zapytaj o wycenę`}
              >
                {/* akcentowa krecha wysuwająca się przy hoverze */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />

                <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-ink-300 transition-colors duration-500 group-hover:text-ink md:col-span-1 md:px-1">
                  {service.index}
                </span>

                <h3 className="text-d4 font-bold uppercase tracking-[-0.03em] transition-transform duration-700 ease-editorial md:col-span-5 md:group-hover:translate-x-2">
                  {service.title}
                </h3>

                <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-500 transition-all duration-700 ease-editorial md:col-span-5 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {service.description}
                </p>

                <span
                  aria-hidden
                  className="hidden justify-end md:col-span-1 md:flex"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all duration-500 ease-editorial group-hover:border-ink group-hover:bg-ink">
                    <ArrowUpRight
                      className="h-4 w-4 -translate-x-px translate-y-px text-ink transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent"
                      strokeWidth={1.75}
                    />
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <p className="mt-10 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
          Nie ma na liście tego, czego szukasz?{' '}
          <a href={site.phoneHref} className="link-underline text-ink">
            Zadzwoń — doradzimy
          </a>
        </p>
      </div>
    </section>
  )
}
