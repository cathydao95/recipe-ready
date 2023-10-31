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
  bookmarkRecipe,
} from "../controllers/recipes.js";
import {
  validateRecipeInput,
  validateOwner,
} from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.route("/").get(getRecipes).post(validateRecipeInput, createRecipe);

router.route("/userRecipes").get(getUsersRecipes);

router.route("/upload").post(upload.single("file"), uploadRecipeImage);

router
  .route("/:id")
  .get(getRecipe)
  .post(bookmarkRecipe)
  .put(validateRecipeInput, validateOwner, editRecipe)
  .delete(validateOwner, deleteRecipe);

router.route("/:id/nutrition").get(getRecipeNutrition);

export default router;
