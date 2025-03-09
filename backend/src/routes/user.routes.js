import { Router } from "express";
import { 
    registerUser,
    loginUser,
    logOutUser
} from "../controllers/user.controllers.js";
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(auth, logOutUser);

export default router;
