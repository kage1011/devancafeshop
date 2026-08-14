import { Router } from "express";
import {
  loginController,
  registerController,
  meController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", authMiddleware, meController);
export default router;
