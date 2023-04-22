import { z } from "zod";
import {
  responseLoginSchema,
  resquestLoginSchema,
} from "../schemas/login.schemas";

export type TLoginRequest = z.infer<typeof resquestLoginSchema>;
export type TLoginResponse = z.infer<typeof responseLoginSchema>;
