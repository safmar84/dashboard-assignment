import { Button } from '../../shared/ui/button/Button'
import { Card } from '../../shared/ui/card/Card'
import { adaptStatisticsOverview, statisticsOverviewFixture } from '../../entities/statistics'

export function DashboardPage() {
  const statistics = adaptStatisticsOverview(statisticsOverviewFixture)

  return (
    <section className="page-shell">
      <header className="page-header">
        <p className="page-kicker">Overview route</p>
        <h2>Dashboard placeholder</h2>
        <p>
          This route will become the KPI and chart overview. For now it proves that the app
          shell, navigation, and route rendering are wired correctly.
        </p>
      </header>

      <div className="placeholder-grid">
        <Card
          title="Statistics summary"
          description={`Prepared through the API boundary: ${statistics.totalDevices} devices across ${statistics.totalUsers} users.`}
        />
        <Card
          title="Status breakdown"
          description={`${statistics.activeDevices} active, ${statistics.expiredDevices} expired, ${statistics.removedDevices} removed.`}
        />
        <Card
          title="Navigation shortcut"
          description="Reserved for links into operational views such as devices and detail pages."
        >
          <div style={{ marginTop: '1rem' }}>
            <Button size="sm" to="/devices" variant="secondary">
              Open devices route
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
