import { Router } from "express";
import {
  getRecipes,
  getRecipe,
  createRecipe,
  editRecipe,
  deleteRecipe,
} from "../controllers/recipes.js";

const router = Router();

router.route("/").get(getRecipes).post(createRecipe);
router.route("/:id").get(getRecipe).put(editRecipe).delete(deleteRecipe);

export default router;
