import { z } from 'zod'
import type { DeviceStatus, DeviceSummary } from '../../../entities/device'

export type DevicesStatusFilter = 'all' | DeviceStatus

export type DevicesSortOption =
  | 'last-active-desc'
  | 'last-active-asc'
  | 'model-asc'
  | 'owner-asc'

export const defaultDevicesStatusFilter: DevicesStatusFilter = 'all'
export const defaultDevicesSortOption: DevicesSortOption = 'last-active-desc'
export const devicesListControlsStorageKey = 'devices-list-controls'

export type DevicesListControlsState = {
  statusFilter: DevicesStatusFilter
  sortOption: DevicesSortOption
}

export const defaultDevicesListControlsState: DevicesListControlsState = {
  statusFilter: defaultDevicesStatusFilter,
  sortOption: defaultDevicesSortOption,
}

const devicesStatusFilterSchema = z.enum(['all', 'active', 'blocked', 'expired', 'removed'])
const devicesSortOptionSchema = z.enum([
  'last-active-desc',
  'last-active-asc',
  'model-asc',
  'owner-asc',
])
const devicesListControlsStateSchema = z.object({
  statusFilter: devicesStatusFilterSchema,
  sortOption: devicesSortOptionSchema,
})

type StorageReader = Pick<Storage, 'getItem'>
type StorageWriter = Pick<Storage, 'setItem'>

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

export function hasCustomDevicesListControls(state: DevicesListControlsState) {
  return (
    state.statusFilter !== defaultDevicesStatusFilter ||
    state.sortOption !== defaultDevicesSortOption
  )
}

export function paginateDevices<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const resolvedPage = Math.min(Math.max(1, page), totalPages)
  const startIndex = (resolvedPage - 1) * pageSize

  return {
    page: resolvedPage,
    totalPages,
    items: items.slice(startIndex, startIndex + pageSize),
  }
}

export function readDevicesListControls(storage: StorageReader | null | undefined) {
  const rawValue = storage?.getItem(devicesListControlsStorageKey)

  if (!rawValue) {
    return defaultDevicesListControlsState
  }

  let parsedValue: unknown

  try {
    parsedValue = JSON.parse(rawValue)
  } catch (error) {
    if (error instanceof SyntaxError) {
      return defaultDevicesListControlsState
    }

    throw error
  }

  const parsedControls = devicesListControlsStateSchema.safeParse(parsedValue)

  return parsedControls.success ? parsedControls.data : defaultDevicesListControlsState
}

export function persistDevicesListControls(
  storage: StorageWriter | null | undefined,
  value: DevicesListControlsState,
) {
  storage?.setItem(devicesListControlsStorageKey, JSON.stringify(value))
}
