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

// Route to get all reecipes or create a new recipe
router
  .route("/")
  .get(getRecipes)
  .post(authenticateUser, validateRecipeInput, createRecipe);

// Route to get user's bookmarked recipes
router.route("/bookmark").get(authenticateUser, getUsersBookmarked);

// Route to bookmark or unbookmark a recipe for an authenticated user
router.route("/bookmark/:id").post(authenticateUser, bookmarkRecipe);

// Route to get the recipes owned by the authenticated user
router.route("/userRecipes").get(authenticateUser, getUsersRecipes);

// Route to upload a recipe
router
  .route("/upload")
  .post(authenticateUser, upload.single("file"), uploadRecipeImage);

// Route to get, update, or delete a recipe by an ID
router
  .route("/:id")
  .get(getRecipe)
  .put(authenticateUser, validateRecipeInput, validateOwner, editRecipe)
  .delete(authenticateUser, validateOwner, deleteRecipe);

// Route to get nutrition information for a recipe by ID
router.route("/:id/nutrition").get(getRecipeNutrition);

export default router;
