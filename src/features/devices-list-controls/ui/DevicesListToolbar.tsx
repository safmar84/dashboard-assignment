import { useState } from 'react'
import { Button } from '../../../shared/ui/button/Button'
import type {
  DevicesSortOption,
  DevicesStatusFilter,
} from '../model/devices-list-controls'
import './devices-list-toolbar.css'

type DevicesListToolbarProps = {
  statusFilter: DevicesStatusFilter
  sortOption: DevicesSortOption
  visibleCount: number
  totalCount: number
  onStatusFilterChange: (value: DevicesStatusFilter) => void
  onSortOptionChange: (value: DevicesSortOption) => void
  onReset: () => void
}

export function DevicesListToolbar({
  statusFilter,
  sortOption,
  visibleCount,
  totalCount,
  onStatusFilterChange,
  onSortOptionChange,
  onReset,
}: DevicesListToolbarProps) {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)
  const hasCustomControls =
    statusFilter !== 'all' || sortOption !== 'last-active-desc'

  return (
    <div className="devices-toolbar">
      <div className="devices-toolbar__topline">
        <div className="devices-toolbar__summary">
          <strong>{visibleCount}</strong>
          <span>
            of {totalCount} rows shown on this page
          </span>
        </div>

        <Button
          size="sm"
          variant="secondary"
          className="devices-toolbar__toggle"
          onClick={() => setIsMobileExpanded((current) => !current)}
        >
          {isMobileExpanded ? 'Hide filters' : 'Show filters'}
        </Button>
      </div>

      <div
        className={`devices-toolbar__controls${isMobileExpanded ? ' devices-toolbar__controls--expanded' : ''}`}
      >
        <label className="devices-toolbar__field">
          <span>Status</span>
          <select
            value={statusFilter}
            onChange={(event) =>
              onStatusFilterChange(event.target.value as DevicesStatusFilter)
            }
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
            <option value="expired">Expired</option>
            <option value="removed">Removed</option>
          </select>
        </label>

        <label className="devices-toolbar__field">
          <span>Sort by</span>
          <select
            value={sortOption}
            onChange={(event) =>
              onSortOptionChange(event.target.value as DevicesSortOption)
            }
          >
            <option value="last-active-desc">Recent activity</option>
            <option value="last-active-asc">Oldest activity</option>
            <option value="model-asc">Device model (A-Z)</option>
            <option value="owner-asc">Owner name (A-Z)</option>
          </select>
        </label>

        <Button
          size="sm"
          variant="secondary"
          onClick={onReset}
          disabled={!hasCustomControls}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
