import { Request, Response, NextFunction } from "express";

import { ObjectSchema } from "joi";

import { sendErrorResponse } from "@utils/messages";

export default function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(422)
        .send(
          sendErrorResponse(
            "ValidationError",
            error.details.map((err) => err.message).toString()
          )
        );
    }

    next();
  };
}
