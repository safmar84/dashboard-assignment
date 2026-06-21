export { adaptDeviceDetail, adaptDevicesIndex } from './api/device.adapters'
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
  DeviceEvent,
  DevicesIndex,
  DeviceStatus,
  DeviceSummary,
} from './model/device'
export { formatDeviceStatus } from './model/device'
