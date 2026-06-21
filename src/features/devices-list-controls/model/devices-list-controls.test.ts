import { describe, expect, it } from 'vitest'
import { adaptDevicesIndex, devicesIndexFixture } from '../../../entities/device'
import {
  defaultDevicesListControlsState,
  filterAndSortDevices,
  hasCustomDevicesListControls,
  paginateDevices,
  persistDevicesListControls,
  readDevicesListControls,
  type DevicesListControlsState,
  type DevicesSortOption,
  type DevicesStatusFilter,
} from './devices-list-controls'

function runControls(statusFilter: DevicesStatusFilter, sortOption: DevicesSortOption) {
  const devices = adaptDevicesIndex(devicesIndexFixture)

  return filterAndSortDevices(devices.items, statusFilter, sortOption)
}

function createStorage(initialValue?: string) {
  let storedValue = initialValue ?? null

  return {
    getItem: () => storedValue,
    setItem: (_key: string, value: string) => {
      storedValue = value
    },
    read: () => storedValue,
  }
}

describe('devices list controls', () => {
  it('filters devices by status', () => {
    const blockedDevices = runControls('blocked', 'last-active-desc')

    expect(blockedDevices).toHaveLength(1)
    expect(blockedDevices[0]?.status).toBe('blocked')
  })

  it('sorts devices by last activity descending by default', () => {
    const devices = runControls('all', 'last-active-desc')

    expect(devices.map((device) => device.id)).toEqual([
      'd8e7012f-3968-4c81-bb70-c3b8a81fdec3',
      'd664d264-4c6e-47ff-b9de-7a3a486822b9',
      'bdd640fb-0667-4ad1-9c80-317fa3b1799d',
      '14fcdd54-9e8f-4965-8a2c-827e98326856',
    ])
  })

  it('identifies whether persisted controls differ from defaults', () => {
    expect(hasCustomDevicesListControls(defaultDevicesListControlsState)).toBe(false)
    expect(
      hasCustomDevicesListControls({
        statusFilter: 'blocked',
        sortOption: 'last-active-desc',
      }),
    ).toBe(true)
  })

  it('paginates items and clamps out-of-range pages', () => {
    const devices = runControls('all', 'last-active-desc')
    const paged = paginateDevices(devices, 2, 3)
    const clamped = paginateDevices(devices, 99, 3)

    expect(paged.page).toBe(2)
    expect(paged.totalPages).toBe(2)
    expect(paged.items).toHaveLength(1)
    expect(clamped.page).toBe(2)
  })

  it('reads persisted controls from storage when payload is valid', () => {
    const storage = createStorage('{"statusFilter":"blocked","sortOption":"owner-asc"}')

    expect(readDevicesListControls(storage)).toEqual<DevicesListControlsState>({
      statusFilter: 'blocked',
      sortOption: 'owner-asc',
    })
  })

  it('falls back to defaults when persisted payload is invalid', () => {
    const malformedStorage = createStorage('{not-json')
    const unsupportedValueStorage = createStorage(
      '{"statusFilter":"suspended","sortOption":"owner-asc"}',
    )

    expect(readDevicesListControls(malformedStorage)).toEqual(defaultDevicesListControlsState)
    expect(readDevicesListControls(unsupportedValueStorage)).toEqual(
      defaultDevicesListControlsState,
    )
  })

  it('persists controls into storage as json', () => {
    const storage = createStorage()

    persistDevicesListControls(storage, {
      statusFilter: 'expired',
      sortOption: 'model-asc',
    })

    expect(storage.read()).toBe('{"statusFilter":"expired","sortOption":"model-asc"}')
  })
})
