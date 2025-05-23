import { Router } from "express";
import { 
    createTodo, 
    deleteTodo, 
    getAllTodos, 
    getCompletedTodos, 
    getTodo, 
    toggleTodoCompletion, 
    updateTodo 
} from "../controllers/todo.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

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
