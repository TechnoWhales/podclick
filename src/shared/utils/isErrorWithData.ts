import { ErrorWithData } from "../types";

/**
 * Type guard для проверки, что объект имеет структуру ErrorWithData,
 * то есть содержит поле error с вложенными полями error/data/messages.
 * @param result - объект для проверки
 * @returns true, если объект соответствует структуре ErrorWithData
 */
export function isErrorWithData(result: unknown): result is ErrorWithData {
  return (
    typeof result === 'object' &&
    result !== null &&
    'error' in result &&
    typeof (result as any).error === 'object' &&
    (result as any).error !== null
  )
}