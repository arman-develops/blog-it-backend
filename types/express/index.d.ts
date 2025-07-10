// types/express/index.d.ts
import { JwtPayload } from "jsonwebtoken";

declare namespace Express {
    export interface Request {
      user?: {
        userID: string;
        email?: string;
      } | JwtPayload;
    }
}
