import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, Check, Phone } from 'lucide-react'
import { heroHeadline, heroSubline, heroTrust, photos, site } from '@/data/site'
import { EASE } from '@/lib/motion'
import { SwitchboardArt } from './art/SwitchboardArt'
import { Photo } from './ui/Photo'
import { ButtonLink } from './ui/Button'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '10%'])
  const artScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])

  return (
    <section ref={ref} id="top" className="relative pt-[116px] sm:pt-[132px] lg:pt-[144px]">
      <div className="shell">
        {/* wiersz metadanych nad nagłówkiem */}
        <motion.div
          className="flex items-center justify-between gap-6 border-b border-line pb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <p className="label flex items-center gap-2.5">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {site.area}
          </p>
          <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ink-300 sm:block">
            Fig. 01 — Rozdzielnica modułowa
          </p>
        </motion.div>

        {/* nagłówek na pełnej szerokości — 3 linie, bez łamania */}
        <h1 className="mt-8 text-d1 font-extrabold uppercase sm:mt-10">
          {heroHeadline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.03em]">
              <motion.span
                className="block"
                initial={{ y: reduce ? 0 : '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: EASE, delay: 0.18 + i * 0.09 }}
              >
                {i === heroHeadline.length - 1 ? (
                  <span className="relative inline-block">
                    {line}
                    <motion.span
                      aria-hidden
                      className="absolute -bottom-[0.01em] left-0 h-[0.06em] w-full origin-left bg-accent"
                      initial={{ scaleX: reduce ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
                    />
                  </span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-x-8">
          {/* lewa kolumna — treść i CTA, wyrównana do dołu wizualu */}
          <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-end lg:pb-2">
            <motion.p
              className="max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink-500 sm:text-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            >
              {heroSubline}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.68 }}
            >
              <ButtonLink href={site.phoneHref} size="lg" icon={<Phone className="h-4 w-4" strokeWidth={2} aria-hidden />}>
                Zadzwoń teraz
              </ButtonLink>
              <ButtonLink
                href="#uslugi"
                size="lg"
                variant="outline"
                icon={<ArrowDownRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />}
              >
                Poznaj nasze usługi
              </ButtonLink>
            </motion.div>
          </div>

          {/* prawa kolumna — wizual */}
          <motion.div
            className="relative lg:col-span-6 lg:col-start-7"
            initial={{ opacity: 0, y: reduce ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-paper sm:aspect-[16/10]">
              <motion.div style={{ y: artY, scale: artScale }} className="absolute inset-0">
                <Photo
                  src={photos.hero.src}
                  alt={photos.hero.alt}
                  priority
                  fallback={<SwitchboardArt className="h-full w-full" />}
                />
              </motion.div>
            </div>

            <motion.div
              className="relative z-10 -mt-10 ml-4 w-[min(20rem,80%)] border border-line bg-surface p-5 shadow-[0_24px_60px_-30px_rgba(14,14,12,0.45)] sm:-mt-14 sm:ml-6 lg:-ml-12"
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1 }}
            >
              <p className="label">Protokół pomiarowy</p>
              <p className="mt-3 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em]">
                Każdy obwód sprawdzony, opisany i udokumentowany.
              </p>
              <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
                <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-500">
                  Wynik: pozytywny
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* pasek zaufania */}
        <motion.ul
          className="mt-16 grid grid-cols-1 border-t border-line sm:mt-20 sm:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 1.05 } } }}
        >
          {heroTrust.map((item) => (
            <motion.li
              key={item}
              className="flex items-center gap-3 border-b border-line py-5 sm:border-b-0 sm:border-r sm:border-line sm:py-6 sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6 lg:[&:not(:first-child)]:pl-10"
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
            >
              <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
                <Check className="h-3 w-3 text-ink" strokeWidth={2.5} />
              </span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-700">{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
