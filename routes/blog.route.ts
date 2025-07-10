import express from 'express';
import { createBlog, getAllBlogs, getSingleBlog } from '../controller/blog.controller';

const blogRouter = express.Router()

blogRouter.get("/", getAllBlogs)
blogRouter.post("/", createBlog)
blogRouter.get("/:blogID", getSingleBlog)

export default blogRouter