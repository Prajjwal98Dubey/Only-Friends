import express from "express";
import {
  checkIfYouLikedOrSuperLiked,
  getMyDetails,
  getMyMatches,
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
userRouter
  .route("/check_is_liked")
  .get(authMiddleWare, checkIfYouLikedOrSuperLiked);
userRouter.route("/my_match").get(authMiddleWare, getMyMatches);
export default userRouter;
