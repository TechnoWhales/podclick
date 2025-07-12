import { describe, it, expect, vi, beforeEach } from 'vitest'

import { notify } from '@/shared/lib/notify'

import { handleBaseApiError } from './handleBaseApiError'

/**
 * Тесты для функции handleBaseApiError.
 * Проверяют обработку различных структур ошибок и корректный вызов notify.error.
 * Покрываются кейсы: вложенные ошибки, plain error, plain string, массив сообщений, unknown error.
 */
describe('handleBaseApiError', () => {
  it('handles error.message', () => {
    handleBaseApiError({ error: { message: 'Error message' } })
    expect(notify.error).toHaveBeenCalledWith('Error message')
  })

  it('handles error.data.message', () => {
    handleBaseApiError({ error: { data: { message: 'Data message' } } })
    expect(notify.error).toHaveBeenCalledWith('Data message')
  })

  it('handles error.error as string', () => {
    handleBaseApiError({ error: { error: 'String error' } })
    expect(notify.error).toHaveBeenCalledWith('String error')
  })

  it('handles error.data.error as string', () => {
    handleBaseApiError({ error: { data: { error: 'Nested string error' } } })
    expect(notify.error).toHaveBeenCalledWith('Nested string error')
  })

  it('handles array of error messages', () => {
    handleBaseApiError({
      error: { data: { messages: [{ message: 'Msg1' }, { message: 'Msg2' }] } },
    })
    expect(notify.error).toHaveBeenCalledWith('Msg1')
    expect(notify.error).toHaveBeenCalledWith('Msg2')
  })

  it('handles top-level error string', () => {
    handleBaseApiError({ error: 'Top level string error' })
    expect(notify.error).toHaveBeenCalledWith('Top level string error')
  })

  it('handles plain string error', () => {
    handleBaseApiError('Plain string error')
    expect(notify.error).toHaveBeenCalledWith('Plain string error')
  })

  it('handles unknown errors', () => {
    handleBaseApiError({})
    expect(notify.error).toHaveBeenCalledWith('Unknown API error')
  })

  it('handles null or undefined gracefully', () => {
    handleBaseApiError(null)
    expect(notify.error).toHaveBeenCalledWith('Unknown API error')

    handleBaseApiError(undefined)
    expect(notify.error).toHaveBeenCalledWith('Unknown API error')
  })
})
