export type ErrorResponse = {
  status: string
  message: string
}
export type ServerErrorsType = Record<string, string[]> | string
