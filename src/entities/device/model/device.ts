export type DeviceStatus = 'active' | 'expired' | 'removed'

export type DeviceSummary = {
  id: string
  model: string
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
  model: string
  platform: string | null
  status: DeviceStatus
  owner: {
    id: string
    name: string
  }
  activatedAt: string | null
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
  }
}
