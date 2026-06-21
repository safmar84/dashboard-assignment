import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  devicesDatasetQueryOptions,
  formatDeviceStatus,
} from '../../entities/device'
import {
  defaultDevicesListControlsState,
  filterAndSortDevices,
  paginateDevices,
  persistDevicesListControls,
  readDevicesListControls,
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

function parsePage(rawValue: string | null) {
  const parsed = Number(rawValue)

  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1
}

export function DevicesListPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parsePage(searchParams.get('page'))
  const devicesDatasetQuery = useQuery(devicesDatasetQueryOptions(queryClient))
  const devicesDataset = devicesDatasetQuery.data
  const [controls, setControls] = useState(() =>
    readDevicesListControls(typeof window === 'undefined' ? null : window.localStorage),
  )
  const { statusFilter, sortOption } = controls

  useEffect(() => {
    persistDevicesListControls(
      typeof window === 'undefined' ? null : window.localStorage,
      controls,
    )
  }, [controls])

  const filteredDevices = useMemo(
    () =>
      devicesDataset
        ? filterAndSortDevices(devicesDataset.items, statusFilter, sortOption)
        : [],
    [devicesDataset, sortOption, statusFilter],
  )

  const paginatedDevices = useMemo(
    () =>
      devicesDataset
        ? paginateDevices(filteredDevices, currentPage, devicesDataset.pageSize)
        : null,
    [currentPage, devicesDataset, filteredDevices],
  )

  const pageMetadata = useMemo(
    () =>
      paginatedDevices && devicesDataset
        ? {
            page: paginatedDevices.page,
            totalPages: paginatedDevices.totalPages,
            pageSize: devicesDataset.pageSize,
            totalItems: devicesDataset.totalItems,
            matchingItems: filteredDevices.length,
          }
        : null,
    [devicesDataset, filteredDevices.length, paginatedDevices],
  )

  const visibleDevices = paginatedDevices?.items ?? []
  const hasVisibleDevices = visibleDevices.length > 0
  const pageNumbers = useMemo(
    () =>
      pageMetadata
        ? Array.from({ length: pageMetadata.totalPages }, (_, index) => index + 1)
        : [],
    [pageMetadata],
  )

  const setPage = useCallback(
    (page: number) => {
      const nextSearchParams = new URLSearchParams(searchParams)

      nextSearchParams.set('page', String(page))
      setSearchParams(nextSearchParams)
    },
    [searchParams, setSearchParams],
  )

  useEffect(() => {
    if (!paginatedDevices) {
      return
    }

    if (currentPage !== paginatedDevices.page) {
      setPage(paginatedDevices.page)
    }
  }, [currentPage, paginatedDevices, setPage])

  if (devicesDatasetQuery.isLoading) {
    return (
      <section className="page-shell">
        <header className="page-header">
          <h2>Devices</h2>
          <p>Loading devices.</p>
        </header>

        <Card
          title="Loading devices"
          description="The complete dataset is resolving before the devices list is rendered."
        />
      </section>
    )
  }

  if (devicesDatasetQuery.isError) {
    return (
      <section className="page-shell">
        <header className="page-header">
          <h2>Devices</h2>
          <p>Devices could not be loaded right now.</p>
        </header>

        <Card
          title="Unable to load devices"
          description="Retry the query to resolve the full devices dataset again."
        >
          <div style={{ marginTop: '1rem' }}>
            <Button
              onClick={() => {
                void devicesDatasetQuery.refetch()
              }}
              size="sm"
              variant="secondary"
            >
              Retry query
            </Button>
          </div>
        </Card>
      </section>
    )
  }

  if (!pageMetadata) {
    return (
      <section className="page-shell">
        <header className="page-header">
          <h2>Devices</h2>
          <p>The devices list is ready for data, but the current result is empty.</p>
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
        <h2>Devices</h2>
        <p>Browse devices, filter by status, and open device details.</p>
      </header>

      <DevicesListToolbar
        statusFilter={statusFilter}
        sortOption={sortOption}
        visibleCount={visibleDevices.length}
        totalCount={pageMetadata.matchingItems}
        onStatusFilterChange={(value) => {
          setControls((current) => ({ ...current, statusFilter: value }))
          setPage(1)
        }}
        onSortOptionChange={(value) => {
          setControls((current) => ({ ...current, sortOption: value }))
          setPage(1)
        }}
        onReset={() => {
          setControls(defaultDevicesListControlsState)
          setPage(1)
        }}
      />

      {hasVisibleDevices ? (
        <>
          <div className="devices-cards">
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

          <div className="devices-table-shell">
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
                  <tr
                    key={device.id}
                    className="devices-table__row"
                    tabIndex={0}
                    onClick={() => navigate(`/devices/${device.id}`)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        navigate(`/devices/${device.id}`)
                      }
                    }}
                  >
                    <td>
                      <Link to={`/devices/${device.id}`} className="devices-table__device-link">
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
        </>
      ) : (
        <Card
          title="No devices match current controls"
          description="Try a different status filter or reset the sorting/filtering controls."
        />
      )}

      <div className="devices-pagination" aria-label="Devices pagination">
        <div className="devices-pagination__summary">
          <strong>
            Page {pageMetadata.page} of {pageMetadata.totalPages}
          </strong>
          <span>{pageMetadata.totalItems} devices total</span>
        </div>

        <div className="devices-pagination__controls">
          <Button
            size="sm"
            variant="secondary"
            disabled={pageMetadata.page <= 1}
            onClick={() => setPage(pageMetadata.page - 1)}
          >
            Previous
          </Button>

          <div className="devices-pagination__pages">
            {pageNumbers.map((pageNumber) => (
              <Button
                key={pageNumber}
                size="sm"
                variant={pageNumber === pageMetadata.page ? 'primary' : 'secondary'}
                className="devices-pagination__page-button"
                onClick={() => setPage(pageNumber)}
                aria-current={pageNumber === pageMetadata.page ? 'page' : undefined}
              >
                {pageNumber}
              </Button>
            ))}
          </div>

          <Button
            size="sm"
            variant="secondary"
            disabled={pageMetadata.page >= pageMetadata.totalPages}
            onClick={() => setPage(pageMetadata.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  )
}
