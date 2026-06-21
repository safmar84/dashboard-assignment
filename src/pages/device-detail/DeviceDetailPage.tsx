import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {
  deviceDetailQueryOptions,
  formatDeviceStatus,
} from '../../entities/device'
import { Button } from '../../shared/ui/button/Button'
import { Card } from '../../shared/ui/card/Card'
import { StatusBadge } from '../../shared/ui/status-badge/StatusBadge'
import './device-detail.css'

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function formatDateTime(value: string | null) {
  if (!value) {
    return 'Not available'
  }

  return dateTimeFormatter.format(new Date(value))
}

function formatBiometry(value: boolean) {
  return value ? 'Enabled' : 'Disabled'
}

export function DeviceDetailPage() {
  const { deviceId } = useParams()
  const resolvedDeviceId = deviceId ?? 'demo-device'
  const detailQuery = useQuery(deviceDetailQueryOptions(resolvedDeviceId))
  const detail = detailQuery.data

  if (detailQuery.isLoading) {
    return (
      <section className="page-shell">
        <header className="page-header">
          <div className="device-detail__title-row">
            <Button to="/devices" variant="secondary" size="sm" className="device-detail__back-button">
              ←
            </Button>
            <h2>Loading device detail</h2>
          </div>
          <p>Loading device details.</p>
        </header>

        <div className="device-detail__grid device-detail__grid--summary">
          <Card title="Device summary" description="Waiting for normalized identity and status data." />
          <Card title="Owner and security" description="Owner, app version, OS version, and biometry will appear here." />
          <Card title="Activity" description="Creation date, last activity, and event count are loading." />
        </div>
      </section>
    )
  }

  if (detailQuery.isError || !detail) {
    return (
      <section className="page-shell">
        <header className="page-header">
          <div className="device-detail__title-row">
            <Button to="/devices" variant="secondary" size="sm" className="device-detail__back-button">
              ←
            </Button>
            <h2>Unable to load device detail</h2>
          </div>
          <p>Device details could not be loaded right now.</p>
        </header>

        <div className="device-detail__actions">
          <Button onClick={() => detailQuery.refetch()} size="sm" className="device-detail__back-link">
            Retry query
          </Button>
        </div>

        <Card
          title="Query failure"
          description="Check the route parameter or retry the hosted mock API request."
        />
      </section>
    )
  }

  return (
    <section className="page-shell">
      <header className="page-header">
        <div className="device-detail__title-row">
          <Button to="/devices" variant="secondary" size="sm" className="device-detail__back-button">
            ←
          </Button>
          <h2>{detail.model}</h2>
        </div>
        <p>Device details, ownership, security settings, and activity history.</p>
      </header>

      <div className="device-detail__actions">
        <StatusBadge label={formatDeviceStatus(detail.status)} />
      </div>

      <Card
        title={`${detail.vendor} ${detail.model}`}
        description={`${detail.platform ?? 'Unknown platform'} · ${detail.shortId}`}
      >
        <dl className="device-detail__facts">
          <div>
            <dt>User</dt>
            <dd>{detail.owner.name}</dd>
          </div>
          <div>
            <dt>User ID</dt>
            <dd>{detail.owner.id}</dd>
          </div>
          <div>
            <dt>Device ID</dt>
            <dd>{detail.id}</dd>
          </div>
          <div>
            <dt>Events</dt>
            <dd>{detail.events.length}</dd>
          </div>
        </dl>
      </Card>

      <div className="device-detail__grid device-detail__grid--summary">
        <Card title="App and security">
          <dl className="device-detail__facts">
            <div>
              <dt>App version</dt>
              <dd>{detail.appVersion ?? 'Not available'}</dd>
            </div>
            <div>
              <dt>OS version</dt>
              <dd>{detail.osVersion ?? 'Not available'}</dd>
            </div>
            <div>
              <dt>Biometry</dt>
              <dd>{formatBiometry(detail.biometryEnabled)}</dd>
            </div>
          </dl>
        </Card>

        <Card title="Lifecycle">
          <dl className="device-detail__facts">
            <div>
              <dt>Created</dt>
              <dd>{formatDateTime(detail.createdAt)}</dd>
            </div>
            <div>
              <dt>Last active</dt>
              <dd>{formatDateTime(detail.lastActiveAt)}</dd>
            </div>
          </dl>
        </Card>

        <Card title="Owner context">
          <dl className="device-detail__facts">
            <div>
              <dt>Name</dt>
              <dd>{detail.owner.name}</dd>
            </div>
            <div>
              <dt>Identifier</dt>
              <dd>{detail.owner.id}</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>{detail.platform ?? 'Not available'}</dd>
            </div>
          </dl>
        </Card>
      </div>

      <Card
        title="Activity timeline"
        description="Recent activity recorded for this device."
      >
        {detail.events.length === 0 ? (
          <p className="device-detail__empty">No events are available for this device yet.</p>
        ) : (
          <div className="device-detail__timeline">
            {[...detail.events]
              .sort(
                (left, right) =>
                  new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime(),
              )
              .map((event) => (
                <article key={event.id} className="device-detail__timeline-item">
                  <div className="device-detail__timeline-head">
                    <strong>{event.label}</strong>
                    <time dateTime={event.occurredAt}>{formatDateTime(event.occurredAt)}</time>
                  </div>
                  <p>{event.description ?? 'No additional event context available.'}</p>
                </article>
              ))}
          </div>
        )}
      </Card>
    </section>
  )
}
