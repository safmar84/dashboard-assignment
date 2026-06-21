import {
  statisticsOverviewDtoSchema,
  type StatisticsOverviewDto,
} from '../api/statistics.schemas'

const statisticsOverviewFixtureRaw: StatisticsOverviewDto = {
  generatedAt: '2026-05-22T10:00:00Z',
  totals: {
    devices: 120,
    users: 25,
    activeDevices: 68,
    removedDevices: 28,
    expiredDevices: 11,
    blockedDevices: 13,
    events: 1849,
  },
}

export const statisticsOverviewFixture =
  statisticsOverviewDtoSchema.parse(statisticsOverviewFixtureRaw)
