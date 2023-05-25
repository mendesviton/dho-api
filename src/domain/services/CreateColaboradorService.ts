import { Repository } from "typeorm";
import { ColaboradorMobile } from "../../database/Entities/ColaboradoresMobile";
import { IResponse } from "../../interfaces/response/IResponse";
import IService from "../../interfaces/service/IServices";
import { AppDataSource } from "../../ormconfig";
import { ErrorResponse } from "../../shared/response/ErrorResponse";
import { ErrorMessage, k_error, k_success } from "../../constants/Constants";
import { Util, UtilEmail } from "../../shared/Util";

export class CreateColaboradorService implements IService<IColaboradorMobile> {
  constructor() {
    this.colaboradorRepository =
      AppDataSource.getRepository<ColaboradorMobile>(ColaboradorMobile);
  }
  private readonly colaboradorRepository: Repository<ColaboradorMobile>;
  async execute({
    email,
    colaborador_id,
  }): Promise<IResponse<IColaboradorMobile>> {
    let new_colab: ColaboradorMobile;

    if (
      await this.colaboradorRepository.findOne({
        where: {
          colaborador_id: parseInt(colaborador_id),
        },
      })
    )
      throw new ErrorResponse(k_error, ErrorMessage.ALREADY_EXISTS);

    const encryptedPassword = Util.generatePassword(7).toUpperCase();
    {
      new_colab = await this.colaboradorRepository.save({
        colaborador_id: parseInt(colaborador_id),
        // TODO tirar a imagem mockada
        image_profile:
          "https://navalha.s3.amazonaws.com/barbershop/img-professional-f-padrao.png",
        password: await Util.encryptPassword(encryptedPassword),
      });
    }

    // UtilEmail.enviarEmail(email, "Acesso temporário", encryptedPassword);

    if (!new_colab) throw new ErrorResponse(k_error, ErrorMessage.NOT_FOUND);
    return { status: k_success, result: new_colab };
  }
}
