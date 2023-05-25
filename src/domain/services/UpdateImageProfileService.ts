import { Repository } from "typeorm";
import { ColaboradorMobile } from "../../database/Entities/ColaboradoresMobile";
import { IResponse } from "../../interfaces/response/IResponse";
import IService from "../../interfaces/service/IServices";
import { AppDataSource } from "../../ormconfig";
import { SuccessResponse } from "../../shared/response/SuccessResponse";
import { k_success } from "../../constants/Constants";

export class UpdateImageProfileService implements IService<IColaboradorMobile> {
  constructor() {
    this.colaboradorRepository =
      AppDataSource.getRepository<ColaboradorMobile>(ColaboradorMobile);
  }
  private readonly colaboradorRepository: Repository<ColaboradorMobile>;
  async execute({ id, image_profile }): Promise<IResponse<IColaboradorMobile>> {
    const colaborador = await this.colaboradorRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    colaborador.image_profile = image_profile;

    return new SuccessResponse(
      k_success,
      await this.colaboradorRepository.save(colaborador)
    );
  }
}
