import { describe, expect, it } from 'vitest'
import { apiPaths } from './config'

describe('api paths', () => {
  it('uses explicit page files for devices pagination', () => {
    expect(apiPaths.devicesIndex()).toBe('devices/page-1.json')
    expect(apiPaths.devicesIndex(1)).toBe('devices/page-1.json')
    expect(apiPaths.devicesIndex(3)).toBe('devices/page-3.json')
  })
})
