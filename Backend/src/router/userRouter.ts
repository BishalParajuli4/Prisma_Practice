import { Router } from "express";
import {
  createUserContoller,
  deleteUserCOntroller,
  getByidController,
  getUserController,
  updteUserController,
} from "../controller/userController";
import { checkLogin } from "../controller/sign_inController";

const userRouter = Router();

userRouter.post("/", createUserContoller);
userRouter.put("/:id", updteUserController);
userRouter.delete("/:id", deleteUserCOntroller);
userRouter.get("/", getUserController);
userRouter.get("/:id", getByidController);
userRouter.post("/login", checkLogin);

export default userRouter;
