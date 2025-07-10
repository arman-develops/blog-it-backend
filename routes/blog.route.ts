import express from 'express';
import { createBlog, getAllBlogs } from '../controller/blog.controller';

const blogRouter = express.Router()

blogRouter.get("/", getAllBlogs)
blogRouter.post("/", createBlog)

export default blogRouter