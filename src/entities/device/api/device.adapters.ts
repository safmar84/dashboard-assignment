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
  const descriptionParts = [parsed.result, parsed.location].filter(Boolean)

  return {
    id: parsed.id,
    label: formatEventLabel(parsed.type),
    occurredAt: parsed.timestamp,
    description: descriptionParts.length > 0 ? descriptionParts.join(' · ') : null,
  }
}

function adaptDeviceSummary(dto: DeviceSummaryDto): DeviceSummary {
  return {
    id: dto.id,
    shortId: dto.shortId,
    vendor: dto.vendor,
    model: dto.model,
    platform: dto.platform,
    status: dto.status,
    ownerName: dto.user.displayName,
    lastEventLabel: dto.lastActiveAt ? 'Last active' : null,
    lastEventAt: dto.lastActiveAt ?? null,
  }
}

export function adaptDevicesIndex(input: unknown): DevicesIndex {
  const dto = devicesIndexDtoSchema.parse(input)

  return {
    page: dto.page ?? 1,
    totalPages: dto.totalPages,
    items: dto.items.map(adaptDeviceSummary),
  }
}

export function adaptDeviceDetail(input: unknown): DeviceDetail {
  const dto: DeviceDetailDto = deviceDetailDtoSchema.parse(input)

  return {
    id: dto.id,
    shortId: dto.shortId,
    vendor: dto.vendor,
    model: dto.model,
    platform: dto.platform ?? null,
    osVersion: dto.osVersion ?? null,
    appVersion: dto.appVersion ?? null,
    status: dto.status,
    biometryEnabled: dto.biometryEnabled,
    owner: {
      id: dto.user.id,
      name: dto.user.displayName,
    },
    createdAt: dto.createdAt ?? null,
    lastActiveAt: dto.lastActiveAt ?? null,
    events: dto.events.map(adaptDeviceEvent),
  }
}
