import { z } from 'zod'

export const deviceStatusSchema = z.enum(['active', 'expired', 'removed', 'blocked'])

export const deviceOwnerDtoSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  _links: z
    .object({
      self: z.string(),
    })
    .optional(),
})

export const deviceEventDtoSchema = z.object({
  id: z.string(),
  type: z.string(),
  timestamp: z.string(),
  ip: z.string().optional(),
  location: z.string().nullable().optional(),
  result: z.string().nullable().optional(),
})

export const deviceSummaryDtoSchema = z.object({
  id: z.string(),
  shortId: z.string(),
  vendor: z.string(),
  model: z.string(),
  platform: z.string(),
  status: deviceStatusSchema,
  createdAt: z.string(),
  lastActiveAt: z.string().nullable(),
  user: deviceOwnerDtoSchema,
  _links: z
    .object({
      self: z.string(),
      user: z.string(),
    })
    .optional(),
})

export const devicesIndexDtoSchema = z.object({
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().optional(),
  totalItems: z.number().int().nonnegative().optional(),
  totalPages: z.number().int().positive(),
  items: z.array(deviceSummaryDtoSchema),
})

export const deviceDetailDtoSchema = deviceSummaryDtoSchema.extend({
  osVersion: z.string().nullable().optional(),
  appVersion: z.string().nullable().optional(),
  biometryEnabled: z.boolean(),
  events: z.array(deviceEventDtoSchema),
})

export type DeviceEventDto = z.infer<typeof deviceEventDtoSchema>
export type DeviceSummaryDto = z.infer<typeof deviceSummaryDtoSchema>
export type DevicesIndexDto = z.infer<typeof devicesIndexDtoSchema>
export type DeviceDetailDto = z.infer<typeof deviceDetailDtoSchema>
