import jwt from 'jsonwebtoken';
import { jwt_key } from "../config/jwt.conf";
import { UserProfile } from '../types/user.type';

export function generateToken(payload: UserProfile) {
    return jwt.sign(payload, jwt_key, {expiresIn: '1h'})
}