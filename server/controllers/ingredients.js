import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

// GET INGREDIENTS BASED ON USER'S INPUT
export const getIngredients = async (req, res) => {
  try {
    const { input, limit = 10 } = req.query;

    // QUERY RECIPES TO FIND TOTAL RECIPES
    const { rows: ingredients } = await db.query(
      "SELECT * FROM ingredients WHERE name ILIKE $1 LIMIT $2",
      // wild to match ingredients starting with the input
      [`${input}%`, limit]
    );

    const response = {
      status: "success",
      results: ingredients.length,
      data: { ingredients },
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
