import { Router } from "express";
import { 
    registerUser,
    loginUser,
    logOutUser,
    updateUser,
    getUser,
    changePassword
} from "../controllers/user.controllers.js";
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/").get(auth ,getUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(auth, logOutUser);
router.route("/update").patch(auth, updateUser);
router.route("/change-password").patch(auth, changePassword);

export default router;
