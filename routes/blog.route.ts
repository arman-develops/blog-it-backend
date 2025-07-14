import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from '../controller/blog.controller';
import { verifyToken } from '../middleware/verifyToken'

const blogRouter = express.Router()

blogRouter.get("/", getAllBlogs)
blogRouter.post("/", verifyToken, createBlog)
blogRouter.get("/:blogID", verifyToken, getSingleBlog)
blogRouter.patch("/:blogID",verifyToken, updateBlog)
blogRouter.delete("/:blogID", verifyToken, deleteBlog)

export default blogRouter