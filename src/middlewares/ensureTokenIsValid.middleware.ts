import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../error";
import { log } from "console";

const ensureTokenIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }
  token = token.split(" ")[1];
  try {
    jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
      if (err) {
        throw new AppError(err.message, 401);
      }
      res.locals.id = decoded.sub;
      res.locals.admin = decoded.admin;
      console.log(decoded.sub, "user");
      console.log(decoded.admin);
    });

    return next();
  } catch (error: any) {
    throw new AppError("Incorrect token", 401);
  }
};

export default ensureTokenIsValidMiddleware;

// const ensureTokenIsValidMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response | void> => {
//   let token = req.headers.authorization;

//   if (!token) {
//     throw new AppError("Missing Bearer Token", 401);
//   }
//   token = token.split(" ")[1];

//   try {
//     const decoded = await new Promise((resolve, reject) => {
//       jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(decoded);
//         }
//       });
//     });

//     res.locals.user = decoded.user;
//     console.log(decoded.user);
//     console.log(res.locals.user);

//     return next();
//   } catch (err) {
//     throw new AppError(err.message, 401);
//   }
// };

// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const ensureTokenIsValidMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   let token: any = req.headers.authorization;

//   if (!token) {
//     throw new Error("Missing Bearer Token");
//   }
//   token = token.split(" ")[1];

//   try {
//     const decoded: any = await new Promise((resolve, reject) => {
//       jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(decoded);
//         }
//       });
//     });

//     res.locals.user = decoded.user;
//     console.log(decoded.user);
//     console.log(res.locals.user);

//     return next();
//   } catch (err: any) {
//     throw new Error(err.message);
//   }
// };

// export default ensureTokenIsValidMiddleware;
