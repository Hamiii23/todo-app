import { Router } from "express";
import { 
    addTodoToList,
    createList,
    deleteList,
    getAllLists,
    getList,
    getTodosByList,
    removeTodoFromList,
    updateList
} from "../controllers/list.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(auth);


router.route("/").get(getAllLists);
router.route("/:listId").get(getList);
router.route("/todos/:listId").get(getTodosByList);
router.route("/create").post(createList);
router.route("/delete/:listId").delete(deleteList);
router.route("/update/:listId").patch(updateList);
router.route("/todo/add/:listId").patch(addTodoToList);
router.route("/todo/remove/:listId").patch(removeTodoFromList);

export default router;
