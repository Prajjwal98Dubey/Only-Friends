import express from "express";
import {
  getMyDetails,
  loginUser,
  logOut,
  registerUser,
  superLikesAndLikesCount,
} from "../controllers/userControllers.js";
import { authMiddleWare } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/my").get(authMiddleWare, getMyDetails);
userRouter.route("/logout").get(authMiddleWare, logOut);
userRouter.route("/interest").put(authMiddleWare, superLikesAndLikesCount);
export default userRouter;
