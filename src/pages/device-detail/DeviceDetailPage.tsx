import { useParams } from 'react-router-dom'
import { Button } from '../../shared/ui/button/Button'
import { Card } from '../../shared/ui/card/Card'
import { StatusBadge } from '../../shared/ui/status-badge/StatusBadge'

const timelinePreview = [
  { label: 'Activation', detail: 'Device enrolled successfully' },
  { label: 'Login', detail: 'User completed authentication flow' },
  { label: 'Signature', detail: 'Transaction signature recorded' },
]

export function DeviceDetailPage() {
  const { deviceId } = useParams()

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
          description="Reserved for model, status, and activation metadata."
        >
          <div style={{ marginTop: '1rem' }}>
            <StatusBadge label="Active" />
          </div>
        </Card>
        <Card
          title="Owner context"
          description="Reserved for the owning user and related account information."
        />
      </div>

      <div className="placeholder-stack">
        <Card
          title="Timeline preview"
          description="Reserved for the event history delivered by the device detail endpoint."
        />

        <div className="placeholder-timeline">
          {timelinePreview.map((event) => (
            <div key={event.label} className="placeholder-timeline__item">
              <strong>{event.label}</strong>
              <span>{event.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
