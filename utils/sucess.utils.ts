import { Response } from "express";

function SendSuccessResponse<T>(res: Response, data: T, message: string, code: number = 200): void {
    res.status(code).json({
        success: true,
        message,
        data
    })
}

export {SendSuccessResponse}