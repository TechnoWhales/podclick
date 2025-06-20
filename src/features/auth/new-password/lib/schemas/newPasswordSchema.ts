import { z } from 'zod'

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Minimum number of characters 6' })
      .max(20, { message: 'Maximum number of characters 20' })
      .regex(/^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/, {
        message:
          'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
      }),
    confirmPassword: z.string(),
    agreePolicy: z.boolean().refine(val => val === true, {
      message: '',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'The passwords must match',
    path: ['confirmPassword'],
  })

export type Inputs = z.infer<typeof newPasswordSchema>
