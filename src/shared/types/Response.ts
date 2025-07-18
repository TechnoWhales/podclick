export type Message = { message: string; field: string }

export type ApiErrorResponse = {
  statusCode: number
  messages: Message[]
  error: string
}

export type RTKQueryError = {
  data: ApiErrorResponse
  status: number
}

export type ForgotPasswordType = {
  email: string
  recaptcha: string
}
