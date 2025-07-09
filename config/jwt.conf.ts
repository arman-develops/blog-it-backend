import { Secret } from "jsonwebtoken"

export const jwt_key: Secret = process.env.JWT_SECRET_KEY as Secret