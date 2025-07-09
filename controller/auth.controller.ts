import { log } from "console";
import { Request, Response} from "express";
import bcrypt from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken'
import client from "../config/prisma.client";
import { SendSuccessResponse } from "../utils/sucess.utils";
import { SendErrorResponse } from "../utils/error.utils";
import { jwt_key } from "../config/jwt.conf";

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

async function loginUser(req: Request, res:Response) {
    const {username, password} = req.body

    const user = await client.user.findUnique({
        where: {
            username,
        }
    })

    if(!user) {
        SendErrorResponse(res, {
            error: "Invalid Credentials"
        }, "Invalid Credentials. Could not login")
        return
    }
    
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        SendErrorResponse(res, {
            error: "Invalid Credentials"
        }, "Invalid Credentials. Could not login", 200)
        return
    }

    const payload = {
        userID: user.userID,
        username: user.username,
        email: user.email,
        password: user.password
    }

    const jwt_token = jwt.sign(payload, jwt_key, {expiresIn: '1h'})
    
    console.log(user)
    SendSuccessResponse(res, {
        jwt_token
    }, "login successful")
}

export {registerUser, loginUser}