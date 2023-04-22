import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { QueryConfig } from "pg";
import { client } from "../database";

const checkAuthorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin: boolean = res.locals.admin;

  const userId: number = parseInt(req.params.id);
  const queryTest: string = `
      SELECT
        "admin"
      FROM
        users
      WHERE
        id = $1
    `;
  const queryConfigTest: QueryConfig = {
    text: queryTest,
    values: [userId],
  };
  const queyResultTest = await client.query(queryConfigTest);

  if (admin) {
    return next();
  }
  if (queyResultTest.rows[0].admin === false && admin === false) {
    return next();
  } else if (queyResultTest.rows[0].admin === true && admin === false) {
    throw new AppError("Insufficient Permission", 403);
  }
};

export default checkAuthorizationMiddleware;
