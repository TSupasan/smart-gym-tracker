import { useId } from 'react'
import { sanitizeSvgIdFragment } from '../utils/svgIds'

/**
 * Decorative SVG volume/trend chart — wire to API data when available.
 * Gradients use useId() so multiple instances on a page do not clash.
 */
export function ProgressChart() {
  const safe = sanitizeSvgIdFragment(useId())
  const fillId = `${safe}-chartFill`
  const strokeId = `${safe}-chartStroke`

  const points = [28, 42, 36, 52, 48, 64, 58, 72, 68, 78, 74, 88]
  const w = 560
  const h = 160
  const pad = 8
  const max = Math.max(...points)
  const min = Math.min(...points)
  const span = max - min || 1

  const pathD = points
    .map((v, i) => {
      const x = pad + (i / (points.length - 1)) * (w - pad * 2)
      const y = pad + (1 - (v - min) / span) * (h - pad * 2)
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')

  const areaD = `${pathD} L ${w - pad} ${h - pad} L ${pad} ${h - pad} Z`

  return (
    <div className="progress-chart">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="progress-chart__svg"
        preserveAspectRatio="none"
        role="img"
        aria-label="Training volume trend (placeholder chart)"
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#${fillId})`} />
        <path
          d={pathD}
          fill="none"
          stroke={`url(#${strokeId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="progress-chart__labels">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  )
}
