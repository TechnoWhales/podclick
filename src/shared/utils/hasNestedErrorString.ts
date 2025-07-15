/**
 * Type guard для проверки, что объект имеет структуру { data: { error: string } } или { data: { messages: string } }
 * @param value - объект для проверки
 * @returns true, если объект содержит data.error или data.messages типа string
 */
export function hasNestedErrorString(value: unknown): value is { data: { error?: string; messages?: string } } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    typeof (value as any).data === 'object' &&
    (value as any).data !== null &&
    (
      ('error' in (value as any).data && typeof (value as any).data.error === 'string') ||
      ('messages' in (value as any).data && typeof (value as any).data.messages === 'string')
    )
  );
} 