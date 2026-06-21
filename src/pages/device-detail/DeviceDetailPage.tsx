import { useParams } from 'react-router-dom'

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
          an event timeline for <code>{deviceId ?? 'unknown-device'}</code>.
        </p>
      </header>

      <div className="placeholder-meta">
        <article className="placeholder-panel">
          <h3>Device identity</h3>
          <p>Reserved for model, status, and activation metadata.</p>
        </article>
        <article className="placeholder-panel">
          <h3>Owner context</h3>
          <p>Reserved for the owning user and related account information.</p>
        </article>
      </div>

      <div className="placeholder-stack">
        <article className="placeholder-panel">
          <h3>Timeline preview</h3>
          <p>Reserved for the event history delivered by the device detail endpoint.</p>
        </article>

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
