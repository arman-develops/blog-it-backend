import { Express, Request, Response } from 'express'
import express from 'express'
import dotenv from 'dotenv'
import { log } from 'console'
import { SendSuccessResponse } from './utils/sucess.utils'
dotenv.config()

const app: Express = express()

app.get("/", (_req: Request, res: Response) => {
    SendSuccessResponse(res, {
        path: '/',
        message: "welcome to blog-it API"
    }, "index")
})

const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
    log(`Server is running on ${PORT}`)
})