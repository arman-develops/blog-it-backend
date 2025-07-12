import { Request, Response } from "express";
import client from "../config/prisma.client";
import { SendErrorResponse } from "../utils/error.utils";
import { SendSuccessResponse } from "../utils/sucess.utils";

import { AuthRequest } from "../middleware/verifyToken";

export async function updateUserProfile(req: AuthRequest, res: Response) {
    const userID = req.user?.userID;
    const { username, firstName, lastName, email } = req.body;

    if (!userID) {
        return SendErrorResponse(res, { authError: true }, "Unauthorized", 401);
    }

    try {
        const updatedUser = await client.user.update({
            where: { userID },
            data: {
                username,
                firstName,
                lastName,
                email
            },
        });

        SendSuccessResponse(res, { updatedUser }, "User profile updated successfully");
    } catch (err) {
        SendErrorResponse(res, { error: true }, "Failed to update user profile");
    }
}
