import { describe, expect, it } from 'vitest'
import { adaptDevicesIndex, devicesIndexFixture } from '../../../entities/device'
import {
  filterAndSortDevices,
  type DevicesSortOption,
  type DevicesStatusFilter,
} from './devices-list-controls'

function runControls(statusFilter: DevicesStatusFilter, sortOption: DevicesSortOption) {
  const devices = adaptDevicesIndex(devicesIndexFixture)

  return filterAndSortDevices(devices.items, statusFilter, sortOption)
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
})
