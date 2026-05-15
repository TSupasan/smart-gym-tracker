import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Ruler, Scale } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

export function Register() {
  const { register, login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const height = formData.get('height')
    const weight = formData.get('weight')
    const role = formData.get('role')

    try {
      await register({ name, email, password, height: Number(height), weight: Number(weight), role })
      // Auto login after register
      await login({ email, password })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-page__glow auth-page__glow--alt" aria-hidden />
      <div className="auth-page__inner">
        <div className="auth-page__brand">
          <span className="auth-page__logo">FitLab</span>
          <p className="auth-page__tagline">
            Build unstoppable momentum with data-backed sessions.
          </p>
        </div>

        <Card className="auth-card" padding="default" hover={false}>
          <h2 className="auth-card__title">Create your workspace</h2>
          <p className="auth-card__subtitle">
            Join thousands of lifters tracking PRs and recovery in one place.
          </p>

          {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="field">
              <span className="field__label">Full name</span>
              <span className="field__control field__control--icon">
                <User size={18} aria-hidden />
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Jordan Lee"
                  required
                />
              </span>
            </label>

            <label className="field">
              <span className="field__label">Email</span>
              <span className="field__control field__control--icon">
                <Mail size={18} aria-hidden />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </span>
            </label>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <label className="field" style={{ flex: 1 }}>
                <span className="field__label">Height (cm)</span>
                <span className="field__control field__control--icon">
                  <Ruler size={18} aria-hidden />
                  <input
                    type="number"
                    name="height"
                    placeholder="175"
                    min="50"
                    max="300"
                    required
                  />
                </span>
              </label>

              <label className="field" style={{ flex: 1 }}>
                <span className="field__label">Weight (kg)</span>
                <span className="field__control field__control--icon">
                  <Scale size={18} aria-hidden />
                  <input
                    type="number"
                    name="weight"
                    placeholder="70"
                    min="20"
                    max="500"
                    required
                  />
                </span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
              <span className="field__label" style={{ minWidth: '80px' }}>Role</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input type="radio" name="role" value="user" defaultChecked />
                <span>Gym User</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input type="radio" name="role" value="coach" />
                <span>Coach</span>
              </label>
            </div>

            <label className="field">
              <span className="field__label">Password</span>
              <span className="field__control field__control--icon">
                <Lock size={18} aria-hidden />
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  minLength={8}
                  required
                />
              </span>
            </label>

            <label className="checkbox auth-form__checkbox">
              <input type="checkbox" name="terms" required />{' '}
              I agree to the Terms & Privacy policy
            </label>

            <Button type="submit" variant="primary" className="auth-form__submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>

            <Link to="/" className="btn btn-secondary auth-form__demo">
              Explore dashboard first
            </Link>
          </form>

          <p className="auth-card__footer">
            Already training with us?{' '}
            <Link to="/login" className="auth-card__link">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
