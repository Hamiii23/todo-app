import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.ts";
import {
  addTodoToList,
  createList,
  deleteList,
  getAllLists,
  getList,
  removeTodoFromList,
  updateList,
} from "../controllers/list.controller.ts";

const router = Router();
router.use(auth);

router.route("/").get(getAllLists);
router.route("/:listId").get(getList);
router.route("/create").post(createList);
router.route("/delete/:listId").delete(deleteList);
router.route("/update/:listId").patch(updateList);
router.route("/todo/add/:listId").patch(addTodoToList);
router.route("/todo/remove/:listId").patch(removeTodoFromList);

export default router;
