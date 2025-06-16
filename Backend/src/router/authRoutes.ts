import { Router } from "express";
import { checkLogin, logout, signup } from "../controller/sign_inController";
import { verifyToken } from "../middleware/auth";

export const authRoutes = Router();

authRoutes.post("/login", checkLogin);
authRoutes.post("/logout", logout);
authRoutes.post("/signup", signup);
authRoutes.get("/protected", verifyToken, (req, res) => {
  res.json("This is a protected route.");
});


