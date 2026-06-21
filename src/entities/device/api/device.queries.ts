import { queryOptions } from '@tanstack/react-query'
import { apiPaths } from '../../../shared/api/config'
import { getJson } from '../../../shared/api/http'
import { adaptDeviceDetail, adaptDevicesIndex } from './device.adapters'
import { deviceDetailDtoSchema, devicesIndexDtoSchema } from './device.schemas'

export const deviceQueryKeys = {
  all: ['devices'] as const,
  list: () => [...deviceQueryKeys.all, 'list'] as const,
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

export function deviceDetailQueryOptions(deviceId: string) {
  return queryOptions({
    queryKey: deviceQueryKeys.detail(deviceId),
    queryFn: async () => {
      const dto = await getJson(apiPaths.deviceDetail(deviceId), deviceDetailDtoSchema)

      return adaptDeviceDetail(dto)
    },
  })
}
