import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { navItems, site } from '@/data/site'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { ButtonLink } from './ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  // blokada scrolla pod otwartym menu mobilnym
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        Przejdź do treści
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-editorial',
          scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-xl' : 'border-b border-transparent',
        )}
      >
        <div
          className={cn(
            'shell flex items-center justify-between transition-[height] duration-500 ease-editorial',
            scrolled ? 'h-[68px]' : 'h-[88px]',
          )}
        >
          <a href="#top" className="group flex items-baseline gap-3" aria-label={`${site.name} — strona główna`}>
            <span className="font-display text-[1.375rem] font-extrabold uppercase tracking-[-0.06em] leading-none">
              {site.name}
              <span className="text-accent-600">.</span>
            </span>
            <span className="hidden font-mono text-[0.5625rem] uppercase tracking-[0.24em] text-ink-500 sm:block">
              {site.tagline}
            </span>
          </a>

          <nav aria-label="Główna" className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-700 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href={site.phoneHref}
              className="hidden sm:inline-flex"
              icon={<Phone className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />}
            >
              Zadzwoń teraz
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Otwórz menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-ink hover:text-paper lg:hidden"
            >
              <Menu className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] bg-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="shell flex h-[88px] items-center justify-between">
              <span className="font-display text-[1.375rem] font-extrabold uppercase tracking-[-0.06em]">
                {site.name}
                <span className="text-accent-600">.</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Zamknij menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobilna" className="shell mt-6 flex flex-col">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-t border-line py-5 font-display text-[2rem] font-semibold tracking-[-0.04em]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.06 + i * 0.05 }}
                >
                  <span className="mr-4 font-mono text-[0.6875rem] align-middle text-ink-300">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="shell absolute inset-x-0 bottom-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.32 }}
            >
              <ButtonLink
                href={site.phoneHref}
                size="lg"
                variant="accent"
                className="w-full"
                icon={<Phone className="h-4 w-4" strokeWidth={2} aria-hidden />}
              >
                {site.phoneLabel}
              </ButtonLink>
              <p className="label mt-5 text-center">{site.area}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
