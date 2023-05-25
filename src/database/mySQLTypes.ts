import { RowDataPacket } from "mysql2";

export type Colaborador = RowDataPacket & {
  id: number;
  nome: string;
  idade: number;
  email: string;
  nome_fantasia: string;
  colaboradores_dados_gerais_id: number;
};
