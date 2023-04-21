import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { requestUserSchema } from "../schemas/users.schemas";
import ensureEmailExistsMiddleware from "../middlewares/ensureEmailExists.middleware";
import {
  createUsersController,
  listUsersController,
  retrieveUsersController,
} from "../controllers/users.controllers";
import ensureTokenIsValidMiddleware from "./../middlewares/ensureTokenIsValid.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(requestUserSchema),
  ensureEmailExistsMiddleware,
  createUsersController
);

userRoutes.get("", ensureTokenIsValidMiddleware, listUsersController);

userRoutes.get(
  "/profile",
  ensureTokenIsValidMiddleware,
  retrieveUsersController
);

export default userRoutes;
