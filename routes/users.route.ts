import { Router } from "express"
import { loginUser, registerUser } from "../controller/auth.controller"

const authRouter = Router()

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)

export default authRouter