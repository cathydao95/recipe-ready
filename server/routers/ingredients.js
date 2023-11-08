import { Router } from "express";
import { getIngredients } from "../controllers/ingredients.js";

const router = Router();

router.get("/autocomplete", getIngredients);

export default router;
