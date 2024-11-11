import express from "express";
import {
  getMyDetails,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import { authMiddleWare } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/my").get(authMiddleWare, getMyDetails);

export default userRouter;
