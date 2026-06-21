export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://wultra.github.io/mtoken-tools/react-demo-api/'

export const apiPaths = {
  statistics: 'statistics.json',
  devicesIndex: (page = 1) => (page <= 1 ? 'devices/index.json' : `devices/page-${page}.json`),
  deviceDetail: (deviceId: string) => `devices/${deviceId}.json`,
} as const
