import { baseApi } from '@/shared/api/baseApi'
import { SignUpType } from '@/shared/hooks'

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
