import dotenv from "dotenv";
dotenv.config();
export class Enviroment {
  static databaseUrl: string = process.env.DB_DEV;
  static databasePort: number = Number.parseInt(process.env.DB_DEV_PORT);
  static databaseUsername: string = process.env.DB_DEV_USERNAME;
  static databasePassword: string = process.env.DB_DEV_PASSWORD;
  static databaseName: string = process.env.DB_DEV_NAME;

  static databaseProdUrl: string = process.env.DB_HOST;
  static databaseProdPort: number = Number.parseInt(process.env.DB_PORT);
  static databaseProdUsername: string = process.env.DB_USERNAME;
  static databaseProdPassword: string = process.env.DB_PASSWORD;
  static databaseProdName: string = process.env.DB_NAME;
}
