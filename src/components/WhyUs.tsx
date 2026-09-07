import { motion } from 'framer-motion'
import { reasons } from '@/data/site'
import { EASE, viewportOnce } from '@/lib/motion'
import { SectionHeader } from './ui/SectionHeader'

export function WhyUs() {
  return (
    <section className="py-section">
      <div className="shell">
        <SectionHeader
          eyebrow="Dlaczego my · 04"
          meta="Zasady pracy"
          lines={['Cztery zasady,', 'których nie omijamy.']}
          headingClassName="text-d3"
        />

        <motion.div
          className="mt-16 grid grid-cols-1 border-t border-line sm:mt-20 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        >
          {reasons.map((reason) => (
            <motion.article
              key={reason.index}
              className="group border-b border-line px-0 py-10 sm:px-8 sm:py-14 sm:first:pl-0 lg:border-r lg:last:border-r-0 lg:px-10 lg:py-16"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-ink-300">{reason.index}</span>
                <span aria-hidden className="h-px w-5 bg-line-strong transition-all duration-500 ease-editorial group-hover:w-9 group-hover:bg-accent-600" />
              </div>
              <h3 className="mt-6 font-display text-[1.25rem] font-bold uppercase tracking-[-0.02em] sm:text-[1.375rem]">
                {reason.title}
              </h3>
              <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-500">{reason.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
