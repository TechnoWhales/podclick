import { z } from 'zod'

export const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(1)
      .min(6)
      .max(30)
      .regex(/^[A-Za-z0-9_-]+$/),
    email: z.string().min(1).email(),
    password: z
      .string()
      .min(1)
      .min(6)
      .max(20)
      .regex(/^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/),
    confirmPassword: z.string(),
    agreePolicy: z.boolean().refine(val => val === true, {
      message: '',
    }),
  })
  .superRefine((data, ctx) => {
    const { password } = data

    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        params: { typeError: 'uppercase' },
      })
    } else if (!/[0-9]/.test(password)) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        params: { typeError: 'number' },
      })
    } else if (!/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password)) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        params: { typeError: 'special' },
      })
    }
    if (password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
      })
    }
  })

export type SignUpType = z.infer<typeof signUpSchema>
