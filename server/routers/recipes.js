import { Router } from "express";
import {
  getRecipes,
  getRecipe,
  createRecipe,
  editRecipe,
  deleteRecipe,
} from "../controllers/recipes.js";
import { validateRecipeInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getRecipes).post(validateRecipeInput, createRecipe);

router
  .route("/:id")
  .get(getRecipe)
  .put(validateRecipeInput, editRecipe)
  .delete(deleteRecipe);

export default router;
