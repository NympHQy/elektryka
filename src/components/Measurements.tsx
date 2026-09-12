import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { measurementItems, photos, site } from '@/data/site'
import { EASE, viewportOnce } from '@/lib/motion'
import { MeterArt } from './art/MeterArt'
import { Photo } from './ui/Photo'
import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'
import { TextReveal } from './ui/TextReveal'

export function Measurements() {
  const reduce = useReducedMotion()

  return (
    <section id="pomiary" className="scroll-mt-24 bg-surface py-section">
      <div className="shell">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-gutter">
          {/* wizual z przesuniętym akcentowym polem */}
          <motion.div
            className="relative lg:col-span-5"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <motion.span
              aria-hidden
              className="absolute -left-3 -top-3 h-24 w-24 bg-accent sm:-left-5 sm:-top-5 sm:h-32 sm:w-32"
              initial={{ scale: reduce ? 1 : 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-line">
              <Photo
                src={photos.measurements.src}
                alt={photos.measurements.alt}
                fallback={<MeterArt className="h-full w-full" />}
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="label">Rezystancja izolacji · 500 V</span>
              <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-ink-300">Fig. 02</span>
            </div>
          </motion.div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Pomiary · 03</Eyebrow>
            <TextReveal
              lines={['Precyzja,', 'którą można', 'zmierzyć.']}
              className="mt-7 text-d2 font-extrabold uppercase"
            />
            <Reveal delay={0.1} as="p" className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-500">
              Wykonujemy profesjonalne pomiary i kontrole instalacji elektrycznych w Kielcach i okolicach.
            </Reveal>

            <motion.ul
              className="mt-10 border-t border-line"
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            >
              {measurementItems.map((item, i) => (
                <motion.li
                  key={item}
                  className="group flex items-center gap-5 border-b border-line py-4"
                  variants={{
                    hidden: { opacity: 0, x: reduce ? 0 : -12 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.9375rem] text-ink-700 sm:text-base">{item}</span>
                  <span aria-hidden className="ml-auto h-px w-6 bg-line-strong transition-all duration-500 ease-editorial group-hover:w-10 group-hover:bg-accent-600" />
                </motion.li>
              ))}
            </motion.ul>

            <Reveal delay={0.15} className="mt-10">
              <a
                href={site.phoneHref}
                className="group inline-flex items-center gap-4 border-b-2 border-ink pb-2 font-mono text-[0.75rem] uppercase tracking-[0.18em]"
              >
                Zapytaj o pomiary
                <span className="relative block h-4 w-6 overflow-hidden">
                  <ArrowRight
                    className="absolute left-0 top-0 h-4 w-4 transition-transform duration-500 ease-editorial group-hover:translate-x-7"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <ArrowRight
                    className="absolute left-0 top-0 h-4 w-4 -translate-x-7 transition-transform duration-500 ease-editorial group-hover:translate-x-0"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
