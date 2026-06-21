import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  devicesListQueryOptions,
  formatDeviceStatus,
} from '../../entities/device'
import {
  defaultDevicesSortOption,
  defaultDevicesStatusFilter,
  filterAndSortDevices,
  type DevicesSortOption,
  type DevicesStatusFilter,
} from '../../features/devices-list-controls/model/devices-list-controls'
import { DevicesListToolbar } from '../../features/devices-list-controls/ui/DevicesListToolbar'
import { Button } from '../../shared/ui/button/Button'
import { Card } from '../../shared/ui/card/Card'
import { StatusBadge } from '../../shared/ui/status-badge/StatusBadge'
import './devices-list.css'

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function formatLastEvent(dateTime: string | null) {
  if (!dateTime) {
    return 'No recent activity'
  }

  return dateTimeFormatter.format(new Date(dateTime))
}

export function DevicesListPage() {
  const devicesQuery = useQuery(devicesListQueryOptions())
  const devices = devicesQuery.data
  const [statusFilter, setStatusFilter] =
    useState<DevicesStatusFilter>(defaultDevicesStatusFilter)
  const [sortOption, setSortOption] =
    useState<DevicesSortOption>(defaultDevicesSortOption)

  const visibleDevices = useMemo(
    () =>
      devices
        ? filterAndSortDevices(devices.items, statusFilter, sortOption)
        : [],
    [devices, statusFilter, sortOption],
  )

  if (devicesQuery.isLoading) {
    return (
      <section className="page-shell">
        <header className="page-header">
          <p className="page-kicker">Devices route</p>
          <h2>Devices</h2>
          <p>Preparing the first desktop slice from server-state data.</p>
        </header>

        <Card
          title="Loading devices"
          description="The devices query is resolving before the desktop table is rendered."
        />
      </section>
    )
  }

  if (devicesQuery.isError) {
    return (
      <section className="page-shell">
        <header className="page-header">
          <p className="page-kicker">Devices route</p>
          <h2>Devices</h2>
          <p>The page is wired, but the current query result could not be resolved.</p>
        </header>

        <Card
          title="Unable to load devices"
          description="Retry the query to render the first desktop slice again."
        >
          <div style={{ marginTop: '1rem' }}>
            <Button onClick={() => devicesQuery.refetch()} size="sm" variant="secondary">
              Retry query
            </Button>
          </div>
        </Card>
      </section>
    )
  }

  if (!devices || devices.items.length === 0) {
    return (
      <section className="page-shell">
        <header className="page-header">
          <p className="page-kicker">Devices route</p>
          <h2>Devices</h2>
          <p>The desktop slice is ready for data, but the current list is empty.</p>
        </header>

        <Card
          title="No devices available"
          description="An empty-state pattern is now in place for the future real endpoint integration."
        />
      </section>
    )
  }

  return (
    <section className="page-shell devices-page">
      <header className="page-header">
        <p className="page-kicker">Devices route</p>
        <h2>Devices</h2>
        <p>
          The first real desktop slice is now in place: a table view driven by query data, with
          navigation to a parameterized device detail route.
        </p>
      </header>

      <div className="devices-page__meta">
        <Card
          title="Current page"
          description={`Query currently resolves page ${devices.page} of ${devices.totalPages}.`}
        />
        <Card
          title="Visible devices"
          description={`${visibleDevices.length} of ${devices.items.length} rows are shown in the desktop table slice.`}
        />
      </div>

      <DevicesListToolbar
        statusFilter={statusFilter}
        sortOption={sortOption}
        visibleCount={visibleDevices.length}
        totalCount={devices.items.length}
        onStatusFilterChange={setStatusFilter}
        onSortOptionChange={setSortOption}
        onReset={() => {
          setStatusFilter(defaultDevicesStatusFilter)
          setSortOption(defaultDevicesSortOption)
        }}
      />

      {visibleDevices.length === 0 ? (
        <Card
          title="No devices match current controls"
          description="Try a different status filter or reset the sorting/filtering controls."
        />
      ) : null}

      <div className="devices-cards" hidden={visibleDevices.length === 0}>
        {visibleDevices.map((device) => (
          <Link key={device.id} to={`/devices/${device.id}`} className="devices-card">
            <div className="devices-card__header">
              <div className="devices-card__summary">
                <strong>{device.model}</strong>
                <span className="devices-card__owner">{device.ownerName}</span>
              </div>
              <StatusBadge label={formatDeviceStatus(device.status)} />
            </div>
          </Link>
        ))}
      </div>

      <div className="devices-table-shell" hidden={visibleDevices.length === 0}>
        <table className="devices-table">
          <thead>
            <tr>
              <th scope="col">Device</th>
              <th scope="col">User</th>
              <th scope="col">Status</th>
              <th scope="col">Last event / updated</th>
            </tr>
          </thead>
          <tbody>
            {visibleDevices.map((device) => (
              <tr key={device.id}>
                <td>
                  <Link
                    to={`/devices/${device.id}`}
                    className="devices-table__device-link"
                  >
                    <strong>{device.model}</strong>
                    <span className="devices-table__secondary">
                      {device.vendor} · {device.shortId}
                    </span>
                  </Link>
                </td>
                <td className="devices-table__secondary">{device.ownerName}</td>
                <td>
                  <StatusBadge label={formatDeviceStatus(device.status)} />
                </td>
                <td>
                  <div className="devices-table__event">
                    <strong>{device.lastEventLabel ?? 'No event yet'}</strong>
                    <span className="devices-table__secondary">
                      {formatLastEvent(device.lastEventAt)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
