import { Router } from "express";
import { createTodo } from "../controllers/todo.controllers.js";

const router = Router();

router.route("/").post(createTodo);

export default router;
