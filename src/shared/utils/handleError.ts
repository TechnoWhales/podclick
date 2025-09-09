import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

import { notify } from '@/shared/lib/notify'
import { Message } from '@/shared/types'
import { isApiErrorResponse } from '@/shared/utils/isApiErrors'

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Универсальная функция обработки ошибок
 * @param {unknown} error — брошенная в catch ошибка
 */
export function handleError(error: unknown): void {
  // 1) Стандартная JS‑ошибка
  if (error instanceof Error) {
    console.error('Error:', error.message, error.stack)
    notify.error(`Произошла ошибка: ${error.message}`)

    return
  }

  // eslint-disable-next-line no-irregular-whitespace
  // 2) Ошибка RTK   Query
  if (isFetchBaseQueryError(error)) {
    const fetchErr = error as FetchBaseQueryError

    console.error('RTK Query error:', fetchErr.status, fetchErr)

    if (fetchErr.status === 400) {
      notify.error('Неверные данные. Проверьте введённые поля.')
    } else if (fetchErr.status === 401) {
      notify.error('Вы не авторизованы. Пожалуйста, войдите.')
    } else {
      notify.error('Ошибка сети. Попробуйте позже.')
    }

    return
  }

  // 3) Ошибка в формате ApiErrorResponse
  if (isApiErrorResponse(error)) {
    console.error('API Validation Error:', error)
    error.messages.forEach((msg: Message) => {
      notify.error(`${msg.field}: ${msg.message}`)
    })

    return
  }

  // 4) Любая другая неизвестная ошибка
  console.error('Неизвестная ошибка:', error)
  notify.error('Упс, что-то пошло не так. Попробуйте ещё раз.')
}
