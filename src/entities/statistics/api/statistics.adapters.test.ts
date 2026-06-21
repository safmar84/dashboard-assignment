import { describe, expect, it } from 'vitest'
import { adaptStatisticsOverview, statisticsOverviewFixture } from '..'

describe('statistics adapters', () => {
  it('maps valid statistics payloads and rejects invalid ones', () => {
    expect(adaptStatisticsOverview(statisticsOverviewFixture)).toEqual({
      totalDevices: 1240,
      totalUsers: 912,
      activeDevices: 980,
      expiredDevices: 165,
      removedDevices: 95,
    })

    expect(() =>
      adaptStatisticsOverview({
        ...statisticsOverviewFixture,
        totalDevices: -1,
      }),
    ).toThrow()
  })
})
