import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/u", userRouter);

app.listen(8081, () => console.log("server listening at 8081"));
