import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { useAuth } from '../context/AuthContext'

const PAGE_META = {
  '/': { title: 'Dashboard', subtitle: 'Today’s performance at a glance' },
  '/workouts/add': {
    title: 'Add Workout',
    subtitle: 'Log a session and keep your streak alive',
  },
  '/history': { title: 'Workout History', subtitle: 'Review past sessions' },
  '/progress': { title: 'Progress', subtitle: 'Volume and consistency trends' },
}

function useDesktop(minWidth = 1024) {
  const [desktop, setDesktop] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(`(min-width: ${minWidth}px)`).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`)
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [minWidth])

  return desktop
}

export function MainLayout() {
  const { user } = useAuth()
  const desktop = useDesktop()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('ironflow-sidebar-collapsed') === '1'
    } catch {
      return false
    }
  })

  const location = useLocation()
  const meta = PAGE_META[location.pathname] ?? {
    title: 'IRONFLOW',
    subtitle: '',
  }

  useEffect(() => {
    try {
      localStorage.setItem('ironflow-sidebar-collapsed', collapsed ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [collapsed])

  useEffect(() => {
    const id = window.setTimeout(() => setSidebarOpen(false), 0)
    return () => window.clearTimeout(id)
  }, [location.pathname])

  const effectiveCollapsed = desktop && collapsed
  const sidebarWidth = effectiveCollapsed
    ? 'var(--sidebar-width-collapsed)'
    : 'var(--sidebar-width-expanded)'

  return (
    <div className="app-shell" style={{ '--sidebar-current-width': sidebarWidth }}>
      <div
        className={`sidebar-backdrop ${sidebarOpen ? 'sidebar-backdrop--open' : ''}`}
        aria-hidden={!sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`sidebar-drawer ${sidebarOpen ? 'sidebar-drawer--open' : ''}`}
      >
        <Sidebar
          user={user}
          collapsed={effectiveCollapsed}
          onToggleCollapsed={() => setCollapsed((c) => !c)}
          onNavigate={() => setSidebarOpen(false)}
          showCollapseToggle={desktop}
        />
      </div>

      <div className="app-main">
        <Navbar
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
