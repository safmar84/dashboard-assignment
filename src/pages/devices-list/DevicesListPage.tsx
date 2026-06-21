import { Link } from 'react-router-dom'

const placeholderDevices = [
  { id: 'demo-device', name: 'iPhone 15 Pro', owner: 'Jane Doe', status: 'Active' },
  { id: 'pixel-8', name: 'Pixel 8', owner: 'John Appleseed', status: 'Expired' },
  { id: 'galaxy-s24', name: 'Galaxy S24', owner: 'Alex Smith', status: 'Removed' },
]

export function DevicesListPage() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <p className="page-kicker">Devices route</p>
        <h2>Devices list placeholder</h2>
        <p>
          This route will host the first real vertical slice: fetched devices, desktop table,
          mobile card view, and a small set of interactions. Device detail is intentionally
          entered from a selected device, not from primary navigation.
        </p>
      </header>

      <div className="placeholder-panel">
        <h3>Planned columns</h3>
        <p>Device, user, status, and last event/updated.</p>
      </div>

      <div className="placeholder-list">
        {placeholderDevices.map((device) => (
          <Link
            key={device.id}
            to={`/devices/${device.id}`}
            className="placeholder-list__item"
          >
            <div>
              <strong>{device.name}</strong>
              <span>{device.owner}</span>
            </div>
            <span>{device.status}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
