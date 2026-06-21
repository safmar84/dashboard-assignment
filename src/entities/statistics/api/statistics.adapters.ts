import type { StatisticsOverview } from '../model/statistics'
import { statisticsOverviewDtoSchema } from './statistics.schemas'

export function adaptStatisticsOverview(input: unknown): StatisticsOverview {
  const dto = statisticsOverviewDtoSchema.parse(input)

  return {
    totalDevices: dto.totals.devices,
    totalUsers: dto.totals.users,
    activeDevices: dto.totals.activeDevices,
    blockedDevices: dto.totals.blockedDevices,
    expiredDevices: dto.totals.expiredDevices,
    removedDevices: dto.totals.removedDevices,
  }
}
