import { Repository } from "typeorm";
import { ColaboradorMobile } from "../../database/Entities/ColaboradoresMobile";
import { IResponse } from "../../interfaces/response/IResponse";
import IService from "../../interfaces/service/IServices";
import { AppDataSource } from "../../ormconfig";
import { ErrorResponse } from "../../shared/response/ErrorResponse";
import { ErrorMessage, k_error, k_success } from "../../constants/Constants";
import { Util } from "../../shared/Util";
import { ColaboradorRegistroPonto } from "../../database/Entities/ColaboradoresRegistroPonto";
import { SuccessResponse } from "../../shared/response/SuccessResponse";

export class CreateRegistroPontoService
  implements IService<IColaboradorMobile>
{
  constructor() {
    this.colaboradorRepository =
      AppDataSource.getRepository<ColaboradorMobile>(ColaboradorMobile);
    this.colaboradorRegistroPontoRepository =
      AppDataSource.getRepository<ColaboradorRegistroPonto>(
        ColaboradorRegistroPonto
      );
  }
  private readonly colaboradorRepository: Repository<ColaboradorMobile>;
  private readonly colaboradorRegistroPontoRepository: Repository<ColaboradorRegistroPonto>;
  async execute(colaborador_mobile_id): Promise<IResponse<IColaboradorMobile>> {
    const ultimoRegistroPonto = await this.colaboradorRegistroPontoRepository
      .createQueryBuilder("colaboradorRegistroPonto")
      .where(
        `colaboradorRegistroPonto.colaborador_id = ${colaborador_mobile_id}`
      )
      .orderBy("colaboradorRegistroPonto.data_hora", "DESC")
      .getOne();
    if (!ultimoRegistroPonto) {
      await this.colaboradorRegistroPontoRepository.save({
        colaborador_id: colaborador_mobile_id,
        tipo: "entrada",
      });
      return new SuccessResponse(
        k_success,
        await this.colaboradorRegistroPontoRepository.find({
          where: {
            colaborador_id: { id: colaborador_mobile_id },
          },
        })
      );
    }
    if (ultimoRegistroPonto.tipo == "entrada") {
      await this.colaboradorRegistroPontoRepository.save({
        colaborador_id: colaborador_mobile_id,
        tipo: "saida",
      });
    } else {
      await this.colaboradorRegistroPontoRepository.save({
        colaborador_id: colaborador_mobile_id,
        tipo: "entrada",
      });
    }

    return new SuccessResponse(
      k_success,
      await this.colaboradorRegistroPontoRepository.find({
        where: {
          colaborador_id: { id: colaborador_mobile_id },
        },
      })
    );
  }
}
