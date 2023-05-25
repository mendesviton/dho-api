import { Router } from "express";
import { CreateColaboradorController } from "./controllers/CreateColaboradorController";
import axios from "axios";
import { AuthColaboradorController } from "./controllers/AuthColaboradorController";
import { loginSchema } from "./schema/LoginSchema";
import { validateBody } from "./middleware/BodyValidatorMiddleware";
import { changePasswordSchema } from "./schema/ChangePasswordSchema";
import { ChangePasswordController } from "./controllers/ChangePasswordController";
import { ResetPasswordController } from "./controllers/ResetPasswordController";
import { CreateRegistroPontoController } from "./controllers/CreateRegistroPontoController";
import { UpdateImageProfileController } from "./controllers/UpdateImageProfileController";

export default class Routes {
  private routes = Router();

  constructor(
    private createColaboradorController: CreateColaboradorController,
    private authColaboradorController: AuthColaboradorController,
    private changePasswordController: ChangePasswordController,
    private resetPasswordController: ResetPasswordController,
    private createRegistroPontoController: CreateRegistroPontoController,
    private updateImageProfileController: UpdateImageProfileController
  ) {}

  public buildRoutes(): Router {
    this.routes.post(
      "/create/colaborador/:colaborador_id/:email",

      this.createColaboradorController.handle
    );
    this.routes.post(
      "/auth/",
      validateBody(loginSchema),
      this.authColaboradorController.handle
    );
    this.routes.post(
      "/change/password/:colaborador_id",
      validateBody(changePasswordSchema),
      this.changePasswordController.handle
    );
    this.routes.post("/reset/:email", this.resetPasswordController.handle);
    this.routes.post(
      "/create/point/:id",
      this.createRegistroPontoController.handle
    );
    this.routes.put(
      "/update/image/:id",
      this.updateImageProfileController.handle
    );

    return this.routes;
  }
}
export const router = Router();
export const BCRYPT_SALT_LENGTH = 12;
router.use(
  "/mobile",
  new Routes(
    new CreateColaboradorController(),
    new AuthColaboradorController(),
    new ChangePasswordController(),
    new ResetPasswordController(),
    new CreateRegistroPontoController(),
    new UpdateImageProfileController()
  ).buildRoutes()
);

// router.get("/rotas", async (req, res) => {
//   const teste = await axios
//     .get(`http://localhost:3000/v1/mobile/create/colaborador/7`)
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });
// router.get("/create/colaborador/:colaborador_id/", async (req, res) => {
//   const createColaboradorController = new CreateColaboradorController();
//   await createColaboradorController.handle(req, res);
// });
// router.get("/login/:email/:colaborador_id/", async (req, res) => {
//   const createColaboradorController = new CreateColaboradorController();
//   await createColaboradorController.handle(req, res);
// });
