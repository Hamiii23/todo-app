import { Router } from "express";
import { 
    createTodo, 
    deleteTodo, 
    updateTodo 
} from "../controllers/todo.controllers.js";

const router = Router();

router.route("/").post(createTodo);
router.route("/update/:todoId").patch(updateTodo);
router.route("/delete/:todoId").delete(deleteTodo);

export default router;
