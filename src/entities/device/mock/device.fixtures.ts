import type { DeviceDetailDto, DevicesIndexDto } from '../api/device.schemas'

export const devicesIndexFixture: DevicesIndexDto = {
  page: 1,
  totalPages: 3,
  items: [
    {
      id: 'demo-device',
      model: 'iPhone 15 Pro',
      status: 'active',
      owner: { id: 'user-jane-doe', name: 'Jane Doe' },
      lastEvent: {
        id: 'evt-activation-demo',
        type: 'activation',
        createdAt: '2026-06-01T10:30:00Z',
        description: 'Device enrolled successfully',
      },
    },
    {
      id: 'pixel-8',
      model: 'Pixel 8',
      status: 'expired',
      owner: { id: 'user-john-appleseed', name: 'John Appleseed' },
      lastEvent: {
        id: 'evt-expired-pixel',
        type: 'login',
        createdAt: '2026-05-28T08:10:00Z',
        description: 'Last successful authentication before expiry',
      },
    },
    {
      id: 'galaxy-s24',
      model: 'Galaxy S24',
      status: 'removed',
      owner: { id: 'user-alex-smith', name: 'Alex Smith' },
      lastEvent: {
        id: 'evt-removed-galaxy',
        type: 'removal',
        createdAt: '2026-05-19T13:45:00Z',
        description: 'Device removed by user request',
      },
    },
  ],
}

export const deviceDetailFixtures: Record<string, DeviceDetailDto> = {
  'demo-device': {
    id: 'demo-device',
    model: 'iPhone 15 Pro',
    platform: 'iOS',
    status: 'active',
    owner: { id: 'user-jane-doe', name: 'Jane Doe' },
    activatedAt: '2026-06-01T10:30:00Z',
    lastEvent: {
      id: 'evt-signature-demo',
      type: 'signature',
      createdAt: '2026-06-12T16:20:00Z',
      description: 'Transaction signed successfully',
    },
    events: [
      {
        id: 'evt-activation-demo',
        type: 'activation',
        createdAt: '2026-06-01T10:30:00Z',
        description: 'Device enrolled successfully',
      },
      {
        id: 'evt-login-demo',
        type: 'login',
        createdAt: '2026-06-05T09:15:00Z',
        description: 'User completed authentication flow',
      },
      {
        id: 'evt-signature-demo',
        type: 'signature',
        createdAt: '2026-06-12T16:20:00Z',
        description: 'Transaction signed successfully',
      },
    ],
  },
  'pixel-8': {
    id: 'pixel-8',
    model: 'Pixel 8',
    platform: 'Android',
    status: 'expired',
    owner: { id: 'user-john-appleseed', name: 'John Appleseed' },
    activatedAt: '2026-03-14T11:00:00Z',
    lastEvent: {
      id: 'evt-expired-pixel',
      type: 'expiry',
      createdAt: '2026-05-28T08:10:00Z',
      description: 'Device lifetime reached configured expiration',
    },
    events: [
      {
        id: 'evt-activation-pixel',
        type: 'activation',
        createdAt: '2026-03-14T11:00:00Z',
        description: 'Device enrolled successfully',
      },
      {
        id: 'evt-login-pixel',
        type: 'login',
        createdAt: '2026-05-10T12:05:00Z',
        description: 'User completed authentication flow',
      },
      {
        id: 'evt-expired-pixel',
        type: 'expiry',
        createdAt: '2026-05-28T08:10:00Z',
        description: 'Device lifetime reached configured expiration',
      },
    ],
  },
  'galaxy-s24': {
    id: 'galaxy-s24',
    model: 'Galaxy S24',
    platform: 'Android',
    status: 'removed',
    owner: { id: 'user-alex-smith', name: 'Alex Smith' },
    activatedAt: '2026-04-03T15:55:00Z',
    lastEvent: {
      id: 'evt-removed-galaxy',
      type: 'removal',
      createdAt: '2026-05-19T13:45:00Z',
      description: 'Device removed by user request',
    },
    events: [
      {
        id: 'evt-activation-galaxy',
        type: 'activation',
        createdAt: '2026-04-03T15:55:00Z',
        description: 'Device enrolled successfully',
      },
      {
        id: 'evt-signature-galaxy',
        type: 'signature',
        createdAt: '2026-05-11T14:30:00Z',
        description: 'Transaction signed successfully',
      },
      {
        id: 'evt-removed-galaxy',
        type: 'removal',
        createdAt: '2026-05-19T13:45:00Z',
        description: 'Device removed by user request',
      },
    ],
  },
}
