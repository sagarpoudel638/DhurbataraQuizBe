import express from "express";
import { getUser, insertUser } from "../controllers/AuthController.js";

export const AuthRoute = express.Router();

//User registration
AuthRoute.post("/login", getUser);
