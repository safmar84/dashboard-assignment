import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <p className="page-kicker">Unknown route</p>
        <h2>Page not found</h2>
        <p>The current route is outside the planned assignment scope.</p>
      </header>

      <Link className="not-found-link" to="/">
        Return to dashboard
      </Link>
    </section>
  )
}
