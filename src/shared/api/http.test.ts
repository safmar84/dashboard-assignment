import { describe, expect, it } from 'vitest'
import { buildApiUrl } from './http'

describe('buildApiUrl', () => {
  it('keeps the mock API base path when resolving endpoints', () => {
    expect(buildApiUrl('devices/index.json')).toBe(
      'https://wultra.github.io/mtoken-tools/react-demo-api/devices/index.json',
    )
    expect(buildApiUrl('/statistics.json')).toBe(
      'https://wultra.github.io/mtoken-tools/react-demo-api/statistics.json',
    )
    expect(buildApiUrl('devices/example.json')).toBe(
      'https://wultra.github.io/mtoken-tools/react-demo-api/devices/example.json',
    )
  })
})
