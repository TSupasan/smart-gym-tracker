import { Link } from 'react-router-dom'
import { User, Mail, Lock } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function Register() {
  function handleSubmit(e) {
    e.preventDefault()
    // Placeholder: wire to authApi.register when backend exists
  }

  return (
    <div className="auth-page">
      <div className="auth-page__glow auth-page__glow--alt" aria-hidden />
      <div className="auth-page__inner">
        <div className="auth-page__brand">
          <span className="auth-page__logo">IRONFLOW</span>
          <p className="auth-page__tagline">
            Build unstoppable momentum with data-backed sessions.
          </p>
        </div>

        <Card className="auth-card" padding="default" hover={false}>
          <h2 className="auth-card__title">Create your workspace</h2>
          <p className="auth-card__subtitle">
            Join thousands of lifters tracking PRs and recovery in one place.
          </p>

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
              I agree to the Terms & Privacy policy (demo)
            </label>

            <Button type="submit" variant="primary" className="auth-form__submit">
              Create account
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
