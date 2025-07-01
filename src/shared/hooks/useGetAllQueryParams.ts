'use client'
import { useSearchParams } from 'next/navigation'

export const useGetAllQueryParams = () => {
  const searchParams = useSearchParams()
  const query: Record<string, string> = {}

  for (const key of searchParams.keys()) {
    const value = searchParams.get(key)

    if (value !== null) {
      query[key] = value
    }
  }

  return query
}
