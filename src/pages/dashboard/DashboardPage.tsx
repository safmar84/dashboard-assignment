import { useQuery } from '@tanstack/react-query'
import { Button } from '../../shared/ui/button/Button'
import { Card } from '../../shared/ui/card/Card'
import { statisticsOverviewQueryOptions } from '../../entities/statistics'

export function DashboardPage() {
  const statisticsQuery = useQuery(statisticsOverviewQueryOptions())
  const statistics = statisticsQuery.data

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
          description={
            statistics
              ? `Served through TanStack Query: ${statistics.totalDevices} devices across ${statistics.totalUsers} users.`
              : 'Waiting for statistics query result.'
          }
        />
        <Card
          title="Status breakdown"
          description={
            statistics
              ? `${statistics.activeDevices} active, ${statistics.expiredDevices} expired, ${statistics.removedDevices} removed.`
              : 'Status totals will render once the overview query resolves.'
          }
        />
        <Card
          title="Navigation shortcut"
          description={
            statisticsQuery.isSuccess
              ? 'Query layer is ready; next slices can build real route content on top of it.'
              : 'Query layer is wired but the page is still intentionally a placeholder.'
          }
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
