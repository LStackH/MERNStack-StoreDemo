import express, { Request, Response } from "express";
import { getMe, loginUser, registerUser } from "../controllers/userController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;
