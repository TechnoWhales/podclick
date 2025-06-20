import { z } from 'zod'

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'The email must match the format example@example.com' }),
})

export type EmailVerifiedType = z.infer<typeof emailSchema>
