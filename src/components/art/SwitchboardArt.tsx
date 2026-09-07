import { useId } from 'react'
import { ArtBackdrop, PALETTE } from './primitives'

const ROWS = [0, 1]
const MODULES = Array.from({ length: 17 }, (_, i) => i)
const ACCENT = { row: 0, module: 9 }
const OFF = new Set([14, 15, 16])

/**
 * Rozdzielnica modułowa w kadrze poziomym — obudowa celowo wychodzi poza ramkę,
 * żeby kompozycja czytała się jak wycinek zdjęcia, a nie ikona na środku.
 */
export function SwitchboardArt({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      viewBox="0 0 1120 700"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Nowoczesna rozdzielnica elektryczna z uporządkowanymi zabezpieczeniami"
    >
      <ArtBackdrop id={id} />

      <g filter={`url(#${id}-shadow)`}>
        <rect x="-64" y="56" width="1248" height="700" rx="28" fill={PALETTE.white} />
      </g>
      <rect x="-64" y="56" width="1248" height="700" rx="28" fill="none" stroke={PALETTE.stroke} />

      {/* listwa opisowa */}
      <path d="M-64 152h1248" stroke={PALETTE.strokeSoft} />
      <text
        x="208"
        y="114"
        fill={PALETTE.ink}
        opacity="0.5"
        fontFamily="ui-monospace, monospace"
        fontSize="16"
        letterSpacing="3"
      >
        ROZDZIELNICA · 34 MOD.
      </text>
      <circle cx="912" cy="108" r="7" fill={PALETTE.accent} />
      <circle cx="886" cy="108" r="7" fill={PALETTE.strokeSoft} />

      {/* wnętrze */}
      <rect x="-24" y="184" width="1168" height="540" rx="14" fill={PALETTE.shell} stroke={PALETTE.strokeSoft} />

      {ROWS.map((row) => {
        const y = 216 + row * 230
        return (
          <g key={row}>
            {/* szyna DIN */}
            <rect x="-10" y={y + 74} width="1140" height="18" rx="3" fill="#EBEBE5" />
            {MODULES.map((m) => {
              const x = -6 + m * 68
              const isAccent = row === ACCENT.row && m === ACCENT.module
              const off = row === 1 && OFF.has(m)
              return (
                <g key={m}>
                  <rect x={x} y={y} width="60" height="166" rx="7" fill={PALETTE.white} stroke={PALETTE.stroke} />
                  <rect x={x + 13} y={y + 20} width="34" height="8" rx="4" fill="#ECECE5" />
                  <rect x={x + 13} y={y + 36} width="22" height="6" rx="3" fill="#F1F1EA" />
                  <rect
                    x={x + 18}
                    y={off ? y + 112 : y + 96}
                    width="24"
                    height="44"
                    rx="6"
                    fill={isAccent ? PALETTE.accent : off ? '#E0E0D9' : '#C9C9C1'}
                  />
                </g>
              )
            })}
            {/* pasek opisu obwodów */}
            <rect x="-6" y={y + 186} width="1136" height="10" rx="5" fill="#E9E9E2" />
          </g>
        )
      })}
    </svg>
  )
}
