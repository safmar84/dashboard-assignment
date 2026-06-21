import { z } from 'zod'

export const deviceStatusSchema = z.enum(['active', 'expired', 'removed'])

export const deviceOwnerDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const deviceEventDtoSchema = z.object({
  id: z.string(),
  type: z.string(),
  createdAt: z.string(),
  description: z.string().nullable().optional(),
})

export const deviceSummaryDtoSchema = z.object({
  id: z.string(),
  model: z.string(),
  status: deviceStatusSchema,
  owner: deviceOwnerDtoSchema,
  lastEvent: deviceEventDtoSchema.nullable().optional(),
})

export const devicesIndexDtoSchema = z.object({
  page: z.number().int().nonnegative(),
  totalPages: z.number().int().positive(),
  items: z.array(deviceSummaryDtoSchema),
})

export const deviceDetailDtoSchema = deviceSummaryDtoSchema.extend({
  platform: z.string().nullable().optional(),
  activatedAt: z.string().nullable().optional(),
  events: z.array(deviceEventDtoSchema),
})

export type DeviceEventDto = z.infer<typeof deviceEventDtoSchema>
export type DeviceSummaryDto = z.infer<typeof deviceSummaryDtoSchema>
export type DevicesIndexDto = z.infer<typeof devicesIndexDtoSchema>
export type DeviceDetailDto = z.infer<typeof deviceDetailDtoSchema>
