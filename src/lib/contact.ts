import { site } from '@/data/site'

export type ContactMessage = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

/** 'sent' — wiadomość wysłana na skrzynkę; 'mailto' — otwarty program pocztowy. */
export type ContactResult = 'sent' | 'mailto'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * Wysyłka formularza bez własnego backendu.
 * Z kluczem VITE_WEB3FORMS_KEY wiadomość trafia prosto na skrzynkę firmy.
 * Bez klucza formularz nadal działa: otwiera program pocztowy z gotową treścią.
 */
export async function sendContactMessage(msg: ContactMessage): Promise<ContactResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
  const subject = `Zapytanie ze strony${msg.service ? ` — ${msg.service}` : ''}`

  if (!accessKey) {
    window.location.href = buildMailto(subject, msg)
    return 'mailto'
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: `${site.name} — formularz kontaktowy`,
      name: msg.name,
      email: msg.email,
      phone: msg.phone || '—',
      service: msg.service || '—',
      message: msg.message,
    }),
  })

  const result = (await response.json().catch(() => null)) as { success?: boolean } | null
  if (!response.ok || !result?.success) throw new Error('Wysyłka formularza nie powiodła się')
  return 'sent'
}

function buildMailto(subject: string, msg: ContactMessage): string {
  const body = [
    `Imię i nazwisko: ${msg.name}`,
    `E-mail: ${msg.email}`,
    `Telefon: ${msg.phone || '—'}`,
    `Usługa: ${msg.service || '—'}`,
    '',
    msg.message,
  ].join('\n')
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
