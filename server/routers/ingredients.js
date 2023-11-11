import { Router } from "express";
import { getIngredients } from "../controllers/ingredients.js";

const router = Router();

// Route to get suggested ingredient information
router.get("/autocomplete", getIngredients);

export default router;
