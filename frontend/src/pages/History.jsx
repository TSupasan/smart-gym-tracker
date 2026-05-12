import { Card } from '../components/ui/Card'
import { WorkoutCard } from '../components/WorkoutCard'

const MOCK_HISTORY = [
  {
    id: '1',
    title: 'Upper Power · Push emphasis',
    date: 'May 11, 2026',
    duration: '58 min',
    volume: '18.4k lbs',
  },
  {
    id: '2',
    title: 'Lower Strength · Squat priority',
    date: 'May 9, 2026',
    duration: '62 min',
    volume: '22.1k lbs',
  },
  {
    id: '3',
    title: 'Conditioning · Engine builder',
    date: 'May 8, 2026',
    duration: '34 min',
    volume: 'Mixed modalities',
  },
  {
    id: '4',
    title: 'Pull · Back thickness',
    date: 'May 6, 2026',
    duration: '51 min',
    volume: '15.9k lbs',
  },
]

export function History() {
  return (
    <div className="page-history">
      <Card className="history-hero glass-card--hover" hover>
        <div>
          <p className="card-eyebrow">Training archive</p>
          <h2 className="page-history__title">Every rep, accounted for</h2>
          <p className="page-history__subtitle">
            Swap this list for <code className="inline-code">workoutApi.list()</code>{' '}
            responses — UI is ready for pagination and filters.
          </p>
        </div>
        <div className="history-hero__badge">
          <span className="history-hero__badge-value">128</span>
          <span className="history-hero__badge-label">sessions logged</span>
        </div>
      </Card>

      <ul className="history-list">
        {MOCK_HISTORY.map((item) => (
          <li key={item.id}>
            <WorkoutCard
              variant="history"
              title={item.title}
              date={item.date}
              duration={item.duration}
              volume={item.volume}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
