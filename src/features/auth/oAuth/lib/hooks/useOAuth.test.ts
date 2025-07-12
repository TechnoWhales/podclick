import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { notify } from '@/shared/lib/notify'

import { useOAuth } from './useOAuth'

vi.mock('@/shared/lib/notify', () => ({
  notify: {
    error: vi.fn(),
  },
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}))

const googleLoginMock = vi.fn()

vi.mock('@/features/auth/oAuth/api/oAuthApi', () => ({
  useGoogleLoginMutation: () => [googleLoginMock],
}))

// Мокаем useGoogleLogin через spyOn
import * as GoogleOAuth from '@react-oauth/google'

describe('useOAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  /**
   * Проверяет, что notify.error вызывается при ошибке Google авторизации (onError callback)
   * Мокаем useGoogleLogin так, чтобы при вызове loginWithGoogle срабатывал onError
   * Ожидаем, что notify.error покажет правильное сообщение
   */
  it('calls notify.error on Google login onError', () => {
    // Мокаем useGoogleLogin, чтобы onError был вызван с ошибкой
    vi.spyOn(GoogleOAuth, 'useGoogleLogin').mockImplementation(({ onError }) => {
      return () => {
        if (onError) {
          onError({
            error: 'popup_closed_by_user' as any,
            error_description: 'Google error',
            error_uri: '',
          })
        }
      }
    })

    // Получаем функцию loginWithGoogle из хука
    const { loginWithGoogle } = useOAuth()

    // Вызываем loginWithGoogle, что приводит к вызову onError
    loginWithGoogle()

    // Проверяем, что notify.error вызван с нужным текстом
    expect(notify.error).toHaveBeenCalledWith('Google login failed: Google error')
  })

  /**
   * Проверяет, что notify.error вызывается при ошибке в try/catch внутри loginWithGoogle
   * Мокаем useGoogleLoginMutation, чтобы выбрасывать ошибку при unwrap
   * Мокаем useGoogleLogin, чтобы onSuccess был вызван с code
   * Ожидаем, что notify.error покажет оба сообщения об ошибке
   */
  it('calls notify.error on login try/catch error', async () => {
    // Мокаем googleLoginMock, чтобы unwrap выбрасывал ошибку
    googleLoginMock.mockReturnValue({
      unwrap: () => Promise.reject(new Error('Test login error')),
    })

    // Мокаем useGoogleLogin, чтобы onSuccess был вызван с code
    vi.spyOn(GoogleOAuth, 'useGoogleLogin').mockImplementation(({ onSuccess }) => {
      return async () => {
        if (onSuccess) {
          onSuccess({ code: 'test-code', scope: '' } as any)
        }
      }
    })

    // Получаем функцию loginWithGoogle из хука
    const { loginWithGoogle } = useOAuth()

    // Вызываем loginWithGoogle, что приводит к ошибке в try/catch
    await loginWithGoogle()

    // Проверяем, что notify.error вызван с нужными текстами
    expect(notify.error).toHaveBeenCalledWith(expect.stringContaining('Login failed'))
    expect(notify.error).toHaveBeenCalledWith(expect.stringContaining('Test login error'))
  })
})
