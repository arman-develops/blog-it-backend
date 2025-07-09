import { log } from "console";
import { Request, Response, Router } from "express";
import bcrypt from 'bcryptjs'
import client from "../config/prisma.client";
import { SendSuccessResponse } from "../utils/sucess.utils";
import { SendErrorResponse } from "../utils/error.utils";

const authRouter = Router()

const registerUser = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, password, username} = req.body
        const saltRounds = 10
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if(err) {
                SendErrorResponse(res, {
                    data: {
                        error: err
                    }
                }, "Something Went Wrong")
                log("error hashing password")
            }
            const user = await client.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hash as string,
                    username
                }
            })
            SendSuccessResponse(res, {user}, "Your profile was created success")
            log("new user created")
        })

        
    } catch (error) {
        SendErrorResponse(res, {
            error
        }, "Error Creating your profile")
    }
}

authRouter.post("/register", registerUser)

export default authRouter