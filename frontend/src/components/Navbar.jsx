import { useState, useEffect } from 'react'
import { Menu, Moon, Sun, Bell, UserCircle } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { reminderApi } from '../services/api'
import { useNavigate } from 'react-router-dom'

export function Navbar({ title, subtitle, onMenuClick }) {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [showNotifications, setShowNotifications] = useState(false)
  const [reminders, setReminders] = useState([])

  useEffect(() => {
    async function fetchReminders() {
      if (!user) return
      try {
        const { data } = await reminderApi.list()
        const userReminders = data.filter(r => r.userId === user._id)
        setReminders(userReminders || [])
      } catch (err) {
        console.error('Failed to fetch reminders', err)
      }
    }
    fetchReminders()
  }, [user])

  const handleDeleteReminder = async (id) => {
    try {
      await reminderApi.delete(id)
      setReminders(prev => prev.filter(r => r._id !== id))
    } catch (err) {
      console.error('Failed to delete reminder', err)
    }
  }

  return (
    <header className="navbar" aria-label="Page header">
      <div className="navbar__left">
        <button
          type="button"
          className="navbar__menu-btn"
          aria-label="Open navigation menu"
          onClick={onMenuClick}
        >
          <Menu size={20} aria-hidden />
        </button>
        <div className="navbar__titles">
          <h1 className="navbar__title">{title}</h1>
          {subtitle && <p className="navbar__subtitle">{subtitle}</p>}
        </div>
      </div>
      
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        
        {user && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <Bell size={18} color="var(--color-text)" />
              {reminders.length > 0 && (
                <span style={{ position: 'absolute', top: -2, right: -2, background: '#ef4444', color: '#fff', fontSize: '0.65rem', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {reminders.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="glass-card" style={{ position: 'absolute', top: '120%', right: 0, width: '280px', zIndex: 100, padding: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Notifications</h4>
                {reminders.length === 0 ? (
                  <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>No new notifications.</p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {reminders.map(r => (
                      <li key={r._id} style={{ fontSize: '0.75rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', cursor: 'pointer' }} onClick={() => handleDeleteReminder(r._id)}>
                        <strong>{r.reminderType}</strong>: {r.message} <br/>
                        <span style={{ opacity: 0.6 }}>{r.date} {r.reminderTime}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        <button 
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '999px',
            padding: '0.45rem 0.85rem',
            color: 'var(--color-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '0.85rem',
            fontWeight: 500
          }}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <><Sun size={16} color="#facc15" fill="#facc15" /> Light</>
          ) : (
            <><Moon size={16} color="#facc15" fill="#facc15" /> Dark</>
          )}
        </button>

        {user && (
          <div 
            onClick={() => navigate('/profile')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', padding: '0.25rem 0.75rem 0.25rem 0.25rem', borderRadius: '999px' }}
          >
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <UserCircle size={28} style={{ color: 'var(--color-muted)' }} />
            )}
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text)' }}>{user.name.split(' ')[0]}</span>
          </div>
        )}
      </div>
    </header>
  )
}
