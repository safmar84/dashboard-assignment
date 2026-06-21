export type DeviceStatus = 'active' | 'expired' | 'removed' | 'blocked'

export type DeviceSummary = {
  id: string
  shortId: string
  vendor: string
  model: string
  platform: string
  status: DeviceStatus
  ownerName: string
  lastEventLabel: string | null
  lastEventAt: string | null
}

export type DevicesIndex = {
  page: number
  totalPages: number
  items: DeviceSummary[]
}

export type DeviceEvent = {
  id: string
  label: string
  occurredAt: string
  description: string | null
}

export type DeviceDetail = {
  id: string
  shortId: string
  vendor: string
  model: string
  platform: string | null
  osVersion: string | null
  appVersion: string | null
  status: DeviceStatus
  biometryEnabled: boolean
  owner: {
    id: string
    name: string
  }
  createdAt: string | null
  lastActiveAt: string | null
  events: DeviceEvent[]
}

export function formatDeviceStatus(status: DeviceStatus) {
  switch (status) {
    case 'active':
      return 'Active'
    case 'expired':
      return 'Expired'
    case 'removed':
      return 'Removed'
    case 'blocked':
      return 'Blocked'
  }
}
