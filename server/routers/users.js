import { Router } from "express";
import {
  getUsers,
  getUser,
  editUser,
  deleteUser,
} from "../controllers/users.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import authenticateUser from "../middleware/authenticateMiddleware.js";

const router = Router();

router.route("/").get(getUsers);

router
  .route("/current")
  .get(authenticateUser, getUser)
  .put(authenticateUser, validateUpdateUserInput, editUser)
  .delete(authenticateUser, deleteUser);

export default router;
