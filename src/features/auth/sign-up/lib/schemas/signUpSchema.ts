import { z } from 'zod'

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Username is required' })
      .max(30, { message: 'Maximum number of characters 30' })
      .regex(/^[A-Za-z0-9_-]+$/, {
        message: 'Username must contain 0-9, A-Z, a-z, _, -',
      }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Incorrect email address' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Minimum number of characters 6' }),
    confirmPassword: z.string(),
    agreePolicy: z.boolean(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type Inputs = z.infer<typeof signUpSchema>
