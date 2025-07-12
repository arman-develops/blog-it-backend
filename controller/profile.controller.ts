import { Request, Response } from "express";
import bcrypt from "bcryptjs";
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

export async function updateUserPassword(req: AuthRequest, res: Response) {
    const userID = req.user?.userID;
    const { currentPassword, newPassword } = req.body;

    if (!userID || !currentPassword || !newPassword) {
        return SendErrorResponse(res, { authError: true }, "Missing credentials", 400);
    }

    try {
        const user = await client.user.findUnique({ where: { userID } });
        if (!user) {
            return SendErrorResponse(res, { notFound: true }, "User not found", 404);
        }

        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return SendErrorResponse(res, { passwordError: true }, "Incorrect current password", 401);
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await client.user.update({
            where: { userID },
            data: { password: hashedNewPassword },
        });

        SendSuccessResponse(res, {}, "Password updated successfully");
    } catch (err) {
        SendErrorResponse(res, { error: true }, "Failed to update password");
    }
}
