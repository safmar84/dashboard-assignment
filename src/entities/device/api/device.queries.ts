import { queryOptions } from '@tanstack/react-query'
import { adaptDeviceDetail, adaptDevicesIndex } from './device.adapters'
import { deviceDetailFixtures, devicesIndexFixture } from '../mock/device.fixtures'

export const deviceQueryKeys = {
  all: ['devices'] as const,
  list: () => [...deviceQueryKeys.all, 'list'] as const,
  detail: (deviceId: string) => [...deviceQueryKeys.all, 'detail', deviceId] as const,
}

export function devicesListQueryOptions() {
  return queryOptions({
    queryKey: deviceQueryKeys.list(),
    queryFn: async () => adaptDevicesIndex(devicesIndexFixture),
  })
}

export function deviceDetailQueryOptions(deviceId: string) {
  return queryOptions({
    queryKey: deviceQueryKeys.detail(deviceId),
    queryFn: async () =>
      adaptDeviceDetail(deviceDetailFixtures[deviceId] ?? deviceDetailFixtures['demo-device']),
  })
}
