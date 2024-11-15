import express from "express";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
import { allChats, handleNewMessage } from "../controllers/chatControllers.js";

const chatRouter = express.Router();

chatRouter.route("/new").post(authMiddleWare, handleNewMessage);
chatRouter.route("/all").get(authMiddleWare, allChats);

export default chatRouter;
