import { z } from 'zod'
import { ApiError } from './errors'
import { API_BASE_URL } from './config'

export async function getJson<TSchema extends z.ZodTypeAny>(
  path: string,
  schema: TSchema,
) {
  const response = await fetch(new URL(path, API_BASE_URL).toString())

  if (!response.ok) {
    throw new ApiError(`Request failed for ${path}`, response.status)
  }

  const data: unknown = await response.json()

  return schema.parse(data) as z.infer<TSchema>
}
