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
  // validateId,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getRecipes).post(validateRecipeInput, createRecipe);

router.route("/userRecipes").get(getUsersRecipes);

// router.route("/userRecipes").get(validateId, getUsersRecipes);

router
  .route("/:id")
  .get(getRecipe)
  .put(validateRecipeInput, editRecipe)
  .delete(deleteRecipe);

router.route("/:id/nutrition").get(getRecipeNutrition);

export default router;
