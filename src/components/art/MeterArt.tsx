import { useId } from 'react'
import { ArtBackdrop, PALETTE } from './primitives'

const TICKS = Array.from({ length: 11 }, (_, i) => i)

/** Miernik instalacji + protokół pomiarowy — ilustracja sekcji „Pomiary”. */
export function MeterArt({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      viewBox="0 0 720 880"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Profesjonalny miernik instalacji elektrycznych obok protokołu pomiarowego"
    >
      <ArtBackdrop id={id} />

      {/* protokół w tle */}
      <g transform="rotate(-6 470 380)">
        <rect x="392" y="150" width="256" height="340" rx="8" fill={PALETTE.white} stroke={PALETTE.strokeSoft} />
        <rect x="416" y="184" width="96" height="8" rx="4" fill={PALETTE.ink} opacity="0.5" />
        <g fill="#E9E9E2">
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x="416" y={216 + i * 22} width={i % 3 === 2 ? 128 : 208} height="6" rx="3" />
          ))}
        </g>
        <rect x="416" y="424" width="64" height="22" rx="11" fill={PALETTE.accent} />
      </g>

      {/* korpus miernika */}
      <g filter={`url(#${id}-shadow)`}>
        <rect x="112" y="176" width="440" height="576" rx="34" fill={PALETTE.white} />
      </g>
      <rect x="112" y="176" width="440" height="576" rx="34" fill="none" stroke={PALETTE.stroke} />
      <rect x="128" y="192" width="408" height="544" rx="26" fill="none" stroke={PALETTE.strokeSoft} />

      {/* wyświetlacz */}
      <rect x="156" y="224" width="352" height="176" rx="14" fill="#101010" />
      <text x="180" y="264" fill="#7E7E76" fontFamily="ui-monospace, monospace" fontSize="14" letterSpacing="2.4">
        R ISO · 500 V DC
      </text>
      <text x="180" y="344" fill={PALETTE.white} fontFamily="ui-monospace, monospace" fontSize="72" letterSpacing="-2">
        &gt;500
      </text>
      <text x="404" y="344" fill={PALETTE.accent} fontFamily="ui-monospace, monospace" fontSize="26">
        MΩ
      </text>
      <rect x="180" y="360" width="72" height="22" rx="11" fill={PALETTE.accent} />
      <text x="196" y="376" fill={PALETTE.ink} fontFamily="ui-monospace, monospace" fontSize="12" letterSpacing="1.6">
        PASS
      </text>

      {/* pokrętło */}
      <circle cx="332" cy="530" r="96" fill={PALETTE.shell} stroke={PALETTE.strokeSoft} />
      <circle cx="332" cy="530" r="62" fill={PALETTE.white} stroke={PALETTE.stroke} />
      {TICKS.map((t) => {
        const a = (-215 + t * 25) * (Math.PI / 180)
        const r1 = 78
        const r2 = 88
        return (
          <line
            key={t}
            x1={332 + Math.cos(a) * r1}
            y1={530 + Math.sin(a) * r1}
            x2={332 + Math.cos(a) * r2}
            y2={530 + Math.sin(a) * r2}
            stroke={PALETTE.gray}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )
      })}
      <line x1="332" y1="530" x2="332" y2="482" stroke={PALETTE.ink} strokeWidth="5" strokeLinecap="round" />
      <circle cx="332" cy="530" r="9" fill={PALETTE.ink} />
      <circle cx="332" cy="434" r="7" fill={PALETTE.accent} />

      {/* przyciski */}
      <rect x="452" y="470" width="60" height="60" rx="16" fill={PALETTE.shell} stroke={PALETTE.strokeSoft} />
      <rect x="452" y="546" width="60" height="60" rx="16" fill={PALETTE.shell} stroke={PALETTE.strokeSoft} />
      <rect x="152" y="470" width="60" height="136" rx="16" fill={PALETTE.shell} stroke={PALETTE.strokeSoft} />

      {/* gniazda i przewody pomiarowe */}
      <circle cx="240" cy="690" r="16" fill="#101010" />
      <circle cx="332" cy="690" r="16" fill="#101010" />
      <circle cx="424" cy="690" r="16" fill="#101010" />
      <g fill="none" strokeWidth="9" strokeLinecap="round">
        <path d="M240 706c-56 44-128 46-152 122" stroke="#CFCFC7" />
        <path d="M424 706c58 40 116 52 140 122" stroke={PALETTE.accent} strokeOpacity="0.9" />
      </g>
      <circle cx="86" cy="838" r="12" fill={PALETTE.ink} />
      <circle cx="566" cy="836" r="12" fill={PALETTE.ink} />
    </svg>
  )
}
