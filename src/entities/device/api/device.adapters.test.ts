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
    const detail = adaptDeviceDetail(
      deviceDetailFixtures['bdd640fb-0667-4ad1-9c80-317fa3b1799d'],
    )

    expect(index.page).toBe(1)
    expect(index.totalPages).toBe(5)
    expect(index.items[0]).toMatchObject({
      id: 'bdd640fb-0667-4ad1-9c80-317fa3b1799d',
      shortId: 'd-0001',
      model: 'iPhone 14',
      ownerName: 'Pavel Procházka',
      lastEventLabel: 'Last active',
    })
    expect(index.items[2]?.status).toBe('blocked')

    expect(detail).toMatchObject({
      id: 'bdd640fb-0667-4ad1-9c80-317fa3b1799d',
      shortId: 'd-0001',
      vendor: 'Apple',
      platform: 'iOS',
      status: 'active',
      owner: { id: 'u-0022', name: 'Pavel Procházka' },
    })
    expect(detail.events.map((event) => event.label)).toEqual([
      'Activation',
      'Login',
      'Removal',
    ])
  })
})
