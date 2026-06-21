import { describe, expect, it } from 'vitest'
import { adaptStatisticsOverview, statisticsOverviewFixture } from '..'

describe('statistics adapters', () => {
  it('maps valid statistics payloads and rejects invalid ones', () => {
    expect(adaptStatisticsOverview(statisticsOverviewFixture)).toEqual({
      totalDevices: 120,
      totalUsers: 25,
      activeDevices: 68,
      blockedDevices: 13,
      expiredDevices: 11,
      removedDevices: 28,
    })

    expect(() =>
      adaptStatisticsOverview({
        ...statisticsOverviewFixture,
        totals: {
          ...statisticsOverviewFixture.totals,
          devices: -1,
        },
      }),
    ).toThrow()
  })
})
