import { useState, useEffect } from 'react'
import { Card } from '../components/ui/Card'
import { ProgressChart } from '../components/ProgressChart'
import { progressApi } from '../services/api'

const WEEKLY_MOCK = [
  { label: 'Mon', pct: 72 },
  { label: 'Tue', pct: 88 },
  { label: 'Wed', pct: 54 },
  { label: 'Thu', pct: 91 },
  { label: 'Fri', pct: 79 },
  { label: 'Sat', pct: 64 },
  { label: 'Sun', pct: 42 },
]

export function Progress() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await progressApi.summary()
        setData(response.data)
      } catch (err) {
        console.error('Failed to fetch progress', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProgress()
  }, [])

  return (
    <div className="page-progress">
      <div className="progress-summary">
        <Card className="progress-kpi">
          <p className="card-eyebrow">This month</p>
          <p className="progress-kpi__value">{data ? data.length * 10 : 0}%</p>
          <p className="progress-kpi__label">Goal adherence</p>
          <div className="progress-kpi__bar">
            <span style={{ width: `${data ? Math.min(data.length * 10, 100) : 0}%` }} />
          </div>
        </Card>
        <Card className="progress-kpi">
          <p className="card-eyebrow">Recovery</p>
          <p className="progress-kpi__value text-success">Optimal</p>
          <p className="progress-kpi__label">System Analysis</p>
          <p className="progress-kpi__hint">
            Ready to push hard.
          </p>
        </Card>
        <Card className="progress-kpi">
          <p className="card-eyebrow">Consistency</p>
          <p className="progress-kpi__value">+{data?.length || 0}</p>
          <p className="progress-kpi__label">Total logs</p>
          <p className="progress-kpi__hint">
            Keep up the great work!
          </p>
        </Card>
      </div>

      <Card className="progress-chart-card" hover={false}>
        <div className="chart-card__header">
          <div>
            <p className="card-eyebrow">Macro view</p>
            <h3 className="card-title">Long-term trajectory</h3>
          </div>
          {loading ? <span className="pill pill--green">Loading...</span> : <span className="pill pill--green">Live</span>}
        </div>
        <ProgressChart />
      </Card>

      <Card className="weekly-load" hover={false}>
        <div className="weekly-load__header">
          <h3 className="card-title">Weekly consistency</h3>
          <p className="weekly-load__caption">
            Relative intensity by day.
          </p>
        </div>
        <div className="weekly-bars" role="list">
          {WEEKLY_MOCK.map((d) => (
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
