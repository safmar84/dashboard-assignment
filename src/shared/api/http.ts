import { z } from 'zod'
import { ApiError } from './errors'
import { API_BASE_URL } from './config'

export function buildApiUrl(path: string) {
  const normalizedBase = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path

  return new URL(normalizedPath, normalizedBase).toString()
}

export async function getJson<TSchema extends z.ZodTypeAny>(
  path: string,
  schema: TSchema,
) {
  const response = await fetch(buildApiUrl(path))

  if (!response.ok) {
    throw new ApiError(`Request failed for ${path}`, response.status)
  }

  const data: unknown = await response.json()

  return schema.parse(data) as z.infer<TSchema>
}
