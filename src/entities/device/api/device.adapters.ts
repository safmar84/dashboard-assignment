import type {
  DeviceDetail,
  DeviceEvent,
  DevicesIndex,
  DeviceSummary,
} from '../model/device'
import {
  deviceDetailDtoSchema,
  deviceEventDtoSchema,
  devicesIndexDtoSchema,
  type DeviceDetailDto,
  type DeviceEventDto,
  type DeviceSummaryDto,
} from './device.schemas'

function formatEventLabel(type: string) {
  return type
    .split(/[-_ ]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}

function adaptDeviceEvent(dto: DeviceEventDto): DeviceEvent {
  const parsed = deviceEventDtoSchema.parse(dto)

  return {
    id: parsed.id,
    label: formatEventLabel(parsed.type),
    occurredAt: parsed.createdAt,
    description: parsed.description ?? null,
  }
}

function adaptDeviceSummary(dto: DeviceSummaryDto): DeviceSummary {
  return {
    id: dto.id,
    model: dto.model,
    status: dto.status,
    ownerName: dto.owner.name,
    lastEventLabel: dto.lastEvent ? formatEventLabel(dto.lastEvent.type) : null,
    lastEventAt: dto.lastEvent?.createdAt ?? null,
  }
}

export function adaptDevicesIndex(input: unknown): DevicesIndex {
  const dto = devicesIndexDtoSchema.parse(input)

  return {
    page: dto.page,
    totalPages: dto.totalPages,
    items: dto.items.map(adaptDeviceSummary),
  }
}

export function adaptDeviceDetail(input: unknown): DeviceDetail {
  const dto: DeviceDetailDto = deviceDetailDtoSchema.parse(input)

  return {
    id: dto.id,
    model: dto.model,
    platform: dto.platform ?? null,
    status: dto.status,
    owner: dto.owner,
    activatedAt: dto.activatedAt ?? null,
    events: dto.events.map(adaptDeviceEvent),
  }
}
