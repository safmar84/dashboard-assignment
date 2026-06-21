import type { QueryClient } from '@tanstack/react-query'
import { queryOptions } from '@tanstack/react-query'
import { apiPaths } from '../../../shared/api/config'
import { getJson } from '../../../shared/api/http'
import { adaptDeviceDetail, adaptDevicesIndex } from './device.adapters'
import { deviceDetailDtoSchema, devicesIndexDtoSchema } from './device.schemas'

export const deviceQueryKeys = {
  all: ['devices'] as const,
  list: () => [...deviceQueryKeys.all, 'list'] as const,
  dataset: () => [...deviceQueryKeys.all, 'dataset'] as const,
  detail: (deviceId: string) => [...deviceQueryKeys.all, 'detail', deviceId] as const,
}

export function devicesListQueryOptions(page = 1) {
  return queryOptions({
    queryKey: [...deviceQueryKeys.list(), page] as const,
    queryFn: async () => {
      const dto = await getJson(apiPaths.devicesIndex(page), devicesIndexDtoSchema)

      return adaptDevicesIndex(dto)
    },
  })
}

export function devicesDatasetQueryOptions(queryClient: QueryClient) {
  return queryOptions({
    queryKey: deviceQueryKeys.dataset(),
    queryFn: async () => {
      const firstPage = await queryClient.ensureQueryData(devicesListQueryOptions(1))
      const remainingPages = await Promise.all(
        Array.from({ length: Math.max(0, firstPage.totalPages - 1) }, (_, index) =>
          queryClient.ensureQueryData(devicesListQueryOptions(index + 2)),
        ),
      )

      return {
        pageSize: firstPage.pageSize,
        totalItems: firstPage.totalItems,
        totalPages: firstPage.totalPages,
        items: [firstPage, ...remainingPages].flatMap((page) => page.items),
      }
    },
  })
}

export function deviceDetailQueryOptions(deviceId: string) {
  return queryOptions({
    queryKey: deviceQueryKeys.detail(deviceId),
    queryFn: async () => {
      const dto = await getJson(apiPaths.deviceDetail(deviceId), deviceDetailDtoSchema)

      return adaptDeviceDetail(dto)
    },
  })
}
