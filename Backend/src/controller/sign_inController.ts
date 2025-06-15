import { Request, Response } from "express";
import { checkinUserLogin, checkUserbyEmail, storeUserLoginModal } from "../models/Sign_in_Model";


const checkLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json("Undefined");
      return;
    }
    const check = await checkUserbyEmail(email, password);
    // res.status(200).json(check);

    if (check && check.length > 0) {
      const checkMail = await checkinUserLogin(email);

      if (checkMail === undefined || checkMail === null) {
        const store = await storeUserLoginModal({ name: "New User", email, password });
        res.status(200).json("Welcome new user, you are logged in");
      } else {
        res.status(200).json("Welcome back, you are logged in successfully " + checkMail.name + "!" + checkMail.email );
      }
    } else {
      res.status(404).json("User not found or incorrect credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(505).json("Internal Server Error");
  }
  return;
};
export { checkLogin };