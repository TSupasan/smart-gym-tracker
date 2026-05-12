import { Link } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function Login() {
  function handleSubmit(e) {
    e.preventDefault()
    // Placeholder: wire to authApi.login when backend exists
  }

  return (
    <div className="auth-page">
      <div className="auth-page__glow" aria-hidden />
      <div className="auth-page__inner">
        <div className="auth-page__brand">
          <span className="auth-page__logo">IRONFLOW</span>
          <p className="auth-page__tagline">
            Precision training for athletes who refuse plateaus.
          </p>
        </div>

        <Card className="auth-card" padding="default" hover={false}>
          <h2 className="auth-card__title">Welcome back</h2>
          <p className="auth-card__subtitle">
            Sign in to sync lifts, streaks, and recovery insights.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
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
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                />
              </span>
            </label>

            <div className="auth-form__row">
              <label className="checkbox">
                <input type="checkbox" name="remember" /> Remember me
              </label>
              <button type="button" className="link-btn">
                Forgot password?
              </button>
            </div>

            <Button type="submit" variant="primary" className="auth-form__submit">
              Sign in
            </Button>

            <Link to="/" className="btn btn-secondary auth-form__demo">
              Continue to dashboard (demo)
            </Link>
          </form>

          <p className="auth-card__footer">
            New here?{' '}
            <Link to="/register" className="auth-card__link">
              Create an account
            </Link>
          </p>
        </Card>

        <p className="auth-page__legal">
          By continuing you agree to placeholder Terms & Privacy for demo UI.
        </p>
      </div>
    </div>
  )
}
