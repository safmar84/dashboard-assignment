import { NavLink, Outlet } from 'react-router-dom'
import './app-shell.css'

const navigationItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/devices', label: 'Devices' },
]

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">Wultra React Assignment</p>
          <h1 className="app-title">Registered devices management</h1>
          <p className="app-description">
            Overview of registered devices, operational status, and device-level activity.
          </p>
        </div>

        <nav aria-label="Primary" className="app-nav">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
