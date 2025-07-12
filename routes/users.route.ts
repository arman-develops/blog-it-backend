import { Router } from "express"
import { loginUser, logout, protectedHandler, registerUser } from "../controller/auth.controller"
import { verifyToken } from "../middleware/verifyToken"
import { validatePasswordStrength } from "../middleware/validatePassword"

const authRouter = Router()

authRouter.post("/register", validatePasswordStrength("password"), registerUser)
authRouter.post("/login", loginUser)
authRouter.post("/logout", logout)
authRouter.get("/protected", verifyToken, protectedHandler)

export default authRouter