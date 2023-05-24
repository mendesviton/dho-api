import { RowDataPacket } from "mysql2";

export type Colaborador = RowDataPacket & {
  id: number;
  nome: string;
  idade: number;
  email: string;
  nome_fantasia: string;
};
