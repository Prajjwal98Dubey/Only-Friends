import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import searchRouter from "./routes/searchRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import randomRouter from "./routes/randomRoutes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/u", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/random",randomRouter)
app.listen(8081, () => console.log("server listening at 8081"));
