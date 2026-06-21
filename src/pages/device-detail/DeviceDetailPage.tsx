import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {
  deviceDetailQueryOptions,
  formatDeviceStatus,
} from '../../entities/device'
import { Button } from '../../shared/ui/button/Button'
import { Card } from '../../shared/ui/card/Card'
import { StatusBadge } from '../../shared/ui/status-badge/StatusBadge'

export function DeviceDetailPage() {
  const { deviceId } = useParams()
  const resolvedDeviceId = deviceId ?? 'demo-device'
  const detailQuery = useQuery(deviceDetailQueryOptions(resolvedDeviceId))
  const detail = detailQuery.data

  return (
    <section className="page-shell">
      <header className="page-header">
        <p className="page-kicker">Device detail route</p>
        <h2>Device detail placeholder</h2>
        <p>
          This route is already parameterized. It will later render normalized device data and
          an event timeline for the selected device <code>{resolvedDeviceId}</code>.
        </p>
      </header>

      <Button to="/devices" variant="secondary">
        Back to devices
      </Button>

      <div className="placeholder-meta">
        <Card
          title="Device identity"
          description={
            detail
              ? `${detail.model}${detail.platform ? ` · ${detail.platform}` : ''}`
              : 'Waiting for device detail query result.'
          }
        >
          <div style={{ marginTop: '1rem' }}>
            {detail ? <StatusBadge label={formatDeviceStatus(detail.status)} /> : null}
          </div>
        </Card>
        <Card
          title="Owner context"
          description={
            detail
              ? `${detail.owner.name} · ${detail.owner.id}`
              : 'Owner information will be filled from the normalized detail query.'
          }
        />
      </div>

      <div className="placeholder-stack">
        <Card
          title="Timeline preview"
          description={
            detailQuery.isSuccess && detail
              ? `Query currently maps ${detail.events.length} normalized events for the selected device.`
              : 'Timeline is wired through the query layer and ready for the dedicated detail slice.'
          }
        />

        <div className="placeholder-timeline">
          {(detail?.events ?? []).map((event) => (
            <div key={event.id} className="placeholder-timeline__item">
              <strong>{event.label}</strong>
              <span>{event.description ?? event.occurredAt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
