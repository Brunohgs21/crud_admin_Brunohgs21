import { TypeOf, z } from "zod";
import {
  authSchema,
  requestUserSchema,
  responseUserSchema,
  updateUserSchema,
  userSchema,
} from "../schemas/users.schemas";

type TUser = z.infer<typeof userSchema>;

type TUserRequest = z.infer<typeof requestUserSchema>;

type TUserResponse = z.infer<typeof responseUserSchema>;

type TUserAuth = z.infer<typeof authSchema>;

type TUserUpdateRequest = z.infer<typeof updateUserSchema>;

export { TUser, TUserRequest, TUserResponse, TUserUpdateRequest, TUserAuth };
