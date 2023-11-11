import { Router } from "express";
import { getUser, editUser } from "../controllers/users.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import authenticateUser from "../middleware/authenticateMiddleware.js";

const router = Router();

//Route to get the current authenticated user's information or update their information
router
  .route("/current")
  .get(authenticateUser, getUser)
  .put(authenticateUser, validateUpdateUserInput, editUser);

export default router;
