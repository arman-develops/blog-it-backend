import express from 'express';
import { getAllBlogs } from '../controller/blog.controller';
import { verifyToken } from '../middleware/verifyToken';

const blogRouter = express.Router()

blogRouter.get("/", verifyToken ,getAllBlogs)

export default blogRouter