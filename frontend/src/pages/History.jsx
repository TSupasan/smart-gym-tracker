import { useState, useEffect } from 'react'
import { Card } from '../components/ui/Card'
import { WorkoutCard } from '../components/WorkoutCard'
import { workoutApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

export function History() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const { data } = await workoutApi.list()
        // Sort by date descending assuming the backend doesn't sort
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date))
        setWorkouts(sorted)
      } catch (err) {
        setError('Failed to fetch history')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchWorkouts()
  }, [])

  return (
    <div className="page-history">
      <Card className="history-hero glass-card--hover" hover>
        <div>
          <p className="card-eyebrow">Training archive</p>
          <h2 className="page-history__title">Every rep, accounted for</h2>
          <p className="page-history__subtitle">
            Review your past training sessions and monitor your progress.
          </p>
        </div>
        <div className="history-hero__badge">
          <span className="history-hero__badge-value">{workouts.length}</span>
          <span className="history-hero__badge-label">sessions logged</span>
        </div>
      </Card>

      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      
      {loading ? (
        <p style={{ marginTop: '2rem', textAlign: 'center', opacity: 0.6 }}>Loading history...</p>
      ) : workouts.length === 0 ? (
        <Card className="empty-state" style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem' }}>
          <h3>No workouts logged yet</h3>
          <p style={{ opacity: 0.7 }}>Head over to Add Workout to log your first session.</p>
        </Card>
      ) : (
        <ul className="history-list">
          {workouts.map((item) => (
            <li key={item._id}>
              <WorkoutCard
                variant="history"
                title={item.workoutName}
                date={item.date}
                duration={`${item.duration} min`}
                volume={`${item.calories} kcal`}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
