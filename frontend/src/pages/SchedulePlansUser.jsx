import { useState, useEffect } from 'react'
import { Card } from '../components/ui/Card'
import { scheduleApi } from '../services/api'
import { CalendarDays, Filter } from 'lucide-react'

export function SchedulePlansUser() {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', 'General', 'Body Builders', 'Athletes', 'Weight Loss', 'Beginners']

  useEffect(() => {
    fetchSchedules(selectedCategory)
  }, [selectedCategory])

  async function fetchSchedules(category) {
    setLoading(true)
    try {
      const params = category === 'All' ? {} : { category }
      const { data } = await scheduleApi.list(params)
      setSchedules(data)
    } catch (err) {
      setError('Failed to fetch schedule plans')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Group schedules by day
  const groupedSchedules = schedules.reduce((acc, curr) => {
    if (!acc[curr.day]) acc[curr.day] = []
    acc[curr.day].push(curr)
    return acc
  }, {})

  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
  return (
    <div className="page-dashboard" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '3rem' }}>
      <section className="welcome-banner glass-card" style={{ marginBottom: '2rem' }}>
        <div className="welcome-banner__intro">
          <p className="welcome-banner__eyebrow">Discover Plans</p>
          <h2 className="welcome-banner__title">Coach-Curated Schedules</h2>
          <p className="welcome-banner__text">
            Browse and follow workout plans created by our elite coaching staff tailored to your goals.
          </p>
        </div>
      </section>

      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-bg-elevated)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <Filter size={18} className="text-muted" />
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Filter by Goal:</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`pill ${selectedCategory === c ? 'pill--green' : 'pill--outline'}`}
              style={{ cursor: 'pointer', border: 'none', padding: '0.5rem 1rem' }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <p style={{ textAlign: 'center', opacity: 0.6, marginTop: '3rem' }}>Loading plans...</p>
      ) : schedules.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '4rem 2rem', opacity: 0.7 }}>
          <CalendarDays size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3>No plans found</h3>
          <p>We couldn't find any schedules for the selected category.</p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {daysOrder.map(day => {
            const daySchedules = groupedSchedules[day]
            if (!daySchedules) return null
            
            return (
              <div key={day}>
                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>{day}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {daySchedules.map(schedule => (
                    <Card key={schedule._id} hover className="glass-card--hover" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className="pill pill--outline" style={{ fontSize: '0.7rem' }}>{schedule.targetCategory}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)' }}>{schedule.duration} min</span>
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{schedule.workoutPlan}</h4>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CalendarDays size={14} /> Start Time: {schedule.startTime}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
