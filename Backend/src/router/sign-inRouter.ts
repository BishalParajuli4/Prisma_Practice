import { Router } from "express";
import { CheckUserCredentialsController } from "../controller/sign_inController";


const signInRouter = Router();

 signInRouter.post("/", CheckUserCredentialsController);

 export default signInRouter;
