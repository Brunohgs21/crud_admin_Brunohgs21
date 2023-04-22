import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

type TEmail = {
  email: string;
};

const ensureEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email }: TEmail = req.body;
  console.log(email);

  const queryString: string = `
            SELECT
                *
            FROM
                users
            WHERE
                email = $1;
        `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: QueryResult = await client.query(queryConfig);
  console.log(queryResult.rowCount);
  if (queryResult.rowCount !== 0) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};

export default ensureEmailExistsMiddleware;
