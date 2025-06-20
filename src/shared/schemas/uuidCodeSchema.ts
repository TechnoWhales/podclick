import { z } from 'zod'

export const uuidCodeSchema = z.object({
  uuid: z.string().uuid(),
})

export type UUIDType = z.infer<typeof uuidCodeSchema>
