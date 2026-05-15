import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export function Navbar({ title, subtitle, onMenuClick }) {
  const { theme, toggleTheme } = useTheme();

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
      
      <div style={{ marginLeft: 'auto' }}>
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
            <><Sun size={16} color="#facc15" fill="#facc15" /> Light Mode</>
          ) : (
            <><Moon size={16} color="#facc15" fill="#facc15" /> Dark Mode</>
          )}
        </button>
      </div>
    </header>
  )
}
