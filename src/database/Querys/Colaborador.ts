import { connection } from "../..";
import { Colaborador } from "../mySQLTypes";

export const getColaboradorQuery = (
  colaborador_id: string
): Promise<Colaborador> => {
  return new Promise<Colaborador>((resolve, reject) => {
    connection.query(
      `SELECT * FROM colaboradores_dados_gerais WHERE id =${colaborador_id}`,
      (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};
export const getColaboradorByEmailQuery = (
  email: string
): Promise<Colaborador> => {
  return new Promise<Colaborador>((resolve, reject) => {
    connection.query(
      `SELECT * FROM colaboradores_dados_gerais WHERE UPPER(email) =${email
        .trim()
        .toUpperCase()}`,
      (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};
export const getColaboradorByCpfQuery = (
  email: string
): Promise<Colaborador> => {
  return new Promise<Colaborador>((resolve, reject) => {
    connection.query(
      `SELECT * FROM colaboradores_dados_gerais WHERE UPPER(email) =${email
        .trim()
        .toUpperCase()}`,
      (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};
export const getColaboradorByEmailDocumentQuery = (
  email?: string,
  cpf?: number
): Promise<Colaborador> => {
  return new Promise<Colaborador>((resolve, reject) => {
    let sql = "SELECT * FROM documentacoes ";
    sql =
      sql +
      "JOIN colaboradores_dados_gerais ON colaboradores_dados_gerais_id = colaboradores_dados_gerais.id ";
    sql =
      sql +
      "LEFT JOIN  dho_production.empresas ON empresas.cliente_id = colaboradores_dados_gerais.cliente_id ";
    if (email) {
      sql =
        sql +
        `WHERE UPPER(colaboradores_dados_gerais.email) ="${email
          .trim()
          .toUpperCase()}"`;
    } else if (cpf) {
      sql = sql + `WHERE documentacoes.cpf = ${cpf};`;
    }
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
