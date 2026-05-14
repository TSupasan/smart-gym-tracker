import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  PlusCircle,
  History,
  TrendingUp,
  Dumbbell,
  Bell,
  LogOut,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { reminderApi } from '../services/api'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/workouts/add', label: 'Add Workout', icon: PlusCircle },
  { to: '/history', label: 'History', icon: History },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
]

const coachLinks = [
  { to: '/schedules', label: 'Schedules', icon: LayoutDashboard },
]

export function Sidebar({
  collapsed,
  onToggleCollapsed,
  onNavigate,
  user,
  showCollapseToggle = true,
}) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const displayName = user?.name ?? 'Guest User'
  const initials =
    displayName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U'

  const [showNotifications, setShowNotifications] = useState(false)
  const [reminders, setReminders] = useState([])

  useEffect(() => {
    async function fetchReminders() {
      try {
        const { data } = await reminderApi.list()
        // filter reminders for the logged in user if user is present
        const userReminders = user ? data.filter(r => r.userId === user._id) : data
        setReminders(userReminders || [])
      } catch (err) {
        console.error('Failed to fetch reminders', err)
      }
    }
    fetchReminders()
  }, [user])

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    onNavigate?.()
    navigate('/login')
  }

  return (
    <aside
      className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}
      aria-label="Main navigation"
    >
      <div className="sidebar-brand">
        <span className="sidebar-brand__mark" aria-hidden>
          <Dumbbell size={22} strokeWidth={2.25} />
        </span>
        <div className="sidebar-brand__text">
          <span className="sidebar-brand__name">IRONFLOW</span>
          <span className="sidebar-brand__tag">Training OS</span>
        </div>
        {showCollapseToggle ? (
          <button
            type="button"
            className="sidebar-collapse-btn"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand' : 'Collapse'}
            onClick={onToggleCollapsed}
          >
            {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
          </button>
        ) : null}
      </div>

      <nav className="sidebar-nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
            }
            onClick={() => onNavigate?.()}
            title={collapsed ? label : undefined}
          >
            <Icon size={20} strokeWidth={2} aria-hidden />
            <span className="sidebar-link__label">{label}</span>
          </NavLink>
        ))}
        {user?.role === 'coach' && coachLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
            }
            onClick={() => onNavigate?.()}
            title={collapsed ? label : undefined}
          >
            <Icon size={20} strokeWidth={2} aria-hidden />
            <span className="sidebar-link__label">{label} (Coach)</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-divider" aria-hidden />

      <div style={{ position: 'relative' }}>
        <button
          type="button"
          className="sidebar-notify"
          aria-label="Notifications"
          title={collapsed ? 'Notifications' : undefined}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <span className="sidebar-notify__icon-wrap">
            <Bell size={20} aria-hidden />
            {reminders.length > 0 && <span className="sidebar-notify__badge" aria-hidden />}
          </span>
          <span className="sidebar-notify__text">Notifications</span>
          <span className="sidebar-notify__chev">{reminders.length}</span>
        </button>

        {showNotifications && (
          <div 
            className="notifications-popover glass-card" 
            style={{ 
              position: 'absolute', 
              bottom: '100%', 
              left: 0, 
              right: 0, 
              zIndex: 10, 
              padding: '1rem', 
              maxHeight: '200px', 
              overflowY: 'auto', 
              marginBottom: '0.5rem',
              backgroundColor: 'var(--color-surface)'
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Reminders</h4>
            {reminders.length === 0 ? (
              <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>No new reminders.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {reminders.map(r => (
                  <li key={r._id} style={{ fontSize: '0.75rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.25rem' }}>
                    <strong>{r.reminderType}</strong>: {r.message} <br/>
                    <span style={{ opacity: 0.6 }}>{r.date} {r.reminderTime}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="sidebar-user glass-card glass-card--static">
        <div className="sidebar-user__avatar" aria-hidden>
          {initials}
        </div>
        <div className="sidebar-user__meta">
          <span className="sidebar-user__name">{displayName}</span>
          <span className="sidebar-user__role" style={{ textTransform: 'capitalize' }}>
            {user?.role ? `${user.role} Member` : 'Gym User'}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="sidebar-signout"
        title="Sign out"
        onClick={handleLogout}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.5rem 1rem',
          width: '100%',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '0.875rem'
        }}
      >
        <LogOut size={18} aria-hidden />
        <span>Sign out</span>
      </button>

      {!collapsed ? (
        <div className="sidebar-footer glass-card glass-card--static sidebar-promo">
          <p className="sidebar-promo__title">Elite coaching</p>
          <p className="sidebar-promo__text">
            Connect your API for AI-powered programming.
          </p>
        </div>
      ) : null}
    </aside>
  )
}
