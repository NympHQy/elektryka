import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type PhotoProps = {
  src: string
  alt: string
  /** Renderowane, gdy pliku brakuje albo nie da się go wczytać. */
  fallback: ReactNode
  className?: string
  /** Zdjęcie widoczne od razu po wejściu na stronę (hero) — bez lazy loadingu. */
  priority?: boolean
}

/**
 * Zdjęcie wypełniające kontener (object-cover) z miękkim pojawieniem się po
 * wczytaniu. Jeśli plik nie istnieje, w ramce zostaje wektorowa ilustracja —
 * strona nigdy nie pokazuje pustego pola ani ikony zepsutego obrazka.
 */
export function Photo({ src, alt, fallback, className, priority = false }: PhotoProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed) return <>{fallback}</>

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={cn(
        'h-full w-full object-cover transition-opacity duration-700 ease-editorial',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  )
}
