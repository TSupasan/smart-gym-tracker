import { NavLink, Link, useNavigate } from 'react-router-dom'
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
  Home,
  CalendarDays,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/workouts/add', label: 'Add Workout', icon: PlusCircle },
  { to: '/history', label: 'History', icon: History },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/schedule-plans', label: 'Schedule Plans', icon: CalendarDays },
]

const coachLinks = [
  { to: '/schedules-manage', label: 'Manage Schedules', icon: CalendarDays },
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
          <span className="sidebar-brand__name">FitLab</span>
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

      <Link to="/profile" className="sidebar-user glass-card glass-card--static" style={{ textDecoration: 'none', color: 'inherit' }} title="Go to Profile">
        <div className="sidebar-user__avatar" aria-hidden style={{ overflow: 'hidden' }}>
          {user?.profileImage ? <img src={user.profileImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
        </div>
        <div className="sidebar-user__meta">
          <span className="sidebar-user__name">{displayName}</span>
          <span className="sidebar-user__role" style={{ textTransform: 'capitalize' }}>
            {user?.role ? `${user.role} Member` : 'Gym User'}
          </span>
        </div>
      </Link>

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
