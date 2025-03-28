import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

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

import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/user.routes.js";
import listRouter from "./routes/list.routes.js";

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/lists", listRouter);

export { app };
