export const ROUTES = {
  HOME: '/',
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    LOG_OUT: '/auth/log-out',
    FORGOT_PASSWORD: '/auth/forgot-password',
    NEW_PASSWORD: '/auth/new-password',
    TERMS_OF_SERVICE: '/auth/terms-of-service',
    PRIVACY_POLICY: '/auth/privacy-policy',
    EMAIL_VERIFIED: '/auth/email-verified',
    PASSWORD_RECOVERY_RESENDING: '/auth/password-recovery-resending',
  },
  PROFILE: {
    BASE: '/profile',
    SETTINGS: '/profile/settings',
    MY_PAGE: (userId: number) => `/profile/${userId}`,
  },
  FEED: '/feed',
  FAVORITES: '/favorites',
  MESSAGES: '/messages',
  SEARCH: '/search',
  STATS: '/stats',
}
