import { Request, Response } from "express";
import { Create_Signin_Model, Get_By_Mail, Sign_in_Model } from "../models/Sign_in_Model";

export const CheckUserCredentialsController = async (
  req: Request,
  res: Response
) => {
  const { u_email, u_password } = req.body;

  try {
    const user = await Sign_in_Model(u_email, u_password);

    if (user.length > 0) {
      const check_Mail = await Get_By_Mail(u_email);

      if (check_Mail.length === 0) {
        res.status(202).json("User Already Logged In!");
      } else {
        const created = await Create_Signin_Model(req.body);
        res.status(200).json(created);
      }
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during Login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};