/**
 * Type guard для проверки, что объект имеет строковое поле message.
 * @param error - объект для проверки
 * @returns true, если объект содержит строковое поле message
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}
