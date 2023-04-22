import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";
import ensureEmailExistsMiddleware from "../middlewares/ensureEmailExists.middleware";
import {
  createUsersController,
  deleteUserController,
  listUsersController,
  reactivateUserController,
  retrieveUsersController,
  updateUsersController,
} from "../controllers/users.controllers";
import ensureTokenIsValidMiddleware from "./../middlewares/ensureTokenIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUsersExists.middleware";
import ensureIsAdminMiddleware from "./../middlewares/ensureIsAdmin.middleware";
import checkAuthorizationMiddleware from "../middlewares/checkAuthorization.midleware";
import ensureIsActiveMiddleware from "../middlewares/ensureIsActive.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(requestUserSchema),
  ensureEmailExistsMiddleware,
  createUsersController
);

userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  listUsersController
);

userRoutes.get(
  "/profile",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  retrieveUsersController
);

userRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateUserSchema),
  ensureTokenIsValidMiddleware,
  checkAuthorizationMiddleware,
  ensureUserExistsMiddleware,
  ensureEmailExistsMiddleware,
  updateUsersController
);

userRoutes.delete(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  checkAuthorizationMiddleware,
  deleteUserController
);

userRoutes.put(
  "/:id/recover",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureIsActiveMiddleware,
  reactivateUserController
);

export default userRoutes;
