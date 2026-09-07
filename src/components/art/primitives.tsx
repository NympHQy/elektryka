import type { ReactNode } from 'react'

export const PALETTE = {
  bgTop: '#F2F2EE',
  bgBottom: '#E4E4DF',
  white: '#FFFFFF',
  shell: '#FBFBF9',
  stroke: '#DCDCD5',
  strokeSoft: '#E8E8E2',
  ink: '#0E0E0C',
  gray: '#B7B7AF',
  accent: '#D8F44B',
} as const

type ArtBackdropProps = { id: string; children?: ReactNode }

/** Wspólne tło ilustracji: miękki gradient + techniczna siatka. */
export function ArtBackdrop({ id, children }: ArtBackdropProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={PALETTE.bgTop} />
          <stop offset="100%" stopColor={PALETTE.bgBottom} />
        </linearGradient>
        <pattern id={`${id}-grid`} width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke={PALETTE.ink} strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
        <filter id={`${id}-shadow`} x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="26" stdDeviation="26" floodColor={PALETTE.ink} floodOpacity="0.12" />
        </filter>
        {children}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-bg)`} />
      <rect width="100%" height="100%" fill={`url(#${id}-grid)`} />
    </>
  )
}
