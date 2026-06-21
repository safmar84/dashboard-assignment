export function DashboardPage() {
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
        <article className="placeholder-card">
          <h3>Statistics summary</h3>
          <p>Reserved for aggregate metrics fetched from the statistics endpoint.</p>
        </article>
        <article className="placeholder-card">
          <h3>Status breakdown</h3>
          <p>Reserved for a simple chart focused on device status distribution.</p>
        </article>
        <article className="placeholder-card">
          <h3>Navigation shortcut</h3>
          <p>Reserved for links into operational views such as devices and detail pages.</p>
        </article>
      </div>
    </section>
  )
}
