import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Card } from '../components/ui/Card'
import { profileApi } from '../services/api'
import { UserCircle, Save, AlertCircle } from 'lucide-react'

export function ProfileDashboard() {
  const { user, setUser } = useAuth()
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    weight: user?.weight || '',
    height: user?.height || '',
    profileImage: user?.profileImage || ''
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      const payload = {
        name: formData.name,
        weight: Number(formData.weight),
        height: Number(formData.height),
        profileImage: formData.profileImage
      }
      const { data } = await profileApi.update(payload)
      
      // Update local storage and context
      localStorage.setItem('fitlab-user', JSON.stringify(data.user))
      setUser(data.user)
      
      setMessage('Profile updated successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-dashboard" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
      <section className="welcome-banner glass-card" style={{ marginBottom: '2rem' }}>
        <div className="welcome-banner__intro">
          <p className="welcome-banner__eyebrow">Settings & Profile</p>
          <h2 className="welcome-banner__title">Your Identity</h2>
          <p className="welcome-banner__text">
            Update your core metrics to keep your training data and BMI accurate.
          </p>
        </div>
      </section>

      {message && (
        <div style={{ marginBottom: '1rem', padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ marginBottom: '1rem', padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <Card>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--color-bg-elevated)', border: '2px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <UserCircle size={64} style={{ color: 'var(--color-muted)' }} />
              )}
            </div>
            <div>
              <label htmlFor="profileImage" className="btn btn-secondary" style={{ cursor: 'pointer', display: 'inline-block' }}>
                Change Avatar
              </label>
              <input type="file" id="profileImage" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: 'var(--color-muted)' }}>We recommend a square image. Max 2MB.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group" style={{ opacity: 0.6 }}>
              <label>Email Address</label>
              <input type="text" className="form-control" value={user?.email || ''} disabled title="Email cannot be changed" />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input type="number" id="weight" name="weight" className="form-control" value={formData.weight} onChange={handleChange} required step="0.1" />
            </div>

            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input type="number" id="height" name="height" className="form-control" value={formData.height} onChange={handleChange} required step="1" />
            </div>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--color-bg-elevated)', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 0.25rem' }}>Current BMI: {user?.bmi || 'N/A'}</h4>
              <span className={`pill ${user?.bmiStatus === 'Normal' ? 'pill--green' : 'pill--outline'}`}>{user?.bmiStatus || 'Unknown'}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-muted)', maxWidth: '300px', textAlign: 'right' }}>
              Your BMI will automatically recalculate when you save your updated metrics.
            </p>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
            {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
          </button>
        </form>
      </Card>
    </div>
  )
}
