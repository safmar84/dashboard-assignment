import { useQuery } from '@tanstack/react-query'
import { statisticsOverviewQueryOptions } from '../../entities/statistics'
import { Button } from '../../shared/ui/button/Button'
import { Card } from '../../shared/ui/card/Card'
import './dashboard.css'

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value))
}

function formatPercentage(value: number) {
  return `${Math.round(value)}%`
}

export function DashboardPage() {
  const statisticsQuery = useQuery(statisticsOverviewQueryOptions())
  const statistics = statisticsQuery.data

  if (statisticsQuery.isLoading) {
    return (
      <section className="page-shell">
        <header className="page-header">
          <p className="page-kicker">Overview route</p>
          <h2>Loading dashboard</h2>
          <p>The overview is resolving live statistics from the hosted API.</p>
        </header>

        <div className="dashboard__metrics">
          <Card title="Devices" description="Waiting for total device count." />
          <Card title="Users" description="Waiting for user count." />
          <Card title="Active share" description="Waiting for status totals." />
          <Card title="Events" description="Waiting for activity total." />
        </div>
      </section>
    )
  }

  if (statisticsQuery.isError || !statistics) {
    return (
      <section className="page-shell">
        <header className="page-header">
          <p className="page-kicker">Overview route</p>
          <h2>Unable to load dashboard</h2>
          <p>The route is wired, but the overview statistics could not be resolved right now.</p>
        </header>

        <div className="dashboard__actions">
          <Button onClick={() => statisticsQuery.refetch()} size="sm" className="dashboard__action">
            Retry query
          </Button>
          <Button size="sm" to="/devices" variant="secondary" className="dashboard__action">
            Open devices
          </Button>
        </div>
      </section>
    )
  }

  const activeShare = (statistics.activeDevices / statistics.totalDevices) * 100
  const devicesPerUser = statistics.totalDevices / statistics.totalUsers
  const statusItems = [
    {
      label: 'Active',
      value: statistics.activeDevices,
      tone: 'active',
    },
    {
      label: 'Blocked',
      value: statistics.blockedDevices,
      tone: 'blocked',
    },
    {
      label: 'Expired',
      value: statistics.expiredDevices,
      tone: 'expired',
    },
    {
      label: 'Removed',
      value: statistics.removedDevices,
      tone: 'removed',
    },
  ] as const

  return (
    <section className="page-shell">
      <header className="page-header">
        <p className="page-kicker">Overview route</p>
        <h2>Dashboard</h2>
        <p>
          The overview now renders a real summary slice over hosted statistics data: core KPIs,
          device status distribution, and a quick path into the detailed devices workflow.
        </p>
      </header>

      <div className="dashboard__actions">
        <Button size="sm" to="/devices" variant="secondary" className="dashboard__action">
          Open devices
        </Button>
      </div>

      <div className="dashboard__metrics">
        <Card className="dashboard__metric-card">
          <p className="dashboard__metric-label">Devices</p>
          <strong className="dashboard__metric-value">{statistics.totalDevices}</strong>
          <p className="dashboard__metric-meta">Managed device records in the current overview.</p>
        </Card>
        <Card className="dashboard__metric-card">
          <p className="dashboard__metric-label">Users</p>
          <strong className="dashboard__metric-value">{statistics.totalUsers}</strong>
          <p className="dashboard__metric-meta">
            {devicesPerUser.toFixed(1)} devices per user on average.
          </p>
        </Card>
        <Card className="dashboard__metric-card">
          <p className="dashboard__metric-label">Active share</p>
          <strong className="dashboard__metric-value">{formatPercentage(activeShare)}</strong>
          <p className="dashboard__metric-meta">
            {statistics.activeDevices} of {statistics.totalDevices} devices are active.
          </p>
        </Card>
        <Card className="dashboard__metric-card">
          <p className="dashboard__metric-label">Events</p>
          <strong className="dashboard__metric-value">{statistics.totalEvents}</strong>
          <p className="dashboard__metric-meta">Tracked device events in the current snapshot.</p>
        </Card>
      </div>

      <div className="dashboard__content">
        <Card
          title="Device status breakdown"
          description="A compact operational view of the current device portfolio."
        >
          <div className="dashboard__bars">
            {statusItems.map((item) => {
              const percentage = (item.value / statistics.totalDevices) * 100

              return (
                <div key={item.label} className="dashboard__bar-row">
                  <div className="dashboard__bar-meta">
                    <strong>{item.label}</strong>
                    <span>
                      {item.value} · {formatPercentage(percentage)}
                    </span>
                  </div>
                  <div className="dashboard__bar-track" aria-hidden="true">
                    <span
                      className={`dashboard__bar-fill dashboard__bar-fill--${item.tone}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card
          title="Snapshot context"
          description="Small supporting facts that help interpret the overview."
        >
          <dl className="dashboard__facts">
            <div>
              <dt>Generated at</dt>
              <dd>{formatDateTime(statistics.generatedAt)}</dd>
            </div>
            <div>
              <dt>Non-active devices</dt>
              <dd>
                {statistics.blockedDevices + statistics.expiredDevices + statistics.removedDevices}
              </dd>
            </div>
            <div>
              <dt>Needs attention</dt>
              <dd>{statistics.blockedDevices + statistics.expiredDevices}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </section>
  )
}
