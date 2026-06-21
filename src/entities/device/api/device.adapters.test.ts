import { describe, expect, it } from 'vitest'
import {
  adaptDeviceDetail,
  adaptDevicesIndex,
  deviceDetailFixtures,
  devicesIndexFixture,
} from '..'

describe('device adapters', () => {
  it('normalizes devices index and device detail payloads', () => {
    const index = adaptDevicesIndex(devicesIndexFixture)
    const detail = adaptDeviceDetail(deviceDetailFixtures['demo-device'])

    expect(index.page).toBe(1)
    expect(index.totalPages).toBe(3)
    expect(index.items[0]).toMatchObject({
      id: 'demo-device',
      model: 'iPhone 15 Pro',
      ownerName: 'Jane Doe',
      lastEventLabel: 'Activation',
    })

    expect(detail).toMatchObject({
      id: 'demo-device',
      platform: 'iOS',
      status: 'active',
      owner: { id: 'user-jane-doe', name: 'Jane Doe' },
    })
    expect(detail.events.map((event) => event.label)).toEqual([
      'Activation',
      'Login',
      'Signature',
    ])
  })
})
