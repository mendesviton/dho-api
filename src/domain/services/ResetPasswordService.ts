import { Repository } from "typeorm";
import { ColaboradorMobile } from "../../database/Entities/ColaboradoresMobile";
import { IResponse } from "../../interfaces/response/IResponse";
import IService from "../../interfaces/service/IServices";
import { AppDataSource } from "../../ormconfig";
import { ErrorResponse } from "../../shared/response/ErrorResponse";
import { ErrorMessage, k_error, k_success } from "../../constants/Constants";
import { Util } from "../../shared/Util";
import { SuccessResponse } from "../../shared/response/SuccessResponse";
import { getColaboradorByEmailDocumentQuery } from "../../database/Querys/Colaborador";
import { Colaborador } from "../../database/mySQLTypes";

export class ResetPasswordService implements IService<IColaboradorMobile> {
  constructor() {
    this.colaboradorRepository =
      AppDataSource.getRepository<ColaboradorMobile>(ColaboradorMobile);
  }
  private readonly colaboradorRepository: Repository<ColaboradorMobile>;
  async execute(email: string): Promise<IResponse<IColaboradorMobile>> {
    const colaborador: Colaborador = await getColaboradorByEmailDocumentQuery(
      email,
      null
    );

    if (!colaborador) throw new ErrorResponse(k_error, ErrorMessage.NOT_FOUND);

    const colaboradorMobile = await this.colaboradorRepository.findOne({
      where: {
        colaborador_id: colaborador.id,
      },
    });

    const emailDigits = Util.gerarNumerosAleatorios();
    if (!colaboradorMobile) {
      const encryptedPassword = Util.generatePassword(7).toUpperCase();
      {
        const new_colab = await this.colaboradorRepository.save({
          colaborador_id: colaborador.id,
          // TODO tirar a imagem mockada
          image_profile:
            "https://navalha.s3.amazonaws.com/barbershop/img-professional-f-padrao.png",
          password: await Util.encryptPassword(encryptedPassword),
        });
        return new SuccessResponse(k_success, {
          colaborador: new_colab,
          digits: emailDigits,
        });
      }
    } else {
      return new SuccessResponse(k_success, {
        colaborador: colaboradorMobile,
        digits: emailDigits,
      });
    }
  }
}
