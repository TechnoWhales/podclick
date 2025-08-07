import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale
  const messages = {
    ...(await import(`../../messages/${locale}/auth/signUp.json`)).default,
    ...(await import(`../../messages/${locale}/auth/signIn.json`)).default,
    ...(await import(`../../messages/${locale}/auth/privacyPolicy.json`)).default,
    ...(await import(`../../messages/${locale}/auth/emailVerifiedPages.json`)).default,
    ...(await import(`../../messages/${locale}/auth/passwordRecovery.json`)).default,
    ...(await import(`../../messages/${locale}/auth/authZodError.json`)).default,
    ...(await import(`../../messages/${locale}/common.json`)).default,
    ...(await import(`../../messages/${locale}/profile/addPost.json`)).default,
  }

  return {
    locale,
    messages,
  }
})
