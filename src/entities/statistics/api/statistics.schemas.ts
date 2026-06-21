import { z } from 'zod'

export const statisticsOverviewDtoSchema = z.object({
  generatedAt: z.string(),
  totals: z.object({
    devices: z.number().int().nonnegative(),
    users: z.number().int().nonnegative(),
    activeDevices: z.number().int().nonnegative(),
    removedDevices: z.number().int().nonnegative(),
    expiredDevices: z.number().int().nonnegative(),
    blockedDevices: z.number().int().nonnegative(),
    events: z.number().int().nonnegative(),
  }),
})

export type StatisticsOverviewDto = z.infer<typeof statisticsOverviewDtoSchema>
