export interface IResponse<T> {
  status: string
  id?: string
  result?: any | boolean
  description?: string | string[]
  token?: string
}
