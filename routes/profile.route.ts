import { Router } from "express";
import { getUserBlogs, updateUserPassword, updateUserProfile } from "../controller/profile.controller";
import { validatePasswordStrength } from "../middleware/validatePassword";

const profileRouter = Router()

profileRouter.patch("/", updateUserProfile)
profileRouter.patch("/password", validatePasswordStrength("newPassword") ,updateUserPassword)
profileRouter.get("/blogs", getUserBlogs)

export default profileRouter