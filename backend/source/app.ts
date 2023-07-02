import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors';
import * as Database from "./database/Database";
import APIEndpoint from "./routes/apis";
import { AppConfig } from "./config/Constants";

/**
 * Database connectivity
 */
Database.connect();


const ExpressApp: Express = express();
ExpressApp.use(express.json());
ExpressApp.use(express.urlencoded({ extended: false }));
ExpressApp.use(express.static("public"));



const allowedOrigins = ['http://localhost:3000',];
const options: cors.CorsOptions = {
    origin: allowedOrigins,
    exposedHeaders: 'x-auth-token',
};
ExpressApp.use(cors(options));
ExpressApp.use(`${AppConfig.API_VERSION}`, APIEndpoint);

/** 
 * Error handling 
 * */
ExpressApp.use((request: Request, response: Response, next: NextFunction) => {
    return response.sendStatus(404);
});


export default ExpressApp;