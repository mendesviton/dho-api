import "reflect-metadata";
import { AppDataSource } from "./ormconfig";
import ejs from "ejs";
import { config } from "dotenv";
import express, { json } from "express";
import { router } from "./presentation/routes";
import mysql from "mysql";
import { Enviroment } from "./shared/Enviroment";
console.log("helo-world");
AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.engine("html", ejs.renderFile);
    app.set("view engine", "html");
    app.set("view engine", "ejs");
    app.use(json());
    app.use("/v1", router);
    config({ path: ".env" });
    const port = process.env.PORT;
    app.listen(port, () => console.log("Servidor rodando na porta " + port));
  })
  .catch((error) => console.log(error));

export const connection = mysql.createConnection({
  host: Enviroment.databaseProdUrl,
  user: Enviroment.databaseProdUsername,
  database: Enviroment.databaseProdName,
  password: Enviroment.databaseProdPassword,
  port: Enviroment.databaseProdPort,
});
