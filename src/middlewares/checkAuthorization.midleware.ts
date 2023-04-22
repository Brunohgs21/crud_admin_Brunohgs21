import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { QueryConfig } from "pg";
import { client } from "../database";
import { TUserAuth } from "../interfaces/users.interfaces";

const checkAuthorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(res.locals);
  // const user: TUserAuth = res.locals.user;
  // console.log(user);
  const tokenId = res.locals.id;
  console.log(tokenId);

  const admin: boolean = res.locals.admin;
  console.log(admin);

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
