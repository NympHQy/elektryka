import { marqueeItems } from '@/data/site'

/** Nieskończony, wolny pasek — CSS keyframes zamiast JS (płynność + zero re-renderów). */
export function Marquee() {
  const sequence = [...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <section aria-hidden className="mt-section border-y border-line bg-surface">
      <div className="mask-fade-x overflow-hidden py-5">
        <div className="flex w-max animate-marquee items-center gap-12 sm:gap-16">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-12 sm:gap-16">
              {sequence.map((item, i) => (
                <span key={`${copy}-${i}`} className="flex items-center gap-12 sm:gap-16">
                  <span className="whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-ink-700">
                    {item}
                  </span>
                  <span className="h-1 w-1 rotate-45 bg-accent-600" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
