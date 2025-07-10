import { Request, Response } from "express";
import client from "../config/prisma.client";
import { SendErrorResponse } from "../utils/error.utils";
import { SendSuccessResponse } from "../utils/sucess.utils";

async function getAllBlogs(req: Request, res: Response) {
    try {
        const userID = (req.user as any).userID

        if(!userID) {
            SendErrorResponse(res, {authError: true}, "Invalid Token")
        }

        const blogs = await client.blog.findMany({
            where: {
                userID
            }
        })

        SendSuccessResponse(res, {
            data: {
                blogs
            }
        }, "Blogs fetched successfully")
    } catch(err) {
        SendErrorResponse(res, {data: {error: true}}, "error fetching blogs")
    }
}

export {getAllBlogs}