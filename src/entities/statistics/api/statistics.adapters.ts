import type { StatisticsOverview } from '../model/statistics'
import { statisticsOverviewDtoSchema } from './statistics.schemas'

export function adaptStatisticsOverview(input: unknown): StatisticsOverview {
  const dto = statisticsOverviewDtoSchema.parse(input)

  return {
    totalDevices: dto.totalDevices,
    totalUsers: dto.totalUsers,
    activeDevices: dto.activeDevices,
    expiredDevices: dto.expiredDevices,
    removedDevices: dto.removedDevices,
  }
}
