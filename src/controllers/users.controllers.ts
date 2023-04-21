import { Request, Response } from "express";
import { TUserRequest, TUserResponse } from "../interfaces/users.interfaces";
import createUsersService from "../services/users/createUsers.service";
import listUsersService from "../services/users/listUsers.service";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;
  const user: TUserResponse = await createUsersService(userData);
  return res.status(201).json(user);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();
  return res.json(users);
};

export { createUsersController, listUsersController };
