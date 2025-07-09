import { Router } from "express"
import { loginUser, logout, registerUser } from "../controller/auth.controller"

const authRouter = Router()

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.post("/logout", logout)

export default authRouter