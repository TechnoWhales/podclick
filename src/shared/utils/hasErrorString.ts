/**
 * Type guard для проверки, что объект содержит поле error типа string
 * @param value - объект для проверки
 * @returns true, если объект имеет поле error типа string
 */
export function hasErrorString(value: unknown): value is { error: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'error' in value &&
    typeof (value as any).error === 'string'
  )
}
