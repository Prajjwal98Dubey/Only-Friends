import express from "express";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
import {
  createPost,
  deletePost,
  editMyPost,
  showMyPosts,
} from "../controllers/postControllers.js";
const postRouter = express.Router();

postRouter.route("/create").post(authMiddleWare, createPost);
postRouter.route("/edit").put(authMiddleWare, editMyPost);
postRouter.route("/delete/:id").delete(authMiddleWare, deletePost);
postRouter.route("/show_all").get(authMiddleWare, showMyPosts);

export default postRouter;
