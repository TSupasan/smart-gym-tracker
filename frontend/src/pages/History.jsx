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
        <ul className="history-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', listStyle: 'none', padding: 0 }}>
          {workouts.map((item) => (
            <li key={item._id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <WorkoutCard
                variant="history"
                title={item.workoutName}
                date={item.date}
                duration={`${item.duration} min`}
                volume={`${item.caloriesBurned || item.calories || 0} kcal`}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingRight: '1rem' }}>
                <button 
                  onClick={async () => {
                    const newName = window.prompt("Update Workout Name:", item.workoutName);
                    if (!newName) return;
                    const newDuration = window.prompt("Update Duration (min):", item.duration);
                    if (!newDuration) return;
                    const newCalories = window.prompt("Update Calories:", item.caloriesBurned || item.calories);
                    if (!newCalories) return;

                    try {
                      const payload = {
                        workoutName: newName,
                        duration: Number(newDuration),
                        caloriesBurned: Number(newCalories),
                        date: item.date
                      };
                      await workoutApi.update(item._id, payload);
                      // Update local state
                      setWorkouts(prev => prev.map(w => 
                        w._id === item._id ? { ...w, ...payload } : w
                      ));
                    } catch(err) {
                      console.error('Failed to update', err);
                      alert('Failed to update workout');
                    }
                  }}
                  className="btn"
                  style={{ background: 'var(--color-bg-elevated)', color: 'var(--color-text)', padding: '0.4rem 1rem', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.8rem' }}
                >
                  Edit
                </button>
                <button 
                  onClick={async () => {
                    if(window.confirm('Delete this workout?')) {
                      try {
                        await workoutApi.delete(item._id);
                        setWorkouts(prev => prev.filter(w => w._id !== item._id));
                      } catch(err) {
                        console.error('Failed to delete', err);
                      }
                    }
                  }}
                  className="btn"
                  style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.4rem 1rem', borderRadius: '8px', border: 'none', fontSize: '0.8rem' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
