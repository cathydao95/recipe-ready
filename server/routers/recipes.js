import { Router } from "express";
import {
  getRecipes,
  getRecipe,
  createRecipe,
  editRecipe,
  deleteRecipe,
  getRecipeNutrition,
  getUsersRecipes,
} from "../controllers/recipes.js";
import {
  validateRecipeInput,
  validateOwner,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getRecipes).post(validateRecipeInput, createRecipe);

router.route("/userRecipes").get(getUsersRecipes);

router
  .route("/:id")
  .get(getRecipe)
  .put(validateRecipeInput, validateOwner, editRecipe)
  .delete(validateOwner, deleteRecipe);

router.route("/:id/nutrition").get(getRecipeNutrition);

export default router;
