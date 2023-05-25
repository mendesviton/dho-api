import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Colaborador } from "../../database/mySQLTypes";
import { CreateColaboradorService } from "../../domain/services/CreateColaboradorService";
import { IController } from "../../interfaces/presentation/IController";
import { IResponse } from "../../interfaces/response/IResponse";
import IService from "../../interfaces/service/IServices";
import httpStatus from "http-status";
import { ErrorMessage, k_error } from "../../constants/Constants";
import { ErrorResponse } from "../../shared/response/ErrorResponse";
export class CreateColaboradorController
  implements IController<IColaboradorMobile>
{
  constructor() {}
  async handle(req: Request, res: Response): Promise<Response> {
    const createColaboradorService = new CreateColaboradorService();
    try {
      const result = await createColaboradorService.execute({
        colaborador_id: req.params.colaborador_id,
        email: req.params.email,
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
