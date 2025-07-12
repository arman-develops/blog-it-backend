import { Router } from "express";
import { getUserBlogs, updateUserPassword, updateUserProfile } from "../controller/profile.controller";

const profileRouter = Router()

profileRouter.patch("/", updateUserProfile)
profileRouter.patch("/password", updateUserPassword)
profileRouter.get("/blogs", getUserBlogs)

export default profileRouter