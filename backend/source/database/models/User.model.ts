import { Schema, model, Types, Document } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
interface IUser {
    name?: string;
    email: string;
    password: string;
    isDeleted?: boolean;
}
export interface IUserModel extends IUser, Document {
    comparePassword(password: string, cb: any): string;
    hidePasswordAndAddTokens(accessToken: any, refreshToken: any): IUserModel;
}


const UserSchema = new Schema<IUser>(
    {
        name: { type: String },
        email: {
            type: String, lowercase: true, index: true, required: true,
        },
        password: {
            type: String, max: 1024, required: true

        },
        isDeleted: { type: Boolean, default: false, select: false },
    },
    {
        timestamps: true
    });


UserSchema.pre<IUserModel>('save', function (_next) {
    const user = this;
    if (!user.isModified('password')) {
        return _next();
    }
    genSalt(10, (error, salt) => {
        if (error) {
            return _next(error);
        }
        hash(user.password, salt, (error, passwordHash) => {
            if (error) {
                return _next(error);
            }
            user.password = passwordHash;
            return _next();
        });
    });
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

UserSchema.methods.comparePassword = function (requestPassword: string, cb: any): any {
    compare(requestPassword, this.password, (error, isMatch) => {
        return cb(error, isMatch);
    });
};

UserSchema.methods.hidePasswordAndAddTokens = function (accessToken: any, refreshToken: any) {
    const user = this.toObject();
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    delete user.password;
    return user;
}

export const User = model<IUserModel>("User", UserSchema);