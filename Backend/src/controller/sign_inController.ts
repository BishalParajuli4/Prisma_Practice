import { Request, Response } from "express";
import { Sign_in_Model } from "../models/Sign_in_Model";
export const Sign_inController = async (req: Request, res: Response) => {
  const { u_name, u_password } = req.body;
  try {
    const user = await Sign_in_Model(u_name, u_password);
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
