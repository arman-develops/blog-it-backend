import { log } from "console";
import { Request, Response, Router } from "express";
import client from "../config/prisma.client";
import { SendSuccessResponse } from "../utils/sucess.utils";
import { SendErrorResponse } from "../utils/error.utils";

const authRouter = Router()

const registerUser = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, password, username} = req.body
        

        const user = await client.user.create({
            data: {
                firstName,
                lastName,
                email,
                password,
                username
            }
        })
        SendSuccessResponse(res, {user}, "Your profile was created success")
        log("new user created")
    } catch (error) {
        SendErrorResponse(res, {
            error
        }, "Error Creating your profile")
    }
}

authRouter.post("/register", registerUser)

export default authRouter