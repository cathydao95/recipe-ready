import { Router } from "express";
import { register, login, logout } from "../controllers/auth.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

// Route to register a user if their registration is valid
router.post("/register", validateRegisterInput, register);

// Route to login a user if their login is valid
router.post("/login", validateLoginInput, login);

// Route to logout a user
router.get("/logout", logout);

export default router;
