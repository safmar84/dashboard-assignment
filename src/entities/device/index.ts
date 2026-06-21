export { adaptDeviceDetail, adaptDevicesIndex } from './api/device.adapters'
export {
  deviceDetailQueryOptions,
  devicesDatasetQueryOptions,
  devicesListQueryOptions,
} from './api/device.queries'
export type {
  DeviceDetailDto,
  DeviceEventDto,
  DevicesIndexDto,
  DeviceSummaryDto,
} from './api/device.schemas'
export { deviceDetailDtoSchema, devicesIndexDtoSchema } from './api/device.schemas'
export { deviceDetailFixtures, devicesIndexFixture } from './mock/device.fixtures'
export type {
  DeviceDetail,
  DevicesDataset,
  DeviceEvent,
  DevicesIndex,
  DeviceStatus,
  DeviceSummary,
} from './model/device'
export { formatDeviceStatus } from './model/device'
