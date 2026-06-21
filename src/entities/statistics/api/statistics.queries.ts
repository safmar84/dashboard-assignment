import { queryOptions } from '@tanstack/react-query'
import { apiPaths } from '../../../shared/api/config'
import { getJson } from '../../../shared/api/http'
import { adaptStatisticsOverview } from './statistics.adapters'
import { statisticsOverviewDtoSchema } from './statistics.schemas'

export const statisticsQueryKeys = {
  all: ['statistics'] as const,
  overview: () => [...statisticsQueryKeys.all, 'overview'] as const,
}

export function statisticsOverviewQueryOptions() {
  return queryOptions({
    queryKey: statisticsQueryKeys.overview(),
    queryFn: async () => {
      const dto = await getJson(apiPaths.statistics, statisticsOverviewDtoSchema)

      return adaptStatisticsOverview(dto)
    },
  })
}
