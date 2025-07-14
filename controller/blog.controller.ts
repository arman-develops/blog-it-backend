import { Request, Response } from "express";
import client from "../config/prisma.client";
import { SendErrorResponse } from "../utils/error.utils";
import { SendSuccessResponse } from "../utils/sucess.utils";
import { AuthRequest } from "../middleware/verifyToken";

// interface AuthPayload {
//     userID: string
//     email?: string
// }

async function getAllBlogs(req: AuthRequest, res: Response) {
    try {
        const userID = req.user?.userID
        if(!userID) {
            SendErrorResponse(res, {authError: true}, "Invalid Token")
        }

        const blogs = await client.blog.findMany({
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        username: true,
                        profileID: true
                    }
                }
            }
        })

        SendSuccessResponse(res, {blogs}, "Blogs fetched successfully")
    } catch(error) {
        SendErrorResponse(res, {error}, "error fetching blogs")
    }
}

async function createBlog(req: AuthRequest, res: Response) {
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
    } catch(error) {
        SendErrorResponse(res, {data: {error}}, "error creating blog")
    }
}

async function getSingleBlog(req: AuthRequest, res: Response) {
    try {
        const userID = req.user?.userID;
        if (!userID) {
            return SendErrorResponse(res, { authError: true }, "Unauthorized", 401);
        }

        const {blogID} = req.params

        const blog = await client.blog.findFirst({
            where: {
                blogID
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        username: true,
                        profileID: true
                    }
                }
            }
        })

        SendSuccessResponse(res, {blog}, "blog fetched successfully")

    } catch (error) {
        SendErrorResponse(res, {data: {error}}, "error creating blog")
    }
}

async function updateBlog(req:AuthRequest, res: Response) {
    try {
        const userID = req.user?.userID;

        if (!userID) {
            return SendErrorResponse(res, { authError: true }, "Unauthorized", 401);
        }

        const {blogID} = req.params
        const { title, synopsis, content, featuredImage } = req.body;

        const existingBlog = await client.blog.findUnique({
            where: { blogID },
        });

        if (!existingBlog || existingBlog.userID !== userID) {
            return SendErrorResponse(res, { notFound: true }, "Blog not found or not authorized", 404);
        }

        const updatedBlog = await client.blog.update({
            where: {
                blogID
            },
            data: {
                title,
                synopsis,
                content,
                featuredImage
            }
        })
        SendSuccessResponse(res, {updatedBlog}, "Blog Updated Successfully")
    } catch(error) {
        SendErrorResponse(res, {data: {error}}, "error creating blog")
    }
}

async function deleteBlog(req: AuthRequest, res: Response) {
    try {
        const { blogID } = req.params;
        const userID = req.user?.userID;

        if (!userID) {
            return SendErrorResponse(res, { authError: true }, "Unauthorized", 401);
        }

        // Confirm ownership
        const blog = await client.blog.findUnique({
        where: { blogID },
        });

        if (!blog || blog.userID !== userID) {
            return SendErrorResponse(res, { notFound: true }, "Blog not found or unauthorized", 404);
        }

        // Hard delete
        await client.blog.delete({
            where: { blogID },
        });

        SendSuccessResponse(res, { message: "Blog deleted successfully" }, "Blog deleted");
    } catch (error) {
        SendErrorResponse(res, { data: { error } }, "Error deleting blog");
    }
}

export {getAllBlogs, createBlog, getSingleBlog, updateBlog, deleteBlog}