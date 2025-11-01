import { Router } from "express";
import {
  changePassword,
  getUser,
  logInUser,
  logOutUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(auth, getUser);
router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/logout").post(auth, logOutUser);
router.route("/update").patch(auth, updateUser);
router.route("/change-password").patch(auth, changePassword);

export default router;
