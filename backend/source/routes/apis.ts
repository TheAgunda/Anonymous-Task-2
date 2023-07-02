import express, { Router } from "express";
import auth_route from "./auth";

const APIEndpoint: Router = express.Router();
APIEndpoint.use("/auth", auth_route);
export default APIEndpoint;