import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import fs from "fs/promises";
import cloudinary from "cloudinary";

export const getRecipes = async (req, res) => {
  const { ingredients, keyword } = req.query;

  let queryText = "SELECT * FROM recipes";
  let queryParams = [];

  if (ingredients) {
    const ingredientsArray = ingredients.split(",");
    queryText += " WHERE $1::text[] @> ingredients";
    queryParams = [ingredientsArray];
  }

  if (keyword) {
    queryText += " WHERE title ILIKE $1";
    queryParams = [`%${keyword}%`];
  }

  const { rows: recipes } = await db.query(queryText, queryParams);

  const response = {
    status: "success",
    results: recipes.length,
    data: { recipes },
  };

  res.status(StatusCodes.OK).json(response);
};

export const getRecipe = async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(id))
    throw new BadRequestError('Invalid or missing "id" parameter');

  const { rows: recipe } = await db.query("SELECT * FROM recipes WHERE id=$1", [
    id,
  ]);

  if (recipe.length === 0) throw new NotFoundError(`no recipe with id ${id}`);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { recipe },
  });
};

export const getUsersRecipes = async (req, res) => {
  const { userId } = req.user;
  const { rows: recipes } = await db.query(
    "SELECT * FROM recipes WHERE user_id = $1",
    [userId]
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    results: recipes.length,
    data: { recipes },
  });
};

export const createRecipe = async (req, res) => {
  const { userId } = req.user;
  const { title, ingredients, instructions, prep_time, image_url } = req.body;

  const user_id = userId ? userId : null;
  const public_recipe = user_id !== null && false;

  let ingredientsArray = ingredients;
  if (!Array.isArray(ingredients)) {
    ingredientsArray = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
  }
  const ingredientsString = `{${ingredientsArray.join(",")}}`;

  const { rows: newRecipe } = await db.query(
    "INSERT INTO recipes (title, ingredients, instructions, prep_time, image_url, user_id, public_recipe) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [
      title,
      ingredientsString,
      instructions,
      prep_time,
      image_url,
      user_id,
      public_recipe,
    ]
  );
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: { newRecipe },
  });
};

export const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, prep_time, image_url } = req.body;

  const { rows: updatedRecipe } = await db.query(
    "UPDATE recipes SET (title, ingredients, instructions, prep_time, image_url) = ($1, $2, $3, $4, $5) WHERE id = $6 RETURNING *",
    [title, ingredients, instructions, prep_time, image_url, id]
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { updatedRecipe },
  });
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM recipes WHERE id = $1", [id]);

  res.status(StatusCodes.OK).json({
    status: "success",
  });
};

export const getRecipeNutrition = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows: recipe } = await db.query(
      "SELECT * FROM recipes WHERE id=$1",
      [id]
    );

    if (recipe.length === 0) throw new NotFoundError(`no recipe with id ${id}`);

    let title = recipe[0].title.replace(/ /g, "+");
    let apiKey = process.env.SPOONACULAR_API_KEY;

    const response = await fetch(
      `https://api.spoonacular.com/recipes/guessNutrition?apiKey=${apiKey}&title=${title}`
    );

    if (!response.ok) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch nutrition data" });
    }

    const recipeNutrition = await response.json();
    res.status(StatusCodes.OK).json({
      status: "success",
      data: { recipeNutrition },
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const uploadRecipeImage = async (req, res) => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "No file provided" });
  }

  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "recipe-image",
  });
  await fs.unlink(req.file.path);

  console.log(result);
  res.status(StatusCodes.OK).json({ secure_url: result.secure_url });
};
