import express from 'express'
import dotenv from 'dotenv'
import { log } from 'console'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
    log(`Server is running on ${PORT}`)
})