import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import todoRouter from "./routes/user.route";
import userRouter from "./routes/user.route";
import listRouter from "./routes/list.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/lists", listRouter);

app.use(errorHandler);

export { app };
