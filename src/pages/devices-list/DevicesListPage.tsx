import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  devicesListQueryOptions,
  formatDeviceStatus,
} from '../../entities/device'
import { Card } from '../../shared/ui/card/Card'
import { StatusBadge } from '../../shared/ui/status-badge/StatusBadge'

export function DevicesListPage() {
  const devicesQuery = useQuery(devicesListQueryOptions())
  const devices = devicesQuery.data

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

      <Card
        title="Planned columns"
        description={
          devices
            ? `Device, user, status, and last event/updated. Query currently resolves page ${devices.page} of ${devices.totalPages}.`
            : 'Devices query is wired; next step replaces the placeholder with the first real desktop list.'
        }
      />

      <div className="placeholder-list">
        {(devices?.items ?? []).map((device) => (
          <Link
            key={device.id}
            to={`/devices/${device.id}`}
            className="placeholder-list__item"
          >
            <div className="placeholder-list__meta">
              <strong>{device.model}</strong>
              <span>{device.ownerName}</span>
            </div>
            <StatusBadge label={formatDeviceStatus(device.status)} />
          </Link>
        ))}
      </div>
    </section>
  )
}
