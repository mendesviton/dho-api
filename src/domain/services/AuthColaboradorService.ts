import { Repository } from "typeorm";
import { ColaboradorMobile } from "../../database/Entities/ColaboradoresMobile";
import { IResponse } from "../../interfaces/response/IResponse";
import IService from "../../interfaces/service/IServices";
import { AppDataSource } from "../../ormconfig";
import { ErrorResponse } from "../../shared/response/ErrorResponse";
import { ErrorMessage, k_error, k_success } from "../../constants/Constants";
import { getColaboradorByEmailDocumentQuery } from "../../database/Querys/Colaborador";
import { LoginRequest } from "../../shared/request/AuthColaboradorRequest";
import { Colaborador } from "../../database/mySQLTypes";
import { Util } from "../../shared/Util";
import { SuccessResponse } from "../../shared/response/SuccessResponse";

export class AuthColaboradorService implements IService<IColaboradorMobile> {
  private readonly colaboradorRepository: Repository<ColaboradorMobile>;
  constructor() {
    this.colaboradorRepository =
      AppDataSource.getRepository<ColaboradorMobile>(ColaboradorMobile);
  }
  async execute(
    loginRequest: LoginRequest
  ): Promise<IResponse<IColaboradorMobile>> {
    const { password, cpf, email } = loginRequest;

    const colaborador: Colaborador = await getColaboradorByEmailDocumentQuery(
      email,
      cpf
    );

    if (!colaborador) throw new ErrorResponse(k_error, ErrorMessage.NOT_FOUND);

    const colaboradorMobile = await this.colaboradorRepository.findOne({
      relations: { registro_ponto: true },
      where: {
        colaborador_id: colaborador.id,
      },
    });
    if (!colaboradorMobile) {
      const encryptedPassword = Util.generatePassword(7).toUpperCase();

      await this.colaboradorRepository.save({
        colaborador_id: colaborador.id,
        // TODO tirar a imagem mockada
        image_profile:
          "https://navalha.s3.amazonaws.com/barbershop/img-professional-f-padrao.png",
        password: await Util.encryptPassword(encryptedPassword),
      });
      throw new ErrorResponse(k_error, "email_send");
    }
    colaboradorMobile.nome_empresa = colaborador.nome_fantasia ?? null;
    const validPassword = await Util.comparePassword(
      password,
      colaboradorMobile.password
    );
    if (!validPassword)
      throw new ErrorResponse(k_error, ErrorMessage.BAD_CREDENTIALS);
    else {
      if (colaboradorMobile.first_time) {
        colaboradorMobile.first_time = false;
        await this.colaboradorRepository.save(colaboradorMobile);
        colaboradorMobile.first_time = true;
      }
      return new SuccessResponse(k_success, colaboradorMobile);
    }
  }
}
