import { Request, Response } from "express";
import client from "../config/prisma.client";
import { SendErrorResponse } from "../utils/error.utils";
import { SendSuccessResponse } from "../utils/sucess.utils";

// interface AuthPayload {
//     userID: string
//     email?: string
// }

async function getAllBlogs(req: Request, res: Response) {
    try {
        const userID = req.user?.userID
        if(userID) {
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

async function createBlog(req: Request, res: Response) {
    try {

        const userID = req.user?.userID;
        if (!userID) {
            return SendErrorResponse(res, { authError: true }, "Unauthorized", 401);
        }

        const {featuredImage, title, synopsis, content} = req.body
        const blog = await client.blog.create({
            data: {
                featuredImage,
                title,
                synopsis,
                content,
                user: {
                    connect: {userID}
                }
            }
        })

        SendSuccessResponse(res, {
            data: blog,
        }, "Blog created successfully");
    } catch(err) {
        SendErrorResponse(res, {data: {error: true}}, "error creating blog")
    }
}

export {getAllBlogs, createBlog}