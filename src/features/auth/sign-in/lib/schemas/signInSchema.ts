import { z } from 'zod'

export type Inputs = z.infer<typeof signInSchema>

export const signInSchema = z.object({
  email: z.string().min(1).email(),
  password: z
    .string()
    .min(1)
    .max(20)
    .regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,]).{6,20}$/),
})
