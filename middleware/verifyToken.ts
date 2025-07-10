import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SendErrorResponse } from "../utils/error.utils";
import { jwt_key } from "../config/jwt.conf";

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        SendErrorResponse(
            res, 
            {
                authError: true
            },
            "Failed to authenticate",
            401
        )
        return
    }

    try {
        const decoded = jwt.verify(token, jwt_key)
        req.user = decoded // This works because we extended the Request type
        next();
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            SendErrorResponse(
                res,
                {
                    data: {
                        authError: true
                    }
                },
                "Token Expired",
                401
            )
        }
        SendErrorResponse(
            res,
            {
                authError: true
            },
            "Invalid Token",
            403
        )
    }
    
}

export {verifyToken}