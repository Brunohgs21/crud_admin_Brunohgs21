import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { resquestLoginSchema } from "./../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(resquestLoginSchema),
  createLoginController
);

export default loginRoutes;
