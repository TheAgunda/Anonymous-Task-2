import { Request, Response, NextFunction } from "express";
import { verify, sign, } from "jsonwebtoken";
import { httpUnauthorized } from "../utils/Response";
import { User } from "../database/models/User.model";
import { AppConfig } from "../config/Constants";

export async function authenticateUser(request: Request, response: Response, next: NextFunction) {
    const token = request.body.token || request.headers["x-access-token"];
    if (!token) {
        return response.status(401).send(httpUnauthorized({}, "Token required for authentication."));
    }
    try {
        const decoded: any = verify(token, AppConfig.ACCESS_TOKEN_SECRET);
        if (decoded) {
            const auth_user = await User.findOne({ _id: decoded._id });
            request.user = {
                id: auth_user?._id,
                name: auth_user?.name
            }
        }
    } catch (error) {
        return response.status(401).send(httpUnauthorized({}, "Invalid and expired token"));
    }
    return next();
}


export async function generateAccessToken(user: any) {
    return sign(user, AppConfig.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

export async function generateRefreshToken(user: any) {
    const refreshToken = sign(user, AppConfig.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    return refreshToken;
}