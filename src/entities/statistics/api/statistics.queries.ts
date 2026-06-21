import { queryOptions } from '@tanstack/react-query'
import { adaptStatisticsOverview } from './statistics.adapters'
import { statisticsOverviewFixture } from '../mock/statistics.fixtures'

export const statisticsQueryKeys = {
  all: ['statistics'] as const,
  overview: () => [...statisticsQueryKeys.all, 'overview'] as const,
}

export function statisticsOverviewQueryOptions() {
  return queryOptions({
    queryKey: statisticsQueryKeys.overview(),
    queryFn: async () => adaptStatisticsOverview(statisticsOverviewFixture),
  })
}
