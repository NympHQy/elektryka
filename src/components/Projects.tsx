import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/site'
import { EASE, viewportOnce } from '@/lib/motion'
import { ProjectArt } from './art/ProjectArt'
import { SectionHeader } from './ui/SectionHeader'

/** Nieregularny grid: różne proporcje i przesunięcia w pionie. */
const LAYOUT = [
  'lg:col-span-7 aspect-[4/3]',
  'lg:col-span-5 lg:mt-24 aspect-[3/4]',
  'lg:col-span-5 aspect-square',
  'lg:col-span-7 lg:-mt-16 aspect-[16/10]',
]

export function Projects() {
  const reduce = useReducedMotion()

  return (
    <section id="realizacje" className="scroll-mt-24 py-section">
      <div className="shell">
        <SectionHeader
          eyebrow="Realizacje · 05"
          meta="Wybór z ostatnich dwóch lat"
          lines={['Wybrane', 'realizacje.']}
          intro="Projekty prowadzone od pierwszego pomiaru po odbiór — mieszkania, domy i przestrzenie komercyjne."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-gutter gap-y-12 sm:mt-20 lg:grid-cols-12">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              className={LAYOUT[i]?.replace(/aspect-\S+/, '') ?? ''}
              initial={{ opacity: 0, y: reduce ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <a href="#kontakt" className="group block">
                <div
                  className={`relative w-full overflow-hidden border border-line ${
                    LAYOUT[i]?.match(/aspect-\S+/)?.[0] ?? 'aspect-[4/3]'
                  }`}
                >
                  <div className="absolute inset-0 transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.045]">
                    <ProjectArt variant={project.art} className="h-full w-full" />
                  </div>

                  {/* welon + strzałka */}
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 ease-editorial group-hover:bg-ink/[0.06]" />
                  <span
                    aria-hidden
                    className="absolute right-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-ink opacity-0 transition-all duration-500 ease-editorial group-hover:translate-y-0 group-hover:opacity-100 sm:right-5 sm:top-5"
                  >
                    <ArrowUpRight className="h-4 w-4 text-accent" strokeWidth={1.75} />
                  </span>

                  <span className="absolute left-4 top-4 bg-surface/90 px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-ink-700 backdrop-blur-sm sm:left-5 sm:top-5">
                    {project.category}
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-4">
                  <div>
                    <h3 className="font-display text-[1.0625rem] font-bold uppercase tracking-[-0.02em] sm:text-[1.25rem]">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
                      {project.meta}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-1 h-px w-8 shrink-0 bg-line-strong transition-all duration-500 ease-editorial group-hover:w-14 group-hover:bg-accent-600"
                  />
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
