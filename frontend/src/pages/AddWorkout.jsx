import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function AddWorkout() {
  function handleSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    void fd
    // workoutApi.create(Object.fromEntries(fd)) when API exists
  }

  return (
    <div className="page-form">
      <Card className="page-form__card" hover={false}>
        <header className="page-form__header">
          <p className="card-eyebrow">Session logger</p>
          <h2 className="page-form__title">Log a workout</h2>
          <p className="page-form__lead">
            Capture the essentials — wire these fields to{' '}
            <code className="inline-code">workoutApi.create</code> when your backend
            is ready.
          </p>
        </header>

        <form className="workout-form" onSubmit={handleSubmit}>
          <div className="workout-form__grid">
            <label className="field">
              <span className="field__label">Workout name</span>
              <input type="text" name="title" placeholder="Lower Strength · Block A" />
            </label>

            <label className="field">
              <span className="field__label">Focus</span>
              <select name="focus" defaultValue="strength">
                <option value="strength">Strength</option>
                <option value="hypertrophy">Hypertrophy</option>
                <option value="conditioning">Conditioning</option>
                <option value="mobility">Mobility</option>
              </select>
            </label>

            <label className="field">
              <span className="field__label">Duration (min)</span>
              <input type="number" name="durationMinutes" min={10} placeholder="55" />
            </label>

            <label className="field">
              <span className="field__label">Calories (est.)</span>
              <input type="number" name="calories" min={0} placeholder="420" />
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
            <Button type="submit" variant="primary">
              Save workout (placeholder)
            </Button>
            <Button type="reset" variant="ghost">
              Clear form
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
