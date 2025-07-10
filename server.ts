import { Express, Request, Response, json } from 'express'
import express from 'express'
import dotenv from 'dotenv'
import { log } from 'console'
import { SendSuccessResponse } from './utils/sucess.utils'
import authRouter from './routes/users.route'
import blogRouter from './routes/blog.route'
import { verifyToken } from './middleware/verifyToken'
dotenv.config()

const app: Express = express()

app.use(json())
app.get("/", (_req: Request, res: Response) => {
    SendSuccessResponse(res, {
        path: '/',
        message: "welcome to blog-it API"
    }, "index")
})

app.use("/api/auth", authRouter)
app.use("/api/blogs", verifyToken, blogRouter)

const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
    log(`Server is running on ${PORT}`)
})