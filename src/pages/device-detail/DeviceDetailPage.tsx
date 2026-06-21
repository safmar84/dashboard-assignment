import { useParams } from 'react-router-dom'
import {
  adaptDeviceDetail,
  deviceDetailFixtures,
  formatDeviceStatus,
} from '../../entities/device'
import { Button } from '../../shared/ui/button/Button'
import { Card } from '../../shared/ui/card/Card'
import { StatusBadge } from '../../shared/ui/status-badge/StatusBadge'

export function DeviceDetailPage() {
  const { deviceId } = useParams()
  const detail = adaptDeviceDetail(
    deviceDetailFixtures[deviceId ?? 'demo-device'] ?? deviceDetailFixtures['demo-device'],
  )

  return (
    <section className="page-shell">
      <header className="page-header">
        <p className="page-kicker">Device detail route</p>
        <h2>Device detail placeholder</h2>
        <p>
          This route is already parameterized. It will later render normalized device data and
          an event timeline for the selected device <code>{deviceId ?? 'unknown-device'}</code>.
        </p>
      </header>

      <Button to="/devices" variant="secondary">
        Back to devices
      </Button>

      <div className="placeholder-meta">
        <Card
          title="Device identity"
          description={`${detail.model}${detail.platform ? ` · ${detail.platform}` : ''}`}
        >
          <div style={{ marginTop: '1rem' }}>
            <StatusBadge label={formatDeviceStatus(detail.status)} />
          </div>
        </Card>
        <Card
          title="Owner context"
          description={`${detail.owner.name} · ${detail.owner.id}`}
        />
      </div>

      <div className="placeholder-stack">
        <Card
          title="Timeline preview"
          description={`Boundary currently maps ${detail.events.length} normalized events for the selected device.`}
        />

        <div className="placeholder-timeline">
          {detail.events.map((event) => (
            <div key={event.label} className="placeholder-timeline__item">
              <strong>{event.label}</strong>
              <span>{event.description ?? event.occurredAt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
