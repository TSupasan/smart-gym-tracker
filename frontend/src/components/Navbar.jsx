import { Menu } from 'lucide-react'

export function Navbar({ title, subtitle, onMenuClick }) {
  return (
    <header className="navbar">
      <div className="navbar__left">
        <button
          type="button"
          className="navbar__menu-btn"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <Menu size={22} />
        </button>
        <div className="navbar__titles">
          <h1 className="navbar__title">{title}</h1>
          {subtitle ? <p className="navbar__subtitle">{subtitle}</p> : null}
        </div>
      </div>
    </header>
  )
}
