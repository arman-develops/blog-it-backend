import { Router } from "express"
import { loginUser, logout, protectedHandler, registerUser } from "../controller/auth.controller"
import { verifyToken } from "../middleware/verifyToken"

const authRouter = Router()

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.post("/logout", logout)
authRouter.get("/protected", verifyToken, protectedHandler)

export default authRouter