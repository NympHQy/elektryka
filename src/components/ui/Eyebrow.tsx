import { cn } from '@/lib/utils'

type EyebrowProps = { children: React.ReactNode; className?: string; dot?: boolean }

/** Mały techniczny nadtytuł sekcji. */
export function Eyebrow({ children, className, dot = true }: EyebrowProps) {
  return (
    <p className={cn('label flex items-center gap-2.5', className)}>
      {dot && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {children}
    </p>
  )
}
