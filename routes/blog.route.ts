import express from 'express';
import { createBlog, getAllBlogs, getSingleBlog, updateBlog } from '../controller/blog.controller';

const blogRouter = express.Router()

blogRouter.get("/", getAllBlogs)
blogRouter.post("/", createBlog)
blogRouter.get("/:blogID", getSingleBlog)
blogRouter.patch("/:blogID", updateBlog)

export default blogRouter