import type { Config } from 'tailwindcss'

/**
 * Design tokens — VOLT
 * Light, editorial, high-contrast typography, one restrained accent.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F7F5',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#0E0E0C',
          900: '#0E0E0C',
          700: '#3A3A34',
          500: '#77776F',
          300: '#A9A9A1',
          100: '#E6E6E1',
        },
        line: 'rgba(14, 14, 12, 0.10)',
        'line-strong': 'rgba(14, 14, 12, 0.18)',
        accent: {
          DEFAULT: '#D8F44B',
          600: '#C3DE33',
          soft: 'rgba(216, 244, 75, 0.35)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // fluid display scale
        d1: ['clamp(2.1rem, 10.9vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.048em' }],
        d2: ['clamp(2.25rem, 5.6vw, 5.25rem)', { lineHeight: '0.96', letterSpacing: '-0.04em' }],
        d3: ['clamp(1.75rem, 3.4vw, 3.25rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        d4: ['clamp(1.35rem, 2.2vw, 2rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        stat: ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '0.86', letterSpacing: '-0.05em' }],
        micro: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em' }],
      },
      maxWidth: {
        shell: '1480px',
      },
      spacing: {
        section: 'clamp(5rem, 11vw, 10.5rem)',
        gutter: 'clamp(1.25rem, 4vw, 4.5rem)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
      },
      animation: {
        marquee: 'marquee 46s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
