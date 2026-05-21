import { useState, useEffect } from 'react'
import { Card } from '../components/ui/Card'
import { scheduleApi } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { CalendarDays, Plus, Trash2, Edit2, X } from 'lucide-react'

export function SchedulesCoach() {
  const { user } = useAuth()
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    targetCategory: 'General',
    day: 'Monday',
    workoutPlan: '',
    startTime: '',
    duration: 60
  })

  const [editingId, setEditingId] = useState(null)
  
  const categories = ['General', 'Body Builders', 'Athletes', 'Weight Loss', 'Beginners']
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  useEffect(() => {
    fetchSchedules()
  }, [])

  async function fetchSchedules() {
    try {
      const { data } = await scheduleApi.list()
      const coachSchedules = data.filter(s => s.coachId === user._id)
      setSchedules(coachSchedules)
    } catch (err) {
      setError('Failed to fetch schedules')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      if (editingId) {
        await scheduleApi.update(editingId, formData)
        setSuccess('Schedule updated successfully!')
      } else {
        await scheduleApi.create(formData)
        setSuccess('Schedule created successfully!')
      }
      
      resetForm()
      fetchSchedules()
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(`Failed to ${editingId ? 'update' : 'create'} schedule`)
    }
  }

  const handleEdit = (schedule) => {
    setEditingId(schedule._id)
    setFormData({
      targetCategory: schedule.targetCategory,
      day: schedule.day,
      workoutPlan: schedule.workoutPlan,
      startTime: schedule.startTime,
      duration: schedule.duration
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        await scheduleApi.delete(id)
        fetchSchedules()
      } catch (err) {
        setError('Failed to delete schedule')
      }
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      targetCategory: 'General',
      day: 'Monday',
      workoutPlan: '',
      startTime: '',
      duration: 60
    })
  }

  return (
    <div className="page-dashboard" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '3rem' }}>
      <section className="welcome-banner glass-card" style={{ marginBottom: '2rem' }}>
        <div className="welcome-banner__intro">
          <p className="welcome-banner__eyebrow">Coach Portal</p>
          <h2 className="welcome-banner__title">Manage Schedule Plans</h2>
          <p className="welcome-banner__text">
            Create, update, and remove workout schedules categorized by fitness goals or demographics.
          </p>
        </div>
      </section>

      {error && <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '1rem', background: '#fee2e2', borderRadius: '8px' }}>{error}</div>}
      {success && <div style={{ color: '#166534', marginBottom: '1rem', padding: '1rem', background: '#dcfce7', borderRadius: '8px' }}>{success}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {editingId ? <Edit2 size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />} 
              {editingId ? 'Edit Plan' : 'Create New Plan'}
            </h3>
            {editingId && (
              <button onClick={resetForm} className="btn" style={{ padding: '0.25rem', background: 'var(--color-bg-elevated)' }} title="Cancel edit">
                <X size={18} />
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label htmlFor="targetCategory">Target Category</label>
              <select id="targetCategory" name="targetCategory" className="form-control" value={formData.targetCategory} onChange={handleChange}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="day">Day</label>
              <select id="day" name="day" className="form-control" value={formData.day} onChange={handleChange}>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="workoutPlan">Workout Plan Name</label>
              <input type="text" id="workoutPlan" name="workoutPlan" className="form-control" required placeholder="e.g., Heavy Legs & Core" value={formData.workoutPlan} onChange={handleChange} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input type="time" id="startTime" name="startTime" className="form-control" required value={formData.startTime} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration (min)</label>
                <input type="number" id="duration" name="duration" className="form-control" required min="10" value={formData.duration} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              {editingId ? 'Update Schedule' : 'Publish Schedule'}
            </button>
          </form>
        </Card>

        <div>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarDays size={20} className="text-secondary" /> Active Plans
          </h3>
          
          {loading ? (
            <p>Loading schedules...</p>
          ) : schedules.length === 0 ? (
            <Card style={{ textAlign: 'center', padding: '3rem 1rem', opacity: 0.7 }}>
              <p>You haven't created any schedules yet.</p>
            </Card>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {schedules.map(schedule => (
                <li key={schedule._id}>
                  <Card hover={false} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
                    <div>
                      <span className="pill pill--outline" style={{ fontSize: '0.7rem', marginBottom: '0.5rem', display: 'inline-block' }}>{schedule.targetCategory}</span>
                      <h4 style={{ margin: '0 0 0.25rem 0' }}>{schedule.workoutPlan}</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                        {schedule.day} • {schedule.startTime} • {schedule.duration} min
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleEdit(schedule)}
                        className="btn"
                        style={{ background: 'var(--color-bg-elevated)', color: 'var(--color-text)', border: '1px solid var(--color-border)', padding: '0.5rem' }}
                        title="Edit Schedule"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(schedule._id)}
                        className="btn"
                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '0.5rem' }}
                        title="Delete Schedule"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
