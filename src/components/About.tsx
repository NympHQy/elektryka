import { motion } from 'framer-motion'
import { aboutParagraphs, site, stats } from '@/data/site'
import { drawLine, EASE, viewportOnce } from '@/lib/motion'
import { Counter } from './ui/Counter'
import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'
import { TextReveal } from './ui/TextReveal'

export function About() {
  return (
    <section id="o-nas" className="scroll-mt-24 py-section">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-gutter">
          {/* asymetria: manifest po lewej, z akcentową pionową krechą */}
          <div className="lg:col-span-8 lg:col-start-1">
            <Eyebrow>O firmie · 02</Eyebrow>
            <div className="relative mt-8 pl-6 sm:pl-8">
              <motion.span
                aria-hidden
                className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-[3px] origin-top bg-accent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1, ease: EASE }}
              />
              <TextReveal
                lines={['Dobra instalacja', 'jest niewidoczna.', 'Jej jakość — nie.']}
                className="text-d2 font-extrabold uppercase"
              />
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-10 lg:pt-28">
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} as="p" className="mb-5 text-[1.0625rem] leading-relaxed text-ink-500 last:mb-0">
                {p}
              </Reveal>
            ))}
            <Reveal delay={0.2} className="mt-8 flex items-center gap-3 border-t border-line pt-6">
              <span className="font-display text-lg font-extrabold tracking-[-0.05em]">{site.name}</span>
              <span className="label">Zespół wykonawczy</span>
            </Reveal>
          </div>
        </div>

        {/* statystyki — bez liczników kołowych, sama typografia i hairline'y */}
        <motion.div
          className="mt-20 border-t border-line sm:mt-28"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.span
            aria-hidden
            className="block h-px w-full origin-left bg-ink"
            variants={drawLine}
          />
          <dl className="grid grid-cols-1 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col border-b border-line py-9 sm:border-b-0 sm:border-r sm:border-line sm:py-12 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-8 lg:[&:not(:first-child)]:pl-14"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.15 + i * 0.1 } },
                }}
              >
                <dt className="label order-2 mt-4 block">{stat.label}</dt>
                <dd className="order-1 text-stat font-extrabold uppercase leading-none">
                  <Counter value={stat.value} />
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
