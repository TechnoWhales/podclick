/**
 * Тип для описания структуры ошибки, возвращаемой API.
 * Поддерживает вложенные поля error, data, message и массив messages.
 * Используется для типизации обработки ошибок в глобальных и локальных обработчиках.
 *
 */
export type ErrorWithData = {
  error?: {
    error?: string
    data?: {
      message?: string
      messages?: { message: string }[]
    }
  }
}
