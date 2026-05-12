import { NavLink, Link } from 'react-router-dom'
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

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/workouts/add', label: 'Add Workout', icon: PlusCircle },
  { to: '/history', label: 'History', icon: History },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
]

export function Sidebar({
  collapsed,
  onToggleCollapsed,
  onNavigate,
  user,
  showCollapseToggle = true,
}) {
  const displayName = user?.name ?? 'Alex Rivera'
  const initials =
    displayName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U'

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
      </nav>

      <div className="sidebar-divider" aria-hidden />

      <button
        type="button"
        className="sidebar-notify"
        aria-label="Notifications"
        title={collapsed ? 'Notifications' : undefined}
      >
        <span className="sidebar-notify__icon-wrap">
          <Bell size={20} aria-hidden />
          <span className="sidebar-notify__badge" aria-hidden />
        </span>
        <span className="sidebar-notify__text">Notifications</span>
        <span className="sidebar-notify__chev">3</span>
      </button>

      <div className="sidebar-user glass-card glass-card--static">
        <div className="sidebar-user__avatar" aria-hidden>
          {initials}
        </div>
        <div className="sidebar-user__meta">
          <span className="sidebar-user__name">{displayName}</span>
          <span className="sidebar-user__role">Pro Member</span>
        </div>
      </div>

      <Link
        to="/login"
        replace
        className="sidebar-signout"
        title="Sign out"
        onClick={() => onNavigate?.()}
      >
        <LogOut size={18} aria-hidden />
        <span>Sign out</span>
      </Link>

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
