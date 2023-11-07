import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

// GET INGREDIENTS BASED ON USER'S INPUT
export const getIngredients = async (req, res) => {
  try {
    const { input, limit = 5 } = req.query;

    // QUERY RECIPES TO FIND TOTAL RECIPES
    const { rows: ingredients } = await db.query(
      "SELECT name FROM ingredients WHERE name ILIKE $1 ORDER BY name ASC LIMIT $2",
      // wild to match ingredients starting with the input
      [`${input}%`, limit]
    );

    const ingredientsList = ingredients.map((ing) => ing.name);
    console.log(ingredientsList);

    const response = {
      status: "success",
      results: ingredients.length,
      data: { ingredientsList },
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occurred while fetching ingredients.",
    });
  }
};
