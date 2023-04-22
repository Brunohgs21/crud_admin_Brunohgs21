import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { QueryConfig } from "pg";
import { client } from "../database";

const ensureIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
        SELECT
            "active"
        FROM
            users
        WHERE
            id = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult = await client.query(queryConfig);

  if (queryResult.rows[0].active === true) {
    throw new AppError("User already active", 400);
  }

  return next();
};

export default ensureIsActiveMiddleware;
