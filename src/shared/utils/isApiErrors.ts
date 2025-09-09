// types/apiErrors.ts

/**
 * Сообщение об ошибке для конкретного поля
 * @typedef {Object} Message
 * @property {string} field — Строка
 * @property {string} message — текст ошибки
 */
export type Message = {
  field: string
  message: string
}

/**
 * Структура ошибки, возвращаемой вашим API
 * @typedef {Object} ApiErrorResponse
 * @property {number} statusCode — HTTP‑код статуса
 * @property {string} error — общий текст ошибки
 * @property {Message[]} messages — массив подробных сообщений об ошибках по полям
 */
export type ApiErrorResponse = {
  statusCode: number
  error: string
  messages: Message[]
}

/**
 * Type‑guard для ApiErrorResponse
 * @param {*} x — любое значение
 * @returns {x is ApiErrorResponse} — true, если объект соответствует ApiErrorResponse
 */
export function isApiErrorResponse(x: any): x is ApiErrorResponse {
  return (
    x != null &&
    typeof x === 'object' &&
    typeof x.statusCode === 'number' &&
    typeof x.error === 'string' &&
    Array.isArray(x.messages) &&
    x.messages.every(
      (msg: any) =>
        msg != null &&
        typeof msg === 'object' &&
        typeof msg.field === 'string' &&
        typeof msg.message === 'string'
    )
  )
}
