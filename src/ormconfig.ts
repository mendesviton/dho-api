import "reflect-metadata";
import { DataSource } from "typeorm";
import { Enviroment } from "./shared/Enviroment";
import { ColaboradorMobile } from "./database/Entities/ColaboradoresMobile";
import { ColaboradorRegistroPonto } from "./database/Entities/ColaboradoresRegistroPonto";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: Enviroment.databaseUrl,
  port: Enviroment.databasePort,
  username: Enviroment.databaseUsername,

  database: Enviroment.databaseName,
  synchronize: true,
  logging: false,
  entities: [ColaboradorMobile, ColaboradorRegistroPonto],
  migrations: ["src/database/migrations/*.ts"],
  migrationsTableName: "migrations",

  subscribers: [],
});
