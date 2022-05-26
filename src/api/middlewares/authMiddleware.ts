import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import { CustomError } from "./error_handler";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.jwt.jwt_secret || "12345", (err, user) => {
      if (err) {
        throw new CustomError("Acesso negado!", 403);
      }
      req.user = user as { user_id: string; email: string };
      next();
    });
  } else {
    throw new CustomError("Não autorizado!", 403);
  }
};

export default authMiddleware;
