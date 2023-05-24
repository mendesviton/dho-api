import { Request, Response } from 'express'
export interface IController<T> {
  handle(request: Request, response: Response): Promise<Response>
}
