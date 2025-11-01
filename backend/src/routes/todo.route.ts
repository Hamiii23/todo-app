import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
  toggleTodoCompletion,
  getAllTodos,
  getCompletedTodos,
} from "../controllers/todo.controller";

const router = Router();
router.use(auth);

router.route("/").get(getAllTodos);
router.route("/completed").get(getCompletedTodos);
router.route("/:todoId").get(getTodo);
router.route("/create").post(createTodo);
router.route("/update/:todoId").patch(updateTodo);
router.route("/delete/:todoId").delete(deleteTodo);
router.route("/toggle/complete/:todoId").patch(toggleTodoCompletion);

export default router;
