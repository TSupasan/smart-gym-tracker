import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { workoutApi } from '../services/api'

export function AddWorkout() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.target)
    
    try {
      await workoutApi.create({
        workoutName: fd.get('title'),
        focus: fd.get('focus'),
        duration: fd.get('durationMinutes'),
        calories: fd.get('calories'),
        notes: fd.get('notes'),
        date: new Date().toLocaleDateString()
      })
      navigate('/history')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save workout')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-form">
      <Card className="page-form__card" hover={false}>
        <header className="page-form__header">
          <p className="card-eyebrow">Session logger</p>
          <h2 className="page-form__title">Log a workout</h2>
          <p className="page-form__lead">
            Capture the essentials and track your progress over time.
          </p>
        </header>

        {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

        <form className="workout-form" onSubmit={handleSubmit}>
          <div className="workout-form__grid">
            <label className="field">
              <span className="field__label">Workout name</span>
              <input type="text" name="title" placeholder="Lower Strength · Block A" required />
            </label>

            <label className="field">
              <span className="field__label">Focus</span>
              <select name="focus" defaultValue="Strength" required>
                <option value="Strength">Strength</option>
                <option value="Hypertrophy">Hypertrophy</option>
                <option value="Conditioning">Conditioning</option>
                <option value="Mobility">Mobility</option>
              </select>
            </label>

            <label className="field">
              <span className="field__label">Duration (min)</span>
              <input type="number" name="durationMinutes" min={10} placeholder="55" required />
            </label>

            <label className="field">
              <span className="field__label">Calories (est.)</span>
              <input type="number" name="calories" min={0} placeholder="420" required />
            </label>
          </div>

          <label className="field">
            <span className="field__label">Notes</span>
            <textarea
              name="notes"
              rows={4}
              placeholder="Top sets @ RPE 8, knees tracked over toes on squats..."
            />
          </label>

          <div className="page-form__actions">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save workout'}
            </Button>
            <Button type="reset" variant="ghost" disabled={loading}>
              Clear form
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
