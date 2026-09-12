import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Loader2 } from 'lucide-react'
import { contactForm, site } from '@/data/site'
import { sendContactMessage, type ContactMessage } from '@/lib/contact'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Field = 'name' | 'email' | 'phone' | 'message' | 'consent'
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+\d\s()-]{7,}$/

function validate(data: ContactMessage, consent: boolean): Errors {
  const errors: Errors = {}
  if (data.name.trim().length < 2) errors.name = 'Podaj imię i nazwisko.'
  if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Podaj poprawny adres e-mail.'
  if (data.phone.trim() && !PHONE_RE.test(data.phone.trim())) errors.phone = 'Podaj poprawny numer telefonu.'
  if (data.message.trim().length < 10) errors.message = 'Opisz krótko, czego potrzebujesz.'
  if (!consent) errors.consent = 'Zgoda jest potrzebna, żebyśmy mogli odpowiedzieć.'
  return errors
}

const controlClass = (error?: string) =>
  cn(
    'mt-2 block w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-base text-paper placeholder:text-paper/25 transition-colors duration-300 focus:outline-none focus:ring-0',
    error ? 'border-signal' : 'border-paper/20 hover:border-paper/40 focus:border-accent',
  )

type ShellProps = {
  id: string
  label: string
  optional?: boolean
  error?: string
  className?: string
  children: ReactNode
}

function FieldShell({ id, label, optional, error, className, children }: ShellProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-paper/50"
      >
        {label}
        {optional && <span className="normal-case tracking-normal text-paper/30">opcjonalnie</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[0.8125rem] text-signal">
          {error}
        </p>
      )}
    </div>
  )
}

/** Formularz kontaktowy na ciemnym tle sekcji końcowej. */
export function ContactForm() {
  const uid = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  const id = (field: string) => `${uid}-${field}`
  const described = (field: Field) => (errors[field] ? `${id(field)}-error` : undefined)
  const clear = (field: Field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const fd = new FormData(form)

    // pułapka na boty — prawdziwy użytkownik nie widzi tego pola
    if (String(fd.get('website') ?? '')) {
      setStatus('sent')
      return
    }

    const data: ContactMessage = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      service: String(fd.get('service') ?? ''),
      message: String(fd.get('message') ?? ''),
    }

    const found = validate(data, fd.get('consent') === 'on')
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const result = await sendContactMessage(data)
      if (result === 'sent') form.reset()
      setStatus(result)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent' || status === 'mailto') {
    const sent = status === 'sent'
    return (
      <motion.div
        role="status"
        className="flex h-full flex-col items-start justify-center border border-paper/10 p-8 sm:p-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
          <Check className="h-5 w-5 text-ink" strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 font-display text-[1.75rem] font-extrabold uppercase tracking-[-0.03em]">
          {sent ? 'Dziękujemy!' : 'Prawie gotowe'}
        </h3>
        <p className="mt-3 max-w-[40ch] leading-relaxed text-paper/60">
          {sent
            ? 'Wiadomość dotarła. Odpowiemy najszybciej, jak to możliwe.'
            : 'Otworzyliśmy Twój program pocztowy z gotową wiadomością. Wystarczy kliknąć „Wyślij”.'}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 border-b border-paper/30 pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-paper/80 transition-colors hover:border-paper hover:text-paper"
        >
          {sent ? 'Wyślij kolejną wiadomość' : 'Wróć do formularza'}
        </button>
      </motion.div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
      <FieldShell id={id('name')} label="Imię i nazwisko" error={errors.name} className="sm:col-span-2">
        <input
          id={id('name')}
          name="name"
          type="text"
          autoComplete="name"
          aria-required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={described('name')}
          onChange={() => clear('name')}
          className={controlClass(errors.name)}
        />
      </FieldShell>

      <FieldShell id={id('email')} label="E-mail" error={errors.email}>
        <input
          id={id('email')}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={described('email')}
          onChange={() => clear('email')}
          className={controlClass(errors.email)}
        />
      </FieldShell>

      <FieldShell id={id('phone')} label="Telefon" optional error={errors.phone}>
        <input
          id={id('phone')}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={described('phone')}
          onChange={() => clear('phone')}
          className={controlClass(errors.phone)}
        />
      </FieldShell>

      <FieldShell id={id('service')} label="Czego dotyczy zapytanie" optional className="sm:col-span-2">
        <div className="relative">
          <select
            id={id('service')}
            name="service"
            defaultValue=""
            className={cn(controlClass(), 'cursor-pointer appearance-none pr-8')}
          >
            <option value="" className="bg-ink text-paper">
              Wybierz usługę
            </option>
            {contactForm.services.map((service) => (
              <option key={service} value={service} className="bg-ink text-paper">
                {service}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/40"
          />
        </div>
      </FieldShell>

      <FieldShell id={id('message')} label="Wiadomość" error={errors.message} className="sm:col-span-2">
        <textarea
          id={id('message')}
          name="message"
          rows={4}
          aria-required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={described('message')}
          onChange={() => clear('message')}
          placeholder="Np. wymiana gniazdek w mieszkaniu, pomiary po remoncie…"
          className={cn(controlClass(errors.message), 'resize-none')}
        />
      </FieldShell>

      <div className="sm:col-span-2">
        <label
          htmlFor={id('consent')}
          className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-paper/60"
        >
          <input
            id={id('consent')}
            name="consent"
            type="checkbox"
            aria-required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={described('consent')}
            onChange={() => clear('consent')}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-accent"
          />
          <span>{contactForm.consent}</span>
        </label>
        {errors.consent && (
          <p id={`${id('consent')}-error`} className="mt-2 pl-7 text-[0.8125rem] text-signal">
            {errors.consent}
          </p>
        )}
      </div>

      {/* pułapka na boty */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Strona www
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="border-l-2 border-signal pl-4 text-[0.875rem] leading-relaxed text-paper/80 sm:col-span-2"
        >
          Nie udało się wysłać wiadomości. Spróbuj ponownie albo zadzwoń:{' '}
          <a href={site.phoneHref} className="text-paper underline underline-offset-4">
            {site.phoneLabel}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group relative inline-flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-paper px-8 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink transition-opacity duration-300 disabled:cursor-wait disabled:opacity-70 sm:col-span-2 sm:h-16 sm:w-auto sm:justify-self-start"
      >
        <span
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-editorial group-hover:scale-y-100 group-focus-visible:scale-y-100 group-disabled:scale-y-0"
        />
        <span className="relative z-10 inline-flex items-center gap-3">
          {status === 'sending' ? (
            <>
              <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
              Wysyłanie…
            </>
          ) : (
            <>
              Wyślij zapytanie
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1"
              />
            </>
          )}
        </span>
      </button>
    </form>
  )
}
