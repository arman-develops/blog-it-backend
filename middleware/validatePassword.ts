// middleware/validatePasswordStrength.ts
import { Request, Response, NextFunction } from "express";
import zxcvbn from "zxcvbn";
import { SendErrorResponse } from "../utils/error.utils";

export function validatePasswordStrength(field: string = "password") {
  return (req: Request, res: Response, next: NextFunction) => {
    const password = req.body[field];

    if (!password) {
      return SendErrorResponse(res, { passwordError: true }, "Password is required", 400);
    }

    const result = zxcvbn(password);

    if (result.score < 3) {
      return SendErrorResponse(
        res,
        {
          passwordError: true,
          feedback: result.feedback,
        },
        "Password too weak. Use a longer or more complex password.",
        400
      );
    }

    next();
  };
}
