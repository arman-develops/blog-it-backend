import { Response } from "express";

function SendErrorResponse<T>(res: Response, data: T, message: string, code:number = 500) {
    res.status(code).json({
        success: false,
        data,
        message
    })
}

export {SendErrorResponse}