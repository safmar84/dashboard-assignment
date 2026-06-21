import { describe, expect, it } from 'vitest'
import { adaptStatisticsOverview, statisticsOverviewFixture } from '..'

describe('statistics adapters', () => {
  it('maps valid statistics payloads and rejects invalid ones', () => {
    expect(adaptStatisticsOverview(statisticsOverviewFixture)).toEqual({
      generatedAt: '2026-05-22T10:00:00Z',
      totalDevices: 120,
      totalUsers: 25,
      activeDevices: 68,
      blockedDevices: 13,
      expiredDevices: 11,
      removedDevices: 28,
      totalEvents: 1849,
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
