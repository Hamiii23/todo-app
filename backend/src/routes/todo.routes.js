import { Router } from "express";
import { 
    createTodo, 
    deleteTodo, 
    getTodo, 
    updateTodo 
} from "../controllers/todo.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(auth);


router.route("/:todoId").get(getTodo);
router.route("/create").post(createTodo);
router.route("/update/:todoId").patch(updateTodo);
router.route("/delete/:todoId").delete(deleteTodo);

export default router;
