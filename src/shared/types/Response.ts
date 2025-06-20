export type Messages = { message: string; field: string }

export type BaseResponse<T = {}> =
  | T
  | {
      statusCode: number
      messages: Messages[]
      error: string
    }
