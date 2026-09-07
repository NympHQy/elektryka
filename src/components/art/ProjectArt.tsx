import { useId } from 'react'
import type { Project } from '@/data/site'
import { ArtBackdrop, PALETTE } from './primitives'

type Props = { variant: Project['art']; className?: string }

/** Cztery wektorowe winiety realizacji — jeden spójny język graficzny. */
export function ProjectArt({ variant, className }: Props) {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      <ArtBackdrop id={id} />
      {variant === 'house' && <House />}
      {variant === 'switchboard' && <Switchboard />}
      {variant === 'office' && <Office />}
      {variant === 'measure' && <Measure />}
    </svg>
  )
}

function House() {
  return (
    <g>
      <path d="M180 300 400 150l220 150v210H180z" fill={PALETTE.white} stroke={PALETTE.stroke} strokeWidth="2" />
      <path d="M150 306 400 132l250 174" fill="none" stroke={PALETTE.ink} strokeWidth="3" strokeLinecap="round" />
      <path d="M180 380h440M400 300v210" stroke={PALETTE.strokeSoft} strokeWidth="2" />
      <g fill="none" stroke={PALETTE.ink} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="7 7">
        <path d="M280 510V430h100v-60h150" />
        <path d="M480 510v-90h100" />
        <path d="M280 340h60v-40" />
      </g>
      <g fill={PALETTE.ink}>
        <circle cx="280" cy="430" r="6" />
        <circle cx="480" cy="420" r="6" />
        <circle cx="340" cy="300" r="6" />
      </g>
      <circle cx="580" cy="420" r="11" fill={PALETTE.accent} />
      <rect x="520" y="352" width="40" height="36" rx="4" fill={PALETTE.white} stroke={PALETTE.stroke} strokeWidth="2" />
    </g>
  )
}

function Switchboard() {
  return (
    <g>
      <rect x="120" y="110" width="560" height="380" rx="16" fill={PALETTE.white} stroke={PALETTE.stroke} strokeWidth="2" />
      <rect x="152" y="146" width="496" height="308" rx="8" fill={PALETTE.shell} stroke={PALETTE.strokeSoft} />
      {[0, 1].map((row) => (
        <g key={row}>
          <rect x="176" y={196 + row * 150} width="448" height="12" rx="2" fill="#EBEBE5" />
          {Array.from({ length: 11 }, (_, m) => {
            const x = 178 + m * 41
            const accent = row === 0 && m === 6
            return (
              <g key={m}>
                <rect x={x} y={168 + row * 150} width="34" height="106" rx="4" fill={PALETTE.white} stroke={PALETTE.stroke} strokeWidth="1.5" />
                <rect x={x + 7} y={180 + row * 150} width="20" height="6" rx="3" fill="#ECECE5" />
                <rect x={x + 10} y={228 + row * 150} width="14" height="26" rx="3" fill={accent ? PALETTE.accent : '#C9C9C1'} />
              </g>
            )
          })}
        </g>
      ))}
    </g>
  )
}

function Office() {
  return (
    <g>
      <path d="M0 210h800M0 470h800" stroke={PALETTE.strokeSoft} strokeWidth="2" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => {
          const w = 150 - r * 18
          const gap = 40 - r * 6
          const rowW = 4 * w + 3 * gap
          const x = 400 - rowW / 2 + c * (w + gap)
          const y = 168 + r * 104
          const lit = r === 1 && c === 2
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width={w} height="16" rx="8" fill={lit ? PALETTE.accent : PALETTE.white} stroke={PALETTE.stroke} strokeWidth="1.5" />
              {lit && <rect x={x} y={y + 20} width={w} height="90" fill={PALETTE.accent} opacity="0.14" />}
            </g>
          )
        }),
      )}
      <path d="M120 470h560v96H120z" fill={PALETTE.white} opacity="0.5" />
      <path d="M120 470h560" stroke={PALETTE.stroke} strokeWidth="2" />
    </g>
  )
}

function Measure() {
  return (
    <g>
      <g stroke={PALETTE.ink} strokeOpacity="0.07">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={`v${i}`} d={`M${100 + i * 75} 120V480`} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <path key={`h${i}`} d={`M100 ${120 + i * 72}h600`} />
        ))}
      </g>
      <path
        d="M100 300c50-150 100-150 150 0s100 150 150 0 100-150 150 0 100 150 150 0"
        fill="none"
        stroke={PALETTE.ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M100 300c50-92 100-92 150 0s100 92 150 0 100-92 150 0 100 92 150 0"
        fill="none"
        stroke={PALETTE.accent}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M400 120v360" stroke={PALETTE.ink} strokeOpacity="0.25" strokeDasharray="6 6" />
      <circle cx="400" cy="300" r="8" fill={PALETTE.ink} />
      <rect x="470" y="150" width="176" height="56" rx="10" fill={PALETTE.white} stroke={PALETTE.stroke} strokeWidth="1.5" />
      <text x="494" y="186" fill={PALETTE.ink} fontFamily="ui-monospace, monospace" fontSize="24" letterSpacing="1">
        230,4 V
      </text>
    </g>
  )
}
