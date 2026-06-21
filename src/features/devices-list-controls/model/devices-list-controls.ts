import type { DeviceStatus, DeviceSummary } from '../../../entities/device'

export type DevicesStatusFilter = 'all' | DeviceStatus

export type DevicesSortOption =
  | 'last-active-desc'
  | 'last-active-asc'
  | 'model-asc'
  | 'owner-asc'

export const defaultDevicesStatusFilter: DevicesStatusFilter = 'all'
export const defaultDevicesSortOption: DevicesSortOption = 'last-active-desc'

function compareText(left: string, right: string) {
  return left.localeCompare(right, 'cs')
}

function compareLastActive(left: string | null, right: string | null) {
  const leftTime = left ? new Date(left).getTime() : 0
  const rightTime = right ? new Date(right).getTime() : 0

  return leftTime - rightTime
}

export function filterAndSortDevices(
  items: DeviceSummary[],
  statusFilter: DevicesStatusFilter,
  sortOption: DevicesSortOption,
) {
  const filteredItems =
    statusFilter === 'all' ? items : items.filter((device) => device.status === statusFilter)

  return [...filteredItems].sort((left, right) => {
    switch (sortOption) {
      case 'last-active-desc':
        return (
          compareLastActive(right.lastEventAt, left.lastEventAt) ||
          compareText(left.model, right.model)
        )
      case 'last-active-asc':
        return (
          compareLastActive(left.lastEventAt, right.lastEventAt) ||
          compareText(left.model, right.model)
        )
      case 'model-asc':
        return compareText(left.model, right.model)
      case 'owner-asc':
        return compareText(left.ownerName, right.ownerName)
    }
  })
}
