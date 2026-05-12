import { Card } from '../components/ui/Card'
import { ProgressChart } from '../components/ProgressChart'

const WEEKLY = [
  { label: 'Mon', pct: 72 },
  { label: 'Tue', pct: 88 },
  { label: 'Wed', pct: 54 },
  { label: 'Thu', pct: 91 },
  { label: 'Fri', pct: 79 },
  { label: 'Sat', pct: 64 },
  { label: 'Sun', pct: 42 },
]

export function Progress() {
  return (
    <div className="page-progress">
      <div className="progress-summary">
        <Card className="progress-kpi">
          <p className="card-eyebrow">This month</p>
          <p className="progress-kpi__value">84%</p>
          <p className="progress-kpi__label">Goal adherence</p>
          <div className="progress-kpi__bar">
            <span style={{ width: '84%' }} />
          </div>
        </Card>
        <Card className="progress-kpi">
          <p className="card-eyebrow">Recovery</p>
          <p className="progress-kpi__value text-success">Green</p>
          <p className="progress-kpi__label">HRV trend · placeholder metric</p>
          <p className="progress-kpi__hint">
            Connect wearable API for live readiness scores.
          </p>
        </Card>
        <Card className="progress-kpi">
          <p className="card-eyebrow">Strength index</p>
          <p className="progress-kpi__value">+6.2%</p>
          <p className="progress-kpi__label">vs previous mesocycle</p>
          <p className="progress-kpi__hint">
            Derived from compound lift e1RM estimates (demo).
          </p>
        </Card>
      </div>

      <Card className="progress-chart-card" hover={false}>
        <div className="chart-card__header">
          <div>
            <p className="card-eyebrow">Macro view</p>
            <h3 className="card-title">Long-term trajectory</h3>
          </div>
          <span className="pill pill--green">Preview data</span>
        </div>
        <ProgressChart />
      </Card>

      <Card className="weekly-load" hover={false}>
        <div className="weekly-load__header">
          <h3 className="card-title">Weekly consistency</h3>
          <p className="weekly-load__caption">
            Relative intensity by day — swap with API aggregates later.
          </p>
        </div>
        <div className="weekly-bars" role="list">
          {WEEKLY.map((d) => (
            <div key={d.label} className="weekly-bars__col" role="listitem">
              <div className="weekly-bars__track" aria-hidden>
                <span style={{ height: `${d.pct}%` }} />
              </div>
              <span className="weekly-bars__label">{d.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
