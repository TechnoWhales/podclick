import { notify } from '@/shared/lib/notify'

import { hasErrorString } from '../utils/hasErrorString'
import { hasNestedErrorString } from '../utils/hasNestedErrorString'
import { isErrorWithData } from '../utils/isErrorWithData'
import { isErrorWithMessage } from '../utils/isErrorWithMessage'

/**
 * Глобальный обработчик ошибок для baseQuery RTK Query.
 * Проверяет структуру ошибки и выводит сообщения пользователю через notify.error.
 * Поддерживает разные форматы ошибок: message, error.data.message, error.error, error.data.error, массив messages, plain error, plain string.
 * @param result - результат запроса (обычно unknown), который может содержать ошибку
 */
export const handleBaseApiError = (result: unknown) => {
  // Если это успешный ответ (например, есть только data, нет error) — ничего не делаем
  if (typeof result === 'object' && result !== null && 'data' in result && !('error' in result)) {
    return
  }

  // 1. Ошибка с вложенной структурой error (например, RTK Query)
  if (isErrorWithData(result)) {
    const errorObj = result.error

    // 1.1. Прямая ошибка с message (error.message)
    if (isErrorWithMessage(errorObj)) {
      notify.error(errorObj.message)

      return
    }

    // 1.2. Вложенная ошибка error.data.message
    if (isErrorWithMessage(errorObj?.data)) {
      notify.error(errorObj.data.message)

      return
    }

    // 1.3. Строка error.error
    if (typeof errorObj?.error === 'string') {
      notify.error(errorObj.error)

      return
    }

    // 1.4. Вложенная строка error.data.error
    if (hasNestedErrorString(errorObj)) {
      if (typeof errorObj.data.messages === 'string') {
        notify.error(errorObj.data.messages)

        return
      }

      if (typeof errorObj.data.error === 'string') {
        notify.error(errorObj.data.error)

        return
      }
    }

    // 1.5. Массив ошибок error.data.messages
    if (Array.isArray((errorObj as any)?.data?.messages)) {
      (errorObj as any).data.messages.forEach((m: any) => notify.error(m.message))

      return
    }

    // 1.6. Неизвестная вложенная ошибка
    notify.error('Unknown API error')

    return
  }

  // 2. Просто { error: string } на верхнем уровне
  if (hasErrorString(result)) {
    notify.error(result.error)

    return
  }

  // 3. Просто строка
  if (typeof result === 'string') {
    notify.error(result)

    return
  }

  // 4. Неизвестная ошибка
  notify.error('Unknown API error')
}
