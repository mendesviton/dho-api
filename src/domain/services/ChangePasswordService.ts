import { Repository } from "typeorm";
import { ColaboradorMobile } from "../../database/Entities/ColaboradoresMobile";
import { IResponse } from "../../interfaces/response/IResponse";
import IService from "../../interfaces/service/IServices";
import { AppDataSource } from "../../ormconfig";
import { ErrorResponse } from "../../shared/response/ErrorResponse";
import { ErrorMessage, k_error, k_success } from "../../constants/Constants";
import { Util } from "../../shared/Util";
import { SuccessResponse } from "../../shared/response/SuccessResponse";

export class ChangePasswordService implements IService<IColaboradorMobile> {
  constructor() {
    this.colaboradorRepository =
      AppDataSource.getRepository<ColaboradorMobile>(ColaboradorMobile);
  }
  private readonly colaboradorRepository: Repository<ColaboradorMobile>;
  async execute({
    colaborador_id,
    password,
  }): Promise<IResponse<IColaboradorMobile>> {
    const colaborador = await this.colaboradorRepository.findOne({
      where: {
        colaborador_id: parseInt(colaborador_id),
      },
    });

    colaborador.password = await Util.encryptPassword(password);

    await this.colaboradorRepository.save(colaborador);

    return new SuccessResponse(k_success, colaborador);
  }
}
