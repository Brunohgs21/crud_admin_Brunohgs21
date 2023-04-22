import { Request, Response } from "express";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
} from "../interfaces/users.interfaces";
import createUsersService from "../services/users/createUsers.service";
import listUsersService from "../services/users/listUsers.service";
import retrieveUsersService from "../services/users/retrieveUsers.service";
import updateUsersService from "../services/users/updateUsers.service";
import deleteUserService from "../services/users/deleteUser.service";
import reactivateUserService from "../services/users/reactivateUser.service";

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

const retrieveUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await retrieveUsersService(res.locals.id);

  return res.json(user);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const userData: TUserUpdateRequest = req.body;

  const updatedUser = await updateUsersService(userId, userData);

  return res.json(updatedUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  await deleteUserService(userId);
  return res.status(204).send();
};

const reactivateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  const recoveredUser = await reactivateUserService(userId);

  return res.json(recoveredUser);
};

export {
  createUsersController,
  listUsersController,
  retrieveUsersController,
  updateUsersController,
  deleteUserController,
  reactivateUserController,
};
