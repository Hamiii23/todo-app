import { Router } from "express";
import { createTodo, updateTodo } from "../controllers/todo.controllers.js";

const router = Router();

router.route("/").post(createTodo);
router.route("/update/:todoId").patch(updateTodo);

export default router;
