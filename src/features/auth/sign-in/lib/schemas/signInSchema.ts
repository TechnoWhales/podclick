import { z } from 'zod'

export type Inputs = z.infer<typeof signInSchema>

export const signInSchema = z.object({
  email: z.string().email('This is not a valid email').min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Minimum number of characters 6' })
    .max(20, { message: 'Maximum number of characters 20' })
    .regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,]).{6,20}$/, {
      message: 'This is not a valid password',
    }),
})
