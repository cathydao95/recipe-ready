import { Router } from "express";
import {
  getRecipes,
  getRecipe,
  createRecipe,
  editRecipe,
  deleteRecipe,
  getRecipeNutrition,
  getUsersRecipes,
  uploadRecipeImage,
  getUsersBookmarked,
  bookmarkRecipe,
} from "../controllers/recipes.js";
import {
  validateRecipeInput,
  validateOwner,
} from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
import authenticateUser from "../middleware/authenticateMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getRecipes)
  .post(authenticateUser, validateRecipeInput, createRecipe);

router.route("/bookmark").get(authenticateUser, getUsersBookmarked);

router.route("/bookmark/:id").post(authenticateUser, bookmarkRecipe);

router.route("/userRecipes").get(authenticateUser, getUsersRecipes);

router
  .route("/upload")
  .post(authenticateUser, upload.single("file"), uploadRecipeImage);

router
  .route("/:id")
  .get(getRecipe)
  .put(authenticateUser, validateRecipeInput, validateOwner, editRecipe)
  .delete(authenticateUser, validateOwner, deleteRecipe);

router.route("/:id/nutrition").get(getRecipeNutrition);

export default router;
