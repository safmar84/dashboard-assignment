import { z } from 'zod'

export const statisticsOverviewDtoSchema = z.object({
  totalDevices: z.number().int().nonnegative(),
  totalUsers: z.number().int().nonnegative(),
  activeDevices: z.number().int().nonnegative(),
  expiredDevices: z.number().int().nonnegative(),
  removedDevices: z.number().int().nonnegative(),
})

export type StatisticsOverviewDto = z.infer<typeof statisticsOverviewDtoSchema>
