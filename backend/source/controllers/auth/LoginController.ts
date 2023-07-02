import { Request, Response, NextFunction } from "express";
import { User } from "../../database/models/User.model";
import { httpInternalServerError, httpUnauthorized, httpNotFoundOr404, httpOk } from "../../utils/Response";
import { generateAccessToken, generateRefreshToken } from "../../middleware/Authenticate";

const login = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return response.send(httpNotFoundOr404({}, "User not found"));
        }
        user.comparePassword(password, async (error: any, isMatch: any) => {
            if (error) {
                return response.send(httpInternalServerError(error, "Internal Sever Error"));
            }
            if (!isMatch) {
                return response.status(401).send(httpUnauthorized({}, `Invalid or incorrect password.`));
            }
            const accessToken = await generateAccessToken({
                _id: user._id,

            });
            const refreshToken = await generateRefreshToken({
                _id: user._id,
            });
            response.cookie('jwt', refreshToken, { httpOnly: true, sameSite: "none" });
            return response.send(httpOk(user.hidePasswordAndAddTokens(accessToken, refreshToken), `Login Success`));
        });

    } catch (error: any) {
        return response.send(httpInternalServerError(error, "Internal sever error"));
    }
};

const register = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email, password, name } = request.body;
        const user = await User.findOne({ email: email });
        if (user) {
            return response.send(httpOk({}, "User already exist"));
        }
        const newUser = new User();
        newUser.email = email;
        newUser.password = password;
        newUser.name = name;
        newUser.save().then((user) => {
            return response.send(httpOk(user, `Register Success`));
        }).catch((error) => {
            return response.send(httpInternalServerError(error, "Internal sever error"));
        })
    } catch (error: any) {
        return response.send(httpInternalServerError(error, "Internal sever error"));
    }
};


export default { login };