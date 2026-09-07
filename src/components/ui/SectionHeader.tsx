import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'
import { TextReveal } from './TextReveal'

type SectionHeaderProps = {
  eyebrow: string
  lines: readonly string[]
  intro?: string
  meta?: string
  headingClassName?: string
}

/**
 * Wspólny nagłówek sekcji: hairline z nadtytułem, wielki nagłówek na pełnej
 * szerokości i akapit dosunięty do prawej kolumny.
 */
export function SectionHeader({ eyebrow, lines, intro, meta, headingClassName }: SectionHeaderProps) {
  return (
    <header>
      <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        {meta && (
          <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ink-300 sm:block">
            {meta}
          </p>
        )}
      </div>

      <TextReveal
        lines={lines}
        className={cn('mt-8 text-d2 font-extrabold uppercase sm:mt-10', headingClassName)}
      />

      {intro && (
        <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-12">
          <p className="max-w-[48ch] text-[1.0625rem] leading-relaxed text-ink-500 lg:col-span-5 lg:col-start-8">
            {intro}
          </p>
        </div>
      )}
    </header>
  )
}
