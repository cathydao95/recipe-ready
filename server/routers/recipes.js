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

const router = Router();

router.route("/").get(getRecipes).post(createRecipe);

router.route("/userRecipes").get(getUsersRecipes);

router.route("/:id").get(getRecipe).put(editRecipe).delete(deleteRecipe);

router.route("/:id/nutrition").get(getRecipeNutrition);

export default router;
