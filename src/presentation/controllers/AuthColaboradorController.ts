import { Request, Response } from "express";
import { CreateColaboradorService } from "../../domain/services/CreateColaboradorService";
import { IController } from "../../interfaces/presentation/IController";
import httpStatus from "http-status";
import { ErrorMessage, k_error } from "../../constants/Constants";
import { ErrorResponse } from "../../shared/response/ErrorResponse";
import { AuthColaboradorService } from "../../domain/services/AuthColaboradorService";
export class AuthColaboradorController
  implements IController<IColaboradorMobile>
{
  async handle(req: Request, res: Response): Promise<Response> {
    const authColaboradorService = new AuthColaboradorService();
    try {
      const { email, cpf, password } = req.body;

      const result = await authColaboradorService.execute({
        password,
        cpf,
        email,
      });
      return res.status(httpStatus.CREATED).json(result);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        res.status(httpStatus.BAD_REQUEST).json(error);
      } else {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json(new ErrorResponse(k_error, ErrorMessage.INTERNAL_ERROR, error));
      }
    }
  }
}
