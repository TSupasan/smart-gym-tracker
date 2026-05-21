import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/ui/Card';
import { Dumbbell, Moon, Sun, ArrowRight, Activity, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Home() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="home-page" style={{ minHeight: '100vh', padding: '2rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Navbar equivalent for Home */}
      <nav style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'grid', placeItems: 'center', width: '44px', height: '44px', borderRadius: '14px',
            background: 'var(--color-primary)', color: '#fff',
            boxShadow: '0 12px 35px var(--color-primary-glow)'
          }}>
            <Dumbbell size={22} strokeWidth={2.25} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)' }}>FitLab</h1>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Training OS</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={toggleTheme}
            style={{
              background: 'var(--color-primary-soft)',
              border: '1px solid var(--color-primary-soft)',
              borderRadius: '999px',
              padding: '0.5rem 1rem',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontWeight: 500,
              fontSize: '0.875rem'
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <><Sun size={18} color="#facc15" fill="#facc15" /> Light Mode</>
            ) : (
              <><Moon size={18} color="#facc15" fill="#facc15" /> Dark Mode</>
            )}
          </button>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--color-text)' }}>Hello, {user.name}</span>
                <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', borderRadius: '999px' }}>Dashboard</Link>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', borderRadius: '999px' }}>Login</Link>
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', borderRadius: '999px' }}>Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Split Layout Hero Section */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '4rem', 
          alignItems: 'center', 
          width: '100%', 
          maxWidth: '1200px',
          margin: '0 auto 6rem'
        }}
      >
        {/* Left Column: Text & CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <h2 style={{ fontSize: '4.5rem', fontFamily: 'var(--font-display)', lineHeight: 1.1, margin: 0, fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.03em' }}>
            Discover the Ultimate <span style={{ color: 'var(--color-primary)' }}>Fitness Tracker</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-muted)', margin: 0, maxWidth: '500px', lineHeight: 1.6 }}>
            FitLab provides precision tracking for athletes who refuse plateaus. Log sessions, monitor progress, and achieve your goals with data-driven insights.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {!user ? (
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '14px' }}>
                Browse Features <ArrowRight size={20}/>
              </Link>
            ) : (
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '14px' }}>
                Access Dashboard <ArrowRight size={20}/>
              </Link>
            )}
          </div>
        </div>

        {/* Right Column: Hero Visual */}
        <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
          <img 
            src={theme === 'dark' ? '/images/hero-dark.png' : '/images/hero-light.png'} 
            alt="FitLab Hero Visual" 
            style={{ width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.3s ease' }}
          />
        </div>
      </div>

      {/* Feature Navigation Cards (Moved below) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <Card className="glass-card--hover" padding="default" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--color-bg-elevated)' }}>
            <div style={{ background: 'var(--color-primary-soft)', width: '48px', height: '48px', borderRadius: '12px', display: 'grid', placeItems: 'center', color: 'var(--color-primary)' }}>
              <Activity size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>Dashboard</h3>
            <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9rem' }}>View today's performance at a glance. Check your stats, adherence, and active streaks.</p>
          </Card>
        </Link>

        <Link to="/workouts/add" style={{ textDecoration: 'none' }}>
          <Card className="glass-card--hover" padding="default" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--color-bg-elevated)' }}>
            <div style={{ background: 'var(--color-secondary-soft)', width: '48px', height: '48px', borderRadius: '12px', display: 'grid', placeItems: 'center', color: 'var(--color-secondary)' }}>
              <Dumbbell size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>Log Workout</h3>
            <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9rem' }}>Capture the essentials of your session. Track duration, focus, and calories easily.</p>
          </Card>
        </Link>

        <Link to="/history" style={{ textDecoration: 'none' }}>
          <Card className="glass-card--hover" padding="default" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--color-bg-elevated)' }}>
            <div style={{ background: 'var(--color-primary-soft)', width: '48px', height: '48px', borderRadius: '12px', display: 'grid', placeItems: 'center', color: 'var(--color-primary)' }}>
              <Calendar size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>History & Progress</h3>
            <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9rem' }}>Review every rep and monitor your volume and consistency over time.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
