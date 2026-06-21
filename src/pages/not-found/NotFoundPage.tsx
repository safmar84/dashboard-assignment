import { Button } from '../../shared/ui/button/Button'

export function NotFoundPage() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <p className="page-kicker">Unknown route</p>
        <h2>Page not found</h2>
        <p>The current route is outside the planned assignment scope.</p>
      </header>

      <Button to="/" variant="secondary">
        Return to dashboard
      </Button>
    </section>
  )
}
