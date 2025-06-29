import { z } from 'zod'

export const uuidCodeSchema = z.object({
  uuid: z.string().uuid(),
})
