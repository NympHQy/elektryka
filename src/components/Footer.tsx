import { navItems, site } from '@/data/site'
import { Reveal } from './ui/Reveal'

const YEAR = 2026

export function Footer() {
  return (
    <footer className="border-t border-line pb-10 pt-section">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-gutter">
          <Reveal className="lg:col-span-5">
            <p className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.06em] sm:text-[2.5rem]">
              {site.name}
              <span className="text-accent-600">.</span>
            </p>
            <p className="label mt-3">{site.tagline}</p>
            <p className="mt-7 max-w-[32ch] text-[0.9375rem] leading-relaxed text-ink-500">
              Instalacje, modernizacje i pomiary elektryczne wykonywane z myślą o kolejnych
              dwudziestu latach użytkowania.
            </p>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-3 lg:col-start-7">
            <p className="label">Nawigacja</p>
            <ul className="mt-6 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-underline text-[0.9375rem] text-ink-700 hover:text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-3 lg:col-start-10">
            <p className="label">Kontakt</p>
            <ul className="mt-6 space-y-3 text-[0.9375rem]">
              <li>
                <a href={site.phoneHref} className="link-underline font-display font-bold tracking-[-0.02em]">
                  {site.phoneLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-underline text-ink-700 hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li className="text-ink-500">{site.area}</li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-7 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-500">
            © {YEAR} {site.name}. Wszystkie prawa zastrzeżone.
          </p>
          <a
            href="#top"
            className="link-underline font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-500 hover:text-ink"
          >
            Powrót na górę
          </a>
        </div>
      </div>
    </footer>
  )
}
