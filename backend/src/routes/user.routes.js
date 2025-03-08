import { Router } from "express";
import { 
    createUser
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/create").post(createUser);
// router.route("/update/:todoId").patch(updateTodo);
// router.route("/delete/:todoId").delete(deleteTodo);

export default router;
