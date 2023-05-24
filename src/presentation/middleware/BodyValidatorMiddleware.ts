import httpStatus from "http-status";
import { ErrorResponse } from "../../shared/response/ErrorResponse";
import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, "body");
}

function validate(schema: ObjectSchema, type: "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
      convert: true,
    });
    if (error) {
      const errorMessages = error.details.map((e) => e.message);
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(new ErrorResponse("error", "invalid_body", errorMessages));
    } else {
      req.body = schema.validate(req[type], {
        abortEarly: false,
        convert: true,
      }).value;
    }
    next();
  };
}

type ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
