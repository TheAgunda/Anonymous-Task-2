import { Express } from 'express'
import { Types } from 'mongoose';

interface User {
    id: string | Types.ObjectId;
    name?: string;
}

declare module 'express-serve-static-core' {
    export interface Request {
        user?: User;
    }
}