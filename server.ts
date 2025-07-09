import { Express, Request, Response } from 'express'
import express from 'express'
import dotenv from 'dotenv'
import { log } from 'console'
import { SendSuccessResponse } from './utils/sucess.utils'
dotenv.config()

const app: Express = express()

const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
    log(`Server is running on ${PORT}`)
})