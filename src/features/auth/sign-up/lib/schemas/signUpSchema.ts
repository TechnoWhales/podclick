import { z } from 'zod'

export const signUpSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Incorrect email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(3, { message: 'Password must be at least 3 characters long' }),
  agreePolicy: z.boolean(),
})

export type Inputs = z.infer<typeof signUpSchema>
