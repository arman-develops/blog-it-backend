import { log, profile } from "console";
import { Request, Response} from "express";
import bcrypt from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken'
import client from "../config/prisma.client";
import { SendSuccessResponse } from "../utils/sucess.utils";
import { SendErrorResponse } from "../utils/error.utils";
import { jwt_key } from "../config/jwt.conf";
import { AuthRequest } from "../middleware/verifyToken";
import { generateKey } from "crypto";
import { generateToken } from "../utils/generateJWT";

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
            const payload = {
                firstName: user.firstName,
                lastName: user.lastName,
                profileID: user.profileID,
                userID: user.userID,
                email: user.email,
                username: user.username
            }
            const jwt_token = generateToken(payload)
            SendSuccessResponse(res, {jwt_token}, "Your profile was created successfully")
        })

        
    } catch (error) {
        SendErrorResponse(res, {
            error
        }, "Error Creating your profile")
    }
}

async function loginUser(req: Request, res:Response) {
    const {identifier, password} = req.body

    const user = await client.user.findFirst({
    where: {
        OR: [
            { username: identifier },
            { email: identifier }
        ]
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
        profileID: user.profileID,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }

    const jwt_token = generateToken(payload)
    
    // console.log(user)
    SendSuccessResponse(res, {
        jwt_token
    }, "login successful")
}

function logout(_req: Request, _res: Response) {
    log("user has been logged out")
}

function protectedHandler(req: AuthRequest, res: Response) {
    try {
        const userID = req.user?.userID
        if(!userID) {
            SendErrorResponse(res, {authError: true}, "Invalid Token")
        }
        SendSuccessResponse(res, {message: "Protected route reached"}, "this is a protected route")
    } catch (error) {
        return SendErrorResponse(res, { error }, "Unauthorized", 401);
    }
        
}

export {registerUser, loginUser, logout, protectedHandler}