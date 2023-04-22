import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

const ensureIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin = res.locals.admin;

  if (!admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default ensureIsAdminMiddleware;
