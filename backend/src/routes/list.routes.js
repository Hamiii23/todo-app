import { Router } from "express";
import { 
    createList,
    deleteList,
    getList,
    updateList
} from "../controllers/list.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(auth);


router.route("/:listId").get(getList);
router.route("/create").post(createList);
router.route("/delete/:listId").delete(deleteList);
router.route("/update/:listId").patch(updateList);

export default router;
