import { Router } from "express";
import { checkLogin, logout, signup } from "../controller/sign_inController";

export const authRoutes = Router();

authRoutes.post("/login", checkLogin);
authRoutes.post("/logout", logout);
authRoutes.post("/signup", signup);
