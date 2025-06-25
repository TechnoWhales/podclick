import { SignUpType } from '@/features/auth/sign-up/hooks'
import { baseApi } from '@/shared/api/baseApi'

type Registration = Omit<SignUpType, 'confirmPassword' | 'agreePolicy'>

export const signUpApi = baseApi.injectEndpoints({
  endpoints: build => ({
    registration: build.mutation<void, Registration>({
      query: body => ({
        url: 'auth/registration',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useRegistrationMutation } = signUpApi
