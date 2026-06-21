import { Button } from '../../shared/ui/button/Button'

export function NotFoundPage() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <h2>Page not found</h2>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      </header>

      <Button to="/" variant="secondary">
        Return to dashboard
      </Button>
    </section>
  )
}
