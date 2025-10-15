import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.ts";

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

import todoRouter from "./routes/user.route.ts";
import userRouter from "./routes/user.route.ts";
import listRouter from "./routes/list.route.ts";
import { errorHandler } from "./middlewares/errorHandler.middleware.ts";

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/lists", listRouter);

app.use(errorHandler);

export { app };
