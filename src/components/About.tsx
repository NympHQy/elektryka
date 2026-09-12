import { motion } from 'framer-motion'
import { aboutParagraphs, site } from '@/data/site'
import { EASE, viewportOnce } from '@/lib/motion'
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
              <span className="font-display text-lg font-extrabold uppercase tracking-[-0.05em]">{site.name}</span>
              <span className="label">Zespół wykonawczy</span>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  )
}
