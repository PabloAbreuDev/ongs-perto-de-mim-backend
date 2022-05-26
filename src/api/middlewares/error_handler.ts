import { Request, Response, NextFunction } from "express";

export class CustomError {
  message!: string;
  status!: number;
  additionalInfo!: any;

  constructor(message: string, status: number = 500, additionalInfo: any = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      "Algo deu errado, pedimos desculpas e iremos verificar o problema!"
    );
    console.log(err.message);
  }

  res.status((customError as CustomError).status).send(customError);
}

export default handleError;
